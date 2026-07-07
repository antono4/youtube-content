import React, { useState, useRef, useEffect } from 'react';
import { 
  Youtube, Lightbulb, FileText, Search, Mic, Play, Pause, 
  CheckCircle2, RefreshCw, AlertCircle, Video, ChevronRight,
  Sparkles, Copy, Download, Trash2, Volume2, Image, Wand2,
  TrendingUp, Tag, Key, Eye, Clock, ThumbsUp, MessageSquare
} from 'lucide-react';

// API Key - Replace with your actual Google AI API key
const API_KEY = "";

// Sample ideas data for demonstration (when no API key is provided)
const SAMPLE_IDEAS = [
  {
    id: 1,
    judul: "10 Tips Produktivitas yang Tidak Ada yang Tahu",
    deskripsi: "Video tips produktivitas dengan insight unik yang jarang dibahas di channel lain. Fokus pada teknik-teknik terbukti ilmiah.",
    kategori: "Tips & Trick",
    estimasiDurasi: "12-15 menit",
    targetAudience: "Profesional muda, mahasiswa",
    potensiViews: "50K - 200K",
    keyword: "produktivitas kerja, tips fokus, manajemen waktu"
  },
  {
    id: 2,
    judul: "Review Jujur: Apakah AI Akan Gantikan Programmer?",
    deskripsi: "Analisis mendalam tentang dampak AI terhadap dunia pemrograman dengan perspektif dari berbagai sudut pandang.",
    kategori: "Review & Opini",
    estimasiDurasi: "18-22 menit",
    targetAudience: "Developer, tech enthusiast",
    potensiViews: "100K - 500K",
    keyword: "AI vs programmer, masa depan coding, ChatGPT developer"
  },
  {
    id: 3,
    judul: "Belajar React dalam 30 Menit - Dari Nol Sampai Mahir",
    deskripsi: "Tutorial komprehensif React untuk pemula dengan pendekatan praktis dan contoh real-world.",
    kategori: "Tutorial",
    estimasiDurasi: "30-35 menit",
    targetAudience: "Web developer, programming student",
    potensiViews: "80K - 300K",
    keyword: "tutorial react, belajar javascript, react js untuk pemula"
  },
  {
    id: 4,
    judul: "Behind the Scene: Cara Saya Bikin Video Viral",
    deskripsi: "Behind the scenes proses pembuatan video YouTube dengan 1M+ views. Includes equipment, editing, dan strategi.",
    kategori: "Behind the Scene",
    estimasiDurasi: "15-20 menit",
    targetAudience: "Content creator, YouTuber",
    potensiViews: "70K - 250K",
    keyword: "cara bikin video viral, tips youtube, behind the scene youtube"
  },
  {
    id: 5,
    judul: "Kenapa Indonesia的人才都往新加坡跑?",
    deskripsi: "Analisis fenomena brain drain Indonesia ke Singapura dengan data dan perspektif ekonomi.",
    kategori: "Edukasi",
    estimasiDurasi: "20-25 menit",
    targetAudience: "Umum, profesional",
    potensiViews: "60K - 200K",
    keyword: "brain drain indonesia, kerja di singapura, peluang karir"
  }
];

