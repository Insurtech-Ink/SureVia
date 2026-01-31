// ═══════════════════════════════════════════════════════════
// SUREVIA WEBSITE - PART 2: MAIN APP
// ═══════════════════════════════════════════════════════════

const SureviaWebsite = () => {
  const { Menu, X, ChevronRight, Shield, Heart, Car, Briefcase, Monitor, Smartphone } = window.lucide || {};
  
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showDashboard, setShowDashboard] = React.useState(false);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(true);
  const [userData, setUserData] = React.useState(null);
  const [selectedCoverage, setSelectedCoverage] = React.useState(null);
  const [isMobileView, setIsMobileView] = React.useState(true);

  const heroSlides = 3;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heroContent = [
    { text: "Insurance, without the confusion." },
    { text: "A clearer way to be covered." },
    { text: "We guide. You decide." }
  ];

  const scrollingPhrases = [
    "Clear coverage", "Calm decisions", "No pressure",
    "Built for you", "Simple. Secure. Sure.", "Guidance first"
  ];

  const products = [
    { icon: Heart, name: "Health", color: "bg-red-50 text-red-600", bgImage: SUREVIA_IMAGES.healthBg, description: "Comprehensive health coverage for you and your family" },
    { icon: Car, name: "Auto", color: "bg-rose-50 text-rose-600", bgImage: SUREVIA_IMAGES.autoBg, description: "Protection on the road, peace of mind everywhere" },
    { icon: Shield, name: "Life", color: "bg-pink-50 text-pink-600", bgImage: SUREVIA_IMAGES.lifeBg, description: "Secure your family's future with confidence" },
    { icon: Briefcase, name: "Business", color: "bg-orange-50 text-orange-600", bgImage: SUREVIA_IMAGES.businessBg, description: "Protect what you've built, grow with assurance" }
  ];

  React.useEffect(() => {
    if (showOnboarding && userData) {
      const timer = setTimeout(() => {
        setShowOnboarding(false);
        setShowDashboard(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding, userData]);

  if (showOnboarding && userData) {
    return <OnboardingScreen userName={userData.name} />;
  }

  if (showAuth) {
    return (
      <AuthScreen 
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        setShowAuth={setShowAuth}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
        setShowOnboarding={setShowOnboarding}
        isMobileView={isMobileView}
      />
    );
  }

  if (selectedCoverage) {
    return (
      <CoverageDetailScreen 
        coverage={selectedCoverage}
        setSelectedCoverage={setSelectedCoverage}
        isMobileView={isMobileView}
      />
    );
  }

  if (showDashboard && userData) {
    return (
      <Dashboard 
        setShowDashboard={setShowDashboard}
        userData={userData}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
        isMobileView={isMobileView}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 font-sans antialiased ${!isMobileView && 'desktop-view'}`}>
      <button
        onClick={() => setIsMobileView(!isMobileView)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all"
      >
        {isMobileView ? <Monitor size={24} /> : <Smartphone size={24} />}
      </button>

      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-red-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-wide text-red-600">SUREVIA</div>
              <div className="text-xs text-red-500 tracking-wider">A BETTER WAY TO BE COVERED</div>
            </div>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-red-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
              <button 
                onClick={() => { 
                  if (isLoggedIn) { setShowDashboard(true); } 
                  else { setShowAuth(true); setIsSignUp(false); }
                  setMenuOpen(false); 
                }}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-all text-gray-700 font-medium"
              >
                Dashboard
              </button>
              <button 
                onClick={() => { 
                  setShowAuth(true);
                  setIsSignUp(!isLoggedIn);
                  setMenuOpen(false); 
                }}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-all text-gray-700 font-medium"
              >
                {isLoggedIn ? 'Sign Out' : 'Sign In / Sign Up'}
              </button>
              <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-all text-gray-700 font-medium">
                Help / Support
              </button>
              <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-all text-gray-700 font-medium">
                About Surevia
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="mt-16 relative h-screen overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroContent.map((slide, idx) => (
            <div key={idx} className="min-w-full h-full relative flex items-end pb-32">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${SUREVIA_IMAGES[`heroSlide${idx + 1}`]})`,
                  backgroundColor: '#f5f5f5'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              <div className="relative z-10 w-full px-6 text-center">
                <h1 className="text-4xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight drop-shadow-2xl mb-4">
                  {slide.text}
                </h1>
                <p className="text-white/90 text-xl md:text-2xl font-medium drop-shadow-lg">
                  {idx === 0 && "Clear. Simple. Sure."}
                  {idx === 1 && "Your protection, simplified."}
                  {idx === 2 && "Take your time. We're here to help."}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-3 rounded-full transition-all ${
                currentSlide === idx ? 'w-16 bg-white shadow-lg' : 'w-3 bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <div className="text-white/70 text-sm font-medium animate-bounce">
            Scroll to explore ↓
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 border-y border-red-700 overflow-hidden py-4 shadow-inner">
        <div className="flex animate-scroll-fast whitespace-nowrap">
          {[...scrollingPhrases, ...scrollingPhrases, ...scrollingPhrases].map((phrase, idx) => (
            <span key={idx} className="mx-8 text-base font-semibold text-white tracking-wide">
              ✦ {phrase} ✦
            </span>
          ))}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-relaxed">
              Surevia helps you understand, choose, and manage insurance that fits your life — without pressure or confusion.
            </h2>
            <p className="text-gray-600 text-lg">
              We believe insurance should be clear, accessible, and human.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-red-100 via-rose-100 to-pink-100 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
              <Shield size={100} className="text-red-600 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-red-50 to-rose-50 py-20 rounded-3xl mx-6 shadow-inner">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-red-600">
            How it works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", text: "Tell us what you need", icon: "📝" },
              { step: "2", text: "See clear options", icon: "👁️" },
              { step: "3", text: "Choose at your pace", icon: "⏱️" },
              { step: "4", text: "Stay covered with confidence", icon: "✅" }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {item.icon}
                  </div>
                  <div className="text-sm text-red-600 font-bold mb-2">STEP {item.step}</div>
                  <p className="text-gray-700 leading-relaxed font-medium">{item.text}</p>
                </div>
                {idx < 3 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-red-300" size={28} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-red-600">
          Coverage that fits your life
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <div
                key={idx}
                onClick={() => setSelectedCoverage(product)}
                className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group h-64"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundImage: `url(${product.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-500/20" />
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-20 h-20 rounded-2xl ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{product.description}</p>
                  </div>
                  <div className="flex items-center text-red-600 font-bold">
                    Learn more <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-br from-red-600 to-rose-600 py-32 rounded-3xl mx-6 shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-relaxed drop-shadow-lg">
            Insurance shouldn't feel stressful.
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-white/90">
            It should feel clear — long before you need it.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <button 
          onClick={() => {
            setShowAuth(true);
            setIsSignUp(true);
          }}
          className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-16 py-6 rounded-full text-xl font-bold hover:from-red-700 hover:to-rose-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          Get started calmly
        </button>
        <p className="mt-6 text-gray-600 text-base font-medium">No pressure. No confusion. Just clarity.</p>
      </section>

      <footer className="bg-gradient-to-br from-gray-50 to-red-50 border-t border-red-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-red-600">SUREVIA</div>
            <p className="text-gray-600 italic font-medium">A better way to be covered.</p>
            <div className="flex justify-center gap-8 pt-4">
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">About</a>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Support</a>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Privacy</a>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Terms</a>
            </div>
            <div className="pt-6 border-t border-red-200 mt-6 space-y-2">
              <p className="text-gray-600 text-sm">
                © 2026 Surevia. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Designed by <span className="text-red-600 font-bold">RotoInk</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SureviaWebsite />);
