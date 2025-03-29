import WeeklyTimetable from '../models/weeklyTimetable.model.js';
import Course from '../models/course.model.js';
import Teacher from '../models/teacher.model.js';
import Specialty from '../models/specialty.model.js';
import moment from 'moment-timezone';
import cron from 'node-cron'
import express from "express"
import { parse, format } from 'date-fns';



// Create a new weekly timetable
export const createWeeklyTimetable = async (req, res) => {
  try {
    const { weekStartDate, specialty, timetable } = req.body;

    // Loop through the timetable array to determine the day for each course
    timetable.forEach((course) => {
      course.day = new Date(course.date).toLocaleDateString('en-US', { weekday: 'long' });
    });

    // Create a new WeeklyTimetable entry
    const newWeeklyTimetable = new WeeklyTimetable({
      weekStartDate,
      specialty,
      timetable,
    });

    // Save the new entry to the database
    await newWeeklyTimetable.save();

    // Update the Course and Teacher models with the new timetable
    for (const course of timetable) {
      const courseId = course.course;
      const teacherId = course.teacher;

      // Push the new timetable ID to the corresponding course
      await Course.findByIdAndUpdate(courseId, { $push: { weeklytimetable: newWeeklyTimetable._id } });


      // Push the new timetable ID to the corresponding specialty
      await Specialty.findByIdAndUpdate(newWeeklyTimetable.specialty, { $push: { weeklytimetable: newWeeklyTimetable._id } });

      // Push the new timetable ID to the corresponding teacher
      await Teacher.findByIdAndUpdate(teacherId, { $push: { weeklytimetable: newWeeklyTimetable._id } });
    }

    res.status(201).json({ message: 'Weekly timetable created successfully', data: newWeeklyTimetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// Schedule the function to run every 2 minutes
cron.schedule('*/2 * * * *', () => {
  setStatusBasedOnDateAndTime();
});


const setStatusBasedOnDateAndTime = async () => {
  try {
    const currentDate = moment().format('M/D/YYYY');
    const currentTime = moment().format('HH:mm');

    const weeklyTimetables = await WeeklyTimetable.find().populate({
      path: 'timetable.teacher',
      select: 'name ',
      strictPopulate: false
    }).populate({
      path: 'timetable.course',
      select: 'name ',
      strictPopulate: false
    });

    console.log("first",weeklyTimetables)
    for (const weeklyTimetable of weeklyTimetables) {
      for (const courseEntry of weeklyTimetable.timetable) {
        if (courseEntry.date < currentDate && courseEntry.status === 'Planned' ) {
          // Date is before the current date, and status is already completed
          courseEntry.status === 'Completed';
        }else if (courseEntry.date < currentDate && courseEntry.status === 'Completed'){
          // Date is before the current date, and status is already completed
          continue;
        }

        if (courseEntry.date === currentDate) {
          // Date is the current date
          if (currentTime >= courseEntry.startTime && currentTime <= courseEntry.stopTime) {
            courseEntry.status = 'Ongoing';
          } else if (currentTime > courseEntry.stopTime) {
            courseEntry.status = 'Completed';
          }
        } else {
          // Date is after the current date
          courseEntry.status = 'Planned';
        }
      }

      // Save the changes to the database for this weeklyTimetable
      await weeklyTimetable.save();
    }

    console.log('Course statuses updated successfully.');
  } catch (error) {
    console.error('Error updating course status:', error);
  }
};

// Call the function to set the status based on the conditions
setStatusBasedOnDateAndTime();



// Get all timetable
export const getAllWeeklyTimetables = async (req, res) => {
  try {
    const timetable = await WeeklyTimetable.find().populate({
      path: 'timetable.teacher',
      select: 'name ',
      strictPopulate: false
    }).populate({
      path: 'timetable.course',
      select: 'name ',
      strictPopulate: false
    });
    setStatusBasedOnDateAndTime();

    res.json({
      success: true,
      message: "successfully retrieved all timetables",
      data: timetable
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      error: error.message
    });
  }
};


//get timetable by weekstartdate aand specialty
export const getSpecialtyWeeklyTimetable = async (req, res) => {
  try {
    const { weekStartDate, specialtyId } = req.body;

    // Assuming weekStartDate is in ISO format (e.g., "2023-07-01T00:00:00Z")
    const timetables = await WeeklyTimetable.find({
      weekStartDate: weekStartDate,
      specialty: specialtyId
    })
      .populate({
        path: 'specialty',
        select: 'name',
        strictPopulate: false
      })
      .populate('timetable.teacher')
      .populate({
        path: 'timetable.course',
        select: 'name ',
        strictPopulate: false
      });
    // updateCourseStatus()
    for (const timetable of timetables) {
      for (const courseEntry of timetable.timetable) {
        const status = setStatusBasedOnDateAndTime(courseEntry.date, courseEntry.startTime, courseEntry.stopTime);
        courseEntry.status = status;
      }
      console.log("status")

    }
    if (timetables.length === 0) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    res.json({
      timetables
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: message.error });
  }
}




// Get a teacher by I
export const getTimetablyById = async (req, res) => {
  const { id } = req.params;
  try {
    const timetable = await WeeklyTimetable.findById(id).populate({
      path: 'timetable.teacher',
      select: 'name ',
      strictPopulate: false
    }).populate({
      path: 'timetable.course',
      select: 'name ',
      strictPopulate: false
    });
    if (!timetable) {
      return res.status(404).json({
        success: false,
        error: 'Teacher not found'
      });
    }
    res.json({
      success: true,
      message: "successfully retrieved teachers",
      data: timetable
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Route to get weekly timetable by week start date
export const getByWeekStart = async (req, res) => {
  try {
    const weekStartDate = req.params.weekStartDate;

    // Find the weekly timetable by week start date
    const timetable = await WeeklyTimetable.find({ weekStartDate }).populate({
      path: 'timetable.teacher',
      select: 'name ',
      strictPopulate: false
    }).populate({
      path: 'timetable.course',
      select: 'name ',
      strictPopulate: false
    });

    if (!timetable) {
      return res.status(404).json({ error: 'Weekly timetable not found' });
    }

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update a weekly timetable by ID
export const updateWeeklyTimetable = async (req, res) => {
  const { id } = req.params;
  try {
    const weeklyTimetable = await WeeklyTimetable.findByIdAndUpdate(id, req.body, { new: true });

    // Update course with the updated weekly timetable
    await Course.findOneAndUpdate(
      { weeklyTimetable: weeklyTimetable._id },
      { $set: { 'weeklyTimetable.$': weeklyTimetable._id } }
    );

    // Update teacher with the updated weekly timetable
    await Teacher.findOneAndUpdate(
      { weeklyTimetable: weeklyTimetable._id },
      { $set: { 'weeklyTimetable.$': weeklyTimetable._id } }
    );

    res.json({ success: true, data: weeklyTimetable });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a weekly timetable by ID
export const deleteWeeklyTimetable = async (req, res) => {
  const { id } = req.params;
  try {
    const weeklyTimetable = await WeeklyTimetable.findByIdAndDelete(id);

    // Remove weekly timetable from the associated course
    await Course.findByIdAndUpdate(
      weeklyTimetable.course,
      { $pull: { weeklyTimetable: weeklyTimetable._id } }
    );

    // Remove weekly timetable from the associated teacher
    await Teacher.findByIdAndUpdate(
      weeklyTimetable.teacher,
      { $pull: { weeklyTimetable: weeklyTimetable._id } }
    );

    res.json({ success: true, data: weeklyTimetable });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
