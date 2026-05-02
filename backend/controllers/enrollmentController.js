const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in course
// @route   POST /api/enrollments
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });
    
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    
    // Create enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });
    
    // Add student to course's enrolledStudents array
    if (!course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
      await course.save();
    }
    
    res.status(201).json({
      success: true,
      enrollment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get my enrolled courses
// @route   GET /api/enrollments/my-courses
exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'name email'
        }
      })
      .sort('-enrolledAt');
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update course progress
// @route   PUT /api/enrollments/:id/progress
exports.updateProgress = async (req, res) => {
  try {
    const { progress, completedLessonId } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    // Check ownership
    if (enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    enrollment.progress = progress;
    
    if (completedLessonId && !enrollment.completedLessons.includes(completedLessonId)) {
      enrollment.completedLessons.push(completedLessonId);
    }
    
    if (progress === 100) {
      enrollment.completedAt = new Date();
    }
    
    await enrollment.save();
    
    res.status(200).json({
      success: true,
      enrollment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};