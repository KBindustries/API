import Document from "../models/document.model.js"


export const createDocument = async(req, res) =>{
    const newDocument = new Document(req.body)
    try{

        const savedDocument = await newDocument.save()

        res.status(200).json({
            success: true,
            message: " Document added successfully",
            data: savedDocument
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: " Internal server error"
        })
    }
}

// get single document

export const getDocument = async(req, res)=>{
    const id = req.params.id

    try{
        const document = await Document.findById(id)
        res.status(200).json({
            success: true,
            message: "Successfull",
            data: document
        })
    }catch(error){
        res.status(404).json({
            success: false,
            message: " not found"
        })
    }
}

//get all documents

export const getAllDocuments = async (req, res)=>{
    try{
        const documents = await Document.find()
        res.status(200).json({
            success: true,
            message: "succesful",
            data: documents
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}


//update document
export const updateDocument = async (req, res)=>{
    const id = req.params.id;

    try{
        const updatedDocument = await Document.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json({
            success: true,
            message: " Successfully Updated",
            data : updatedDocument
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: " Failed to update. Please try again"
        });
    }
}


//delete document
export const deleteDocument = async(req, res)=>{
    const id = req.params.id;

    try{
        const deletedDocument = await Document.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: " Successfully deleted",
            data: deletedDocument
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message:" Failed to delete please try again"
        })
    }
}