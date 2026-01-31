// ═══════════════════════════════════════════════════════════
// SUREVIA WEBSITE - PART 1: COMPONENTS
// ═══════════════════════════════════════════════════════════

// Onboarding Screen Component
const OnboardingScreen = ({ userName }) => {
  const { Shield } = window.lucide;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-rose-600 to-red-600 flex items-center justify-center px-6">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="animate-bounce-slow">
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl">
            <Shield size={64} className="text-red-600" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Welcome, {userName}! 🎉
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 font-semibold">
            Welcome to SureVia
          </p>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your journey to clear, confident coverage starts now. We're here to guide you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

// Auth Screen Component
const AuthScreen = ({ isSignUp, setIsSignUp, setShowAuth, setIsLoggedIn, setUserData, setShowOnboarding, isMobileView }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      setUserData({ name: formData.name, email: formData.email });
      setIsLoggedIn(true);
      setShowAuth(false);
      setShowOnboarding(true);
    } else {
      if (!formData.email || !formData.password) {
        setError('Please enter email and password');
        return;
      }
      
      setUserData({ name: 'User', email: formData.email });
      setIsLoggedIn(true);
      setShowAuth(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-6 ${!isMobileView && 'desktop-view'}`}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-red-600 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-3xl">S</span>
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-2">
              {isSignUp ? 'Join Surevia' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isSignUp ? 'Create your account and get started' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter password"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Confirm password"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-red-600 hover:text-red-700 font-bold"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <button
            onClick={() => setShowAuth(false)}
            className="mt-6 w-full text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

// Coverage Detail Screen Component
const CoverageDetailScreen = ({ coverage, setSelectedCoverage, isMobileView }) => {
  const { ArrowLeft } = window.lucide;
  const [currentSection, setCurrentSection] = React.useState(0);
  const sections = 4;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const coverageDetails = {
    Health: {
      sections: [
        { title: "Complete Coverage", desc: "Full medical, dental, and vision protection", icon: "🏥" },
        { title: "Preventive Care", desc: "Annual checkups and screenings included", icon: "✅" },
        { title: "Emergency Support", desc: "24/7 emergency care coverage", icon: "🚑" },
        { title: "Family Plans", desc: "Flexible options for your whole family", icon: "👨‍👩‍👧‍👦" }
      ]
    },
    Auto: {
      sections: [
        { title: "Collision Coverage", desc: "Protection for vehicle damage", icon: "🚗" },
        { title: "Liability Protection", desc: "Coverage for injuries and damages", icon: "🛡️" },
        { title: "Roadside Assistance", desc: "24/7 emergency road support", icon: "🔧" },
        { title: "Rental Reimbursement", desc: "Car rental coverage during repairs", icon: "🔑" }
      ]
    },
    Life: {
      sections: [
        { title: "Term Life", desc: "Affordable coverage for set periods", icon: "📅" },
        { title: "Whole Life", desc: "Lifelong protection and savings", icon: "💼" },
        { title: "Family Benefits", desc: "Secure your family's future", icon: "❤️" },
        { title: "Easy Claims", desc: "Simple process when it matters most", icon: "📋" }
      ]
    },
    Business: {
      sections: [
        { title: "Liability Coverage", desc: "Protection for your business operations", icon: "🏢" },
        { title: "Property Insurance", desc: "Coverage for equipment and assets", icon: "📦" },
        { title: "Employee Benefits", desc: "Health and wellness for your team", icon: "👥" },
        { title: "Business Interruption", desc: "Income protection during disruptions", icon: "📊" }
      ]
    }
  };

  const details = coverageDetails[coverage.name] || coverageDetails.Health;
  const Icon = coverage.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-red-50 to-rose-50 pb-24 ${!isMobileView && 'desktop-view'}`}>
      <div className="bg-white border-b border-red-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedCoverage(null)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg ${coverage.color} flex items-center justify-center`}>
              <Icon size={20} />
            </div>
            <span className="font-bold text-gray-800">{coverage.name} Insurance</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
          What's Included
        </h2>
        
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl" style={{ height: '420px' }}>
          <div 
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentSection * 100}%)` }}
          >
            {details.sections.map((section, idx) => (
              <div
                key={idx}
                className="min-w-full h-full flex items-center justify-center px-8"
              >
                <div className="text-center max-w-md">
                  <div className="text-7xl mb-6">{section.icon}</div>
                  <h3 className="text-3xl font-bold text-red-600 mb-4">
                    {section.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {section.desc}
                  </p>
                  <div className="mt-6 inline-block bg-red-100 text-red-600 px-6 py-2 rounded-full font-bold text-sm">
                    {idx + 1} of {sections}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSection(idx)}
                className={`h-3 rounded-full transition-all ${
                  currentSection === idx ? 'w-12 bg-red-600 shadow-lg' : 'w-3 bg-red-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose {coverage.name} with Surevia?</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✓</span>
              <span>Clear pricing with no hidden fees</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✓</span>
              <span>24/7 customer support when you need it</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✓</span>
              <span>Easy claims process with quick turnaround</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✓</span>
              <span>Flexible plans that grow with you</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
            Get {coverage.name} Coverage
          </button>
          <p className="mt-4 text-gray-500 text-sm">No pressure. Take your time to decide.</p>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ setShowDashboard, userData, setIsLoggedIn, setUserData, isMobileView }) => {
  const { Home, Shield, FileText, HelpCircle } = window.lucide;
  const [activeSection, setActiveSection] = React.useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'coverage', label: 'My Coverage', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setShowDashboard(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 ${!isMobileView && 'desktop-view'}`}>
      <div className="bg-white border-b border-red-100 px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="text-2xl font-bold text-red-600">SUREVIA</div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowDashboard(false)}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Home
            </button>
            <button 
              onClick={handleSignOut}
              className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, {userData?.name || 'Friend'}! 👋
          </h1>
          <p className="text-white/90 text-lg">Everything you need, clearly in one place.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2 sticky top-24">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            {activeSection === 'overview' && (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
                    <div className="text-sm text-gray-500 mb-2 font-bold">Active Policies</div>
                    <div className="text-4xl font-bold text-red-600">3</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-rose-500">
                    <div className="text-sm text-gray-500 mb-2 font-bold">Total Coverage</div>
                    <div className="text-4xl font-bold text-red-600">$450K</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
                    <div className="text-sm text-gray-500 mb-2 font-bold">Next Payment</div>
                    <div className="text-4xl font-bold text-red-600">Feb 15</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-red-600">Your Coverage</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Health Insurance', status: 'Active', premium: '$280/mo', color: 'bg-red-100 text-red-600' },
                      { name: 'Auto Insurance', status: 'Active', premium: '$120/mo', color: 'bg-rose-100 text-rose-600' },
                      { name: 'Life Insurance', status: 'Active', premium: '$65/mo', color: 'bg-pink-100 text-pink-600' }
                    ].map((policy, idx) => (
                      <div key={idx} className="flex items-center justify-between p-5 rounded-xl hover:bg-red-50 transition-colors border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${policy.color} flex items-center justify-center font-bold`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{policy.name}</div>
                            <div className="text-sm text-gray-500">{policy.status}</div>
                          </div>
                        </div>
                        <div className="text-red-600 font-bold text-lg">{policy.premium}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeSection !== 'overview' && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-red-300 mb-4">
                  {React.createElement(navItems.find(item => item.id === activeSection).icon, { size: 64, className: "mx-auto" })}
                </div>
                <h3 className="text-3xl font-bold text-red-600 mb-2">
                  {navItems.find(item => item.id === activeSection)?.label}
                </h3>
                <p className="text-gray-600 text-lg">This section is ready for your content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
