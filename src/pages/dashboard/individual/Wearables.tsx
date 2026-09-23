import React, { useState, useEffect } from 'react';
import { Watch, ToggleLeft, ToggleRight, RefreshCw, CheckCircle2, AlertTriangle, Battery, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

interface WearableDevice {
  id: string;
  name: string;
  brand: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  battery: number;
  iconColor: string;
}

const WEARABLES_KEY = 'lifestylebio_member_wearables';

const DEFAULT_DEVICES: WearableDevice[] = [
  { id: '1', name: 'Apple Watch Series 9', brand: 'Apple Health', status: 'connected', lastSync: '10 mins ago', battery: 84, iconColor: 'bg-red-50 text-red-500' },
  { id: '2', name: 'Fitbit Charge 6', brand: 'Fitbit', status: 'disconnected', lastSync: 'Yesterday', battery: 0, iconColor: 'bg-teal-50 text-teal-500' },
  { id: '3', name: 'Garmin Forerunner 965', brand: 'Garmin Connect', status: 'connected', lastSync: '30 mins ago', battery: 92, iconColor: 'bg-sky-50 text-sky-500' },
  { id: '4', name: 'Oura Ring Gen 3', brand: 'Oura Ring', status: 'disconnected', lastSync: '3 days ago', battery: 0, iconColor: 'bg-indigo-50 text-indigo-500' },
];

const Wearables: React.FC = () => {
  const [devices, setDevices] = useState<WearableDevice[]>(() => {
    try {
      const saved = localStorage.getItem(WEARABLES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_DEVICES;
    } catch {
      return DEFAULT_DEVICES;
    }
  });

  useEffect(() => {
    localStorage.setItem(WEARABLES_KEY, JSON.stringify(devices));
  }, [devices]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', brand: 'Apple Health', battery: '95' });
  const [editingDevice, setEditingDevice] = useState<WearableDevice | null>(null);
  const [deletingDevice, setDeletingDevice] = useState<WearableDevice | null>(null);

  const toggleConnection = (id: string) => {
    setDevices(prev => prev.map(dev => {
      if (dev.id === id) {
        const isConnecting = dev.status === 'disconnected';
        if (isConnecting) {
          toast.success(`Connected to ${dev.name}!`);
          return { ...dev, status: 'connected', lastSync: 'Just now', battery: dev.battery || 100 };
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
    }, 1000);
  };

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice.name.trim()) {
      toast.error('Please enter a device name.');
      return;
    }
    const created: WearableDevice = {
      id: `dev_${Date.now()}`,
      name: newDevice.name.trim(),
      brand: newDevice.brand,
      status: 'connected',
      lastSync: 'Just now',
      battery: Math.min(100, Math.max(0, Number(newDevice.battery) || 95)),
      iconColor: 'bg-emerald-50 text-emerald-600',
    };
    setDevices(prev => [created, ...prev]);
    setNewDevice({ name: '', brand: 'Apple Health', battery: '95' });
    setIsAddOpen(false);
    toast.success(`Paired ${created.name} successfully!`);
  };

  const handleUpdateDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDevice || !editingDevice.name.trim()) return;
    setDevices(prev => prev.map(d => (d.id === editingDevice.id ? editingDevice : d)));
    toast.success(`Updated ${editingDevice.name}.`);
    setEditingDevice(null);
  };

  const handleDeleteDevice = () => {
    if (!deletingDevice) return;
    setDevices(prev => prev.filter(d => d.id !== deletingDevice.id));
    toast.success(`Removed ${deletingDevice.name}.`);
    setDeletingDevice(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Wearables & Devices</h1>
          <p className="text-gray-500 text-sm mt-1">Connect your smart wearable devices to automatically import fitness logs, sleep records, and vital signs.</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="btn-primary flex items-center gap-2 text-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Pair New Device
        </button>
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

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingDevice(device)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                  title="Edit Device"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => setDeletingDevice(device)}
                  className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove Device"
                >
                  <Trash2 size={15} />
                </button>
                <button onClick={() => toggleConnection(device.id)} className="text-gray-400 hover:text-emerald-500 transition-colors ml-1">
                  {device.status !== 'disconnected' ? (
                    <ToggleRight size={32} className="text-emerald-500" />
                  ) : (
                    <ToggleLeft size={32} />
                  )}
                </button>
              </div>
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

      {/* Pair New Device Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Pair New Wearable Device"
        size="md"
      >
        <form onSubmit={handleAddDevice} className="space-y-4">
          <div>
            <label className="label">Device Model / Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Whoop 4.0 Band"
              value={newDevice.name}
              onChange={e => setNewDevice({ ...newDevice, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Integration Ecosystem</label>
              <select
                value={newDevice.brand}
                onChange={e => setNewDevice({ ...newDevice, brand: e.target.value })}
                className="input-field"
              >
                <option value="Apple Health">Apple Health</option>
                <option value="Garmin Connect">Garmin Connect</option>
                <option value="Fitbit">Fitbit</option>
                <option value="Oura Ring">Oura Ring</option>
                <option value="Whoop">Whoop</option>
                <option value="Withings">Withings</option>
              </select>
            </div>
            <div>
              <label className="label">Battery Level (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newDevice.battery}
                onChange={e => setNewDevice({ ...newDevice, battery: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsAddOpen(false)} className="btn-outline text-sm">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm">
              Connect & Pair
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Device Modal */}
      <Modal
        isOpen={!!editingDevice}
        onClose={() => setEditingDevice(null)}
        title="Edit Wearable Device"
        size="md"
      >
        {editingDevice && (
          <form onSubmit={handleUpdateDevice} className="space-y-4">
            <div>
              <label className="label">Device Name *</label>
              <input
                type="text"
                required
                value={editingDevice.name}
                onChange={e => setEditingDevice({ ...editingDevice, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Brand / Ecosystem</label>
                <input
                  type="text"
                  value={editingDevice.brand}
                  onChange={e => setEditingDevice({ ...editingDevice, brand: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Battery Level (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingDevice.battery}
                  onChange={e => setEditingDevice({ ...editingDevice, battery: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditingDevice(null)} className="btn-outline text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Remove Device Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingDevice}
        onClose={() => setDeletingDevice(null)}
        onConfirm={handleDeleteDevice}
        title="Remove Wearable Device"
        message={`Are you sure you want to unpair and remove "${deletingDevice?.name}"?`}
        confirmText="Remove Device"
        variant="danger"
      />
    </div>
  );
};

export default Wearables;
