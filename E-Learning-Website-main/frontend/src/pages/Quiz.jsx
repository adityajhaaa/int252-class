/**
 * Quiz Page
 * Quiz interface with MCQ-based questions
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizzes, submitQuiz } from '../services/quizService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

export default function QuizPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadQuizzes();
  }, [courseId]);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const data = await fetchQuizzes(courseId);
      setQuizzes(data);
      if (data.length > 0) {
        setSelectedQuiz(data[0]);
        // Initialize answers
        const initialAnswers = {};
        data[0].questions.forEach((q) => {
          initialAnswers[q._id] = null;
        });
        setAnswers(initialAnswers);
      }
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (Object.values(answers).includes(null)) {
      alert('Please answer all questions before submitting');
      return;
    }

    try {
      const answerArray = selectedQuiz.questions.map((q) => answers[q._id]);
      const quizResult = await submitQuiz(selectedQuiz._id, answerArray);
      setResult(quizResult);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      alert('Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">
              No quizzes available for this course yet.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/student-dashboard')}
            >
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <div className="text-center">
              <div
                className={`text-6xl mb-4 ${
                  result.passed ? '✅' : '❌'
                }`}
              />

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {result.passed ? 'Congratulations!' : 'Good Effort!'}
              </h1>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {result.score.toFixed(1)}%
                </div>

                <p className="text-gray-600 mb-4">
                  You answered {result.correctAnswers} out of{' '}
                  {result.totalQuestions} questions correctly.
                </p>

                <p className={`text-lg font-semibold ${
                  result.passed ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {result.passed ? 'Quiz Passed! 🎉' : 'Keep Practicing!'}
                </p>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Performance Feedback:</h3>
                  <p className="text-sm text-gray-600">
                    {result.score >= 90 ? '🌟 Excellent! You have mastered this topic.' :
                     result.score >= 70 ? '👍 Good work! Review the incorrect answers to improve.' :
                     result.score >= 50 ? '📚 Keep studying! Focus on areas where you struggled.' :
                     '💪 Don\'t give up! Review the lessons and try again.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                >
                  Retake Quiz
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate('/student-dashboard')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Quiz Header */}
        <Card className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedQuiz.title}
              </h1>
              <p className="text-gray-600 mt-2">
                {selectedQuiz.questions.length} Questions
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(answers).filter((a) => a !== null).length} /{' '}
                {selectedQuiz.questions.length}
              </div>
              <p className="text-gray-600">Answered</p>
            </div>
          </div>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {selectedQuiz.questions.map((question, qIdx) => (
            <Card key={question._id}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 text-sm">
                    {qIdx + 1}
                  </span>
                  {question.text}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, oIdx) => (
                    <label key={oIdx} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{
                        borderColor: answers[question._id] === oIdx ? '#3b82f6' : '#e5e7eb',
                        backgroundColor: answers[question._id] === oIdx ? '#eff6ff' : 'white',
                      }}>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        checked={answers[question._id] === oIdx}
                        onChange={() =>
                          handleAnswerChange(question._id, oIdx)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4">
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>

          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/student-dashboard')}
          >
            Save & Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
