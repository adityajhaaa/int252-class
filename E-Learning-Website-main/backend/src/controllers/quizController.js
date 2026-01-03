import Quiz from '../models/Quiz.js';

// @desc    Get quizzes for a course
// @route   GET /api/quizzes/course/:courseId
// @access  Private
const getQuizzesByCourse = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Submit quiz
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body; // Array of indices or object { questionId: index }
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    let correct = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((q, idx) => {
      // Handle both array and object formats for answers
      const answerIndex = Array.isArray(answers) ? answers[idx] : answers[q._id];
      if (answerIndex === q.correct) {
        correct++;
      }
    });

    const score = (correct / totalQuestions) * 100;
    const passed = score >= 60;

    res.json({
      quizId: quiz._id,
      totalQuestions,
      correctAnswers: correct,
      score,
      passed,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private/Instructor
const createQuiz = async (req, res, next) => {
  try {
    const { courseId, title, questions } = req.body;

    const quiz = new Quiz({
        courseId,
        title,
        questions
    });

    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
  } catch (error) {
    next(error);
  }
}

export { getQuizzesByCourse, getQuizById, submitQuiz, createQuiz };
