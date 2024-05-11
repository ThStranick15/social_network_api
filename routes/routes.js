const router = require('express').Router();
const {User, Thought} = require('../models')

//GET all users /api/users
router.get('/users', async (req,res) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})
 
//GET a user by id
router.get('/users/:id', async (req,res) =>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

//POST a new user
router.post('/users', async (req,res) =>{
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }
})

//PUT update a user by id
router.put('/users/:id', async (req,res) =>{
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
        res.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
})

//DELETE a user by id, BONUS remove associated thoughts when deleted
router.delete('/users/:id', async (req,res) =>{
    const id = req.params.id
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        res.json(deletedUser)
    } catch (error) {
        console.log(error)
    }
})

//POST add a user to user friends list /api/users/:userId/friends/:friendId
router.post('/users/:userId/friends/:friendId', async (req,res) =>{
    
})

//DELETE remove a user from users friendslist /api/users/:userId/friends/:friendId
router.delete('/users/:userId/friends/:friendId', async (req,res) =>{
    
})

//GET all thoughts /api/thoughts
router.get('/thoughts', async (req,res) =>{

})

//GET thought by id
router.get('/thoughts/:id', async (req,res) =>{

})

//POST thought, push thought id to user thought array
router.post('/thoughts/:id', async (req,res) =>{

})

//PUT update thought
router.put('/thoughts/:id', async (req,res) =>{

})

//DELETE thought
router.delete('/thoughts/:id', async (req,res) =>{

})

//POST reaction stored in thoughts reaction array /api/thoughts/:thoughtId/reactions
router.post('/thoughts/:thoughtId/reactions', async (req,res) =>{

})

//DELETE reaction stored in thoughts reaction array by id
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req,res) =>{

})

module.exports = router