import User from "../models/userModel.js";

// create new tour
export const createUser = async (req, res) => {
  const newUser = User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

// update tour
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

// delete tour
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

// getSingle tour
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json({
        success: true,
        message: "Successfully searched",
        data: user,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
    }
  };
  
  // getAll tour
  export const getAllUser = async (req, res) => {
    // for pagination
    const page = parseInt(req.query.page);
    console.log(page);
  
    try {
      const tours = await User.find({})
        .skip(page * 8)
        .limit(8);
  
      res.status(200).json({
        success: true,
        // count: tours.length,
        message: "Successful",
        data: tours,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
    }
  };
