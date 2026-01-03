import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true }, // Index of correct option
});

const quizSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
