// Configuration
const API_BASE = '/api';

// State
let state = {
    crop: 'Tomato',
    mandi: 'Mangaluru',
    quantity: 20,
    currentPrice: null,
    expectedHigh: null,
    expectedLow: null
};

// Elements
const els = {
    cropSelect: document.getElementById('crop-select'),
    mandiSelect: document.getElementById('mandi-select'),
    qtyInput: document.getElementById('qty-input'),
    tabs: document.querySelectorAll('.tab-btn'),
    views: document.querySelectorAll('.view'),

    priceVal: document.getElementById('live-price-val'),
    priceTime: document.getElementById('price-time'),
    totalQty: document.getElementById('total-qty'),
    totalValue: document.getElementById('total-value-val'),

    fWaitDays: document.getElementById('f-wait-days'),
    fProb: document.getElementById('f-prob'),
    fRange: document.getElementById('f-range'),
    confScore: document.getElementById('conf-score-text'),
    confBar: document.getElementById('conf-bar-fill'),
    fExtra: document.getElementById('f-extra-income'),
    fQty: document.getElementById('f-qty'),
    fRiskPct: document.getElementById('f-risk-pct'),
    fRiskDrop: document.getElementById('f-risk-drop'),
    recBadge: document.getElementById('rec-badge'),
    recText: document.getElementById('rec-text'),
    recSub: document.getElementById('rec-sub-text'),

    storageContent: document.getElementById('storage-content'),
    weatherCard: document.getElementById('weather-card'),

    alertForm: document.getElementById('alert-form'),
    alertPrice: document.getElementById('alert-price'),
    alertPhone: document.getElementById('alert-phone'),
    alertFormContainer: document.getElementById('alert-form-container'),
    alertSuccessContainer: document.getElementById('alert-success-container'),
    alertCropText: document.getElementById('alert-crop'),
    alertMandiText: document.getElementById('alert-mandi'),
    successPhone: document.getElementById('success-phone'),
    successCrop: document.getElementById('success-crop'),
    successMandi: document.getElementById('success-mandi'),
    successTarget: document.getElementById('success-target'),
    resetAlertBtn: document.getElementById('reset-alert-btn'),
    submitAlertBtn: document.getElementById('alert-submit-btn')
};

let priceChart = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    setupEventListeners();
    refreshAllData();

    // Poll Price exactly like React hook every 30m
    setInterval(() => fetchLivePrice(), 30 * 60 * 1000);
});

