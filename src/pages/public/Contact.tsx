import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'individual', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsSubmitted(true);
    toast.success('Your message has been sent successfully!');
  };

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Have questions about LifestyleBio? Reach out to our customer support or developer integrations teams."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=400&fit=crop"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-gray-600 leading-relaxed">
                  We are here to help. Whether you want to enquire about professional memberships, enterprise partnerships, or have technical suggestions, send us a message.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950 text-sm">Email Support</h3>
                    <p className="text-sm text-gray-500 mt-1">support@lifestylebio.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950 text-sm">Phone Line</h3>
                    <p className="text-sm text-gray-500 mt-1">+1 (800) 555-LIFE</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950 text-sm">Headquarters</h3>
                    <p className="text-sm text-gray-500 mt-1">100 Longevity Way, Suite 400</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Send a Message</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="label">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">I am an...</label>
                        <select
                          value={formData.role}
                          onChange={e => setFormData({ ...formData, role: e.target.value })}
                          className="input-field"
                        >
                          <option value="individual">Individual User</option>
                          <option value="nutritionist">Nutritionist / Coach</option>
                          <option value="corporate">Corporate Partner</option>
                          <option value="healthcare">Healthcare Provider</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="General Inquiry"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      Send Message <Send size={16} />
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Your message has been received. Our team will review your enquiry and reach out to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', role: 'individual', subject: '', message: '' }); }}
                      className="mt-6 text-emerald-500 font-semibold hover:text-emerald-600 text-sm"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
