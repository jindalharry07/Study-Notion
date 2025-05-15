// routes/pdfRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PDF = require("../models/Pdf"); // <-- make sure PDF model is created

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/pdfs/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// File type validation for PDF uploads
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDFs are allowed."), false);
    }
  }
});

// Redirect root path to /manage
router.get("/", (req, res) => {
  res.redirect("/instructor/pdfs/manage");
});

// GET PDF management page
router.get("/manage", async (req, res) => {
  try {
    const pdfs = await PDF.find();
    
    // Normalize file path for cross-platform compatibility
    pdfs.forEach(pdf => {
      pdf.filePath = pdf.filePath.replace(/\\/g, '/');
    });

    res.render("pdf/manage-pdfs", { pdfs });
  } catch (err) {
    console.error(err);
    res.redirect("/instructor/pdfs/manage?error=Failed to load PDFs");
  }
});

// POST upload new PDF
router.post("/upload", upload.single("pdfFile"), async (req, res) => {
  try {
    const newPdf = new PDF({
      title: req.body.title,
      filePath: path.join("uploads/pdfs", req.file.filename),
    });
    await newPdf.save();
    res.redirect("/instructor/pdfs/manage");
  } catch (err) {
    console.error(err);
    res.redirect("/instructor/pdfs/manage?error=Upload failed");
  }
});

// POST delete PDF
router.post("/delete/:id", async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (pdf) {
      // Delete file from system
      fs.unlinkSync(pdf.filePath);
      await PDF.deleteOne({ _id: req.params.id }); // Delete from DB
    }
    res.redirect("/instructor/pdfs/manage");
  } catch (err) {
    console.error(err);
    res.redirect("/instructor/pdfs/manage?error=Failed to delete PDF");
  }
});

module.exports = router;
