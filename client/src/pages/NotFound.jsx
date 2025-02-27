import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4"
        >
        <div className="text-center max-w-md mx-auto">
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ 
                    y: { 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2
                    } 
                }}
            >
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">페이지를 찾을 수 없습니다</h2>
            <p className="mt-3 text-gray-600">
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                    홈으로 돌아가기
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:shadow hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                    이전 페이지로
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-16"
            >
                <div className="flex justify-center">
                    <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    문제가 지속되면 관리자에게 문의하세요
                </p>
            </motion.div>
        </div>
        </motion.div>
    );
};

export default NotFound;