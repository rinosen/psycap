import { useState } from 'react';
import Header from './components/Header';
import Toast from './components/Toast';
import LandingView from './components/LandingView';
import AssessmentWizard from './components/AssessmentWizard';
import RegisterView from './components/RegisterView';
import DashboardLayout from './components/DashboardLayout';
import OverviewTab from './components/tabs/OverviewTab';
import AcademyTab from './components/tabs/AcademyTab';
import WorkContextTab from './components/tabs/WorkContextTab';
import SupportTab from './components/tabs/SupportTab';
import {
  INITIAL_CHAT,
  INITIAL_ORG_DOCS,
  scoreAssessment,
} from './data/pcq12Data';

export default function App() {
  // Semua user dianggap pengguna baru saat awal masuk: terbuka di halaman home/landing
  const [stage, setStage] = useState('landing'); // 'landing' | 'assessment' | 'register' | 'dashboard'
  const [activeTab, setActiveTab] = useState('overview');

  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [orgDocs, setOrgDocs] = useState(INITIAL_ORG_DOCS);
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [toast, setToast] = useState('');
  const [pendingResult, setPendingResult] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCompleteAssessment = (answers) => {
    const result = scoreAssessment(answers);

    // Jika user belum punya akun (pengguna baru), minta buat akun terlebih dahulu
    if (!user) {
      setPendingResult(result);
      setStage('register');
      showToast('Asesmen selesai! Silakan buat akun untuk melihat hasil.');
      return;
    }

    // Jika user sudah terdaftar dan melakukan tes ulang
    const label = `Evaluasi #${history.length + 1}`;
    const entry = {
      id: Date.now().toString(),
      label,
      date: 'Hari ini',
      total: result.total,
      dimensions: result.dimensions,
    };
    setHistory((prev) => [...prev, entry]);
    setPoints((p) => p + 100);
    setStage('dashboard');
    setActiveTab('overview');
    showToast('+100 Poin · Evaluasi PCQ-12 baru dicatat');
  };

  const handleRegister = (accountData) => {
    setUser(accountData);

    if (pendingResult) {
      const entry = {
        id: Date.now().toString(),
        label: 'Pre-Training',
        date: 'Hari ini',
        total: pendingResult.total,
        dimensions: pendingResult.dimensions,
      };
      setHistory([entry]);
      setPoints((p) => p + 100);
      setPendingResult(null);
    }

    setStage('dashboard');
    setActiveTab('overview');
    showToast(`Selamat datang, ${accountData.name}! +100 Poin asesmen PCQ-12`);
  };

  const handleCompleteCourse = (course) => {
    if (completedCourses.includes(course.id)) return;
    setCompletedCourses([...completedCourses, course.id]);
    setPoints((p) => p + course.points);
    showToast(`+${course.points} Poin · Modul selesai`);
  };

  const handleAddOrgDoc = (doc) => {
    setOrgDocs([doc, ...orgDocs]);
    setPoints((p) => p + 40);
    showToast('+40 Poin · Info organisasi ditambahkan');
  };

  const handleSendMessage = (text) => {
    const userMsg = { id: Date.now().toString(), sender: 'user', text, time: 'Baru saja' };
    const reply = {
      id: (Date.now() + 1).toString(),
      sender: 'coach',
      text: 'Terima kasih sudah berbagi. Mari pecah situasi ini menjadi 1 langkah kecil yang bisa Anda kendalikan hari ini.',
      time: 'Baru saja',
    };
    setMessages([...messages, userMsg, reply]);
  };

  const handleSubmitFeedback = () => {
    setPoints((p) => p + 20);
    showToast('+20 Poin · Masukan terkirim');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F1] text-[#1F2421]">
      <Header
        stage={stage}
        points={points}
        user={user}
        onGoLanding={() => setStage('landing')}
        onStartTest={() => setStage('assessment')}
      />

      <div className="flex-1">
        {stage === 'landing' && (
          <LandingView
            onStartAssessment={() => setStage('assessment')}
            onGoDashboard={() => setStage('dashboard')}
            hasHistory={history.length > 0}
          />
        )}

        {stage === 'assessment' && (
          <AssessmentWizard
            onComplete={handleCompleteAssessment}
            onCancel={() => setStage(history.length > 0 ? 'dashboard' : 'landing')}
          />
        )}

        {stage === 'register' && (
          <RegisterView
            onRegister={handleRegister}
            assessmentSummary={pendingResult}
          />
        )}

        {stage === 'dashboard' && history.length > 0 && (
          <DashboardLayout activeTab={activeTab} onChangeTab={setActiveTab}>
            {activeTab === 'overview' && (
              <OverviewTab history={history} onGoAcademy={() => setActiveTab('academy')} />
            )}
            {activeTab === 'academy' && (
              <AcademyTab completedCourses={completedCourses} onCompleteCourse={handleCompleteCourse} />
            )}
            {activeTab === 'work' && (
              <WorkContextTab orgDocs={orgDocs} onAddOrgDoc={handleAddOrgDoc} />
            )}
            {activeTab === 'support' && (
              <SupportTab
                latestResult={history[history.length - 1]}
                messages={messages}
                onSendMessage={handleSendMessage}
                onSubmitFeedback={handleSubmitFeedback}
              />
            )}
          </DashboardLayout>
        )}
      </div>

      <footer className="border-t border-[#DCD7CC] py-6 text-center text-xs text-[#636A65]">
        Penggunaan instrumen PCQ-12 untuk tujuan penelitian resmi memerlukan izin pemegang hak cipta.
      </footer>

      <Toast message={toast} />
    </div>
  );
}