// Sample script template
const generateScriptFromIdea = (idea) => {
  return `===========================================
NASKAH VIDEO: "${idea.judul}"
===========================================

⏱️ DURASI ESTIMASI: ${idea.estimasiDurasi}
🎯 TARGET AUDIENCE: ${idea.targetAudience}
📊 POTENSI VIEWS: ${idea.potensiViews}

===========================================
BAGIAN 1: HOOK (0:00 - 0:30)
===========================================

[HOOK - Visual: B-roll menarik, teks besar di layar]

"Hai semuanya! Kalau kamu sampai di video ini, kemungkinan besar kamu penasaran tentang..."

[pause 2 detik]

"Nah, di video kali ini, kita akan bahas hal yang mungkin sering kamu dengar tapi belum pernah aku bahas secara DETAIL di channel ini."

[GANTI SCENE]

"Siap? Let's go!"

===========================================
BAGIAN 2: PEMBUKAAN (0:30 - 2:00)
===========================================

[INTRO - Visual: Host di depan kamera atau voiceover dengan B-roll]

"Selamat datang kembali di channel! Kalau kamu baru di sini, jangan lupa subscribe dan nyalakan loncengnya ya..."

[CONTEXT - jelaskan mengapa topik ini penting]

"Jadi, ${idea.deskripsi}"

"Topik ini sebenarnya sangat relevan sekarang karena..."

===========================================
BAGIAN 3: KONTEN UTAMA (2:00 - ${idea.estimasiDurasi.split('-')[1].trim()})
===========================================

[MAIN CONTENT - Breakdown menjadi beberapa poin utama]

📌 POIN 1: [Judul Poin 1]
- Penjelasan detail
- Contoh nyata
- Data/statistik pendukung
[TRANSISI] "Oke, kita lanjut ke poin berikutnya..."

📌 POIN 2: [Judul Poin 2]
- Penjelasan detail
- Contoh nyata
- Data/statistik pendukung
[TRANSISI] "Nah, ini yang sering orang lain lewatkan..."

📌 POIN 3: [Judul Poin 3]
- Penjelasan detail
- Contoh nyata
- Data/statistik pendukung
[TRANSISI] "Dan terakhir..."

===========================================
BAGIAN 4: PENUTUP (最后的 2 menit)
===========================================

[OUTRO - Visual: Host berbicara atau voiceover]

"Baiklah semuanya, itu dia pembahasannya!"

[SUMMARY - Rangkuman 3 poin utama]

"Jadi ingat ya..."

[CTA - Call to Action]

" Kalau menurut kamu video ini bermanfaat, jangan lupa like, share, dan subscribe ya!"

"Comment di bawah tentang topik apa yang ingin kamu bahas selanjutnya!"

[SIGN OFF]

"Sampai jumpa di video berikutnya! Bye bye!"

===========================================
CATATAN EDITING:
- B-roll: ${idea.kategori}
- Musik: Upbeat tapi tidak mengalihkan perhatian
- Grafik: Sesuaikan dengan branding channel
- Color grading: Cahaya hangat, profesional
===========================================
`;
};

// SEO Analysis function
const analyzeSEO = (idea, script) => {
  const keywords = idea.keyword.split(',').map(k => k.trim());
  const scriptLower = script.toLowerCase();
  
  const keywordAnalysis = keywords.map(kw => {
    const count = (scriptLower.match(new RegExp(kw.toLowerCase(), 'g')) || []).length;
    return {
      keyword: kw,
      count,
      density: ((count / script.split(' ').length) * 100).toFixed(2),
      status: count === 0 ? 'missing' : count < 3 ? 'low' : count < 6 ? 'good' : 'optimal'
    };
  });

  const seoScore = Math.min(100, Math.round(
    (keywordAnalysis.filter(k => k.status !== 'missing').length / keywords.length * 40) +
    (script.length > 2000 ? 30 : (script.length / 2000 * 30)) +
    (idea.judul.length >= 50 && idea.judul.length <= 60 ? 15 : idea.judul.length > 60 ? 10 : 5) +
    15
  ));

  const recommendations = [];
  
  if (idea.judul.length < 50) {
    recommendations.push({ type: 'warning', text: 'Judul kurang dari 50 karakter. Pertimbangkan untuk menambahkan kata kunci.' });
  }
  if (idea.judul.length > 60) {
    recommendations.push({ type: 'warning', text: 'Judul lebih dari 60 karakter. YouTube mungkin memotong di hasil pencarian.' });
  }
  if (script.length < 2000) {
    recommendations.push({ type: 'info', text: 'Script masih pendek. Pertimbangkan untuk menambah detail untuk video yang lebih engaging.' });
  }
  if (keywordAnalysis.some(k => k.status === 'missing')) {
    recommendations.push({ type: 'error', text: 'Beberapa keyword belum muncul di script. Tambahkan secara natural.' });
  }
  
  recommendations.push({ type: 'success', text: 'Gunakan thumbnail dengan teks besar dan wajah ekspresif.' });
  recommendations.push({ type: 'success', text: 'Tambahkan timestamps/chapters di deskripsi video.' });
  recommendations.push({ type: 'info', text: 'CTA (Call to Action) sudah termasuk di script.' });

  return {
    score: seoScore,
    keywordAnalysis,
    recommendations,
    tips: {
      title: `Gunakan judul: "${idea.judul}"`,
      description: `Video ini membahas tentang ${idea.deskripsi} dengan tips dan trik yang praktikal untuk ${idea.targetAudience}.`,
      tags: idea.keyword
    }
  };
};

