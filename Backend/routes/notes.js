const express = require('express')
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middlewere/fetchuser");
const { body, validationResult, check } = require('express-validator');

//Get all the notes using : Get "/api/auth/fetchallnotes". Login requird
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
});

// Add a new  note using : post "/api/auth/addnote". Login requird
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 6 character').isLength({ min: 6 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors, return Bad requrest and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();

        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
//update an existiing note using : put "/api/notes/updatenotes". login requird
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newnote object
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        //Find the note to be updated nad update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});

//delete an existiing note using : Delete "/api/notes/deletenotes". login requird
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be delete nad delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found");
        }
        //Alowed deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
});

module.exports = router;