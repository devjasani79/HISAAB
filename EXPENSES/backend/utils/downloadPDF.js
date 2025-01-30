// utils/downloadPDF.js
const PDFDocument = require('pdfkit');
const Expense = require("../models/expenseModel");

const generatePDF = async (userId, res) => {
  try {
    // Fetch all expenses for the user
    const expenses = await Expense.find({ user_id: userId });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Set response headers for PDF download
    res.header('Content-Type', 'application/pdf');
    res.attachment('expenses.pdf');
    
    // Pipe the document to the response
    doc.pipe(res);

    // Add title and header to the PDF
    doc.fontSize(16).text('Expenses Report', { align: 'center' }).moveDown();

    // Add table headers
    doc.fontSize(12).text('Description | Amount | Category | Payment Method | Date', {
      align: 'left',
    });

    // Add expenses data to the PDF
    expenses.forEach(expense => {
      doc.text(`${expense.description} | ${expense.amount} | ${expense.category} | ${expense.paymentMethod} | ${expense.createdAt}`);
    });

    // End the document
    doc.end();

  } catch (error) {
    console.error("Error generating PDF:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = generatePDF;
