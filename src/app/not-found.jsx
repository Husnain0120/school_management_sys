'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-30 dark:bg-black text-white text-center space-y-8">
      {/* --- 404 Number --- */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="text-7xl sm:text-9xl font-extrabold relative text-black dark:text-white "
      >
        4
        {/* <span
          className='relative mx-1 inline-block w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white animate-pingSlow'
          style={{
            boxShadow:
              '0 0 15px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)',
          }}
        ></span> */}
        <span>0</span>4{/* Glow behind text */}
        <span className="absolute inset-0 blur-3xl bg-white/10 opacity-60 animate-pulse"></span>
      </motion.h1>

      {/* --- Message --- */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg sm:text-xl text-gray-500 max-w-md px-4 dark:text-gray-300"
      >
        Oops... The page you’re looking for doesn’t exist.
      </motion.p>

      {/* --- Back Button --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link
          href="/"
          className="relative px-6 py-3 text-white font-medium border border-white/40 rounded-full hover:bg-black/80 dark:text-black dark:hover:bg-white/90  transition-all  bg-black dark:bg-white duration-300"
        >
          Go Back Home
          <span className="absolute inset-0 blur-xl bg-white/10 opacity-30 animate-pulse rounded-full"></span>
        </Link>
      </motion.div>
    </div>
  );
}
