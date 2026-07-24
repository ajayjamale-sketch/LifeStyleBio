import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const generateCaptcha = useCallback(() => {
    const n1 = Math.floor(Math.random() * 12) + 1;
    const n2 = Math.floor(Math.random() * 12) + 1;
    setNum1(n1);
    setNum2(n2);
    setAnswer('');
    setError('');
    setVerified(false);
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleVerify = () => {
    const correct = num1 + num2;
    if (parseInt(answer) === correct) {
      setVerified(true);
      setError('');
      onVerify(true);
    } else {
      setAttempts(prev => prev + 1);
      setError(`Incorrect. Please try again.`);
      setAnswer('');
      if (attempts >= 2) generateCaptcha();
      onVerify(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleVerify();
  };

  if (verified) {
    return (
      <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
        <CheckCircle className="text-emerald-500" size={18} />
        <span className="text-emerald-700 text-sm font-medium">Security check passed</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Security Verification</p>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-white border border-gray-200 rounded-lg px-4 py-2 font-mono text-base font-bold text-gray-800 select-none shadow-sm">
          {num1} + {num2} = ?
        </div>
        <input
          type="number"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Answer"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-w-0"
          min="0"
          max="99"
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={!answer}
          className="flex-shrink-0 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Verify
        </button>
        <button
          type="button"
          onClick={generateCaptcha}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          title="Refresh"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2 flex items-center gap-1">{error}</p>}
    </div>
  );
};

export default Captcha;
