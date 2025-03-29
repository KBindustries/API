import mongoose from 'mongoose'

const incidentReportSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    securityOfficer: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: true },
    content: {
         type: String, 
         required: true },
    title: { 
        type: String, 
        required: true },
    read: { 
        type: Boolean, 
        default: false },
    
},
    { timestamps: true }
)

export default mongoose.model('Incident', incidentReportSchema)  