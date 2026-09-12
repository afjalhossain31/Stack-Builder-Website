import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMenu, FiX, FiStar, FiTrash2, FiCheck } from 'react-icons/fi';

export default function App() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stack, setStack] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch JSON Data
  useEffect(() => {
    fetch('/technologies.json')
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tech data:", err);
        setLoading(false);
      });
  }, []);

  // Add to Stack Handler
  const handleAddToStack = (tech) => {
    if (stack.some((item) => item.id === tech.id)) {
      toast.warning(` ${tech.name} is already in your stack!`);
      return;
    }
    setStack([...stack, tech]);
    toast.success(` Added ${tech.name} to your stack!`);
  };

  // Remove Single Item Handler
  const handleRemoveItem = (id, name) => {
    setStack(stack.filter((item) => item.id !== id));
    toast.info(` Removed ${name} from stack.`);
  };

  // Remove All Handler
  const handleRemoveAll = () => {
    if (stack.length === 0) return;
    setStack([]);
    toast.error(' Cleared all items from your stack!');
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden m-0 p-0">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Desktop Left: Brand Logo & Name */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 flex items-center text-white font-bold text-lg justify-center shadow-md">
              DS
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Dev <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">Stack</span>
            </span>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#home" className="hover:text-pink-600 transition">Home</a>
            <a href="#technologies" className="hover:text-pink-600 transition">Technologies</a>
            <a href="#projects" className="hover:text-pink-600 transition">Projects</a>
            <a href="#about" className="hover:text-pink-600 transition">About</a>
            <a href="#contact" className="hover:text-pink-600 transition">Contact</a>
          </div>

          {/* Desktop Right: Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-semibold text-slate-700 hover:text-pink-600 transition px-3 py-2">Sign In</button>
            <button 
              style={{ backgroundColor: '#D91B7E' }}
              className="text-sm font-semibold text-white px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </div>

          {/* --- MOBILE NAVBAR (Strict 3-part layout) --- */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Left: Hamburger menu icon */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 text-2xl focus:outline-none p-1">
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Center: Brand logo + Name */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 flex items-center text-white font-bold text-xs justify-center shadow">
                DS
              </div>
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Dev <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">Stack</span>
              </span>
            </div>

            {/* Right: Sign In & Sign Up buttons */}
            <div className="flex items-center gap-1.5">
              <button className="text-xs font-semibold text-slate-700 hover:text-pink-600 px-1 py-1">Sign In</button>
              <button 
                style={{ backgroundColor: '#D91B7E' }}
                className="text-xs font-semibold text-white px-3 py-1.5 rounded-full shadow"
              >
                Sign Up
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-5 space-y-3 shadow-lg">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 font-medium py-1">Home</a>
            <a href="#technologies" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 font-medium py-1">Technologies</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 font-medium py-1">Projects</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 font-medium py-1">About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 font-medium py-1">Contact</a>
          </div>
        )}
      </nav>

      {/* --- HERO / BANNER SECTION --- */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        <div className="space-y-6 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Build Your Ideal <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
              Development Stack
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed">
            Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 w-full">
            <a href="#technologies" className="px-6 sm:px-7 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 shadow-lg hover:opacity-90 transition">
              Explore Technologies
            </a>
            <a href="#about" className="px-6 sm:px-7 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition">
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Banner Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-72 sm:h-96 flex items-center justify-center p-2">
            <img
              src="./src/assets/banner-stack.png"
              alt="Banner Stack Illustration"
              className="w-full max-w-md h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT & SIDEBAR SECTION --- */}
      <section id="technologies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Explore the <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">Pick one technology per category to build your ideal stack.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Technology Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <span className="loading loading-spinner loading-lg text-pink-600"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {technologies.map((tech) => {
                  const isAdded = stack.some((item) => item.id === tech.id);
                  return (
                    <div key={tech.id} className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                      <div>
                        {/* Card Header: Icon & Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 text-pink-600 border border-slate-100">
                            {tech.badge}
                          </span>
                        </div>

                        {/* Name & Description */}
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{tech.name}</h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{tech.description}</p>

                        {/* Metadata Details */}
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 pt-3 border-t border-slate-100">
                          <span className="bg-slate-50 px-2.5 py-1 rounded-md font-medium text-slate-700">{tech.category}</span>
                          <span className="font-medium text-slate-600">{tech.difficulty}</span>
                          <span className="flex items-center gap-1 font-semibold text-amber-500">
                            <FiStar className="fill-amber-500" /> {tech.rating}
                          </span>
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddToStack(tech)}
                        disabled={isAdded}
                        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-slate-900 text-white cursor-not-allowed shadow-inner'
                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                        }`}
                      >
                        {isAdded ? <><FiCheck /> Added to Stack</> : 'Add to Stack'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Your Stack Sidebar (Sticky Panel) */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 p-6 sticky top-28 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Your Stack</h3>
            <p className="text-xs font-medium text-slate-500 mb-6">
              {stack.length} Technology Selected
            </p>

            {stack.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-xl py-12 text-center text-slate-400 text-sm mb-6">
                Your stack is empty.
              </div>
            ) : (
              <div className="space-y-3 mb-6 max-h-[350px] overflow-y-auto pr-1">
                {stack.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                        <span className="text-[10px] text-slate-500">{item.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-slate-400 hover:text-red-500 p-1 transition"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {stack.length > 0 && (
              <button
                onClick={handleRemoveAll}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <FiTrash2 /> Remove All
              </button>
            )}
          </div>

        </div>
      </section>

      {/* --- FOOTER SECTION (Responsive: Centered on Mobile, Multi-column on Desktop) --- */}
      <footer id="contact" className="w-full bg-white border-t border-slate-100 mt-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Layout (Centered stack structure matching user image) */}
          <div className="flex flex-col items-center text-center md:hidden space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 flex items-center text-white font-bold text-base justify-center shadow">
                DS
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Dev <span style={{ color: '#D91B7E' }}>Stack</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              Curated tools, technologies, and resources for developers building modern software.
            </p>

            <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-600 pt-2 pb-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">GitHub</a>
              <span className="text-slate-300">•</span>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">Twitter</a>
              <span className="text-slate-300">•</span>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">LinkedIn</a>
            </div>
          </div>

          {/* Desktop Layout (Multi-column) */}
          <div className="hidden md:grid grid-cols-5 gap-10">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 flex items-center text-white font-bold text-md justify-center">
                  DS
                </div>
                <span className="text-lg font-bold text-slate-900">Dev Stack</span>
              </div>
              <p className="text-sm text-slate-600 max-w-sm">
                Curated tools, technologies, and resources for developers building modern software.
              </p>
              <div className="flex gap-4 text-sm font-semibold text-slate-600">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">Twitter</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">LinkedIn</a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#home" className="hover:text-pink-600">Home</a></li>
                <li><a href="#technologies" className="hover:text-pink-600">Technologies</a></li>
                <li><a href="#projects" className="hover:text-pink-600">Projects</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#about" className="hover:text-pink-600">About</a></li>
                <li><a href="#contact" className="hover:text-pink-600">Contact</a></li>
                <li><a href="#careers" className="hover:text-pink-600">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#privacy" className="hover:text-pink-600">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-pink-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar (Responsive: Centered on mobile, split on desktop) */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 text-center gap-4">
            <p>© 2026 Dev Stack. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:underline">Privacy</a>
              <a href="#terms" className="hover:underline">Terms</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}