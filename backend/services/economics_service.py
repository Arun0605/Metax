def calculate_economic_savings(clinical_projections, formData):
    # 1. Base Annual Out-Of-Pocket Costs (INR ₹) for Indian Private Healthcare (2025-2026)
    base_costs = {
        "T2DM": 28000 if formData.get('diabetes_profile', {}).get('insulin_use') else 15000,
        "HTN": 4500,
        "OSA": 11000,
        "OA": 13500
    }
    
    medical_inflation_rate = 0.12 # 12% Annual Medical Inflation in India
    
    # 2. Extract Clinical Remission Probabilities from the previous engines
    # Convert percentages (e.g., 85.5) to decimals (0.855)
    def extract_prob(module, key_path, default=0.0):
        try:
            val = clinical_projections
            for k in key_path: val = val[k]
            if isinstance(val, str): val = float(''.join(c for c in val if c.isdigit() or c == '.'))
            return val / 100.0
        except (KeyError, TypeError, ValueError):
            return default

    probs_1y = {
        "T2DM": extract_prob('t2dm_remission_diarem', ['remission_probability']) if formData.get('diabetes_profile', {}).get('status') == 'T2DM' else 0,
        "HTN": extract_prob('htn_remission', ['remission_probability', 'year_1']) if formData.get('htn_profile', {}).get('has_htn') else 0,
        "OSA": extract_prob('osa_remission', ['remission_probability', 'year_1']) if formData.get('osa_profile', {}).get('has_osa') else 0,
        "OA": extract_prob('mobility_outcomes', ['clinical_outcomes', 'nsaid_cessation_prob_1y']) if formData.get('mobility_profile', {}).get('daily_nsaid') else 0
    }
    
    probs_5y = {
        "T2DM": probs_1y["T2DM"] * 0.85, # Slight decay for T2DM
        "HTN": extract_prob('htn_remission', ['remission_probability', 'year_5']) if formData.get('htn_profile', {}).get('has_htn') else 0,
        "OSA": extract_prob('osa_remission', ['remission_probability', 'year_5']) if formData.get('osa_profile', {}).get('has_osa') else 0,
        "OA": extract_prob('mobility_outcomes', ['clinical_outcomes', 'nsaid_cessation_prob_5y']) if formData.get('mobility_profile', {}).get('daily_nsaid') else 0
    }

    # 3. Calculate 10-Year Compounding Savings
    total_savings = 0
    savings_breakdown = {"T2DM": 0, "HTN": 0, "OSA": 0, "OA": 0}
    
    for condition in base_costs.keys():
        if probs_1y[condition] == 0: continue # Skip if patient doesn't have this disease
        
        condition_savings = 0
        for year in range(1, 11):
            # Inflate the cost of the disease for this specific year
            inflated_cost = base_costs[condition] * ((1 + medical_inflation_rate) ** (year - 1))
            
            # Interpolate the probability of remission for this specific year
            if year <= 1: p_remit = probs_1y[condition]
            elif year <= 5: p_remit = probs_1y[condition] + (probs_5y[condition] - probs_1y[condition]) * ((year - 1) / 4.0)
            else: p_remit = probs_5y[condition] * 0.90 # 10% decay from year 5 to 10
            
            # Expected savings = Probability of not having the disease * Cost of the disease
            condition_savings += (p_remit * inflated_cost)
            
        savings_breakdown[condition] = int(condition_savings)
        total_savings += int(condition_savings)

    # Format as Indian Rupees (₹) strings for the frontend
    def format_inr(number):
        s, *d = str(number).partition(".")
        r = ",".join([s[x-2:x] for x in range(-3, -len(s), -2)][::-1] + [s[-3:]])
        return f"₹{r}"

    return {
        "total_10y_savings_inr": total_savings,
        "total_10y_savings_formatted": format_inr(total_savings),
        "breakdown_formatted": {
            "T2DM": format_inr(savings_breakdown["T2DM"]),
            "HTN": format_inr(savings_breakdown["HTN"]),
            "OSA": format_inr(savings_breakdown["OSA"]),
            "OA": format_inr(savings_breakdown["OA"])
        },
        "assumptions": {
            "medical_inflation": "12% p.a.",
            "source": "Indian Private Healthcare Out-Of-Pocket (OOP) averages 2025-2026"
        }
    }