def calculate_lipids_and_ascvd(lipid_profile, age, gender, has_htn, has_diabetes, sbp, procedure):
    # Extract baseline lipids
    tc = float(lipid_profile.get("tc", 220))
    ldl = float(lipid_profile.get("ldl", 150))
    hdl = float(lipid_profile.get("hdl", 35))
    tg = float(lipid_profile.get("tg", 200))
    on_statin = lipid_profile.get("on_statin", False)
    smoker = lipid_profile.get("smoker", False)

    # 1. Procedure-Specific Lipid Deltas (mg/dL)
    if procedure == "RYGB":
        delta_tc = -16
        delta_ldl = -14
        delta_tg = -68
        delta_hdl = 12
        remission_base = 0.58
    else: # Sleeve Gastrectomy
        delta_tc = -1
        delta_ldl = -1
        delta_tg = -50
        delta_hdl = 10
        remission_base = 0.50

    if on_statin:
        remission_base *= 0.85

    # 2. Calculate 1-Year and 5-Year Projections
    proj_tc_1y = max(100, tc + delta_tc)
    proj_ldl_1y = max(50, ldl + delta_ldl)
    proj_hdl_1y = min(90, hdl + delta_hdl)
    proj_tg_1y = max(50, tg + delta_tg)

    # 5-Year Durability
    durability = 0.85 if procedure == "RYGB" else 0.75
    proj_tc_5y = max(100, tc + (delta_tc * durability))
    proj_ldl_5y = max(50, ldl + (delta_ldl * durability))
    proj_hdl_5y = min(90, hdl + (delta_hdl * durability))
    proj_tg_5y = max(50, tg + (delta_tg * durability))
    remission_5y = remission_base * (0.65 if procedure == "RYGB" else 0.55)

    # 3. 10-Year ASCVD Risk Engine (Scaled Clinical Approximation)
    def calculate_risk(a, t_chol, h_chol, sys_bp, is_smoker, is_diabetic, is_htn_treated):
        # Base risk scalar simulating the Pooled Cohort Equations
        risk = 0.015 * max(0, (a - 35)) 
        if is_smoker: risk += 0.06
        if is_diabetic: risk += 0.08
        if sys_bp > 130: risk += 0.03 + (sys_bp - 130) * 0.001
        if is_htn_treated: risk += 0.015
        risk += (t_chol - 160) * 0.0004
        risk -= (h_chol - 45) * 0.0015
        if gender.lower() == 'male': risk *= 1.2
        return max(0.01, min(0.40, risk)) # Capped at 40% 10-year risk

    # Calculate Baseline vs Projected Risk (Assuming DM/HTN remission for best-case surgical outcome)
    baseline_risk = calculate_risk(age, tc, hdl, sbp, smoker, has_diabetes, has_htn)
    proj_risk_5y = calculate_risk(age + 5, proj_tc_5y, proj_hdl_5y, max(110, sbp - 15), False, False, False)
    
    rr_reduction = ((baseline_risk - proj_risk_5y) / baseline_risk) * 100 if baseline_risk > 0 else 0

    return {
        "remission_probability": {
            "year_1": round(remission_base * 100, 1),
            "year_5": round(remission_5y * 100, 1)
        },
        "lipid_panel": {
            "baseline": {"ldl": round(ldl), "tg": round(tg), "hdl": round(hdl)},
            "year_5": {"ldl": round(proj_ldl_5y), "tg": round(proj_tg_5y), "hdl": round(proj_hdl_5y)}
        },
        "ascvd_10_year_risk": {
            "baseline_percent": round(baseline_risk * 100, 1),
            "projected_5y_percent": round(proj_risk_5y * 100, 1),
            "relative_reduction": round(rr_reduction, 1)
        },
        "evidence_base": "LABS Consortium, PCORnet (Coleman 2022)"
    }