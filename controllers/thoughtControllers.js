const { Thought, User } = require('../models')

//GET THOUGHTS
const getThoughts = async (req, res) => {
    try {
       const allThoughts = await Thought.find();
       res.json(allThoughts)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

const getOneThought = async (req, res) => {
    try {
        const singleThought = await Thought.findById(req.params.id);
        if(!singleThought) {
            return res.json('Thought does not exist.');
        }
        res.json(singleThought)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//CREATE THOUGHT
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(req.body.userId, {$push: { thoughts: newThought._id }}, { new: true });
        if(!user) {
            res.json('User does not exist.')
        }
        res.json(newThought)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//UPDATE THOUGHT
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true, new: true, });
        if(!thought) {
            return res.json('Thought does not exist.');
        }
        res.json(thought)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//DELETE THOUGHT
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete(req.params.id);
        const user = await User.findOneAndUpdate({ username: thought.username}, {$pull: { thoughts: thought._id }}, { new:true });
        if(!user) {
            return res.json('User does not exist.')
        }
        res.json(thought);
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//ADD AND DELETE REACTIONS
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(req.params.id, { $addToSet: { reactions: req.body }}, {runValidators: true, new: true, });
        if(!thought) {
            return res.json('Thought does not exist.');
        }
        res.json(thought)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(req.params.id, {$pull: { reactions: {reactionId: req.params.reactionId} }}, {new: true})
        if(!thought) {
            return res.json('Thought does not exist.');
        }
        res.json(thought)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

module.exports = { getThoughts, getOneThought, createThought, updateThought, deleteThought, addReaction, deleteReaction }