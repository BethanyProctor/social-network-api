const mongoose = require('mongoose')
const dayJS = require('dayjs')

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

module.exports = reactionSchema