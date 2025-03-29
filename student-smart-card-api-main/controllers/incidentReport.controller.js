// import Course from '../models/course.model.js'
import Specialty from '../models/specialty.model.js';
import IncidentReport from '../models/incidentReport.model.js'


// create announcements 
export const createIncident =async (req , res)=> {
    const newIncidentReport = new IncidentReport(req.body)
    try {
        const savedIncidentReport = await newIncidentReport.save();
        res.status(200).json({
            success:true,
            message:"Incident report created successfully",
            data: savedIncidentReport
        });
      } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
      }
}



//get incident
export const  getAllIncident = async (req, res)=>{
    try {
        const incident = await IncidentReport.find().populate({
          path: 'securityOfficer',
          select: 'username ',
          strictPopulate: false
      });
        res.json({
            succes:true,
            data:incident,
            message:"Successfully"
        });
      } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message});
      }
}



//get single incident

export const getSingleIncident = async(req, res) => {

    const id= req.params.id;
    try {
        const incident = await IncidentReport.findById(id).populate({
          path: 'securityOfficer',
          select: 'name ',
          strictPopulate: false
      });
        res.status(200).json({
            success: true,
            message:" Found",
            data: incident
        });
      } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
      }
}

//mark feedback as read
export const markRead = async(req, res) =>{
  const id = req.params.id;
  try{
    const incident = await IncidentReport.findById(id);

    if (!incident) {
      return res.status(404).json({ error: 'Incident report not found' });
    }
    incident.read = true;

    // Save the updated feedback document
    await incident.save();

    return res.json({
       message: 'Read status toggled to true'
       });
  } catch (error) {
    return res.status(500).json({
       error: error.message });
  }
}


//update incident

export const updateIncident = async(req, res) =>{
    const id = req.params.id;

    try {
        const updateIncident= await IncidentReport.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
            )
         res.status(200).json({
                success: true,
                message: "Successfully updated",
                data: updateIncident
            });
       
      } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
      }
}



//delete incident

export const deleteIncident = async(req, res) =>{
    const id = req.params.id;
    try{
        const deleteIncident = await IncidentReport.findByIdAndDelete(req.params.id);
      res.json({
            success: true,
            message: "Successfully deleted",
            data:deleteIncident
        });
        
      } catch (err) {
        res.status(500).json({error: err.message});
      }
}
