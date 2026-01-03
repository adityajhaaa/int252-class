import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  getMyCourses,
  getEnrolledCourses,
  deleteCourse,
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCourses).post(protect, createCourse);
router.route('/mycourses').get(protect, getMyCourses);
router.route('/enrolled').get(protect, getEnrolledCourses);
router.route('/:id').get(getCourseById).delete(protect, deleteCourse);

export default router;
