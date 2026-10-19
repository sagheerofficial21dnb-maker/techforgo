import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#FEE2E2] border-t-2 border-[#FCA5A5] pt-14 pb-10 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Column 1: Brand & Editorial Mission */}
          <div className="md:col-span-2 pr-0 md:pr-8">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 mb-4 cursor-pointer group text-left"
              aria-label="TechForGo Home"
            >
              <img
                src="/favicon.svg"
                alt="TechForGo Site Logo"
                className="w-10 h-10 rounded-lg drop-shadow-sm group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center tracking-tight leading-none text-2xl font-black">
                  <span className="text-[#991B1B] tracking-tight">TECH</span>
                  <span className="text-[#1A1A1A] tracking-tight">FORGO</span>
                  <span className="w-2 h-2 rounded-full bg-[#DC2626] ml-1.5 inline-block"></span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#7F1D1D] mt-1">
                  Technology &amp; Computing Insights
                </span>
              </div>
            </button>
            <p className="text-[13px] leading-relaxed text-[#4C0519] mb-4 max-w-lg">
              TechForGo is an independent peer-reviewed technology journal delivering in-depth architectural analysis, hardware benchmarks, cybersecurity diagnostics, and cloud infrastructure teardowns for engineers and researchers.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#991B1B]">
              <span className="font-semibold">ISSN 2831-9042</span>
              <span aria-hidden="true">&middot;</span>
              <span>Open Editorial Board</span>
              <span aria-hidden="true">&middot;</span>
              <span>San Francisco &amp; London</span>
            </div>
          </div>

          {/* Column 2: Subject Areas */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#7F1D1D] mb-4">
              Coverage Tracks
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#1A1A1A]">
              <li>
                <button
                  onClick={() => onNavigate('/category/artificial-intelligence')}
                  className="hover:text-[#991B1B] transition-colors cursor-pointer text-left"
                >
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/category/cloud-infrastructure')}
                  className="hover:text-[#991B1B] transition-colors cursor-pointer text-left"
                >
                  Cloud &amp; DevOps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/category/cybersecurity')}
                  className="hover:text-[#991B1B] transition-colors cursor-pointer text-left"
                >
                  Cyber Defense
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/category/hardware-architecture')}
                  className="hover:text-[#991B1B] transition-colors cursor-pointer text-left"
                >
                  Hardware Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/category/software-engineering')}
                  className="hover:text-[#991B1B] transition-colors cursor-pointer text-left"
                >
                  Software Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact & Editorial Office */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#7F1D1D] mb-4">
              Editorial Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#4C0519] leading-relaxed mb-4">
              <p>
                <strong className="text-[#1A1A1A] block font-bold">Email Desk:</strong>
                <a href="mailto:sagheerofficial21dnb@gmail.com" className="text-[#991B1B] font-bold hover:underline break-all">
                  sagheerofficial21dnb@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-[#1A1A1A] block font-bold">Phone / Helpline:</strong>
                <a href="tel:03069256639" className="text-[#1A1A1A] font-bold hover:text-[#991B1B]">
                  03069256639
                </a>
              </p>
              <p>
                <strong className="text-[#1A1A1A] block font-bold">Newsroom Hours:</strong>
                <span>Mon–Fri: 9:00 AM – 6:00 PM</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate('/contact')}
                className="text-xs font-black text-[#991B1B] hover:text-[#7F1D1D] hover:underline cursor-pointer"
              >
                Send Editorial Message &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Complete Legal Links */}
        <div className="pt-6 border-t border-[#FCA5A5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7F1D1D]">
          <div className="font-medium">
            &copy; {currentYear} TechForGo. All editorial rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-semibold text-[#1A1A1A]">
            <button
              onClick={() => onNavigate('/about')}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={() => onNavigate('/contact')}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={() => onNavigate('/disclaimer')}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
