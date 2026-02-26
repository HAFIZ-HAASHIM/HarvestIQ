window.TRANSLATIONS_EN = {
    app: {
        name: "HarvestIQ",
        tagline: "Smart Mandi Intelligence",
        live_badge: "LIVE AGMARKNET"
    },
    selector: {
        select_crop: "Select Your Crop",
        nearest_mandi: "Nearest Mandi",
        quantity_label: "Your Quantity (Quintals)",
        quantity_placeholder: "Enter quintals"
    },
    crops: {
        tomato: "Tomato",
        wheat: "Wheat",
        rice: "Rice (Paddy)",
        onion: "Onion",
        maize: "Maize"
    },
    price: {
        live_price: "Live Price",
        per_quintal: "per quintal",
        total_value_today: "Total value today",
        recommendation: "RECOMMENDATION",
        hold: "HOLD",
        sell_now: "SELL NOW",
        consider_waiting: "CONSIDER WAITING",
        wait_up_to: "Wait up to {{days}} days",
        sell_today_if_cash: "Sell today if cash is urgently needed"
    },
    forecast: {
        tab_label: "Price Forecast",
        probability_of_increase: "Probability of Increase",
        expected_price_range: "Expected Price Range",
        extra_income: "Extra Income Potential",
        on_your_quintals: "on your {{quantity}} quintals",
        forecast_confidence: "Forecast Confidence",
        risk_notice: "Risk Notice",
        risk_description: "{{riskPercent}}% chance price stays flat or drops below ₹{{lowPrice}}. Forecasts are advisory, not guarantees.",
        based_on_data: "based on 8yr Agmarknet data",
        in_days: "per quintal in ~{{days}} days",
        chart_title: "Historical + Predicted Price (₹/quintal)",
        actual_price: "Actual Price",
        predicted: "Predicted",
        low_confidence: "Low confidence",
        high_confidence: "High confidence",
        spoken_recommendation: "Hold your {{crop}} for up to {{days}} days. Price is expected to rise to between {{lowPrice}} and {{highPrice}} rupees. You can earn {{extraLow}} to {{extraHigh}} rupees more on your harvest.",
        speak_label: "Listen"
    },
    storage: {
        tab_label: "Storage & Loans",
        nearest_storage: "Nearest Storage Facility",
        km_from_mandi: "{{km}}km from {{mandi}} Mandi",
        storage_cost: "Est. storage cost: ₹{{cost}} for {{days}} days",
        net_extra_income: "NET EXTRA INCOME",
        after_storage_cost: "after storage cost",
        warehouse_loan: "Warehouse Receipt Loan",
        loan_amount: "Loan Amount",
        interest_rate: "Interest Rate",
        loan_on_crop: "Loan on your crop",
        documents_needed: "Documents needed",
        loan_amount_value: "Up to 75% of crop value",
        interest_value: "7% p.a. (Government subsidized)",
        documents_value: "Land record + Aadhar + Crop receipt",
        insight_title: "HarvestIQ Insight",
        insight_text: "Instead of selling at ₹{{todayPrice}} today, take a ₹{{loanAmount}} loan, cover your expenses, and sell at ₹{{futurePrice}} in {{days}} days. Net gain after repayment: ₹{{netGain}}"
    },
    alert: {
        tab_label: "Set Alert",
        description: "We will notify you by SMS when {{crop}} crosses your target price at {{mandi}} Mandi.",
        target_price_label: "Alert me when price crosses (₹/quintal)",
        phone_label: "Your Mobile Number",
        phone_placeholder: "+91 98765 43210",
        set_alert_button: "Set SMS Price Alert",
        success_title: "Alert Set Successfully!",
        success_message: "We will SMS you at {{phone}} when {{crop}} crosses ₹{{price}}/quintal at {{mandi}} Mandi.",
        sms_message: "HarvestIQ Alert: {{crop}} at {{mandi}} Mandi has crossed ₹{{targetPrice}}/quintal. Current price: ₹{{currentPrice}}. Good time to sell! - HarvestIQ"
    },
    weather: {
        safe: "Storage conditions safe",
        risk_high: "High humidity — risk of grain spoilage without moisture control",
        risk_medium: "Moderate humidity — monitor storage closely",
        checking: "Checking risks..."
    },
    errors: {
        price_unavailable: "Live price unavailable. Showing last known price.",
        forecast_failed: "Forecast temporarily unavailable. Please try again.",
        alert_failed: "Could not set alert. Please check your number and try again.",
        loading: "Fetching live mandi data..."
    }
};
