import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, CheckCheck, Trash2, X, Activity, 
  Bot, Watch, CheckCircle2, FileText, AlertTriangle, 
  ExternalLink 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'critical' | 'ai' | 'device' | 'success' | 'lab';
  category: 'all' | 'biomarkers' | 'ai' | 'devices';
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Critical Biomarker Notice',
    message: 'ApoB particle count elevated to 112 mg/dL. Dr. Chen flagged for clinical review.',
    time: '12m ago',
    read: false,
    type: 'critical',
    category: 'biomarkers',
    link: '/dashboard/medical-records',
  },
  {
    id: 'n-2',
    title: 'AI Health Coach Insight',
    message: 'Nocturnal HRV RMSSD dipped by 14ms. Adapted daily exertion to Zone 2 recovery protocol.',
    time: '45m ago',
    read: false,
    type: 'ai',
    category: 'ai',
    link: '/dashboard/ai-coach',
  },
  {
    id: 'n-3',
    title: 'Oura Ring Sync Complete',
    message: 'Telemetry synced: Sleep Score 89 (Deep Sleep 1h 48m, REM 2h 10m).',
    time: '2h ago',
    read: false,
    type: 'device',
    category: 'devices',
    link: '/dashboard/wearables',
  },
  {
    id: 'n-4',
    title: 'Nutrition Goal Met',
    message: 'Protein target (140g) achieved with optimal glycemic index balance for 5 straight days.',
    time: '5h ago',
    read: true,
    type: 'success',
    category: 'biomarkers',
    link: '/dashboard/nutrition',
  },
  {
    id: 'n-5',
    title: 'Lab Report OCR Parsed',
    message: 'Quest Diagnostics Comprehensive Metabolic Panel OCR data digitized successfully.',
    time: '1d ago',
    read: true,
    type: 'lab',
    category: 'biomarkers',
    link: '/dashboard/medical-records',
  },
];

const NOTIF_STORAGE_KEY = 'lifestylebio_dashboard_notifications';

const NotificationDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'biomarkers' | 'ai' | 'devices'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read.');
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info('Notification dismissed.');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.info('All notifications cleared.');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);
    setOpen(false);
    if (item.link) {
      navigate(item.link);
    }
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle size={15} className="text-red-500" />;
      case 'ai':
        return <Bot size={15} className="text-indigo-500" />;
      case 'device':
        return <Watch size={15} className="text-sky-500" />;
      case 'success':
        return <CheckCircle2 size={15} className="text-emerald-500" />;
      case 'lab':
        return <FileText size={15} className="text-amber-500" />;
      default:
        return <Activity size={15} className="text-gray-500" />;
    }
  };

  const getBadgeStyle = (type: NotificationItem['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'ai':
        return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'device':
        return 'bg-sky-50 border-sky-200 text-sky-700';
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'lab':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="View notifications"
        className={`relative p-2 rounded-xl transition-all cursor-pointer ${
          open ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            <span className="sr-only">{unreadCount} unread notifications</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 sm:right-0 -right-12 top-full mt-2.5 w-[340px] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-4 pb-3 bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={17} className="text-emerald-400" />
                <h3 className="font-bold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    title="Mark all as read"
                    className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck size={14} />
                    <span className="hidden sm:inline text-[11px]">Mark read</span>
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    title="Clear all"
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-100 overflow-x-auto text-[11px]">
              {(['all', 'biomarkers', 'ai', 'devices'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-lg font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === tab
                      ? 'bg-white text-gray-900 shadow-xs border border-gray-200'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab === 'all' ? 'All Alerts' : tab === 'ai' ? 'AI Coach' : tab}
                </button>
              ))}
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto flex-1 divide-y divide-gray-50 max-h-[380px]">
              {filtered.length === 0 ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-300">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">All caught up!</p>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    You have no unread telemetry alerts or system notifications.
                  </p>
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3.5 sm:p-4 hover:bg-gray-50/80 transition-colors cursor-pointer relative group flex items-start gap-3 ${
                      !item.read ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    {/* Icon Badge */}
                    <div
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border mt-0.5 ${getBadgeStyle(
                        item.type
                      )}`}
                    >
                      {getIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4
                          className={`text-xs font-bold truncate ${
                            !item.read ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {item.title}
                        </h4>
                        {!item.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-1.5">
                        {item.message}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span>{item.time}</span>
                        {item.link && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold group-hover:underline">
                            View details <ExternalLink size={10} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dismiss Button */}
                    <button
                      onClick={(e) => deleteNotification(item.id, e)}
                      title="Dismiss"
                      className="absolute top-3.5 right-3 p-1 rounded-md text-gray-300 hover:text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Bar */}
            <div className="p-2.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="text-gray-400 font-medium">
                Biometric Telemetry Dispatch
              </span>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/dashboard/settings');
                }}
                className="text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
              >
                Notification Preferences &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
