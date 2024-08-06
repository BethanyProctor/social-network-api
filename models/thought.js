const mongoose = require('mongoose')
const dayJS = require('dayjs')
const reactionSchema = require('./reaction')

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dayJS(date).format('MM/DD/YYYY'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ reactionSchema ],
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
})

const Thought = mongoose.model('thought', thoughtSchema)

module.exports = Thought