import mongoose from 'mongoose'

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name']
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required: [true, 'must provide student id']
    },
    file: {
        type: String,
        required: [true, 'must provide file']
    },
},
{timestamps: true}
)

export default mongoose.model('Document', DocumentSchema)  