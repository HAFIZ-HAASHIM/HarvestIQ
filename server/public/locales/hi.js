window.TRANSLATIONS_HI = {
    app: {
        name: "HarvestIQ",
        tagline: "स्मार्ट मंडी जानकारी",
        live_badge: "LIVE AGMARKNET"
    },
    selector: {
        select_crop: "अपनी फसल चुनें",
        nearest_mandi: "पास की मंडी",
        quantity_label: "आपकी मात्रा (क्विंटल में)",
        quantity_placeholder: "क्विंटल दर्ज करें"
    },
    crops: {
        tomato: "टमाटर",
        wheat: "गेहूँ",
        rice: "धान (चावल)",
        onion: "प्याज",
        maize: "मक्का"
    },
    price: {
        live_price: "आज का भाव",
        per_quintal: "प्रति क्विंटल",
        total_value_today: "आज की कुल कीमत",
        recommendation: "सलाह",
        hold: "रोक कर रखें",
        sell_now: "अभी बेचें",
        consider_waiting: "थोड़ा और इंतज़ार करें",
        wait_up_to: "{{days}} दिन तक रुकें",
        sell_today_if_cash: "पैसों की बहुत ज़रूरत हो तभी आज बेचें"
    },
    forecast: {
        tab_label: "भाव का अनुमान",
        probability_of_increase: "दाम बढ़ने की संभावना",
        expected_price_range: "अनुमानित भाव",
        extra_income: "अतिरिक्त कमाई",
        on_your_quintals: "आपके {{quantity}} क्विंटल पर",
        forecast_confidence: "भरोसेमंद अनुमान",
        risk_notice: "जोखिम सूचना",
        risk_description: "{{riskPercent}}% संभावना है कि दाम नहीं बढ़ेंगे या ₹{{lowPrice}} से नीचे जाएंगे। यह अनुमान है, कोई पक्की गारंटी नहीं।",
        based_on_data: "पिछले 8 सालों के मंडी डेटा पर आधारित",
        in_days: "लगभग {{days}} दिनों में प्रति क्विंटल",
        chart_title: "पुराना और अनुमानित भाव (₹/क्विंटल)",
        actual_price: "असली भाव",
        predicted: "अनुमान",
        low_confidence: "कम भरोसा",
        high_confidence: "ज्यादा भरोसा",
        spoken_recommendation: "अपनी {{crop}} की फसल को अगले {{days}} दिनों तक रोक कर रखें। भाव {{lowPrice}} से {{highPrice}} रुपये तक जा सकता है। इससे आप अपनी फसल पर {{extraLow}} से {{extraHigh}} रुपये ज्यादा कमा सकते हैं।",
        speak_label: "सुनें"
    },
    storage: {
        tab_label: "भंडारण और लोन",
        nearest_storage: "पास का गोदाम",
        km_from_mandi: "{{mandi}} मंडी से {{km}} किमी दूर",
        storage_cost: "भंडारण का खर्च: ₹{{cost}} ({{days}} दिनों के लिए)",
        net_extra_income: "कुल शुद्ध मुनाफा",
        after_storage_cost: "भंडारण के खर्च के बाद",
        warehouse_loan: "गोदाम रसीद लोन",
        loan_amount: "लोन की राशि",
        interest_rate: "ब्याज़ दर",
        loan_on_crop: "आपकी फसल पर लोन",
        documents_needed: "जरूरी कागजात",
        loan_amount_value: "फसल की कीमत का 75% तक",
        interest_value: "7% सालाना (सरकार द्वारा सब्सिडी)",
        documents_value: "जमीन के कागजात + आधार कार्ड + गोदाम की रसीद",
        insight_title: "HarvestIQ की खास सलाह",
        insight_text: "आज ही ₹{{todayPrice}} में बेचने के बजाय, ₹{{loanAmount}} का लोन लेकर अपने खर्चे पूरे करें और अपनी फसल को {{days}} दिन बाद ₹{{futurePrice}} में बेचें। लोन चुकाने के बाद आपका शुद्ध मुनाफा: ₹{{netGain}}"
    },
    alert: {
        tab_label: "अलर्ट लगाएं",
        description: "जैसे ही {{mandi}} मंडी में आपकी {{crop}} का भाव आपके तय किए गए लक्ष्य तक पहुंचेगा, हम आपको SMS से बता देंगे।",
        target_price_label: "इस भाव के पार जाने पर मुझे अलर्ट करें (₹/क्विंटल)",
        phone_label: "आपका मोबाइल नंबर",
        phone_placeholder: "+91 98765 43210",
        set_alert_button: "SMS अलर्ट सेट करें",
        success_title: "अलर्ट सेट हो गया!",
        success_message: "जब {{crop}} का भाव {{mandi}} मंडी में ₹{{price}}/क्विंटल को पार करेगा, हम आपको {{phone}} नंबर पर SMS कर देंगे।",
        sms_message: "HarvestIQ अलर्ट: {{mandi}} मंडी में {{crop}} का भाव ₹{{targetPrice}}/क्विंटल से ऊपर पहुंच गया है। अभी का भाव: ₹{{currentPrice}}। यह बेचने का सही समय है! - HarvestIQ"
    },
    weather: {
        safe: "भंडारण के लिए मौसम सही है",
        risk_high: "नमी ज्यादा है — अगर ध्यान नहीं रखा गया तो अनाज खराब हो सकता है",
        risk_medium: "नमी मध्यम है — गोदाम में थोड़ी निगरानी रखें",
        checking: "जोखिम चेक कर रहे हैं..."
    },
    errors: {
        price_unavailable: "अभी का भाव नहीं मिल पाया। आखिरी भाव दिखाया जा रहा है।",
        forecast_failed: "सिस्टम काम नहीं कर रहा है। कृपया फिर से कोशिश करें।",
        alert_failed: "अलर्ट सेट नहीं हो पाया। अपना मोबाइल नंबर चेक करें और फिर से कोशिश करें।",
        loading: "मंडी का डेटा ला रहे हैं..."
    }
};
