const PDF = require('../models/Pdf');
const fs = require('fs');
const path = require('path');

exports.viewPDFs = async (req, res) => {
  const pdfs = await PDF.find({ instructorId: req.session.instructorId });

  // Normalize path
  pdfs.forEach(p => {
    p.filePath = p.filePath.replace(/\\/g, '/');
  });

  res.render('pdf/manage-pdfs', { pdfs });
};

exports.uploadPDF = async (req, res) => {
  if (!req.file) return res.redirect('/instructor/pdfs?error=No file uploaded');

  const pdf = new PDF({
  title: req.body.title,
  filePath: '/uploads/pdfs/' + req.file.filename,
  originalName: req.file.originalname,
  instructorId: req.session.instructorId, // 🔥 This is essential
});


  await pdf.save();
  res.redirect('/instructor/pdfs?success=PDF uploaded successfully');
};

exports.deletePDF = async (req, res) => {
  const pdf = await PDF.findById(req.params.id);
  if (pdf) {
    fs.unlinkSync(path.join(__dirname, '..', pdf.filePath));
    await PDF.findByIdAndDelete(req.params.id);
    res.redirect('/instructor/pdfs?success=PDF deleted');
  } else {
    res.redirect('/instructor/pdfs?error=PDF not found');
  }
};
