import React, { useState } from "react";
import {
  format,
  addYears,
  addMonths,
  addDays,
  parseISO,
  isAfter,
  isBefore,
  differenceInDays,
} from "date-fns";

const PolicyStatusCalculator = () => {
  const [policyTerm, setPolicyTerm] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("Yearly");
  const [lastPaymentDate, setLastPaymentDate] = useState("");

  // Calculate next renewal date based on frequency
  const getNextRenewalDate = (date, frequency) => {
    switch (frequency) {
      case "Monthly":
        return addMonths(date, 1);
      case "Quarterly":
        return addMonths(date, 3);
      case "Yearly":
        return addYears(date, 1);
      default:
        return addYears(date, 1);
    }
  };

  const calculateStatus = () => {
    if (!startDate || !renewalDate) return null;

    const today = new Date();
    const renewal = parseISO(renewalDate);
    const nextRenewal = getNextRenewalDate(renewal, paymentFrequency);
    const daysUntilRenewal = differenceInDays(renewal, today);

    let status = "";
    let daysMessage = "";

    // Case 1: Before or on Renewal Date
    if (daysUntilRenewal >= 0) {
      // Agar last payment date renewal ke on ya pehle hua ho, policy active ho
      if (lastPaymentDate) {
        const payment = parseISO(lastPaymentDate);
        if (!isAfter(payment, renewal)) {
          status = "Active";
        } else {
          status = "Pending Renewal";
        }
      } else {
        status = "Pending Renewal";
      }
      daysMessage = `Renewal due in ${daysUntilRenewal} day(s)`;
    }
    // Case 2: After Renewal Date but within grace period (29 days)
    else {
      const daysPastRenewal = differenceInDays(today, renewal);
      if (daysPastRenewal <= 29) {
        if (lastPaymentDate) {
          const payment = parseISO(lastPaymentDate);
          // Agar payment renewal date ke baad aur renewal+29 ke andar hui ho
          if (
            !isBefore(payment, renewal) &&
            !isAfter(payment, addDays(renewal, 29))
          ) {
            status = "Active";
          } else {
            status = "Grace Period: Not Renewed";
          }
        } else {
          status = "Grace Period: Not Renewed";
        }
        const daysLeftGrace = 29 - daysPastRenewal;
        daysMessage = `Grace period expires in ${daysLeftGrace} day(s)`;
      }
      // Case 3: After Grace Period (i.e., 30 or more days past renewal)
      else {
        if (lastPaymentDate) {
          const payment = parseISO(lastPaymentDate);
          // Agar last payment date is before the next renewal due date, override to Active
          if (isBefore(payment, nextRenewal)) {
            status = "Active";
            daysMessage = "Payment received before next renewal due date";
          } else {
            status = "Lapsed";
            daysMessage = "Renewal period lapsed";
          }
        } else {
          status = "Lapsed";
          daysMessage = "Renewal period lapsed";
        }
      }
    }

    return {
      status,
      nextRenewal: format(nextRenewal, "yyyy-MM-dd"),
      daysMessage,
    };
  };

  const result = calculateStatus();

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Life Insurance Policy Status Calculator
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Policy Term (Years)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={policyTerm}
            onChange={(e) => setPolicyTerm(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block font-medium">Policy Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Renewal Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={renewalDate}
            onChange={(e) => setRenewalDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Premium Payment Frequency</label>
          <select
            className="w-full p-2 border rounded"
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Last Premium Paid Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={lastPaymentDate}
            onChange={(e) => setLastPaymentDate(e.target.value)}
          />
        </div>

        {result && (
          <div className="p-4 mt-4 bg-gray-100 rounded">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  result.status === "Active"
                    ? "text-green-600"
                    : result.status === "Lapsed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {result.status}
              </span>
            </p>
            <p>
              <strong>Next Renewal Date:</strong> {result.nextRenewal}
            </p>
            <p>
              <strong>Note:</strong> {result.daysMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyStatusCalculator;
