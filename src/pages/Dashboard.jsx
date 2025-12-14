import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockCourses } from '../data/mockData';
import { User, BookOpen, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const userCourses = mockCourses.slice(0, 3); // Show first 3 courses as enrolled

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="card bg-gradient-to-r from-primary-600 via-accent-600 to-primary-500 dark:from-primary-700 dark:via-accent-700 dark:to-primary-600 text-white border-0 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome to EduNex!</h1>
                <p className="text-white/90">
                  Continue your learning journey with AI-powered tools
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Link to="/courses">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Browse Courses
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Explore all available courses
                </p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            </motion.div>
          </Link>

          <Link to="/ai-tools">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  AI Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Generate study materials and quizzes
                </p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* My Courses Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="card mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
            <Link to="/courses" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
              View All
            </Link>
          </div>

          <div className="space-y-6">
            {userCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {course.description}
                    </p>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-500 dark:to-accent-500 h-2.5 rounded-full"
                        />
                      </div>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <button className="btn-primary text-sm">
                        Continue Learning
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3</h3>
            <p className="text-gray-600 dark:text-gray-300">Enrolled Courses</p>
          </div>

          <div className="card text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">48%</h3>
            <p className="text-gray-600 dark:text-gray-300">Average Progress</p>
          </div>

          <div className="card text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">12</h3>
            <p className="text-gray-600 dark:text-gray-300">AI Tools Used</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

