import Specialty from '../models/specialty.model.js'

export const createSpecialty = async (req, res) => {
    const { name, academic_year, level, total_fee, fees, fee_check} = req.body;

    // if(!name || !academic_year || !level || !total_fee || !fees.first_installment || !fees.second_installment  || !fees.third_installment || !fee_check){
    //     return res.status(400).json({
    //         message: "Input missing"
    //     })
    // }

    const newSpecialty = new Specialty( { name, academic_year, level, total_fee, fees, fee_check} )

    try{
        const savedSpecialty = await newSpecialty.save()

        res.status(200).json({
            success: true,
            message: " Specialty created successfuly",
            data: savedSpecialty
        })
    }catch(error){
        res.status(500).json({
            success: false, message: error.message
        })
    }
}


// get single Specialty

export const getSpecialty = async (req, res)=>{
    const id = req.params.id

    try{
        const specialty = await Specialty.findById(id).populate('courses').populate('students')
        res.status(200).json({success: true, message:" successful", data: specialty})

    }catch(error){
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}


//get all specialties

export const getAllSpecialties = async(req,res)=>{
    try{
        const specialties = await Specialty.find().populate('courses').populate('students')
        res.status(200).json({success: true, message: "successful", data: specialties})
    }catch(error){
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}


//update specialty

export const updateSpecialty = async(req, res)=>{
    const id = req.params.id;

    const { name, academic_year, level, total_fee, fees} = req.body;

    // if(!name || !academic_year || !level || !total_fee || !fees || !fees.first_installment || !fees.second_installment  || !fees.third_installment || !fee_check){
    //     return res.status(400).json({
    //         message: "Input missing"
    //     })
    // }

    try{
        const updateSpecialty = await Specialty.findByIdAndUpdate(
            id,
            {
                $set: { name, academic_year, level, total_fee, fees},
            },
            { new:true}
        ).populate('courses').populate('students');
        res.status(200).json({
            success: true,
            message: "successfully updated",
            data: updateSpecialty
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//toggle fee_check
export const toggleFeeCheck = async (req, res) =>{
    const id = req.params.id;
    const fee_check = req.body
    try{
        const toggle = await Specialty.findByIdAndUpdate(id,{
            $set: fee_check
        }, {new: true})
        res.status(200).json({
            success: true,
            message : "Toogled succesfully",
            data: toggle
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



//delete specialty

export const deleteSpecialty = async(req, res) =>{
    const id = req.params.id;
    try{
        const deletedSpecialty = await Specialty.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: " Successfully deleted",
            data: deletedSpecialty
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}