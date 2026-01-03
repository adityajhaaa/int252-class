import express from 'express';
import {
  getQuizzesByCourse,
  getQuizById,
  submitQuiz,
  createQuiz
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createQuiz);
router.route('/course/:courseId').get(protect, getQuizzesByCourse);
router.route('/:id').get(protect, getQuizById);
router.route('/:id/submit').post(protect, submitQuiz);

export default router;
