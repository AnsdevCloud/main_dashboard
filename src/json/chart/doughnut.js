var data = [];

const ToatalPolicyData = {
  labels: ["Enforce", "Surrender", "Fully Paid-up", "Paid-up", "Lapsed"],
  datasets: [
    {
      label: "No ",
      data: [1, 5, 10, 23, 12],
      backgroundColor: [
        "rgba(103, 179, 249, 0.6)",
        "rgba(248, 112, 121, 0.6)",
        "rgba(178, 245, 152, 0.6)",
        "rgba(79, 239, 251, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
      borderColor: [
        "rgba(33, 142, 244, 0.6)",
        "rgba(245, 41, 54, 0.6)",
        "rgba(92, 232, 37, 0.6)",
        "rgba(35, 231, 245, 0.6)",
        "rgba(109, 38, 252, 0.6)",
      ],
      borderWidth: 1,
    },
  ],
};
setTimeout(() => {
  data = [3, 2, 10, 16, 6];
}, 5000);
const ToatalPolicyOption = {
  responsive: true,

  plugins: {
    legend: {
      position: "bottom", // Position the legend at the bottom
      align: "start", // Align legend to the left
      labels: {
        usePointStyle: true, // Use dots instead of rectangles
        pointStyle: "circle", // Circle shape for dots
        font: {
          size: 8, // Font size for labels
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    title: {
      display: true,
      text: "Policy Status ",
      color: "grey",
    },
  },

  layout: {
    padding: {
      bottom: 50, // Add extra space at the bottom for the legend
      left: 20, // Adjust padding on the left for better placement
    },
  },
};
const ToatalLeadData = {
  labels: ["Client Referance", "Social Media", "POS", "Telecalling", "Others"],
  datasets: [
    {
      label: "No ",
      data: [23, 34, 23, 6, 6],
      backgroundColor: [
        "rgba(103, 179, 249, 0.6)",
        "rgba(248, 112, 121, 0.6)",
        "rgba(178, 245, 152, 0.6)",
        "rgba(79, 239, 251, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
      borderColor: [
        "rgba(33, 142, 244, 0.6)",
        "rgba(245, 41, 54, 0.6)",
        "rgba(92, 232, 37, 0.6)",
        "rgba(35, 231, 245, 0.6)",
        "rgba(109, 38, 252, 0.6)",
      ],
      borderWidth: 1,
    },
  ],
};

const ToatalLeadOption = {
  responsive: true,

  plugins: {
    legend: {
      position: "bottom", // Position the legend at the bottom
      align: "start", // Align legend to the left
      labels: {
        usePointStyle: true, // Use dots instead of rectangles
        pointStyle: "circle", // Circle shape for dots
        font: {
          size: 8, // Font size for labels
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    title: {
      display: true,
      text: "Lead Source ",
      color: "grey",
    },
  },
  layout: {
    padding: {
      bottom: 50, // Add extra space at the bottom for the legend
      left: 20, // Adjust padding on the left for better placement
    },
  },
};

export {
  ToatalPolicyData,
  ToatalPolicyOption,
  ToatalLeadData,
  ToatalLeadOption,
};
