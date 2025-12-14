import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCourses, mockAIResponse } from '../data/mockData';
import { 
  BookOpen, 
  User, 
  Sparkles, 
  FileText, 
  BookMarked,
  X,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === parseInt(id));
  const [showStudyMaterial, setShowStudyMaterial] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [studyMaterial, setStudyMaterial] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Course not found</p>
      </div>
    );
  }

  const handleGenerateStudyMaterial = () => {
    setStudyMaterial('');
    setShowStudyMaterial(true);
    // Simulate AI generation
    setTimeout(() => {
      setStudyMaterial(mockAIResponse(course.title, 'study'));
    }, 1500);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const quizQuestions = mockAIResponse(course.title, 'quiz');
  const flashcards = mockAIResponse(course.title, 'flashcards');

  const handleNextFlashcard = () => {
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setFlipped(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
      setFlipped(false);
    }
  };

  const getScore = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </button>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-full md:w-64 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {course.description}
              </p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{course.teacher}</span>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{course.modules.length} Modules</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.modules.map((module, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center font-semibold mr-3">
                  {index + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{module}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI-Powered Learning Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Study Material Generator */}
            <button
              onClick={handleGenerateStudyMaterial}
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-lg transition-all text-left group border border-blue-200 dark:border-blue-800 hover:scale-105"
            >
              <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Generate Study Material
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get AI-generated comprehensive study notes for this course
              </p>
            </button>

            {/* Quiz Generator */}
            <button
              onClick={handleStartQuiz}
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-lg transition-all text-left group border border-green-200 dark:border-green-800 hover:scale-105"
            >
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Start Quiz
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Test your knowledge with AI-generated multiple-choice questions
              </p>
            </button>

            {/* Flashcard Generator */}
            <button
              onClick={() => {
                setShowFlashcards(true);
                setCurrentFlashcard(0);
                setFlipped(false);
              }}
              className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:shadow-lg transition-all text-left group border border-purple-200 dark:border-purple-800 hover:scale-105"
            >
              <BookMarked className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Create Flashcards
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Study effectively with interactive AI-generated flashcards
              </p>
            </button>
          </div>
        </motion.div>

        {/* Study Material Modal */}
        <AnimatePresence>
          {showStudyMaterial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowStudyMaterial(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-700 dark:to-accent-700 text-white">
                  <h2 className="text-2xl font-bold">Study Material</h2>
                  <button
                    onClick={() => setShowStudyMaterial(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-900">
                  {studyMaterial ? (
                    <div className="prose max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {studyMaterial}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Generating study material with AI...</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Modal */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowQuiz(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 text-white">
                  <h2 className="text-2xl font-bold">AI-Generated Quiz</h2>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-900">
                  {quizQuestions.map((question, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          const isSelected = selectedAnswers[index] === optIndex;
                          const isCorrect = optIndex === question.correct;
                          const showAnswer = quizSubmitted;

                          return (
                            <button
                              key={optIndex}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setSelectedAnswers({ ...selectedAnswers, [index]: optIndex });
                                }
                              }}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                showAnswer && isCorrect
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                                  : showAnswer && isSelected && !isCorrect
                                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400'
                                  : isSelected
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-gray-700'
                              } ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'} text-gray-900 dark:text-gray-200`}
                            >
                              <div className="flex items-center">
                                {showAnswer && isCorrect && (
                                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" />
                                )}
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {quizSubmitted && (
                    <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Score: {getScore()} / {quizQuestions.length}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {((getScore() / quizQuestions.length) * 100).toFixed(0)}% Correct
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      className="btn-primary w-full"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="btn-primary w-full"
                    >
                      Close
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flashcards Modal */}
        <AnimatePresence>
          {showFlashcards && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowFlashcards(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white">
                  <h2 className="text-2xl font-bold">Flashcards</h2>
                  <button
                    onClick={() => setShowFlashcards(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <div className="relative w-full max-w-md h-64 perspective-1000 mb-6">
                    <motion.div
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full h-full preserve-3d"
                      onClick={() => setFlipped(!flipped)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`absolute inset-0 backface-hidden ${flipped ? 'hidden' : ''}`}>
                        <div className="card h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 border-2 border-primary-200 dark:border-primary-700">
                          <p className="text-xl font-semibold text-gray-900 dark:text-white text-center p-6">
                            {flashcards[currentFlashcard].front}
                          </p>
                        </div>
                      </div>
                      <div className={`absolute inset-0 backface-hidden rotate-y-180 ${!flipped ? 'hidden' : ''}`}>
                        <div className="card h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-200 dark:border-green-700">
                          <p className="text-lg text-gray-700 dark:text-gray-200 text-center p-6">
                            {flashcards[currentFlashcard].back}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Click the card to flip
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrevFlashcard}
                      disabled={currentFlashcard === 0}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600 dark:text-gray-300">
                      {currentFlashcard + 1} / {flashcards.length}
                    </span>
                    <button
                      onClick={handleNextFlashcard}
                      disabled={currentFlashcard === flashcards.length - 1}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;

