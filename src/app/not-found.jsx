'use client';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Main 404 Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Animated 404 Number with Orange Accent */}
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
              className="text-8xl md:text-9xl font-black tracking-tighter"
            >
              <span className="text-gray-900 dark:text-white">4</span>
              <motion.span
                animate={{
                  color: ['#FF6B35', '#FF8C42', '#FF6B35'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mx-2"
              >
                0
              </motion.span>
              <span className="text-gray-900 dark:text-white">4</span>
            </motion.div>

            {/* Orange glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 to-orange-600/20 blur-3xl rounded-full -z-10"
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              The page you're looking for might have been moved, deleted, or
              doesn't exist.
            </p>
          </div>
        </motion.div>

        {/* Status Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
        >
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Error: 404 • Resource Not Found
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <button
            onClick={() => {
              router.back();
            }}
            className="group relative px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <Home className="w-5 h-5" />
              <span>Go Back Home</span>
            </div>
            <motion.div
              className="absolute inset-0 border-2 border-orange-500 rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="pt-12"
        >
          <div className="flex justify-center gap-4 opacity-50">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-orange-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Need help?{' '}
              <a
                href="/pages/contact"
                className="text-orange-500 hover:text-orange-600 underline transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gray-900/5 dark:bg-white/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
