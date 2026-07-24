import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="text-8xl font-bold gradient-text font-heading mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate(-1)} className="btn-outline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link to={ROUTES.HOME} className="btn-primary flex items-center justify-center gap-2">
            <Home size={16} /> Home Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
