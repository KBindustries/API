import Specialty from '../models/specialty.model.js'
import Announcement from '../models/announcement.model.js'


// create announcements 
export const createAnnouncement =async (req , res)=> {
    const newAnnouncement = new Announcement(req.body)
    try {
        const savedAnnouncement = await newAnnouncement.save();
        // Update the specialty's courses array
        await Specialty.findByIdAndUpdate(newAnnouncement.specialty, {$push: {announcements: newAnnouncement._id}});
        res.status(200).json({
            success:true,
            message:"Announcement created successfully",
            data: savedAnnouncement
        });
      } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
      }
}



//get announcements
export const  getAllAnnouncements = async (req, res)=>{
    try {
        const announcements = await Announcement.find().populate({
            path: 'specialty',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        });
        res.json({
            succes:true,
            data:announcements,
            message:"Successfully"
        });
      } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message});
      }
}



//get single announcement

export const getSingleAnnouncement = async(req, res) => {

    const id= req.params.id;
    try {
        const announcement = await Announcement.findById(id).populate({
            path: 'specialty_id',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        });
        res.status(200).json({
            success: true,
            message:" Found",
            data: announcement
        });
      } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
      }
}


//update announcement

export const updateAnnouncement = async(req, res) =>{
    const id = req.params.id;

    try {
        const updatedAnnouncement= await Announcement.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
            ).populate({
              path: 'specialty_id',
              select: 'name level total_fee  fee_check',
              strictPopulate: false
          })
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedAnnouncement
        });
      } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
      }
}



//delete announcement

export const deleteAnnouncement = async(req, res) =>{
    const id = req.params.id;
    try{
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        if (deletedAnnouncement) {
          // Update the department's courses array
          await Specialty.findByIdAndUpdate(deletedAnnouncement.specialty, {$pull: {announcements: deletedAnnouncement._id}});
          res.json({
            success: true,
            message: "Successfully deleted",
            data:deletedAnnouncement
        });
        } else {
          res.status(404).json({error: 'Attendance not found'});
        }
      } catch (err) {
        res.status(500).json({error: err.message});
      }
}