function setupEventListeners() {
    // Selectors
    els.cropSelect.addEventListener('change', (e) => { state.crop = e.target.value; updateAlertLabels(); refreshAllData(); });
    els.mandiSelect.addEventListener('change', (e) => { state.mandi = e.target.value; updateAlertLabels(); refreshAllData(); });
    els.qtyInput.addEventListener('input', (e) => {
        state.quantity = parseFloat(e.target.value) || 1;
        updateQuantityMath();
    });

    // Tabs
    els.tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            els.tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');

            const targetId = e.target.dataset.target;
            els.views.forEach(v => {
                if (v.id === targetId) {
                    v.classList.add('active', 'fade-in');
                } else {
                    v.classList.remove('active', 'fade-in');
                }
            });
        });
    });

    // Alert Form
    els.alertForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const rawPhone = els.alertPhone.value;
        // Keep the plus sign but strip spaces and dashes
        const phone = rawPhone.replace(/[\s-]/g, '');
        const price = els.alertPrice.value;

        if (phone.length < 10) { alert(t('errors.alert_failed') || "Please enter a valid phone number"); return; }

        try {
            els.submitAlertBtn.innerHTML = t('weather.checking') || 'Activating System... <i data-lucide="loader" class="animate-pulse"></i>';
            lucide.createIcons();
            els.submitAlertBtn.disabled = true;

            const res = await fetch(`${API_BASE}/alerts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ crop: state.crop, mandi: state.mandi, targetPrice: price, phone, language: currentLang() })
            });
            const data = await res.json();

            if (data.success) {
                // Show success screen
                els.successCrop.textContent = t(`crops.${data.data.crop.toLowerCase()}`) || data.data.crop;
                els.successMandi.textContent = data.data.mandi;
                els.successPhone.textContent = data.data.phone;
                els.successTarget.textContent = `₹${data.data.targetPrice}/qtl`;

                els.alertFormContainer.classList.add('hidden');
                els.alertSuccessContainer.classList.remove('hidden');
            } else {
                const errorMsg = data.message ? `Twilio Error: ${data.message}` : t('errors.alert_failed');
                alert(errorMsg);
            }
        } catch (err) {
            alert(t('errors.alert_failed') || 'Network error');
        } finally {
            els.submitAlertBtn.innerHTML = `<span data-i18n="alert.set_alert_button">${t('alert.set_alert_button')}</span> <i data-lucide="bell-ring"></i>`;
            lucide.createIcons();
            els.submitAlertBtn.disabled = false;
        }
    });

    els.resetAlertBtn.addEventListener('click', () => {
        els.alertFormContainer.classList.remove('hidden');
        els.alertSuccessContainer.classList.add('hidden');
        els.alertPhone.value = '';
    });
}

function updateAlertLabels() {
    els.alertCropText.textContent = t(`crops.${state.crop.toLowerCase().replace(/[^a-z]/g, '')}`) || state.crop;
    els.alertMandiText.textContent = state.mandi;
}

const formatINR = (num) => new Intl.NumberFormat('en-IN').format(num);

async function refreshAllData() {
    updateAlertLabels();
    await Promise.all([
        fetchLivePrice(),
        fetchForecast(),
        fetchStorage(),
        fetchWeather()
    ]);
}

// 1. LIVE PRICE
async function fetchLivePrice() {
    try {
        const res = await fetch(`${API_BASE}/prices/${state.crop}/${state.mandi}`);
        const { data } = await res.json();

        state.currentPrice = data.price;
        els.priceVal.textContent = `₹${data.price}`;

        const time = new Date(data.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        els.priceTime.textContent = time;

        updateQuantityMath();
    } catch (error) {
        console.error("Price fetch failed", error);
        els.priceVal.textContent = "Error";
    }
}

function updateQuantityMath() {
    if (state.currentPrice) {
        els.totalQty.textContent = state.quantity;
        els.totalValue.textContent = `₹${formatINR(state.currentPrice * state.quantity)}`;
    }

    if (state.expectedLow && state.expectedHigh) {
        const minExtra = (state.expectedLow - state.currentPrice) * state.quantity;
        const maxExtra = (state.expectedHigh - state.currentPrice) * state.quantity;
        els.fQty.textContent = state.quantity;
        els.fExtra.textContent = `${minExtra > 0 ? `₹${formatINR(minExtra)}` : '₹0'} – ₹${formatINR(Math.max(0, maxExtra))} more`;
    }

    // Re-render storage math if tab active or cache ready
    renderStorageDom();
}

// 2. FORECAST
async function fetchForecast() {
    try {
        const res = await fetch(`${API_BASE}/forecast/${state.crop}/${state.mandi}`);
        const { data } = await res.json();

        const { insights, historical, forecast } = data;

        state.expectedLow = insights.expectedLow;
        state.expectedHigh = insights.expectedHigh;
        els.alertPrice.value = insights.expectedLow; // default

        // Update DOM texts
        els.fWaitDays.textContent = t('price.wait_up_to', { days: insights.waitDays }) || `${insights.waitDays} days`;
        document.getElementById('f-wait-txt').style.display = 'none'; // Replaced by wait_up_to
        els.fProb.textContent = `${insights.probabilityOfIncrease}%`;
        els.fRange.textContent = `₹${formatINR(insights.expectedLow)} – ₹${formatINR(insights.expectedHigh)}`;

        const risk = 100 - insights.probabilityOfIncrease;
        const riskD = Math.floor(insights.expectedLow - 100);
        document.getElementById('f-risk-text-full').textContent = t('forecast.risk_description', { riskPercent: risk, lowPrice: riskD });

        // Update Confidence Bar and Badge Style
        els.confScore.className = 'score-text';
        els.confBar.className = 'bar-fill';
        els.recBadge.className = 'recommendation-badge';

        if (insights.recommendation === 'HOLD') {
            els.confScore.classList.add('text-leaf');
            els.confBar.classList.add('bg-leaf-500', 'shadow-leaf-500');
            els.recBadge.classList.add('bg-leaf-light');
        } else if (insights.recommendation === 'CONSIDER') {
            els.confScore.classList.add('text-harvest');
            els.confBar.classList.add('bg-harvest-500', 'shadow-harvest-500');
            els.recBadge.classList.add('bg-harvest-light');
        } else {
            els.confScore.classList.add('text-danger');
            els.confBar.classList.add('bg-danger-500', 'shadow-danger-500');
            els.recBadge.classList.add('bg-danger-light');
        }

        els.confScore.textContent = `${insights.probabilityOfIncrease}%`;

        const recMapping = {
            'HOLD': 'price.hold',
            'CONSIDER': 'price.consider_waiting',
            'SELL': 'price.sell_now'
        };
        els.recText.textContent = t(recMapping[insights.recommendation]) || insights.recommendation;

        // Trigger CSS animation refill
        els.confBar.style.width = '0%';
        setTimeout(() => { els.confBar.style.width = `${insights.probabilityOfIncrease}%`; }, 100);

        updateQuantityMath();
        renderChart(historical, forecast);

    } catch (error) {
        console.error("Forecast failed", error);
    }
}

// 3. WEATHER
async function fetchWeather() {
    try {
        els.weatherCard.innerHTML = `<div class="weather-loader animate-pulse">${t('weather.checking')}</div>`;
        els.weatherCard.className = 'weather-card glass-card border-white/10';

        const res = await fetch(`${API_BASE}/weather/${state.mandi}`);
        const { data } = await res.json();

        const isRisk = data.riskLevel === 'HIGH';

        // Switch border class directly
        els.weatherCard.style.borderColor = isRisk ? 'var(--color-harvest-500)' : 'var(--color-leaf-500)';

        els.weatherCard.innerHTML = `
      <div class="weather-flex">
        <div class="weather-icon-box" style="background-color: ${isRisk ? 'rgba(240, 192, 64, 0.2)' : 'rgba(134, 197, 99, 0.2)'}">
          <i data-lucide="${isRisk ? 'alert-triangle' : 'shield-check'}" style="color: ${isRisk ? 'var(--color-harvest-500)' : 'var(--color-leaf-500)'}"></i>
        </div>
        <div>
          <h4 class="weather-title">Storage Weather Risk: ${data.riskLevel}</h4>
          <p class="weather-msg" style="color: ${isRisk ? 'var(--color-harvest-500)' : 'var(--color-leaf-500)'}">
            ${t(isRisk ? 'weather.risk_high' : 'weather.safe')}
          </p>
        </div>
      </div>
      <div class="weather-stats">
        <div class="w-stat">
          <p class="w-stat-label">Temp</p>
          <div class="w-stat-val">
            <i data-lucide="${data.weatherMain.toLowerCase().includes('rain') ? 'cloud-rain' : 'cloud-sun'}" style="color: ${data.weatherMain.toLowerCase().includes('rain') ? 'var(--color-info-500)' : 'var(--color-harvest-500)'}"></i>
            ${Math.round(data.currentTemp)}°C
          </div>
        </div>
        <div class="w-stat">
          <p class="w-stat-label">Humidity</p>
          <div class="w-stat-val">
            <i data-lucide="droplets" class="text-info"></i>
            ${data.currentHumidity}%
          </div>
        </div>
      </div>
    `;
        lucide.createIcons();
    } catch (err) {
        console.error(err);
    }
}

// 4. STORAGE
let storageCache = null;
async function fetchStorage() {
    try {
        const res = await fetch(`${API_BASE}/storage/${state.mandi}`);
        const { data } = await res.json();
        storageCache = data;
        renderStorageDom();
    } catch (err) {
        console.error(err);
    }
}

function renderStorageDom() {
    if (!storageCache || !state.currentPrice) return;
    const data = storageCache;
    const facility = data.facilities[0];

    const HOLDING_WEEKS = 3;
    const totalCost = facility.costPerQuintalPerWeek * HOLDING_WEEKS * state.quantity;
    const maxLoan = (state.currentPrice * state.quantity) * (data.nabardLoan.maxPercentage / 100);

    const expectedRevenue = state.expectedHigh * state.quantity;
    const currentVal = state.currentPrice * state.quantity;
    const netExtra = expectedRevenue - currentVal - totalCost;

    let docHtml = data.nabardLoan.documents.map(d => `<li>${d}</li>`).join('');

    els.storageContent.innerHTML = `
    <!-- Storage Facility -->
    <div class="glass-card storage-card">
      <i data-lucide="warehouse" class="bg-logo"></i>
      <h3><i data-lucide="map-pin"></i> ${t('storage.nearest_storage')}</h3>
      
      <div class="s-content">
        <h4 class="s-title">${facility.name}</h4>
        <div class="s-dist">
          <i data-lucide="navigation"></i>
          <span>${t('storage.km_from_mandi', { km: facility.distanceKm, mandi: state.mandi })}</span>
          <a href="https://maps.google.com/?q=${facility.lat},${facility.lng}" target="_blank">View Map</a>
        </div>
        
        <div class="glass-panel s-math-grid">
          <div>
            <p class="s-label">Time</p>
            <p class="s-val">${HOLDING_WEEKS} Weeks</p>
          </div>
          <div>
            <p class="s-label">Cost (${state.quantity} Qtl)</p>
            <p class="s-val text-danger font-bold">₹${formatINR(totalCost)}</p>
          </div>
        </div>

        <div class="s-net-box">
          <i data-lucide="calculator"></i>
          <div>
            ${t('storage.net_extra_income')} ${t('storage.after_storage_cost')}:
            <span class="s-net-val">₹${formatINR(Math.max(0, netExtra))}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loan -->
    <div class="glass-card storage-card l-card">
      <i data-lucide="landmark" class="bg-logo"></i>
      <h3><i data-lucide="landmark"></i> ${t('storage.warehouse_loan')}</h3>
      
      <div class="s-content">
        <p class="l-desc">${t('storage.insight_text', { todayPrice: formatINR(state.currentPrice * state.quantity), loanAmount: formatINR(maxLoan), futurePrice: formatINR(expectedRevenue), days: HOLDING_WEEKS * 7, netGain: formatINR(Math.max(0, netExtra)) })}</p>
        
        <div class="l-math">
          <div class="glass-panel">
            <p class="s-label">${t('storage.loan_amount')}</p>
            <p class="l-val text-info">₹${formatINR(maxLoan)}</p>
            <p class="l-sub">${t('storage.loan_amount_value')}</p>
          </div>
          <div class="glass-panel">
            <p class="s-label">${t('storage.interest_rate')}</p>
            <p class="l-val text-harvest">${data.nabardLoan.interestRateAnnually}%</p>
            <p class="l-sub">${t('storage.interest_value')}</p>
          </div>
        </div>

        <div class="l-docs">
          <p class="l-docs-title"><i data-lucide="info"></i> ${t('storage.documents_needed')}</p>
          <ul>${docHtml}</ul>
        </div>
      </div>
    </div>
  `;
    lucide.createIcons();
}

// 5. CHART.JS INTEGRATION
function renderChart(historical, forecast) {
    const ctx = document.getElementById('priceChart').getContext('2d');

    if (priceChart) priceChart.destroy();

    const labels = [];
    const histData = [];
    const predData = [];

    // Transform labels and populate arrays filling nulls contextually to break lines cleanly
    historical.forEach(h => {
        labels.push(h.day === 0 ? 'Today' : `D${h.day}`);
        histData.push(h.price);
        predData.push(null);
    });

    // Link lines visually at "today"
    predData[historical.length - 1] = historical[historical.length - 1].price;

    forecast.forEach(f => {
        labels.push(`D+${f.day}`);
        histData.push(null);
        predData.push(f.mid);
    });

    Chart.defaults.color = 'rgba(255, 255, 255, 0.5)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Historical Price',
                    data: histData,
                    borderColor: '#86c563',
                    backgroundColor: 'rgba(134, 197, 99, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Predicted Price',
                    data: predData,
                    borderColor: '#f0c040',
                    borderDash: [5, 5],
                    borderWidth: 3,
                    backgroundColor: 'rgba(240, 192, 64, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 32, 21, 0.9)',
                    titleFont: { family: "'Inter', sans-serif", size: 11, weight: 'normal' },
                    bodyFont: { family: "'JetBrains Mono', monospace", size: 14, weight: 'bold' },
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: (ctx) => `₹${ctx.raw}`
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    border: { display: false },
                    ticks: { font: { family: "'JetBrains Mono', monospace" } }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
}

// 6. TEXT AND VOICE OUT
const LANG_SPEECH_CODES = {
    en: "en-IN", hi: "hi-IN", kn: "kn-IN",
    mr: "mr-IN", te: "te-IN", ta: "ta-IN",
    gu: "gu-IN", pa: "pa-IN"
};

function speakRecommendation() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const lang = localStorage.getItem("harvestiq_lang") || "en";

    // Scrape current dynamically populated text for Voice Interpolation
    const crop = t(`crops.${state.crop.toLowerCase().replace(/[^a-z]/g, '')}`) || state.crop;
    const days = els.fWaitDays.textContent.replace(/[^0-9]/g, '');
    const rangeText = els.fRange.textContent;
    const lowPrice = rangeText.split('–')[0]?.replace(/[^0-9]/g, '') || 0;
    const highPrice = rangeText.split('–')[1]?.replace(/[^0-9]/g, '') || 0;

    const extraText = els.fExtra.textContent;
    const extraLow = extraText.split('–')[0]?.replace(/[^0-9]/g, '') || 0;
    const extraHigh = extraText.split('–')[1]?.replace(/[^0-9]/g, '') || 0;

    const message = t("forecast.spoken_recommendation", {
        crop, days, lowPrice, highPrice, extraLow, extraHigh
    });

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = LANG_SPEECH_CODES[lang] || "en-IN";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    const btn = document.getElementById("speakBtn");
    btn.textContent = "⏹ Speaking...";
    utterance.onend = () => { btn.innerHTML = `🔊 <span>${t('forecast.speak_label')}</span>`; };

    window.speechSynthesis.speak(utterance);
}
