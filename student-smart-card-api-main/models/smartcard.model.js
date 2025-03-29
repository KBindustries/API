import mongoose from 'mongoose'

const SmartCardSchema = new mongoose.Schema({
    qrcode: {
        type: String,
        required: [true, 'must provide name']
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required: [true, 'must provide student id']
    },
},
{ timestamps: true })

export default mongoose.model('SmartCard', SmartCardSchema)  