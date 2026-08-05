import React, { useState, useEffect } from 'react';
import { Sparkles, Megaphone, Image as ImageIcon, Lightbulb, HelpCircle, BookOpen, Download, Plus, CheckCircle2, Award, Trash2, ArrowRight, ShieldCheck, Heart, Leaf, MapPin, ShoppingBag, X } from 'lucide-react';
import { awarenessService } from '../services/awarenessService';
import { useAuth } from '../context/AuthContext';

export function AwarenessHub() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('campaigns');

  const [campaigns, setCampaigns] = useState([]);
  const [posters, setPosters] = useState([]);
  const [tips, setTips] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);

  // Joined Campaigns state
  const [joinedCampaigns, setJoinedCampaigns] = useState([]);

  // Admin Modal state
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignDesc, setNewCampaignDesc] = useState('');
  const [newCampaignLoc, setNewCampaignLoc] = useState('');
  const [newCampaignDur, setNewCampaignDur] = useState('');

  const fetchHubData = async () => {
    setLoading(true);
    try {
      const [cData, pData, tData, qData, aData] = await Promise.all([
        awarenessService.getCampaigns(),
        awarenessService.getPosters(),
        awarenessService.getTips(),
        awarenessService.getQuizQuestions(),
        awarenessService.getArticles()
      ]);
      setCampaigns(cData);
      setPosters(pData);
      setTips(tData);
      setQuizQuestions(qData);
      setArticles(aData);
    } catch (err) {
      console.error('Error loading Awareness Hub:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubData();
  }, []);

  const handleJoinCampaign = (campaignId) => {
    if (joinedCampaigns.includes(campaignId)) return;
    setJoinedCampaigns(prev => [...prev, campaignId]);
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, participants_count: c.participants_count + 1 } : c));
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setQuizSubmitting(true);
    try {
      const res = await awarenessService.submitQuiz(quizAnswers);
      setQuizResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setQuizSubmitting(false);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const created = await awarenessService.createCampaign({
        title: newCampaignTitle,
        description: newCampaignDesc,
        location: newCampaignLoc || 'Bhubaneswar Wide',
        duration: newCampaignDur || '7 Days',
        banner_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
      });
      setCampaigns(prev => [created, ...prev]);
      setShowAddCampaignModal(false);
      setNewCampaignTitle('');
      setNewCampaignDesc('');
      setNewCampaignLoc('');
      setNewCampaignDur('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await awarenessService.deleteCampaign(id);
      setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { id: 'campaigns', label: 'Environmental Campaigns', icon: Megaphone, count: campaigns.length },
    { id: 'posters', label: 'Educational Posters', icon: ImageIcon, count: posters.length },
    { id: 'tips', label: 'Environmental Tips', icon: Lightbulb, count: tips.length },
    { id: 'quiz', label: 'Awareness Quiz', icon: HelpCircle, count: quizQuestions.length },
    { id: 'articles', label: 'Educational Articles', icon: BookOpen, count: articles.length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Citizen Education & Public Engagement
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            PUBLIC AWARENESS HUB
          </h1>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            Discover environmental campaigns, download educational posters, learn daily waste reduction tips, read articles, and test your knowledge in the Awareness Quiz!
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowAddCampaignModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-xs hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/20 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </button>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-lg shadow-[#22C55E]/20'
                  : 'bg-[#111827] text-[#9CA3AF] border-white/5 hover:text-white hover:bg-[#1A2332]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-[#9CA3AF]'}`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#9CA3AF]">Loading Public Awareness Hub...</div>
      ) : (
        <>
          {/* TAB 1: ENVIRONMENTAL CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-[#22C55E]" />
                  Active Environmental Campaigns
                </h2>
                <span className="text-xs text-[#9CA3AF]">Join municipal citizen initiatives in your ward</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns.map((c) => {
                  const isJoined = joinedCampaigns.includes(c.id);
                  return (
                    <div key={c.id} className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden hover:border-[#22C55E]/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="h-48 relative overflow-hidden bg-[#1A2332]">
                          <img src={c.banner_url} alt={c.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#22C55E] text-white shadow">
                            {c.duration}
                          </span>
                        </div>

                        <div className="p-6 space-y-3">
                          <h3 className="text-lg font-bold text-white">{c.title}</h3>
                          <p className="text-xs text-[#9CA3AF] leading-relaxed">{c.description}</p>
                          <div className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                            <MapPin className="w-4 h-4 text-[#22C55E]" />
                            <span>Location: <strong className="text-white">{c.location}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                        <span className="text-xs font-semibold text-[#9CA3AF]">
                          <strong className="text-[#22C55E] text-sm font-bold">{c.participants_count}</strong> Citizens Joined
                        </span>

                        <div className="flex items-center gap-2">
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteCampaign(c.id)}
                              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                              title="Delete Campaign"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => handleJoinCampaign(c.id)}
                            disabled={isJoined}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isJoined
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-md shadow-[#22C55E]/20'
                            }`}
                          >
                            {isJoined ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Joined
                              </>
                            ) : (
                              <>
                                Join Campaign
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATIONAL POSTERS */}
          {activeTab === 'posters' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#22C55E]" />
                  Downloadable Educational Posters
                </h2>
                <span className="text-xs text-[#9CA3AF]">Free high-res posters for schools, offices & community boards</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posters.map((p) => (
                  <div key={p.id} className="bg-[#111827] border border-white/10 rounded-3xl p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="h-44 rounded-2xl overflow-hidden bg-[#1A2332] mb-3">
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-0.5 rounded border border-[#22C55E]/20">
                        {p.category}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5">{p.title}</h3>
                      <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{p.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[11px] text-[#9CA3AF]">{p.download_count} Downloads</span>
                      <button
                        onClick={() => alert(`Downloading high-resolution poster: "${p.title}"`)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] flex items-center gap-1.5 shadow"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ENVIRONMENTAL TIPS */}
          {activeTab === 'tips' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  Daily Environmental & Segregation Tips
                </h2>
                <span className="text-xs text-[#9CA3AF]">Simple habits for zero-waste municipal living</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tips.map((t) => (
                  <div key={t.id} className="bg-[#111827] border border-white/10 p-5 rounded-2xl space-y-3 hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
                          {t.category}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5">{t.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed bg-[#1A2332] p-3 rounded-xl border border-white/5">
                      {t.tip_text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AWARENESS QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                  <Award className="w-4 h-4" /> Earn +20 Reward Points Per Question
                </div>
                <h2 className="text-2xl font-black text-white">SAFAI Environmental Awareness Quiz</h2>
                <p className="text-xs text-[#9CA3AF]">Test your waste management knowledge and earn Swachhata reward points!</p>
              </div>

              {quizResult ? (
                <div className="bg-[#111827] border border-[#22C55E]/40 p-8 rounded-3xl text-center space-y-6 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto">
                    <Award className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{quizResult.message}</h3>
                    <p className="text-sm text-[#9CA3AF]">
                      Score: <strong className="text-[#22C55E] text-xl font-bold">{quizResult.score_percentage}%</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => { setQuizResult(null); setQuizAnswers({}); }}
                    className="px-6 py-3 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A]"
                  >
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {quizQuestions.map((q, qIdx) => (
                    <div key={q.id} className="bg-[#111827] border border-white/10 p-6 rounded-2xl space-y-4">
                      <h3 className="text-sm font-bold text-white flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">Q{qIdx + 1}.</span>
                        <span>{q.question}</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {['A', 'B', 'C', 'D'].map((optKey) => {
                          const optionText = q[`option_${optKey.toLowerCase()}`];
                          const isSelected = quizAnswers[q.id] === optKey;
                          return (
                            <button
                              key={optKey}
                              type="button"
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optKey }))}
                              className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                                isSelected
                                  ? 'bg-[#22C55E] text-white border-[#22C55E]'
                                  : 'bg-[#1A2332] text-[#D1D5DB] border-white/5 hover:bg-white/5'
                              }`}
                            >
                              <strong className="mr-2">{optKey}.</strong> {optionText}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={quizSubmitting || Object.keys(quizAnswers).length === 0}
                    className="w-full py-4 rounded-xl text-base font-bold bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-xl shadow-[#22C55E]/20 transition-all disabled:opacity-50"
                  >
                    {quizSubmitting ? 'Calculating Score...' : 'Submit Quiz & Claim Reward Points'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 5: EDUCATIONAL ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#22C55E]" />
                  Educational Waste & Environmental Articles
                </h2>
                <span className="text-xs text-[#9CA3AF]">In-depth guides on recycling, composting & clean water</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <div key={art.id} className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="h-44 bg-[#1A2332] overflow-hidden">
                        <img src={art.image_url} alt={art.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-[#9CA3AF]">
                          <span className="text-[#22C55E] font-bold bg-[#22C55E]/10 px-2 py-0.5 rounded">{art.category}</span>
                          <span>{art.read_time}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{art.title}</h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">{art.summary}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-3">
                      <span className="text-[11px] text-[#9CA3AF] italic">{art.author}</span>
                      <button
                        onClick={() => alert(`Full Article Content:\n\n${art.title}\n\n${art.content}`)}
                        className="text-xs font-bold text-[#22C55E] hover:underline flex items-center gap-1"
                      >
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* CREATE CAMPAIGN ADMIN MODAL */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F14] border border-white/20 rounded-3xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> Create Environmental Campaign
              </h3>
              <button onClick={() => setShowAddCampaignModal(false)} className="text-[#9CA3AF] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white uppercase mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. River Cleanup Week"
                  value={newCampaignTitle}
                  onChange={(e) => setNewCampaignTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white uppercase mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Campaign details..."
                  value={newCampaignDesc}
                  onChange={(e) => setNewCampaignDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white uppercase mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Saheed Nagar Market"
                    value={newCampaignLoc}
                    onChange={(e) => setNewCampaignLoc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="7 Days"
                    value={newCampaignDur}
                    onChange={(e) => setNewCampaignDur(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCampaignModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#111827] text-white text-xs font-bold border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#22C55E] text-white text-xs font-bold hover:bg-[#16A34A]"
                >
                  Publish Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AwarenessHub;
