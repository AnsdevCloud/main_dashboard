import React, { useRef } from "react";
import Invoice from "../register/Invoice";
import { Grid2 } from "@mui/material";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

const InvoiceGenerator = () => {
  const invoiceRef = useRef();

  // const handleDownload = async () => {
  //   const element = invoiceRef.current;
  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF();
  //   const imgWidth = pdf.internal.pageSize.getWidth();
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //   pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //   pdf.save("invoice.pdf");
  // };

  const invoiceData = {
    invoiceNumber: "12345",
    date: "2025-01-06",
    customerName: "John Doe",
    items: [
      { name: "Product A", quantity: 2, price: "$10" },
      { name: "Product B", quantity: 1, price: "$20" },
    ],
    total: "$40",
  };

  return <>Hoe</>;
};

export default InvoiceGenerator;
