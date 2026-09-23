import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Eye, Heart, Trash2, Search, Phone, Droplet, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export interface FamilyMemberProfile {
  id: string;
  name: string;
  relation: string;
  age: number;
  healthScore: number;
  lastChecked: string;
  conditions: string[];
  bloodGroup?: string;
  emergencyPhone?: string;
  notes?: string;
  avatar: string;
}

export const FAMILY_PROFILES_KEY = 'lifestylebio_family_profiles';

export const DEFAULT_FAMILY_PROFILES: FamilyMemberProfile[] = [
  {
    id: 'fam_1',
    name: 'Mom (Eleanor)',
    relation: 'Mother',
    age: 58,
    healthScore: 74,
    lastChecked: 'Today, 9:15 AM',
    conditions: ['Hypertension'],
    bloodGroup: 'O+',
    emergencyPhone: '+1 (555) 234-5678',
    notes: 'Blood pressure slightly elevated this week. Monitoring daily sodium intake.',
    avatar: 'photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'fam_2',
    name: 'Dad (Arthur)',
    relation: 'Father',
    age: 62,
    healthScore: 81,
    lastChecked: 'Yesterday',
    conditions: ['Type 2 Diabetes'],
    bloodGroup: 'A+',
    emergencyPhone: '+1 (555) 234-5679',
    notes: 'Fasting glucose improved to 118 mg/dL. Evening walk routine going well.',
    avatar: 'photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'fam_3',
    name: 'Emma',
    relation: 'Sister',
    age: 28,
    healthScore: 92,
    lastChecked: 'Today, 8:00 AM',
    conditions: [],
    bloodGroup: 'O+',
    emergencyPhone: '+1 (555) 876-5432',
    notes: 'Completed 7-day 12k steps streak. All biomarkers optimal.',
    avatar: 'photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
];

const AVATAR_OPTIONS = [
  'photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
  'photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  'photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  'photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
];

const SharedProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<FamilyMemberProfile[]>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_PROFILES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_PROFILES;
    } catch {
      return DEFAULT_FAMILY_PROFILES;
    }
  });

  useEffect(() => {
    localStorage.setItem(FAMILY_PROFILES_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<FamilyMemberProfile | null>(null);
  const [editingProfile, setEditingProfile] = useState<FamilyMemberProfile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<FamilyMemberProfile | null>(null);

  const [newMember, setNewMember] = useState({
    name: '',
    relation: 'Spouse',
    age: '35',
    healthScore: '85',
    conditionsInput: '',
    bloodGroup: 'O+',
    emergencyPhone: '',
    notes: '',
  });

  const [editConditionsInput, setEditConditionsInput] = useState('');

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.relation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.conditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name.trim()) {
      toast.error('Please enter the family member name.');
      return;
    }
    const conditions = newMember.conditionsInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const created: FamilyMemberProfile = {
      id: `fam_${Date.now()}`,
      name: newMember.name.trim(),
      relation: newMember.relation,
      age: Math.max(1, Number(newMember.age) || 30),
      healthScore: Math.min(100, Math.max(1, Number(newMember.healthScore) || 85)),
      lastChecked: 'Just now',
      conditions,
      bloodGroup: newMember.bloodGroup || 'O+',
      emergencyPhone: newMember.emergencyPhone || '+1 (555) 000-0000',
      notes: newMember.notes.trim() || 'All vitals within normal range.',
      avatar: AVATAR_OPTIONS[profiles.length % AVATAR_OPTIONS.length],
    };

    setProfiles(prev => [...prev, created]);
    setNewMember({
      name: '',
      relation: 'Spouse',
      age: '35',
      healthScore: '85',
      conditionsInput: '',
      bloodGroup: 'O+',
      emergencyPhone: '',
      notes: '',
    });
    setIsAddOpen(false);
    toast.success(`${created.name} added to your Family Circle!`);
  };

  const openEditModal = (profile: FamilyMemberProfile) => {
    setEditingProfile({ ...profile });
    setEditConditionsInput(profile.conditions.join(', '));
  };

  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile || !editingProfile.name.trim()) return;
    const updatedConditions = editConditionsInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const updated: FamilyMemberProfile = {
      ...editingProfile,
      conditions: updatedConditions,
      healthScore: Math.min(100, Math.max(1, Number(editingProfile.healthScore) || 80)),
      age: Math.max(1, Number(editingProfile.age) || 30),
    };

    setProfiles(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (viewingProfile?.id === updated.id) {
      setViewingProfile(updated);
    }
    setEditingProfile(null);
    toast.success(`Updated ${updated.name}'s profile.`);
  };

  const handleCheckIn = (profile: FamilyMemberProfile) => {
    const newScore = Math.min(100, profile.healthScore + 1);
    const updated = {
      ...profile,
      lastChecked: 'Just now',
      healthScore: newScore,
    };
    setProfiles(prev => prev.map(p => (p.id === profile.id ? updated : p)));
    if (viewingProfile?.id === profile.id) {
      setViewingProfile(updated);
    }
    toast.success(`Checked in with ${profile.name}! Vitals synced.`);
  };

  const handleDeleteMember = () => {
    if (!deletingProfile) return;
    setProfiles(prev => prev.filter(p => p.id !== deletingProfile.id));
    if (viewingProfile?.id === deletingProfile.id) {
      setViewingProfile(null);
    }
    toast.success(`Removed ${deletingProfile.name} from shared profiles.`);
    setDeletingProfile(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Family Profiles</h2>
          <p className="text-gray-500 text-sm">{profiles.length} family members connected and monitored</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search family..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} /> Invite Member
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProfiles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={p.avatar.startsWith('http') ? p.avatar : `https://images.unsplash.com/${p.avatar}`}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.relation} · {p.age} years</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Edit Member"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeletingProfile(p)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Member"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Health Score</span>
                <span className={`text-xl font-bold ${p.healthScore >= 85 ? 'text-emerald-600' : p.healthScore >= 75 ? 'text-sky-600' : 'text-orange-500'}`}>
                  {p.healthScore}/100
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${p.healthScore >= 85 ? 'bg-emerald-500' : p.healthScore >= 75 ? 'bg-sky-400' : 'bg-orange-400'}`}
                  style={{ width: `${p.healthScore}%` }}
                />
              </div>

              {p.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.conditions.map(c => (
                    <span key={c} className="text-xs px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 mb-3 font-medium">
                  <ShieldCheck size={14} /> No active chronic conditions
                </div>
              )}

              {p.notes && (
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.notes}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3 pt-2 border-t border-gray-50">
                <span>Last checked: {p.lastChecked}</span>
                {p.bloodGroup && <span className="font-semibold text-gray-600">Blood: {p.bloodGroup}</span>}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewingProfile(p)}
                  className="flex-1 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 font-medium"
                >
                  <Eye size={14} /> View Details
                </button>
                <button
                  onClick={() => handleCheckIn(p)}
                  className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 font-medium"
                >
                  <Heart size={14} /> Check In
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredProfiles.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400">
            No family members match your search.
          </div>
        )}
      </div>

      {/* Add / Invite Family Member Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add / Invite Family Member"
        size="md"
      >
        <form onSubmit={handleAddMember} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name / Nickname *</label>
              <input
                type="text"
                required
                placeholder="e.g. Grandpa Joe"
                value={newMember.name}
                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Relationship</label>
              <select
                value={newMember.relation}
                onChange={e => setNewMember({ ...newMember, relation: e.target.value })}
                className="input-field"
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Spouse">Spouse / Partner</option>
                <option value="Child">Child</option>
                <option value="Sister">Sister</option>
                <option value="Brother">Brother</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Other">Other Relative</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Age *</label>
              <input
                type="number"
                min="1"
                max="120"
                required
                value={newMember.age}
                onChange={e => setNewMember({ ...newMember, age: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Health Score (1-100)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={newMember.healthScore}
                onChange={e => setNewMember({ ...newMember, healthScore: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Blood Group</label>
              <select
                value={newMember.bloodGroup}
                onChange={e => setNewMember({ ...newMember, bloodGroup: e.target.value })}
                className="input-field"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Conditions (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. Hypertension, Asthma"
                value={newMember.conditionsInput}
                onChange={e => setNewMember({ ...newMember, conditionsInput: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Emergency Contact Phone</label>
              <input
                type="text"
                placeholder="+1 (555) 123-4567"
                value={newMember.emergencyPhone}
                onChange={e => setNewMember({ ...newMember, emergencyPhone: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label">Health Summary / Care Notes</label>
            <textarea
              rows={2}
              placeholder="Recent vitals, medications, or care notes..."
              value={newMember.notes}
              onChange={e => setNewMember({ ...newMember, notes: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsAddOpen(false)} className="btn-outline text-sm">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm">
              Add Family Member
            </button>
          </div>
        </form>
      </Modal>

      {/* View Member Details Modal */}
      <Modal
        isOpen={!!viewingProfile}
        onClose={() => setViewingProfile(null)}
        title={viewingProfile ? `${viewingProfile.name}'s Health Profile` : 'Member Details'}
        size="md"
      >
        {viewingProfile && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <img
                src={viewingProfile.avatar.startsWith('http') ? viewingProfile.avatar : `https://images.unsplash.com/${viewingProfile.avatar}`}
                alt={viewingProfile.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900">{viewingProfile.name}</h4>
                <p className="text-xs text-gray-500">{viewingProfile.relation} · {viewingProfile.age} years old</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Droplet size={12} className="text-red-500" /> {viewingProfile.bloodGroup || 'O+'}</span>
                  <span className="flex items-center gap-1"><Phone size={12} className="text-emerald-600" /> {viewingProfile.emergencyPhone || 'Not set'}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">{viewingProfile.healthScore}</div>
                <span className="text-[11px] text-gray-400">Health Score</span>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Monitored Conditions</h5>
              {viewingProfile.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {viewingProfile.conditions.map(c => (
                    <span key={c} className="text-xs px-3 py-1 bg-orange-50 text-orange-700 rounded-full font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-600 font-medium">No active medical conditions reported.</p>
              )}
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Care Notes & Latest Status</h5>
              <p className="text-sm text-gray-700 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                {viewingProfile.notes || 'All vitals normal.'}
              </p>
              <p className="text-xs text-gray-400 mt-2">Last Checked In: {viewingProfile.lastChecked}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  const target = viewingProfile;
                  setViewingProfile(null);
                  openEditModal(target);
                }}
                className="btn-outline text-sm flex items-center gap-1.5"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
              <button
                type="button"
                onClick={() => handleCheckIn(viewingProfile)}
                className="btn-primary text-sm flex items-center gap-1.5"
              >
                <Heart size={14} /> Log Check-In Now
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Family Member Modal */}
      <Modal
        isOpen={!!editingProfile}
        onClose={() => setEditingProfile(null)}
        title="Edit Family Member Profile"
        size="md"
      >
        {editingProfile && (
          <form onSubmit={handleUpdateMember} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Name *</label>
                <input
                  type="text"
                  required
                  value={editingProfile.name}
                  onChange={e => setEditingProfile({ ...editingProfile, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Relationship</label>
                <input
                  type="text"
                  value={editingProfile.relation}
                  onChange={e => setEditingProfile({ ...editingProfile, relation: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Age</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={editingProfile.age}
                  onChange={e => setEditingProfile({ ...editingProfile, age: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Health Score (1-100)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingProfile.healthScore}
                  onChange={e => setEditingProfile({ ...editingProfile, healthScore: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Blood Group</label>
                <input
                  type="text"
                  value={editingProfile.bloodGroup || 'O+'}
                  onChange={e => setEditingProfile({ ...editingProfile, bloodGroup: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="label">Conditions (comma-separated)</label>
              <input
                type="text"
                value={editConditionsInput}
                onChange={e => setEditConditionsInput(e.target.value)}
                placeholder="e.g. Hypertension, Type 2 Diabetes"
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Emergency Phone</label>
              <input
                type="text"
                value={editingProfile.emergencyPhone || ''}
                onChange={e => setEditingProfile({ ...editingProfile, emergencyPhone: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Care Notes</label>
              <textarea
                rows={2}
                value={editingProfile.notes || ''}
                onChange={e => setEditingProfile({ ...editingProfile, notes: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditingProfile(null)} className="btn-outline text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingProfile}
        onClose={() => setDeletingProfile(null)}
        onConfirm={handleDeleteMember}
        title="Remove Family Member"
        message={`Are you sure you want to remove "${deletingProfile?.name}" from your shared family profiles?`}
        confirmText="Remove Member"
        variant="danger"
      />
    </div>
  );
};

export default SharedProfiles;