// Audio conversion utility
const pcmToWav = (pcmData, sampleRate = 24000) => {
  const buffer = new ArrayBuffer(44 + pcmData.length);
  const view = new DataView(buffer);
  const writeString = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcmData.length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcmData.length, true);
  new Uint8Array(buffer, 44).set(pcmData);
  return new Blob([buffer], { type: 'audio/wav' });
};

// Fetch with retry utility
const fetchWithRetry = async (url, options, maxRetries = 3) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      retries++;
      if (retries >= maxRetries) throw e;
      await new Promise(res => setTimeout(res, 1000 * retries));
    }
  }
};

// Loading spinner component
const Spinner = () => (
  <RefreshCw className="w-5 h-5 animate-spin" />
);

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-900/90 border-red-500' : 
                   type === 'success' ? 'bg-green-900/90 border-green-500' : 
                   'bg-blue-900/90 border-blue-500';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} border rounded-lg p-4 shadow-xl animate-slide-in`}>
      <div className="flex items-center gap-3">
        {type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
        {type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  // State management
  const [activeTab, setActiveTab] = useState('ideas');
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [script, setScript] = useState('');
  const [seoData, setSeoData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [visualUrl, setVisualUrl] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [loading, setLoading] = useState({ 
    ideas: false, 
    script: false, 
    seo: false, 
    tts: false, 
    visual: false 
  });
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Show toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Generate ideas based on topic
  const handleGenerateIdeas = async () => {
    if (!topic.trim()) {
      showToast('Masukkan topik terlebih dahulu!', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, ideas: true }));
    
    try {
      if (API_KEY) {
        // Use Google AI API if key is provided
        const response = await fetchWithRetry(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Buatkan 5 ide video YouTube dalam Bahasa Indonesia untuk topik: "${topic}". 
                  Format: JSON array dengan field: judul, deskripsi, kategori, estimasiDurasi, targetAudience, potensiViews, keyword.
                  Buat deskripsi menarik dan realistis untuk masing-masing ide.`
                }]
              }],
              generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 2048
              }
            })
          }
        );

        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            setIdeas(JSON.parse(jsonMatch[0]));
          }
        }
      } else {
        // Use sample data when no API key
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
        const filteredIdeas = SAMPLE_IDEAS.filter(idea => 
          idea.judul.toLowerCase().includes(topic.toLowerCase()) ||
          idea.deskripsi.toLowerCase().includes(topic.toLowerCase()) ||
          idea.keyword.toLowerCase().includes(topic.toLowerCase())
        );
        setIdeas(filteredIdeas.length > 0 ? filteredIdeas : SAMPLE_IDEAS);
      }
      
      showToast('Ide berhasil digenerate!', 'success');
    } catch (error) {
      console.error('Error generating ideas:', error);
      showToast('Gagal generate ide. Menggunakan data contoh.', 'error');
      setIdeas(SAMPLE_IDEAS);
    } finally {
      setLoading(prev => ({ ...prev, ideas: false }));
    }
  };

  // Generate script from selected idea
  const handleGenerateScript = () => {
    if (!selectedIdea) {
      showToast('Pilih ide terlebih dahulu!', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, script: true }));
    
    setTimeout(() => {
      const generatedScript = generateScriptFromIdea(selectedIdea);
      setScript(generatedScript);
      setLoading(prev => ({ ...prev, script: false }));
      showToast('Script berhasil digenerate!', 'success');
    }, 1000);
  };

  // Analyze SEO
  const handleAnalyzeSEO = () => {
    if (!selectedIdea) {
      showToast('Pilih ide terlebih dahulu!', 'error');
      return;
    }
    if (!script) {
      showToast('Generate script terlebih dahulu!', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, seo: true }));
    
    setTimeout(() => {
      const analysis = analyzeSEO(selectedIdea, script);
      setSeoData(analysis);
      setLoading(prev => ({ ...prev, seo: false }));
      showToast('Analisis SEO selesai!', 'success');
    }, 800);
  };

  // Generate TTS
  const handleGenerateTTS = async () => {
    if (!script) {
      showToast('Generate script terlebih dahulu!', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, tts: true }));
    
    try {
      // Extract plain text from script (remove formatting markers)
      const plainText = script
        .replace(/=+/g, '')
        .replace(/📌|⏱️|🎯|📊|[A-Z\s-]+:/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      if (API_KEY) {
        // Use Google TTS API
        const response = await fetchWithRetry(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: { text: plainText.substring(0, 5000) },
              voice: { languageCode: 'id-ID', name: 'id-ID-Standard-A' },
              audioConfig: { audioEncoding: 'LINEAR16', speakingRate: 0.95 }
            })
          }
        );

        if (response.audioContent) {
          const audioData = Uint8Array.from(atob(response.audioContent), c => c.charCodeAt(0));
          const wavBlob = pcmToWav(audioData, 24000);
          setAudioUrl(URL.createObjectURL(wavBlob));
        }
      } else {
        // Use Web Speech API as fallback
        showToast('Mode demo: Menggunakan Web Speech API', 'info');
        const utterance = new SpeechSynthesisUtterance(plainText.substring(0, 1000));
        utterance.lang = 'id-ID';
        utterance.rate = 0.95;
        speechSynthesis.speak(utterance);
      }
      
      showToast('Voiceover siap diputar!', 'success');
    } catch (error) {
      console.error('TTS Error:', error);
      showToast('Gagal generate voiceover', 'error');
    } finally {
      setLoading(prev => ({ ...prev, tts: false }));
    }
  };

  // Toggle audio playback
  const toggleAudio = () => {
    if (!audioUrl) return;
    
    if (playingAudio) {
      audioRef.current?.pause();
      setPlayingAudio(false);
    } else {
      audioRef.current?.play();
      setPlayingAudio(true);
    }
  };

  // Generate visual/thumbnail
  const handleGenerateVisual = async () => {
    if (!selectedIdea) {
      showToast('Pilih ide terlebih dahulu!', 'error');
      return;
    }

    setLoading(prev => ({ ...prev, visual: true }));
    
    try {
      if (API_KEY) {
        const response = await fetchWithRetry(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              instances: [{
                prompt: `YouTube thumbnail for: ${selectedIdea.judul}. Professional, high contrast, eye-catching, vibrant colors, includes text placeholders, cinematic style`
              }],
              parameters: { sampleCount: 1 }
            })
          }
        );
        
        if (response.predictions?.[0]?.bytesBase64Encoded) {
          setVisualUrl(`data:image/png;base64,${response.predictions[0].bytesBase64Encoded}`);
        }
      } else {
        // Demo mode - show placeholder
        await new Promise(resolve => setTimeout(resolve, 2000));
        setVisualUrl(`https://picsum.photos/seed/${selectedIdea.id}/1280/720`);
      }
      
      showToast('Visual berhasil digenerate!', 'success');
    } catch (error) {
      console.error('Visual generation error:', error);
      showToast('Gagal generate visual', 'error');
    } finally {
      setLoading(prev => ({ ...prev, visual: false }));
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Disalin ke clipboard!', 'success');
  };

  // Download file
  const downloadFile = (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Navigation items
  const navItems = [
    { id: 'ideas', label: 'Ideasi', icon: Lightbulb },
    { id: 'script', label: 'Naskah', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'voice', label: 'Voiceover', icon: Mic },
    { id: 'visual', label: 'Thumbnail', icon: Image }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Toast Notification */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-xl">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">TubeFlow AI</h1>
              <p className="text-xs text-gray-400">AI-Powered YouTube Content Creator</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {selectedIdea && (
              <span className="text-sm text-gray-400">
                Ide terpilih: <span className="text-white">{selectedIdea.judul.substring(0, 30)}...</span>
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex-shrink-0">
          <nav className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Statistik</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Ide tersimpan</span>
                <span className="text-sm font-semibold text-white">{ideas.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Script</span>
                <span className={`text-sm font-semibold ${script ? 'text-green-400' : 'text-gray-500'}`}>
                  {script ? '✓ Ada' : 'Belum'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">SEO Score</span>
                <span className={`text-sm font-semibold ${seoData ? (seoData.score >= 70 ? 'text-green-400' : seoData.score >= 50 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-500'}`}>
                  {seoData ? `${seoData.score}/100` : '-'}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-thin">
          {/* Ideas Tab */}
          {activeTab === 'ideas' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Ide Konten Video</h2>
                  <p className="text-gray-400 text-sm">Generate ide video yang engaging untuk YouTube</p>
                </div>
              </div>

              {/* Search Box */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Topik Video
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateIdeas()}
                    placeholder="Contoh: tips produktivitas, review teknologi..."
                    className="flex-1 bg-gray-800 p-4 rounded-xl border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                  />
                  <button
                    onClick={handleGenerateIdeas}
                    disabled={loading.ideas}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all"
                  >
                    {loading.ideas ? <Spinner /> : <Lightbulb className="w-5 h-5" />}
                    {loading.ideas ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>

              {/* Ideas Grid */}
              {ideas.length > 0 && (
                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Hasil Ide ({ideas.length})</h3>
                  {ideas.map((idea, index) => (
                    <div
                      key={idea.id || index}
                      className={`bg-gray-900/50 border rounded-2xl p-6 cursor-pointer transition-all hover:border-gray-600 ${
                        selectedIdea?.id === idea.id 
                          ? 'border-red-500 ring-2 ring-red-500/20' 
                          : 'border-gray-800'
                      }`}
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full mb-2">
                            {idea.kategori}
                          </span>
                          <h4 className="text-lg font-bold mb-2">{idea.judul}</h4>
                          <p className="text-gray-400 text-sm">{idea.deskripsi}</p>
                        </div>
                        {selectedIdea?.id === idea.id && (
                          <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          {idea.estimasiDurasi}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Eye className="w-4 h-4" />
                          {idea.potensiViews}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <MessageSquare className="w-4 h-4" />
                          {idea.targetAudience}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ideas.length === 0 && !loading.ideas && (
                <div className="text-center py-16 text-gray-500">
                  <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Masukkan topik dan klik Generate untuk memulai</p>
                </div>
              )}
            </div>
          )}

          {/* Script Tab */}
          {activeTab === 'script' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Naskah Video</h2>
                  <p className="text-gray-400 text-sm">Generate script profesional untuk video YouTube</p>
                </div>
              </div>

              {!selectedIdea && (
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-yellow-200">
                    Pilih ide video terlebih dahulu di tab Ideasi untuk membuat script.
                  </p>
                </div>
              )}

              {selectedIdea && (
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Ide Terpilih</h3>
                      <p className="text-sm text-gray-400">{selectedIdea.judul}</p>
                    </div>
                    <button
                      onClick={handleGenerateScript}
                      disabled={loading.script}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
                    >
                      {loading.script ? <Spinner /> : <Wand2 className="w-5 h-5" />}
                      {loading.script ? 'Generating...' : 'Generate Script'}
                    </button>
                  </div>
                </div>
              )}

              {script && (
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="font-semibold">Script Video</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(script)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        title="Salin"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => downloadFile(script, `script-${Date.now()}.txt`)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                      {script}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Analisis SEO</h2>
                  <p className="text-gray-400 text-sm">Optimasi video untuk ranking YouTube</p>
                </div>
              </div>

              {!selectedIdea && (
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-yellow-200">
                    Pilih ide video terlebih dahulu.
                  </p>
                </div>
              )}

              {selectedIdea && (
                <>
                  {!seoData && (
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
                      <button
                        onClick={handleAnalyzeSEO}
                        disabled={loading.seo || !script}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto transition-all"
                      >
                        {loading.seo ? <Spinner /> : <Search className="w-5 h-5" />}
                        {loading.seo ? 'Menganalisis...' : 'Analisis SEO'}
                      </button>
                      {!script && (
                        <p className="text-sm text-gray-500 mt-3">Generate script terlebih dahulu</p>
                      )}
                    </div>
                  )}

                  {seoData && (
                    <div className="space-y-6">
                      {/* SEO Score */}
                      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">SEO Score</h3>
                          <button
                            onClick={handleAnalyzeSEO}
                            disabled={loading.seo}
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <RefreshCw className={`w-4 h-4 ${loading.seo ? 'animate-spin' : ''}`} />
                            Re-analisis
                          </button>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="56" stroke="#374151" strokeWidth="12" fill="none" />
                              <circle 
                                cx="64" cy="64" r="56" 
                                stroke={seoData.score >= 70 ? '#22c55e' : seoData.score >= 50 ? '#eab308' : '#ef4444'} 
                                strokeWidth="12" 
                                fill="none"
                                strokeDasharray={`${seoData.score * 3.52} 352`}
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl font-bold">{seoData.score}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className={`text-lg font-semibold ${
                              seoData.score >= 70 ? 'text-green-400' : 
                              seoData.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {seoData.score >= 70 ? 'Bagus!' : 
                               seoData.score >= 50 ? 'Perlu Perbaikan' : 'Kurang Optimal'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              {seoData.score >= 70 
                                ? 'Video Anda sudah dioptimasi dengan baik untuk SEO.' 
                                : 'Ikuti rekomendasi di bawah untuk meningkatkan ranking.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Keyword Analysis */}
                      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Tag className="w-5 h-5" />
                          Analisis Keyword
                        </h3>
                        <div className="space-y-3">
                          {seoData.keywordAnalysis.map((kw, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <span className="flex-1 text-sm bg-gray-800 px-3 py-2 rounded-lg">{kw.keyword}</span>
                              <span className="text-sm text-gray-400 w-16 text-right">{kw.count}x</span>
                              <span className="text-sm text-gray-400 w-20 text-right">{kw.density}%</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                kw.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                                kw.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                                kw.status === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {kw.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Key className="w-5 h-5" />
                          Rekomendasi
                        </h3>
                        <div className="space-y-2">
                          {seoData.recommendations.map((rec, idx) => (
                            <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${
                              rec.type === 'error' ? 'bg-red-900/20 text-red-300' :
                              rec.type === 'warning' ? 'bg-yellow-900/20 text-yellow-300' :
                              rec.type === 'success' ? 'bg-green-900/20 text-green-300' :
                              'bg-blue-900/20 text-blue-300'
                            }`}>
                              {rec.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                              {rec.type === 'warning' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                              {rec.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                              {rec.type === 'info' && <Eye className="w-5 h-5 flex-shrink-0" />}
                              <span className="text-sm">{rec.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SEO Tips for Publishing */}
                      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                        <h3 className="font-semibold mb-4">Tips Publishing</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wider">Judul (Title)</label>
                            <p className="mt-1 p-3 bg-gray-800 rounded-lg text-sm">{seoData.tips.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{seoData.tips.title.length}/60 karakter</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wider">Deskripsi</label>
                            <p className="mt-1 p-3 bg-gray-800 rounded-lg text-sm">{seoData.tips.description}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 uppercase tracking-wider">Tags</label>
                            <p className="mt-1 p-3 bg-gray-800 rounded-lg text-sm">{seoData.tips.tags}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(seoData.tips, null, 2))}
                          className="mt-4 w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Salin SEO Metadata
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Voiceover Tab */}
          {activeTab === 'voice' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Mic className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Voiceover</h2>
                  <p className="text-gray-400 text-sm">Generate suara/narasi untuk video YouTube</p>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <div className="flex flex-col items-center justify-center py-8">
                  {!audioUrl ? (
                    <>
                      <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                        <Volume2 className="w-12 h-12 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Text-to-Speech</h3>
                      <p className="text-gray-400 text-sm text-center max-w-md mb-6">
                        Generate voiceover dari script video Anda dengan AI. 
                        Mendukung berbagai bahasa dan gaya bicara.
                      </p>
                      <button
                        onClick={handleGenerateTTS}
                        disabled={loading.tts || !script}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all"
                      >
                        {loading.tts ? <Spinner /> : <Mic className="w-5 h-5" />}
                        {loading.tts ? 'Generating...' : 'Generate Voiceover'}
                      </button>
                      {!script && (
                        <p className="text-xs text-gray-500 mt-3">Generate script terlebih dahulu</p>
                      )}
                    </>
                  ) : (
                    <div className="w-full max-w-md">
                      <audio ref={audioRef} src={audioUrl} onEnded={() => setPlayingAudio(false)} />
                      <div className="bg-gray-800 rounded-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Volume2 className="w-10 h-10 text-purple-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Voiceover Siap!</h3>
                        <p className="text-sm text-gray-400 mb-6">File audio telah digenerate</p>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={toggleAudio}
                            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all"
                          >
                            {playingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {playingAudio ? 'Pause' : 'Putar'}
                          </button>
                          <a
                            href={audioUrl}
                            download={`voiceover-${Date.now()}.wav`}
                            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all"
                          >
                            <Download className="w-5 h-5" />
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Visual Tab */}
          {activeTab === 'visual' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <Image className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Thumbnail Generator</h2>
                  <p className="text-gray-400 text-sm">Buat thumbnail menarik dengan AI</p>
                </div>
              </div>

              {!selectedIdea && (
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-yellow-200">
                    Pilih ide video terlebih dahulu untuk membuat thumbnail.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Thumbnail Preview</h3>
                  {visualUrl ? (
                    <div className="relative group">
                      <img 
                        src={visualUrl} 
                        alt="Generated Thumbnail" 
                        className="w-full rounded-xl shadow-2xl" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                        <button
                          onClick={() => {
                            setVisualUrl(null);
                          }}
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Image className="w-16 h-16 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Thumbnail belum di-generate</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Pengaturan</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Ide Video</label>
                      <p className="mt-1 p-3 bg-gray-800 rounded-lg text-sm">
                        {selectedIdea?.judul || 'Pilih ide terlebih dahulu'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Kategori</label>
                      <p className="mt-1 p-3 bg-gray-800 rounded-lg text-sm">
                        {selectedIdea?.kategori || '-'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Target Audience</label>
                      <p className="mt-1 p-3 bg-gray-800 rounded-lg text-sm">
                        {selectedIdea?.targetAudience || '-'}
                      </p>
                    </div>
                    <button
                      onClick={handleGenerateVisual}
                      disabled={loading.visual || !selectedIdea}
                      className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-600/50 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      {loading.visual ? <Spinner /> : <Wand2 className="w-5 h-5" />}
                      {loading.visual ? 'Generating...' : 'Generate Thumbnail'}
                    </button>
                    {visualUrl && (
                      <a
                        href={visualUrl}
                        download={`thumbnail-${Date.now()}.png`}
                        target="_blank"
                        className="w-full bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        Download Thumbnail
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Thumbnail Tips */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-yellow-400" />
                  Tips Thumbnail Menarik
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="font-medium mb-2">Gunakan Wajah Ekspresif</h4>
                    <p className="text-xs text-gray-400">Thumbnail dengan wajah manusia mendapat 30% lebih banyak klik</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="font-medium mb-2">Kontras Warna Tinggi</h4>
                    <p className="text-xs text-gray-400">Gunakan warna yang kontras untuk menarik perhatian</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="font-medium mb-2">Teks Singkat & Jelas</h4>
                    <p className="text-xs text-gray-400">Maksimal 4-5 kata yang mudah dibaca</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
