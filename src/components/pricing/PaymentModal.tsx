import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldCheck, Lock, CreditCard, Sparkles, 
  CheckCircle2, ArrowRight, HeartPulse, Building, 
  HelpCircle, Tag, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getRoleDashboard } from '@/constants/routes';
import { AppleIcon, GoogleIcon } from '@/components/common/SocialIcons';
import { toast } from 'sonner';

export interface PlanDetails {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  targetAudience: string;
  features?: string[];
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanDetails | null;
  initialIsAnnual?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  plan,
  initialIsAnnual = true,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isAnnual, setIsAnnual] = useState(initialIsAnnual);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'hsa'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [nameOnCard, setNameOnCard] = useState(
    user ? `${user.firstName} ${user.lastName}` : ''
  );
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  // Calculate pricing
  const baseMonthlyPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const isFreePlan = plan.monthlyPrice === 0 && plan.annualPrice === 0;

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setExpiry(val);
  };

  // Format CVC
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(val);
  };

  // Promo Code Validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const clean = promoCode.trim().toUpperCase();
    if (['LONGEVITY2026', 'BIOHACK50', 'PRO10', 'WELCOME'].includes(clean)) {
      setPromoApplied(true);
      setPromoDiscount(20);
      toast.success(`Promo code "${clean}" applied! 20% discount unlocked.`);
    } else {
      toast.error('Invalid or expired promo code. Try "LONGEVITY2026".');
    }
  };

  // Submit Payment / Free Trial Activation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'card' && !isFreePlan) {
      if (cardNumber.replace(/\s/g, '').length < 15) {
        toast.error('Please enter a valid 16-digit card number.');
        return;
      }
      if (expiry.length < 5) {
        toast.error('Please enter a valid expiry date (MM/YY).');
        return;
      }
      if (cvc.length < 3) {
        toast.error('Please enter a valid 3 or 4-digit CVC.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment gateway tokenization
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsProcessing(false);
    setIsSuccess(true);
    toast.success(`🎉 Congratulations! Your ${plan.name} access is now active.`);
  };

  const handleGoToDashboard = () => {
    onClose();
    if (user) {
      navigate(getRoleDashboard(user.role));
    } else {
      navigate('/dashboard');
    }
  };

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 14);
  const formattedTrialEnd = trialEndDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/80 backdrop-blur-sm p-3 sm:p-6 flex min-h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header - Fixed Top */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 text-white p-4 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              14-Day Free Trial
            </span>
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
              Zero Upfront Charge
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold font-heading pr-8">
            {isSuccess ? 'Access Activated' : `Activate ${plan.name}`}
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-300 mt-1 max-w-md line-clamp-2">
            {isSuccess
              ? 'Your high-precision bio-telemetry telemetry engine is fully initialized.'
              : 'Start your full 14-day trial with instant access to AI health coaching, biomarker tracking, and wearable sync.'}
          </p>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4 sm:space-y-5">
          {isSuccess ? (
            /* Success Screen */
            <div className="py-4 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-inner">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
                Welcome to LifestyleBio {plan.name}!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto mb-5">
                Your 14-day complimentary trial is now active through{' '}
                <strong className="text-gray-900">{formattedTrialEnd}</strong>. You will not be billed during this period.
              </p>

              <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 sm:p-4 max-w-md mx-auto mb-6 text-left text-xs space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Account Holder</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[180px]">{user?.email || 'Current User'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Selected Plan</span>
                  <span className="font-semibold text-gray-900">{plan.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Billing Interval</span>
                  <span className="font-semibold text-gray-900">
                    {isAnnual ? 'Annual ($' + plan.annualPrice + '/mo)' : 'Monthly ($' + plan.monthlyPrice + '/mo)'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Amount Paid Today</span>
                  <span className="font-bold text-emerald-600">$0.00 (Free Trial)</span>
                </div>
                <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-2">
                  <span>Reference ID</span>
                  <span className="font-mono text-gray-500">LB-TR-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleGoToDashboard}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Launch Biometric Dashboard <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            /* Payment / Trial Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Plan Overview & Billing Switch */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900">{plan.name}</h4>
                      {plan.badge && (
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      Full access to AI health models & lab records
                    </p>
                  </div>

                  {!isFreePlan && (
                    <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-xl shadow-xs self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setIsAnnual(false)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                          !isAnnual ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Monthly (${plan.monthlyPrice})
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAnnual(true)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          isAnnual ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Annual (${plan.annualPrice})
                        <span className="text-[8px] sm:text-[9px] bg-white/20 px-1 py-0.2 rounded font-extrabold">
                          -20%
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Summary line */}
                <div className="mt-3 pt-2.5 border-t border-emerald-200/50 flex items-center justify-between text-xs">
                  <span className="text-gray-600">Due Today (14-Day Trial):</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gray-400 line-through text-[11px]">
                      ${baseMonthlyPrice}/mo
                    </span>
                    <span className="text-base sm:text-lg font-black text-emerald-700 font-heading">
                      $0.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              {!isFreePlan && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 sm:p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard size={16} className={paymentMethod === 'card' ? 'text-emerald-600' : 'text-gray-500'} />
                      <span className="text-[10px] sm:text-xs font-bold leading-tight">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-2 sm:p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'wallet'
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <AppleIcon size={12} />
                        <GoogleIcon size={12} />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold leading-tight">Digital Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('hsa')}
                      className={`p-2 sm:p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'hsa'
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <HeartPulse size={16} className={paymentMethod === 'hsa' ? 'text-emerald-600' : 'text-gray-500'} />
                      <span className="text-[10px] sm:text-xs font-bold leading-tight">HSA / FSA</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Credit / Debit Card & HSA Form */}
              {!isFreePlan && (paymentMethod === 'card' || paymentMethod === 'hsa') && (
                <div className="space-y-3 bg-gray-50/70 p-3.5 sm:p-4 rounded-2xl border border-gray-200/80">
                  {paymentMethod === 'hsa' && (
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-sky-800">
                      <ShieldCheck size={14} className="text-sky-600 shrink-0" />
                      <span>Eligible for IRS Section 213(d) Health Savings Account reimbursement.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      placeholder="Alex Morgan"
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4532 •••• •••• 8920"
                        maxLength={19}
                        required
                        className="w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <CreditCard size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        value={cvc}
                        onChange={handleCvcChange}
                        placeholder="CVC"
                        maxLength={4}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Wallet View */}
              {!isFreePlan && paymentMethod === 'wallet' && (
                <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 text-center space-y-2.5">
                  <p className="text-xs text-gray-600">
                    Click the button below to authorize with Touch ID / Face ID via your saved digital wallet.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black text-white rounded-xl text-xs font-semibold">
                      <AppleIcon size={13} /> Apple Pay
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 text-gray-800 rounded-xl text-xs font-semibold">
                      <GoogleIcon size={13} /> Google Pay
                    </div>
                  </div>
                </div>
              )}

              {/* Promo Code Input */}
              {!isFreePlan && (
                <div className="flex gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (e.g. LONGEVITY2026)"
                      disabled={promoApplied}
                      className="w-full pl-8 pr-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode.trim()}
                    className="px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition-colors cursor-pointer shrink-0"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              )}

              {/* Security Badges & Guarantees */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-gray-500 border-t border-gray-100 pt-3">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                  256-Bit SSL Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <Lock size={11} className="text-gray-400 shrink-0" />
                  Cancel anytime in Settings
                </span>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 sm:py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Trial Setup...</span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {isFreePlan
                          ? 'Activate Free Baseline Access'
                          : `Start 14-Day Free Trial ($0.00 Today)`}
                      </span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-1.5">
                  By starting your trial, you agree to the LifestyleBio{' '}
                  <a href="/terms-conditions" target="_blank" className="underline hover:text-gray-600">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" target="_blank" className="underline hover:text-gray-600">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
