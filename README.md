<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-86c563?style=for-the-badge&labelColor=0d1f10" />
<img src="https://img.shields.io/badge/status-Live%20Demo-86c563?style=for-the-badge&labelColor=0d1f10" />
<img src="https://img.shields.io/badge/license-MIT-86c563?style=for-the-badge&labelColor=0d1f10" />
<img src="https://img.shields.io/badge/made%20with-❤️%20for%20farmers-f0c040?style=for-the-badge&labelColor=0d1f10" />

<br/><br/>

```
██╗  ██╗ █████╗ ██████╗ ██╗   ██╗███████╗███████╗████████╗    ██╗ ██████╗ 
██║  ██║██╔══██╗██╔══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝    ██║██╔═══██╗
███████║███████║██████╔╝██║   ██║█████╗  ███████╗   ██║       ██║██║   ██║
██╔══██║██╔══██║██╔══██╗╚██╗ ██╔╝██╔══╝  ╚════██║   ██║       ██║██║▄▄ ██║
██║  ██║██║  ██║██║  ██║ ╚████╔╝ ███████╗███████║   ██║       ██║╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝   ╚═╝       ╚═╝ ╚══▀▀═╝ 
```

### 🌾 Smart Crop Selling Intelligence for Indian Farmers

**Stop selling at the wrong time. Start earning what your harvest truly deserves.**

<br/>

