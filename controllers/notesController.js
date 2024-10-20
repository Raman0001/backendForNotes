const Notes = require("../model/notes");

const getAllNotes = async (req, res) => {
    try {
        const note = await Notes.find({ userId: req.id });
        if (!note) return res.status(204).json({ 'message': "Notes not found" });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
    }
};
const createNote = async (req, res) => {
    if (!req?.body?.title || !req?.body?.note) return res.status(400).json({ "message": "Title and Note are required" });
    try {
        const result = await Notes.create({
            userId: req.id,
            title: req.body.title,
            note: req.body.note
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};
const updateNote = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Id parameter is required' });
    const notes = await Notes.findOne({ _id: req.body.id }).exec();
    if (!notes) {
        return res.status(204).json({ "message": `Note is not found by this ${req.body.id}` });
    }
    if (req.body?.title) notes.title = req.body.title;
    if (req.body?.note) notes.note = req.body.note;
    const result = await notes.save();
    res.json(result);
};
const deleteNote = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Id parameter is required' });
    const note = await Notes.findOne({ _id: req.body.id }).exec();
    if (!note) {
        return res.status(404).json({ "message": `Note is not found by this ${req.body.id}` });
    }
    const result = await note.deleteOne({ _id: req.body.id });
    res.json(result);
};
const getNote = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
    const note = await Notes.findOne({ _id: req.params.id }).exec();
    if (!note) {
        return res.status(204).json({ "message": `Note is not found by this ${req.params.id}` });
    }
    res.json(note);
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNote
}