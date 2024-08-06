const { User } = require('../models')

//GET USERS
const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

const getOneUser = async (req, res) => {
    try {
        const singleUser = await User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
        if(!singleUser) {
            return res.json("User does not exist.");
        }
        res.json(singleUser);
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//CREATE USER
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//UPDATE USER
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {runValidators: true, new: true, });
        if(!user) {
            return res.json('User does not exist.');
        }
        res.json(user);
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) {
            res.json('User does not exist.');
        }
        res.json(deletedUser);
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

//ADDING AND REMOVING FRIENDS
const addFriend = async (req, res) => {
    try {
        const addedFriend = await User.findByIdAndUpdate(req.params.id, {$addToSet: { friends: req.params.friendId }}, { new: true });
        if(!addedFriend) {
            return res.json('User does not exist.');
        }
        res.json(addedFriend)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

const deleteFriend = async (req, res) => {
    try {
        const deletedFriend = await User.findByIdAndUpdate(req.params.id, {$pull: { friends: req.params.friendId }}, { new: true });
        if(!deletedFriend) {
            return res.json('User does not exist.');
        }
        res.json(deletedFriend)
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend }