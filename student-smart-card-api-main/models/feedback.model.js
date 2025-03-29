import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    specialty: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Specialty', 
        required: true,
    },
    delegate: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },

},
    { timestamps: true }
)

export default mongoose.model('Feedback', feedbackSchema)  