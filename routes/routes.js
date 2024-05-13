const router = require('express').Router();
const { User, Thought } = require('../models')

//GET all users /api/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

//GET a user by id
router.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

//POST a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }
})

//PUT update a user by id
router.put('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
})

//DELETE a user by id, BONUS remove associated thoughts when deleted
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        res.json(deletedUser)
    } catch (error) {
        console.log(error)
    }
})

//POST add a user to user friends list /api/users/:userId/friends/:friendId
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const id = req.params.userId
        const friendId = req.params.friendId

        const user = await User.findById(id)
        user.friends.push(friendId)
        await user.save()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

//DELETE remove a user from users friendslist /api/users/:userId/friends/:friendId
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const id = req.params.userId
        const friendId = req.params.friendId

        const user = await User.findById(id)
        const i = user.friends.indexOf(friendId)
        if (i != -1) { user.friends.splice(i, 1) }
        await user.save()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

//GET all thoughts /api/thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch (error) {
        console.log(error)
    }
})

//GET thought by id
router.get('/thoughts/:id', async (req, res) => {
    const id = req.params.id
    try {
        const thought = await Thought.findById(id)
        res.json(thought)
    } catch (error) {
        console.log(error)
    }
})

//POST thought, push thought id to user thought array
router.post('/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body)
        //push thought id to the user that created it
        const thoughtId = newThought._id
        const user = await User.findOne({ username: req.body.username })
        user.thoughts.push(thoughtId)
        await user.save()
        res.json(newThought)
    } catch (error) {
        console.log(error)
    }
})

//PUT update thought
router.put('/thoughts/:id', async (req, res) => {
    const id = req.params.id
    try {
        const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedThought)
    } catch (error) {
        console.log(error)
    }
})

//DELETE thought
router.delete('/thoughts/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deletedThought = await Thought.findByIdAndDelete(id)
        res.json(deletedThought)
    } catch (error) {
        console.log(error)
    }
})

//POST reaction stored in thoughts reaction array /api/thoughts/:thoughtId/reactions
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const id = req.params.thoughtId
        const newThought = await Thought.findById(id).populate('reactions')
        newThought.reactions.push(req.body)
        newThought.save()
        res.json(newThought)
    } catch (error) {
        console.log(error)
    }
})

//DELETE reaction stored in thoughts reaction array by id
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const id = req.params.thoughtId
        const reactionId = req.params.reactionId
        const thought = await Thought.findById(id).populate('reactions')
        const i = thought.reactions.forEach(el => {
            if(el._id == reactionId)
                return thought.reactions.indexOf(el)
        })
        thought.reactions.splice(i,1)
        await thought.save()
        res.json(thought)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router