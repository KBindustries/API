import Specialty from '../models/specialty.model.js'
import Feedback from '../models/feedback.model.js';


// create announcements 
export const createFeedback =async (req , res)=> {
    const newFeedback = new Feedback(req.body)
    try {
        const savedFeedback= await newFeedback.save();
        // Update the specialty's courses array
        await Specialty.findByIdAndUpdate(newFeedback.specialty, {$push: {feedbacks: newFeedback._id}});
        res.status(200).json({
            success:true,
            message:"Feedbak created successfully",
            data: savedFeedback
        });
      } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
      }
}



//get feedbacks
export const  getAllFeedbacks = async (req, res)=>{
    try {
        const feedbacks = await Feedback.find().populate({
            path: 'specialty',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        }).populate({
          path: 'delegate',
          select: 'username ',
          strictPopulate: false
      });
        res.json({
            succes:true,
            data:feedbacks,
            message:"Successfully"
        });
      } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message});
      }
}

//get feedbacks by specialty and level
export const getFeedbackBySpecialty = async (req, res) => {

  try {
    const { specialtyId } = req.params;
    const feedback = await Feedback.find({ specialty: specialtyId }).populate('specialty delegate');
    res.status(200).json({
      success: true,
      message:" Found",
      data: feedback
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }

}



//get single feedback

export const getSingleFeedback = async(req, res) => {

    const id= req.params.id;
    try {
        const feedback = await Feedback.findById(id).populate({
            path: 'specialty_id',
            select: 'name level total_fee  fee_check',
            strictPopulate: false
        }).populate({
          path: 'delegate',
          select: 'username ',
          strictPopulate: false
      });
        res.status(200).json({
            success: true,
            message:" Found",
            data: feedback
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
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    feedback.read = true;

    // Save the updated feedback document
    await feedback.save();

    return res.json({
       message: 'Read status toggled to true'
       });
  } catch (error) {
    return res.status(500).json({
       error: error.message });
  }
}

//update feedback

export const updateFeedback = async(req, res) =>{
    const id = req.params.id;

    try {
    const updatedFeedback= await Feedback.findByIdAndUpdate(
        id,
        {
            $set: req.body,
        },
        { new: true }
        ).populate({
          path: 'specialty',
          select: 'name level total_fee  fee_check',
          strictPopulate: false
      }).populate({
        path: 'delegate',
        select: 'name ',
        strictPopulate: false
    });
      res.json({
        success: true,
        message: "Successfully deleted",
        data:updatedFeedback
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        error: error.message
    });
  }
}



//delete feedback

export const deleteFeedback = async(req, res) =>{
    const id = req.params.id;
    try{
        const deleteFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (deleteFeedback) {
          // Update the department's courses array
          await Specialty.findByIdAndUpdate(deleteFeedback.specialty, {$pull: {feedbacks: deleteFeedback._id}});
          res.json({
            success: true,
            message: "Successfully deleted",
            data:deleteFeedback
        });
        } else {
          res.status(404).json({error: 'Feedbacks not found'});
        }
      } catch (err) {
        res.status(500).json({error: err.message});
      }
}
