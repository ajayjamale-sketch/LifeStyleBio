import React, { useState } from 'react';
import { Watch, ToggleLeft, ToggleRight, RefreshCw, CheckCircle2, AlertTriangle, Battery } from 'lucide-react';
import { toast } from 'sonner';

interface WearableDevice {
  id: string;
  name: string;
  brand: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  battery: number;
  iconColor: string;
}

const Wearables: React.FC = () => {
  const [devices, setDevices] = useState<WearableDevice[]>([
    { id: '1', name: 'Apple Watch Series 9', brand: 'Apple Health', status: 'connected', lastSync: '10 mins ago', battery: 84, iconColor: 'bg-red-50 text-red-500' },
    { id: '2', name: 'Fitbit Charge 6', brand: 'Fitbit', status: 'disconnected', lastSync: 'Yesterday', battery: 0, iconColor: 'bg-teal-50 text-teal-500' },
    { id: '3', name: 'Garmin Forerunner 965', brand: 'Garmin Connect', status: 'connected', lastSync: '30 mins ago', battery: 92, iconColor: 'bg-sky-50 text-sky-500' },
    { id: '4', name: 'Oura Ring Gen 3', brand: 'Oura Ring', status: 'disconnected', lastSync: '3 days ago', battery: 0, iconColor: 'bg-indigo-50 text-indigo-500' },
  ]);

  const toggleConnection = (id: string) => {
    setDevices(prev => prev.map(dev => {
      if (dev.id === id) {
        const isConnecting = dev.status === 'disconnected';
        if (isConnecting) {
          toast.success(`Connected to ${dev.name}!`);
          return { ...dev, status: 'connected', lastSync: 'Just now', battery: 100 };
        } else {
          toast.success(`Disconnected ${dev.name}.`);
          return { ...dev, status: 'disconnected', lastSync: 'Never', battery: 0 };
        }
      }
      return dev;
    }));
  };

  const syncDevice = (id: string) => {
    setDevices(prev => prev.map(dev => {
      if (dev.id === id) {
        toast.info(`Syncing data from ${dev.name}...`);
        return { ...dev, status: 'syncing' };
      }
      return dev;
    }));

    setTimeout(() => {
      setDevices(prev => prev.map(dev => {
        if (dev.id === id) {
          toast.success(`${dev.name} successfully synced!`);
          return { ...dev, status: 'connected', lastSync: 'Just now' };
        }
        return dev;
      }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Wearables & Devices</h1>
        <p className="text-gray-500 text-sm mt-1">Connect your smart wearable devices to automatically import fitness logs, sleep records, and vital signs.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {devices.map(device => (
          <div key={device.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex justify-between items-start mb-5">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.iconColor}`}>
                  <Watch size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-snug">{device.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{device.brand}</p>
                </div>
              </div>

              <button onClick={() => toggleConnection(device.id)} className="text-gray-400 hover:text-emerald-500 transition-colors">
                {device.status !== 'disconnected' ? (
                  <ToggleRight size={32} className="text-emerald-500" />
                ) : (
                  <ToggleLeft size={32} />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  Status:
                  {device.status === 'connected' && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold ml-1">
                      <CheckCircle2 size={12} /> Connected
                    </span>
                  )}
                  {device.status === 'disconnected' && (
                    <span className="inline-flex items-center gap-1 text-gray-400 font-semibold ml-1">
                      <AlertTriangle size={12} /> Disconnected
                    </span>
                  )}
                  {device.status === 'syncing' && (
                    <span className="inline-flex items-center gap-1 text-sky-500 font-semibold ml-1 animate-pulse">
                      <RefreshCw size={12} className="animate-spin" /> Syncing
                    </span>
                  )}
                </span>

                {device.status !== 'disconnected' && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Battery size={14} className={device.battery < 20 ? 'text-red-500' : 'text-emerald-500'} />
                    {device.battery}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Last Sync: {device.lastSync}</span>
                {device.status === 'connected' && (
                  <button
                    onClick={() => syncDevice(device.id)}
                    className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-emerald-600 transition-colors"
                    title="Sync Now"
                  >
                    <RefreshCw size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wearables;
