const SUPPORTED_LANGS = ["en", "hi", "kn", "mr", "te", "ta", "gu", "pa"];
const LANG_FONTS = {
    en: null,
    hi: "Tiro+Devanagari+Hindi",
    kn: "Noto+Sans+Kannada",
    mr: "Tiro+Devanagari+Marathi",
    te: "Noto+Sans+Telugu",
    ta: "Noto+Sans+Tamil",
    gu: "Noto+Sans+Gujarati",
    pa: "Noto+Sans+Gurmukhi"
};

let currentLang = "en";
let translations = {};

function detectBrowserLang() {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : "en";
}

function loadFont(lang) {
    const existing = document.getElementById("lang-font");
    if (existing) existing.remove();
    if (LANG_FONTS[lang]) {
        const link = document.createElement("link");
        link.id = "lang-font";
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${LANG_FONTS[lang]}&display=swap`;
        document.head.appendChild(link);
        document.body.style.fontFamily =
            `'${LANG_FONTS[lang].replace(/\+/g, " ")}', 'Inter', system-ui, sans-serif`;
    } else {
        document.body.style.fontFamily = "'Inter', system-ui, sans-serif";
    }
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const value = getTranslation(key);
        if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = getTranslation(key);
        if (value) el.placeholder = value;
    });
}

function getTranslation(key) {
    if (!key || typeof key !== "string") {
        return key || "";
    }
    return key.split(".").reduce((obj, k) => obj?.[k], translations) || key;
}

function t(key, vars = {}) {
    let str = getTranslation(key);
    if (!str || typeof str !== "string") return str;

    Object.entries(vars).forEach(([k, v]) => {
        str = str.replaceAll(`{{${k}}}`, v);
    });
    return str;
}

function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = "en";
    currentLang = lang;
    localStorage.setItem("harvestiq_lang", lang);
    const varName = `TRANSLATIONS_${lang.toUpperCase()}`;
    translations = window[varName] || window.TRANSLATIONS_EN;
    applyTranslations();
    loadFont(lang);
    document.documentElement.lang = lang;
    updateLanguageSwitcherUI(lang);
}

function initI18n() {
    const saved = localStorage.getItem("harvestiq_lang");
    const detected = saved || detectBrowserLang();
    const isFirstVisit = !saved;
    setLanguage(detected);
    if (isFirstVisit && detected !== "en") {
        showLangToast(detected);
    }
    setupLangSwitcher();
}

function showLangToast(lang) {
    const names = {
        hi: "Hindi · हिंदी", kn: "Kannada · ಕನ್ನಡ",
        mr: "Marathi · मराठी", te: "Telugu · తెలుగు",
        ta: "Tamil · தமிழ்", gu: "Gujarati · ગુજરાતી",
        pa: "Punjabi · ਪੰਜਾਬੀ"
    };
    const toast = document.createElement("div");
    toast.className = "lang-toast";
    toast.textContent =
        `App is showing in ${names[lang]}. Change anytime from top right.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = "1", 100);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Language Switcher Logic
const LANG_LABELS = {
    en: "EN", hi: "HI", kn: "KN",
    mr: "MR", te: "TE", ta: "TA",
    gu: "GU", pa: "PA"
};
const LANG_FLAGS = {
    en: "🌐", hi: "🇮🇳", kn: "🌿",
    mr: "🇮🇳", te: "🌾", ta: "🌺",
    gu: "🌻", pa: "🌊"
};

function updateLanguageSwitcherUI(lang) {
    const langFlag = document.getElementById("langFlag");
    const langLabel = document.getElementById("langLabel");

    if (langFlag) langFlag.textContent = LANG_FLAGS[lang];
    if (langLabel) langLabel.textContent = LANG_LABELS[lang];

    document.querySelectorAll(".lang-check").forEach(el => {
        el.textContent = "";
    });
    const check = document.getElementById(`check-${lang}`);
    if (check) check.textContent = "✓";
}

function setupLangSwitcher() {
    const langToggle = document.getElementById("langToggle");
    const langDropdown = document.getElementById("langDropdown");

    if (langToggle && langDropdown) {
        langToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            langDropdown.style.display = langDropdown.style.display === "none" ? "block" : "none";
        });

        document.addEventListener("click", () => {
            langDropdown.style.display = "none";
        });

        document.querySelectorAll(".lang-option").forEach(option => {
            option.addEventListener("click", (e) => {
                const lang = e.currentTarget.getAttribute("data-lang");
                setLanguage(lang);
                langDropdown.style.display = "none";
            });
        });
    }
}

// Expose to window for global access
window.t = t;
window.setLanguage = setLanguage;
window.initI18n = initI18n;
window.currentLang = () => currentLang;
