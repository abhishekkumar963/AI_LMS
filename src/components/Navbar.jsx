import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/ai-tools', label: 'AI Tools' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/50 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg blur opacity-50"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient dark:from-primary-400 dark:via-accent-400 dark:to-primary-400">
                EduNex
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">AI-Powered Learning</span>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbarIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

