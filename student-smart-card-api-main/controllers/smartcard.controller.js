import Smartcard from "../models/smartcard.model.js"


export const createSmartcard = async(req, res) =>{
    const newSmartcard = new Smartcard(req.body)
    try{

        const savedSmartcard = await newSmartcard.save()

        res.status(200).json({
            success: true,
            message: " Smart Card added successfully",
            data: savedSmartcard
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: " Internal server error"
        })
    }
}

// get single card

export const getSmartcard = async(req, res)=>{
    const id = req.params.id

    try{
        const smartcard = await Smartcard.findById(id)
        res.status(200).json({
            success: true,
            message: "Successfull",
            data: smartcard
        })
    }catch(error){
        res.status(404).json({
            success: false,
            message: " not found"
        })
    }
}

//get all cards

export const getAllSmartcards = async (req, res)=>{
    try{
        const smartcards = await Smartcard.find()
        res.status(200).json({
            success: true,
            message: "succesful",
            data: smartcards
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}


//update card
export const updateSmartcard = async (req, res)=>{
    const id = req.params.id;

    try{
        const updatedSmartcard = await Smartcard.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json({
            success: true,
            message: " Successfully Updated",
            data : updatedSmartcard
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: " Failed to update. Please try again"
        });
    }
}


//delete card
export const deleteSmartcard = async(req, res)=>{
    const id = req.params.id;

    try{
        const deletedSmartcard = await Smartcard.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: " Successfully deleted",
            data: deletedSmartcard
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message:" Failed to delete please try again"
        })
    }
}