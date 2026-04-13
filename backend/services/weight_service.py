# services/weight_service.py

def calculate_weight_trajectories(baseline_weight: float, procedure: str) -> dict:
    """
    Calculates the 10-year weight trajectories for unmanaged vs surgical pathways.
    """
    
    # Unmanaged Pathway (SOS Study data)
    # 0% at 2y, +1% at 10y, -1% at 15y
    unmanaged_curve = [
        baseline_weight,                     # Year 0 (Baseline)
        baseline_weight,                     # Year 2
        baseline_weight * 1.01,              # Year 10 (+1% creeping gain)
        baseline_weight * 0.99               # Year 15 (-1% natural decline)
    ]

    # Surgical Pathway (Using %TWL meta-analysis estimates)
    twl_1yr, twl_5yr, twl_10yr = 0.0, 0.0, 0.0
    
    if procedure.upper() == "RYGB":
        twl_1yr = 0.32  # Approx 32% TWL
        twl_5yr = 0.28
        twl_10yr = 0.25
    elif procedure.upper() == "SG":
        twl_1yr = 0.26  # SG has lower mean %TWL vs RYGB
        twl_5yr = 0.24
        twl_10yr = 0.21

    surgical_curve = [
        baseline_weight,                     # Year 0 (Baseline)
        baseline_weight * (1 - twl_1yr),     # Year 1
        baseline_weight * (1 - twl_5yr),     # Year 5
        baseline_weight * (1 - twl_10yr)     # Year 10
    ]

    return {
        "unmanaged": unmanaged_curve,
        "surgical": surgical_curve
    }
