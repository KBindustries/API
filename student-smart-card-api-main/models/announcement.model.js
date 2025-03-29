import mongoose from 'mongoose'

const AnnouncementSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    
},
    { timestamps: true }
)

export default mongoose.model('Announcement', AnnouncementSchema)  