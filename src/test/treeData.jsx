import React, { useState } from "react";

const PolicyStatusChecker = () => {
  const [policyDetails, setPolicyDetails] = useState({
    policyNumber: "",

    lastPaymentDate: "",

    premiumAmount: "",

    paymentFrequency: "yearly", // yearly, half-yearly, quarterly, monthly

    policyType: "traditional", // traditional, term, ulip, tulip

    policyTerm: 10,

    startDate: "",

    premiumsPaid: 0, // Track number of premiums paid
  });

  const [policyStatus, setPolicyStatus] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPolicyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePolicyStatus = () => {
    setLoading(true);

    setTimeout(() => {
      const status = determineStatus(policyDetails);

      setPolicyStatus(status);

      setLoading(false);
    }, 1000);
  };

  const determineStatus = (details) => {
    if (!details.lastPaymentDate || !details.startDate) {
      return { status: "error", message: "Please provide all required dates" };
    }

    const today = new Date();

    const lastPayment = new Date(details.lastPaymentDate);

    const startDate = new Date(details.startDate);

    // Grace period rules (as per IRDAI)

    let gracePeriodDays;

    switch (details.paymentFrequency) {
      case "monthly":
        gracePeriodDays = 15;

        break;

      case "quarterly":

      case "half-yearly":

      case "yearly":
        gracePeriodDays = 30;

        break;

      default:
        gracePeriodDays = 30;
    }

    const daysSinceLastPayment = Math.floor((today - lastPayment) / 86400000);

    const nextDueDate = calculateNextDueDate(
      lastPayment,
      details.paymentFrequency
    );

    // Policy maturity check

    const policyEndDate = new Date(startDate);

    policyEndDate.setFullYear(policyEndDate.getFullYear() + details.policyTerm);

    if (today > policyEndDate) {
      return {
        status: "matured",
        message: "Policy has matured",
        nextDueDate: null,
      };
    }

    // Active if within grace period

    if (daysSinceLastPayment <= gracePeriodDays) {
      return {
        status: "active",

        message: "Policy is active",

        nextDueDate: nextDueDate.toISOString().split("T")[0],
      };
    }

    // Lapsed/Discontinued (for Term/ULIP/TULIP)

    if (["term", "ulip", "tulip"].includes(details.policyType)) {
      if (details.policyType === "ulip" || details.policyType === "tulip") {
        if (details.premiumsPaid < 5) {
          return {
            status: "discontinued",

            message: "ULIP/TULIP discontinued (min 5 premiums not paid)",

            nextDueDate: null,
          };
        }
      }

      return {
        status: "lapsed",

        message: "Policy lapsed (no coverage for Term Plan)",

        nextDueDate: null,
      };
    }

    // Paid-up (Traditional policies after 2 years)

    if (details.policyType === "traditional" && details.premiumsPaid >= 2) {
      return {
        status: "paidup",

        message: "Policy is paid-up (reduced benefits)",

        nextDueDate: null,
      };
    }

    // Surrender conditions

    if (
      (details.policyType === "ulip" && details.premiumsPaid >= 5) ||
      (details.policyType === "traditional" && details.premiumsPaid >= 1)
    ) {
      return {
        status: "surrender-eligible",

        message: "Policy can be surrendered",

        nextDueDate: null,
      };
    }

    return {
      status: "lapsed",

      message: "Policy lapsed (revival possible within 5 years)",

      nextDueDate: null,
    };
  };

  const calculateNextDueDate = (lastPayment, frequency) => {
    const nextDate = new Date(lastPayment);

    switch (frequency) {
      case "monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;

      case "quarterly":
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;

      case "half-yearly":
        nextDate.setMonth(nextDate.getMonth() + 6);
        break;

      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    return nextDate;
  };

  return (
    <div className="policy-status-container">
      <h2>Indian Life Insurance Policy Status Checker</h2>

      <div className="form-group">
        <label>Policy Type:</label>

        <select
          name="policyType"
          value={policyDetails.policyType}
          onChange={handleInputChange}
        >
          <option value="traditional">
            Traditional (Endowment/Money Back)
          </option>

          <option value="term">Term Plan</option>

          <option value="ulip">ULIP</option>

          <option value="tulip">TULIP</option>
        </select>
      </div>

      {/* Other form fields remain the same */}

      <div className="form-group">
        <label>Premiums Paid:</label>

        <input
          type="number"
          name="premiumsPaid"
          value={policyDetails.premiumsPaid}
          onChange={() => handleInputChange()}
          min="0"
        />
      </div>

      <button onClick={calculatePolicyStatus} disabled={loading}>
        {loading ? "Checking..." : "Check Status"}
      </button>

      {policyStatus && (
        <div className={`status-result ${policyStatus.status}`}>
          <h3>Status: {policyStatus.status.toUpperCase()}</h3>

          <p>{policyStatus.message}</p>

          {policyStatus.nextDueDate && (
            <p>Next Due: {policyStatus.nextDueDate}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PolicyStatusChecker;
