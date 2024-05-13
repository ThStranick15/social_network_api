const {model, Schema, mongoose} = require('mongoose')

const reactionSchema = new Schema ({
    reactionId:{
        type: mongoose.Types.ObjectId,
        default: function() {
            return new mongoose.Types.ObjectId()
        }
    },
    reactionBody: {
        type: String,
        required: [true,'must have body text'],
        maxLengh: [280, 'must be less than 280 char']
    },
    username:{
        type: String,
        required: [true, 'username required']
    },
    createdAt:{
        type: Date,
        default: new Date(),
        get: e => `${e.toDateString()}`
    }
})

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: [true, 'text required'],
        minLength: [1,'must be at least 1 char'],
        maxLength: [280,'must be less than 280 char']
    },
    createdAt: {
        type: Date,
        default: new Date(),
        get: e => `${e.toDateString}`
    },
    username:{
        type: String,
        required: [true, 'username required']
    },
    reactions:[
        reactionSchema
    ]
},{
    toJSON:{virtuals: true}
})

//create virtual that tallies amount of reactions thought has
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought