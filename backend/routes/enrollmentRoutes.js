const express = require('express');
const {
  enrollCourse,
  getMyCourses,
  updateProgress
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', enrollCourse);
router.get('/my-courses', getMyCourses);
router.put('/:id/progress', updateProgress);

module.exports = router;