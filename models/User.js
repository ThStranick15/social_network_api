const {model, Schema} = require('mongoose')
const Thought = require ('./Thought')

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, 'username required'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email required'],
        validate: {
            validator: function(e){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e)
            },
            message: n => `${n.value} is not a valid email`
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    toJSON:{virtuals: true}
})

//create virtual that tallies amount of friends user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

//add pre on delete remove associated thoughts
userSchema.pre('findByIdAndDelete', async function(next){
    console.log('hello')
    await Thought.deleteMany({username: this.username})
    next()
})

const User = model('User', userSchema)

module.exports = User