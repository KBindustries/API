import Teacher from '../models/teacher.model.js';

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ 
        success: true, 
        message:"successfully created",
        data: teacher
     });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        error: error.message 
    });
  }
};

// Get all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json({ 
        success: true, 
        message:"successfully retrieved all teachers",
        data: teachers 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
         
        error: error.message });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ 
        success: false, 
        error: 'Teacher not found' });
    }
    res.json({ 
        success: true, 
        message:"successfully retrieved teachers",
        data: teacher
     });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        error: error.message });
  }
};

// Update a teacher by ID
export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).json({ 
        success: false, 
        error: 'Teacher not found' });
    }
    res.json({
         success: true,
         message:"successfully retrieved all teachers",
         data: teacher 
        });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        error: error.message });
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found' });
    }
    res.json({ 
        success: true,
        message:'successfully deleted the teacher',
        data: teacher 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        error: error.message });
  }
};
