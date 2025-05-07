// controllers/contentController.js
const Content = require("../models/Content");

exports.getDashboard = async (req, res) => {
  try {
    const instructor = req.session.instructor;
    if (!instructor) {
      return res.redirect("/instructor/login");
    }

    const contents = await Content.find({ instructorId: instructor._id });
    res.render("instructor/dashboard", { instructor, contents });
  } catch (err) {
    console.error(err);
    res.send("Error loading dashboard");
  }
};

exports.getAddQuestion = (req, res) => {
  res.render("instructor/add-question"); // Make sure this view exists
};

exports.getEditContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.send("Content not found");
    res.render("instructor/edit-content", { content });
  } catch (err) {
    res.send("Error loading edit form: " + err.message);
  }
};

exports.postEditContent = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Content.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect("/instructor/dashboard");
  } catch (err) {
    res.send("Error updating content: " + err.message);
  }
};

exports.deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.redirect("/instructor/dashboard");
  } catch (err) {
    res.send("Error deleting content: " + err.message);
  }
};


exports.postAddQuestion = async (req, res) => {
  try {
    const instructor = req.session.instructor;
    if (!instructor) {
      return res.redirect("/instructor/login");
    }

    const { title, description } = req.body;

    const newContent = new Content({
      title,
      description,
      instructorId: instructor._id,
    });

    await newContent.save();
    res.redirect("/instructor/dashboard");
  } catch (err) {
    console.error(err);
    res.send("Error adding question");
  }
};

