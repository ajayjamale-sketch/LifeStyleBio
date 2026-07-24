import React, { useState } from 'react';
import { FileText, UploadCloud, Search, Trash2, Download, Plus, Calendar, Tag, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface MedicalRecordItem {
  id: string;
  title: string;
  category: 'Lab Report' | 'Prescription' | 'Vaccine Card' | 'Other';
  date: string;
  provider: string;
  fileName: string;
  fileSize: string;
}

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecordItem[]>([
    { id: 'rec_1', title: 'Annual Blood Panel Results', category: 'Lab Report', date: '2026-06-15', provider: 'Quest Diagnostics', fileName: 'blood_report_2026.pdf', fileSize: '2.4 MB' },
    { id: 'rec_2', title: 'Allergy Medication Prescription', category: 'Prescription', date: '2026-05-10', provider: 'Dr. Sarah Taylor', fileName: 'rx_allergy_may26.pdf', fileSize: '850 KB' },
    { id: 'rec_3', title: 'Covid-19 Booster Card', category: 'Vaccine Card', date: '2025-11-20', provider: 'Walgreens Pharmacy', fileName: 'vaccine_booster.jpg', fileSize: '1.2 MB' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', category: 'Lab Report' as const, provider: '', fileName: '' });

  const filteredRecords = records.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || rec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setRecords(prev => prev.filter(rec => rec.id !== id));
    toast.success('Medical record removed successfully.');
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.title || !newRecord.provider || !newRecord.fileName) {
      toast.error('Please fill in all details and select a file.');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      const addedRecord: MedicalRecordItem = {
        id: `rec_${Date.now()}`,
        title: newRecord.title,
        category: newRecord.category,
        date: new Date().toISOString().split('T')[0],
        provider: newRecord.provider,
        fileName: newRecord.fileName,
        fileSize: '1.5 MB',
      };
      setRecords(prev => [addedRecord, ...prev]);
      setNewRecord({ title: '', category: 'Lab Report', provider: '', fileName: '' });
      setIsUploading(false);
      toast.success('Medical record uploaded and encrypted.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Medical Records</h1>
          <p className="text-gray-500 text-sm mt-1">Upload and access your lab results, prescriptions, and health history in an encrypted, HIPAA-compliant vault.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield size={20} />
              <h3 className="font-bold text-gray-900">Secure File Upload</h3>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="label">Document Title *</label>
                <input
                  type="text"
                  required
                  value={newRecord.title}
                  onChange={e => setNewRecord({ ...newRecord, title: e.target.value })}
                  placeholder="e.g. Lipids Blood Test"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select
                    value={newRecord.category}
                    onChange={e => setNewRecord({ ...newRecord, category: e.target.value as any })}
                    className="input-field"
                  >
                    <option value="Lab Report">Lab Report</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Vaccine Card">Vaccine Card</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Provider *</label>
                  <input
                    type="text"
                    required
                    value={newRecord.provider}
                    onChange={e => setNewRecord({ ...newRecord, provider: e.target.value })}
                    placeholder="e.g. Dr. Davis"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="label">Select File *</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewRecord({ ...newRecord, fileName: file.name });
                      }
                    }}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
                    <UploadCloud size={32} className="mx-auto text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium block">
                      {newRecord.fileName || 'Drag and drop or click to browse'}
                    </span>
                    <span className="text-[10px] text-gray-400 block">PDF, JPG, PNG (Max 10MB)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Encrypting & Uploading...
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add to Vault
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Vault list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search vault..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
                <Search className="absolute left-3.5 top-2.5 text-gray-400" size={16} />
              </div>

              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
              >
                <option value="All">All Categories</option>
                <option value="Lab Report">Lab Reports</option>
                <option value="Prescription">Prescriptions</option>
                <option value="Vaccine Card">Vaccines</option>
                <option value="Other">Others</option>
              </select>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filteredRecords.map(rec => (
                <div key={rec.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-50 rounded-2xl hover:bg-gray-50/50 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-snug">{rec.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Tag size={12} /> {rec.category}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {rec.date}</span>
                        <span>Provider: <span className="font-medium text-gray-600">{rec.provider}</span></span>
                      </div>
                      <span className="text-[11px] text-gray-400 block mt-1 font-mono">{rec.fileName} ({rec.fileSize})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => toast.info(`Downloading ${rec.fileName}...`)}
                      className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(rec.id)}
                      className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredRecords.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No encrypted records match your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