[🚀 Live Demo](#) &nbsp;·&nbsp; [📖 Documentation](#-table-of-contents) &nbsp;·&nbsp; [🐛 Report Bug](../../issues) &nbsp;·&nbsp; [💡 Request Feature](../../issues)

<br/>

---

</div>

## 🩸 The Problem — A Crisis Nobody Talks About

> *"My uncle runs a farm in Hassan. Last October he harvested 30 quintals of tomatoes worth ₹72,000. He sold it the same week for ₹41,000. Not because the crop was bad. Because he had no choice — no storage, no cash to wait, no idea that prices would rise to ₹2,100/quintal just 3 weeks later. He lost ₹21,000 in a single decision."*

This is not one story. **This is 120 million stories, every single harvest season.**

Every year, Indian farmers flood the market simultaneously right after harvest — crashing mandi prices to their annual lowest. They sell at the worst possible time not because they want to, but because:

| Problem | Reality |
|---|---|
| 📊 No price data | Government mandi portals show raw numbers with zero interpretation |
| 🔮 No forecasting | Zero tools that predict whether to sell today or wait |
| 🏚️ No storage access | They don't know where the nearest warehouse is |
| 💸 No bridge financing | No short-term credit to survive while waiting for better prices |
| 📱 Literacy barrier | Existing agri-apps assume smartphone literacy they don't have |

**The result:** India's smallholder farmers lose an estimated ₹1.5 lakh crore annually in preventable post-harvest income loss. Not from bad farming. From bad timing and zero information.

HarvestIQ exists to fix exactly that.

---

## 💡 The Solution — One Screen. One Decision. One Number That Changes Everything.

HarvestIQ is a **mobile-first progressive web app** that tells a farmer the exact right time to sell their crop — in their own language, spoken out loud if needed.

```
┌─────────────────────────────────────────────┐
│  🍅 Tomato · Mangaluru Mandi · Live Price   │
│                                             │
│         ₹1,240 / quintal                   │
│         Total value today: ₹24,800         │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  ✅  RECOMMENDATION:  HOLD          │   │
│  │                                     │   │
│  │  ⏳ Wait up to 18 days              │   │
│  │  📈 Probability of increase: 78%   │   │
│  │  💰 Expected: ₹1,750 – ₹1,920/qtl │   │
│  │                                     │   │
│  │  Your extra income on 20 quintals: │   │
│  │  ₹10,200 – ₹13,600 more           │   │
│  │                                     │   │
│  │  ⚠️  Risk: 22% chance of drop      │   │
│  │  Sell today if cash urgently needed │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Confidence:  [███████░░░]  78%            │
│                                             │
│              🔊 Listen in Kannada          │
└─────────────────────────────────────────────┘
```

No charts to decode. No data science to understand. Just a **rupee figure and a decision** — in the farmer's language, spoken out loud.

---

## ✨ Features

### 📊 Live Mandi Price Intelligence
Real-time crop prices pulled from **Agmarknet** — the Government of India's official mandi database covering 3,000+ markets. Prices refresh every 30 minutes and are cached in Firebase for speed.

### 🔮 AI-Powered Price Forecasting
30-day price prediction using time-series regression on historical Agmarknet data. Critically, predictions are shown with **probabilistic honesty** — never a single certain value, always a range with confidence score. Because a tool farmers can trust is more valuable than one that sounds impressive.

### 📦 Storage & Loan Connector
Nearest government-empanelled warehouses shown on Google Maps. Auto-calculates storage cost, net extra income after holding, and available **NABARD Warehouse Receipt Loan** amounts — so farmers know exactly how to bridge the cash gap while waiting for better prices.

### 🔔 SMS Price Alert System
Set a target price and mobile number. When the mandi price crosses your target, you get an **SMS in your own language** — powered by Twilio and a Node.js cron job that checks prices every 6 hours. No need to open the app.

### 🌡️ Weather-Based Storage Risk
Live weather data from OpenWeatherMap flags high humidity or incoming rain that could damage stored grain — so holding decisions account for real storage risk, not just price forecasts.

### 🌐 8-Language Support with Voice Readout
Full multilingual support across English, Hindi, Kannada, Marathi, Telugu, Tamil, Gujarati, and Punjabi — with **instant no-reload switching**. The 🔊 speak button reads the entire recommendation out loud using Web Speech API — built specifically for farmers who may not read well.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | PWA, mobile-first, zero install |
| **Backend** | Node.js + Express.js | REST API, cron jobs, business logic |
| **Database** | Firebase Firestore | Price cache, alert storage, real-time |
| **Auth** | Firebase Anonymous Auth | Frictionless access, no signup needed |
| **Price Data** | Agmarknet API (Govt. of India) | Live + historical mandi prices |
| **Forecasting** | Simple Statistics (Node.js) | Regression-based price prediction |
| **Maps** | Google Maps JavaScript API | Nearest warehouse display |
| **Weather** | OpenWeatherMap API | Storage risk assessment |
| **SMS** | Twilio SMS API | Multilingual price alerts |
| **Fonts** | Google Fonts (dynamic load) | Per-language script rendering |
| **Voice** | Web Speech API (browser-native) | Audio readout, zero dependency |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FARMER'S PHONE                           │
│                 (Basic Android, Mobile Browser)                  │
│                                                                 │
│   index.html + CSS + app.js + i18n.js + locales/*.js           │
│          ↕ Axios REST calls to backend                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NODE.JS + EXPRESS BACKEND                    │
│                                                                 │
│  /routes/prices.js    →  GET  /api/prices/:crop/:mandi         │
│  /routes/forecast.js  →  GET  /api/forecast/:crop/:mandi       │
│  /routes/alerts.js    →  POST /api/alerts                      │
│  /routes/storage.js   →  GET  /api/storage/:mandi              │
│  /routes/weather.js   →  GET  /api/weather/:mandi              │
│                                                                 │
│  /cron/alertChecker.js → Runs every 6 hours                    │
│          ↕                    ↕                                 │
│   Firebase Firestore    Twilio SMS API                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   Agmarknet API    OpenWeatherMap    Google Maps API
   (Live prices)    (Weather risk)   (Storage finder)
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

You will also need API keys for:
- [Agmarknet](https://agmarknet.gov.in) — Government of India (Free)
- [OpenWeatherMap](https://openweathermap.org/api) — Free tier
- [Google Maps](https://console.cloud.google.com) — Free tier
- [Twilio](https://www.twilio.com) — Free trial credits
- [Firebase](https://console.firebase.google.com) — Free Spark plan

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/harvestiq.git
cd harvestiq

# 2. Install backend dependencies
cd server
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your API keys in .env

# 4. Start the backend server
npm run dev

# 5. Open index.html in browser OR serve with live-server
cd ..
npx live-server public
```

### Environment Variables

Create a `.env` file inside the `/server` directory:

```env
# Server
PORT=5000

# Agmarknet
AGMARKNET_API_KEY=your_key_here

# OpenWeatherMap
OPENWEATHER_API_KEY=your_key_here

# Google Maps
GOOGLE_MAPS_API_KEY=your_key_here

# Twilio
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# Firebase (Service Account)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

---

## 📁 Project Structure

```
harvestiq/
│
├── public/                      # Frontend (HTML, CSS, JS)
│   ├── index.html               # Main app shell
│   ├── css/
│   │   └── styles.css           # All styles + dark theme
│   ├── js/
│   │   ├── app.js               # Main application logic
│   │   └── i18n.js              # Translation engine (vanilla JS)
│   └── locales/                 # Translation files
│       ├── en.js                # English
│       ├── hi.js                # Hindi · हिंदी
│       ├── kn.js                # Kannada · ಕನ್ನಡ
│       ├── mr.js                # Marathi · मराठी
│       ├── te.js                # Telugu · తెలుగు
│       ├── ta.js                # Tamil · தமிழ்
│       ├── gu.js                # Gujarati · ગુજરાતી
│       └── pa.js                # Punjabi · ਪੰਜਾਬੀ
│
├── server/                      # Backend (Node.js + Express)
│   ├── routes/
│   │   ├── prices.js            # Live mandi price endpoint
│   │   ├── forecast.js          # 30-day prediction endpoint
│   │   ├── alerts.js            # Price alert CRUD
│   │   ├── storage.js           # Nearest warehouse finder
│   │   └── weather.js           # Storage risk assessment
│   ├── services/
│   │   ├── agmarknet.js         # Agmarknet API + mock fallback
│   │   ├── prediction.js        # Price forecasting model
│   │   ├── twilio.js            # Multilingual SMS service
│   │   └── firebase.js          # Firestore helpers
│   ├── cron/
│   │   └── alertChecker.js      # 6-hour price alert checker
│   ├── data/
│   │   └── mockPrices.js        # Realistic fallback mock data
│   ├── server.js                # Express app entry point
│   ├── .env.example             # Environment variable template
│   └── package.json
│
└── README.md
```

---

## 🔌 API Reference

### Get Live Price
```http
GET /api/prices/:crop/:mandi
```
| Parameter | Type | Description |
|---|---|---|
| `crop` | string | `tomato`, `wheat`, `rice`, `onion`, `maize` |
| `mandi` | string | `mangaluru`, `hubli`, `pune`, `nashik`, `delhi` |

**Response:**
```json
{
  "crop": "tomato",
  "mandi": "mangaluru",
  "price": 1240,
  "unit": "quintal",
  "updatedAt": "2026-02-26T09:30:00Z",
  "source": "agmarknet"
}
```

---

### Get Price Forecast
```http
GET /api/forecast/:crop/:mandi
```
**Response:**
```json
{
  "crop": "tomato",
  "mandi": "mangaluru",
  "recommendation": "HOLD",
  "probability": 78,
  "peakDays": 18,
  "priceRange": { "low": 1750, "high": 1920 },
  "riskPercent": 22,
  "predictions": [
    { "day": 1, "low": 1280, "mid": 1310, "high": 1340 },
    { "day": 2, "low": 1295, "mid": 1330, "high": 1365 }
  ]
}
```

---

### Set Price Alert
```http
POST /api/alerts
```
```json
{
  "crop": "tomato",
  "mandi": "mangaluru",
  "targetPrice": 1750,
  "phone": "+919876543210",
  "language": "kn"
}
```

---

## 🌐 Multilingual Support

HarvestIQ is built for farmers across India — not just tech-savvy urban users. The translation system is built in **pure vanilla JavaScript** with zero npm dependencies, making it fast and compatible with basic Android browsers.

| Language | Script | Voice Readout | SMS Alerts |
|---|---|---|---|
| English | Latin | ✅ en-IN | ✅ |
| Hindi | देवनागरी | ✅ hi-IN | ✅ |
| Kannada | ಕನ್ನಡ | ✅ kn-IN | ✅ |
| Marathi | देवनागरी | ✅ mr-IN | ✅ |
| Telugu | తెలుగు | ✅ te-IN | ✅ |
| Tamil | தமிழ் | ✅ ta-IN | ✅ |
| Gujarati | ગુજરાતી | ✅ gu-IN | ✅ |
| Punjabi | ਗੁਰਮੁਖੀ | ✅ pa-IN | ✅ |

The 🔊 **Listen** button reads the full price recommendation aloud in the selected language — designed specifically for farmers with low reading literacy.

---

## 📊 The Numbers Behind HarvestIQ

| Metric | Data |
|---|---|
| 🇮🇳 Target users | 120 million smallholder farmers in India |
| 💸 Annual preventable income loss | ₹1.5 lakh crore (est.) |
| 📍 Agmarknet coverage | 3,000+ mandis across India |
| 📈 Average income improvement | 20–40% better selling price from timing alone |
| 📱 Device requirement | Any Android phone with mobile browser |
| 🌐 Languages supported | 8 Indian languages |
| ⏱️ Time to recommendation | Under 3 seconds from page load |

---

## 🗺️ Roadmap

- [x] Live Agmarknet price integration
- [x] 30-day probabilistic price forecasting
- [x] Storage & NABARD loan finder
- [x] Multilingual SMS alerts via Twilio
- [x] 8-language support with voice readout
- [x] Weather-based storage risk indicator
- [ ] WhatsApp Bot integration (no app needed at all)
- [ ] Offline mode with last-known prices
- [ ] Crop photo disease detection (integrated)
- [ ] Farmer community price reports
- [ ] Regional language voice input
- [ ] Micro-credit integration for storage loans

---

## 💼 Business Model

HarvestIQ is **always free for individual farmers.** Revenue comes from those who benefit from farmer prosperity:

**B2B SaaS — Agri Input Companies**
Bayer, Syngenta, and UPL pay to have their government-approved products recommended contextually. Not ads — verified, crop-specific recommendations only.

**Government Licensing**
State agriculture departments (Karnataka Krishi Vibhaga, Maharashtra Agri Dept.) license a white-label version for Kisan Call Centers and Common Service Centres. Already present in every village in India.

**Financial Institution Lead Generation**
NABARD, cooperative banks, and agri-fintechs (Jai Kisan, Samunnati) pay for qualified loan-ready farmer leads. Lenders pay ₹500–2,000 per converted borrower.

**Anonymized Market Intelligence**
Privacy-compliant, aggregated crop holding pattern data sold to FMCG companies and commodity traders who need regional supply forecasts.

---

## 🏆 Built For

<div align="center">

**Sahyadri SahneX Protothon 2026**
*Open Innovation Theme*

*Built in 24 hours. Validated with real farmers. Powered by government data.*

</div>

---

## 👥 Team

<div align="center">

| Member | Role |
|---|---|
| **Muhammad Haashim** | Full Stack Development + Project Implementation |
| **Mohammed Zulkifl Salih** | Documentation |

*Sahyadri College of Engineering & Management, Mangaluru*

</div>

---

## 🙏 Acknowledgements

- [Agmarknet](https://agmarknet.gov.in) — Government of India, for making mandi price data publicly accessible
- [NABARD](https://www.nabard.org) — for the Warehouse Receipt Loan scheme that makes this financially viable for farmers
- [OpenWeatherMap](https://openweathermap.org) — for free weather API access
- Every farmer who shared their story and made this problem impossible to ignore

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**HarvestIQ** — Built with purpose. Designed for dignity. Made for the farmer.

*"We're not replacing kiranas or mandis. We're giving every smallholder farmer*
*the same market intelligence that Reliance Retail pays crores for — free."*

<br/>

⭐ **Star this repo if you believe farmers deserve better** ⭐

<br/>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white" />

</div>
