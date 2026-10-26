import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Sidebar } from '../components/Sidebar';
import { AUTHORS } from '../data/posts';

export type StaticPageType = 'about' | 'contact' | 'privacy-policy' | 'terms' | 'disclaimer';

interface StaticPageProps {
  pageType: StaticPageType;
  onNavigate: (path: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ pageType, onNavigate, onSearchSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Editorial Inquiry', message: '' });

  const getPageTitle = () => {
    switch (pageType) {
      case 'about': return 'About Us';
      case 'contact': return 'Contact Us';
      case 'privacy-policy': return 'Privacy Policy';
      case 'terms': return 'Terms & Conditions';
      case 'disclaimer': return 'Disclaimer';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-5 py-4">
      <Breadcrumbs items={[{ label: getPageTitle() }]} onNavigate={onNavigate} />

      {/* Two-Column 70/30 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10">
        <main className="lg:col-span-7 min-w-0">
          <article className="bg-white hover:bg-[#FEF9C3] border-2 border-[#EAB308] hover:border-[#CA8A04] rounded-xl p-6 sm:p-10 leading-relaxed text-[#1A1A1A] shadow-xs transition-colors duration-300">
            
            {/* 1. ABOUT US PAGE */}
            {pageType === 'about' && (
              <div>
                <header className="mb-8 pb-5 border-b border-[#EAB308]">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713F12] block mb-1">
                    Editorial Mission &amp; Standards
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-3">
                    About TechForGo
                  </h1>
                  <p className="text-sm sm:text-base text-[#422006]">
                    An independent technology publication delivering rigorous architectural analysis, semiconductor teardowns, cloud scalability blueprints, and cybersecurity diagnostics.
                  </p>
                </header>

                <div className="space-y-6 text-sm text-[#1A1A1A]">
                  <section>
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">Our Purpose &amp; Editorial Intent</h2>
                    <p className="text-[#422006] mb-3">
                      Founded to bridge the widening gap between high-level tech headlines and intricate low-level systems engineering, <strong className="text-[#1A1A1A]">TechForGo</strong> provides engineers, researchers, and technology leaders with clear, peer-reviewed technical insights. We reject promotional fluff in favor of code-level examinations, verifiable benchmark methodologies, and objective architectural critiques.
                    </p>
                    <p className="text-[#422006]">
                      Whether investigating cryogenic quantum buses, Linux kernel eBPF probes, or post-quantum lattice cryptography, our articles are authored to preserve technical depth without sacrificing readability.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#EAB308]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">Core Content Commitments</h2>
                    <ul className="space-y-2.5 text-[#422006] list-disc pl-5">
                      <li>
                        <strong className="text-[#1A1A1A]">Independent Research:</strong> We maintain strict firewall separation between our editorial desk and any corporate marketing or commercial sponsorship.
                      </li>
                      <li>
                        <strong className="text-[#1A1A1A]">Reproducible Benchmarks:</strong> Performance analyses include explicit environment specifications, compiler parameters, and test harnesses.
                      </li>
                      <li>
                        <strong className="text-[#1A1A1A]">Double-Blind Peer Review:</strong> High-complexity architectural manuscripts are evaluated by at least two domain specialists prior to publication.
                      </li>
                      <li>
                        <strong className="text-[#1A1A1A]">Transparent Errata:</strong> Any factual or technical inaccuracy identified after release is corrected immediately with a public revision note.
                      </li>
                    </ul>
                  </section>

                  <section className="pt-4 border-t border-[#EAB308]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Editorial Board &amp; Senior Analysts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.values(AUTHORS).map((author) => (
                        <div key={author.id} className="p-4 border border-[#EAB308] rounded-xl bg-[#FEF08A] shadow-xs">
                          <div className="flex items-center gap-3 mb-2">
                            <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-[#CA8A04]" />
                            <div>
                              <span className="text-xs font-bold text-[#1A1A1A] block">{author.name}</span>
                              <span className="text-[11px] text-[#713F12] font-semibold">{author.role}</span>
                            </div>
                          </div>
                          <p className="text-xs text-[#422006] leading-normal">{author.bio}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* 2. CONTACT US PAGE */}
            {pageType === 'contact' && (
              <div>
                <header className="mb-8 pb-5 border-b border-[#EAB308]">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#713F12] block mb-1">
                    Direct Editorial Communication
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-2">
                    Contact Us
                  </h1>
                  <p className="text-sm text-[#422006]">
                    Have an inquiry, manuscript submission, or correction? Reach our editorial desk directly via email, phone, or our communication form below.
                  </p>
                </header>

                {/* Direct Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-5 bg-[#FEF08A] border-2 border-[#EAB308] rounded-xl shadow-xs">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0066CC] block mb-1">
                      Direct Email
                    </span>
                    <a
                      href="mailto:info@techforgo.com"
                      className="text-sm sm:text-base font-bold text-[#1A1A1A] hover:text-[#991B1B] break-all transition-colors block mb-1"
                    >
                      info@techforgo.com
                    </a>
                    <p className="text-xs text-[#422006]">
                      Monitored daily for editorial inquiries, submissions, and feedback.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FEF08A] border-2 border-[#EAB308] rounded-xl shadow-xs">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0066CC] block mb-1">
                      Telephone / WhatsApp
                    </span>
                    <a
                      href="tel:03069256639"
                      className="text-sm sm:text-base font-bold text-[#1A1A1A] hover:text-[#0066CC] transition-colors block mb-1"
                    >
                      03069256639
                    </a>
                    <p className="text-xs text-[#422006]">
                      Available during standard business hours (Mon–Fri, 9:00 AM – 6:00 PM).
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-6 bg-[#FEF08A] border-2 border-[#EAB308] rounded-xl shadow-xs">
                  <h2 className="text-lg font-bold text-[#1A1A1A] mb-1">Send a Message to Our Desk</h2>
                  <p className="text-xs text-[#422006] mb-5">
                    Fill out the form below. We typically respond within 24 to 48 business hours.
                  </p>

                  {formSubmitted ? (
                    <div className="p-4 bg-[#ECFDF5] border border-[#10B981] rounded-lg text-xs text-[#065F46] font-bold text-center">
                      &check; Thank you. Your message has been sent to info@techforgo.com. We will respond promptly.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-[#CA8A04] rounded-md text-[#1A1A1A] outline-none focus:border-[#0F172A]"
                        >
                          <option>Editorial Inquiry</option>
                          <option>Manuscript / Article Submission</option>
                          <option>Technical Correction / Errata</option>
                          <option>Copyright / DMCA Query</option>
                          <option>General Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Message</label>
                        <textarea
                          rows={5}
                          required
                          placeholder="Write your detailed inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E5E5E5] rounded outline-none focus:border-[#0066CC]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0066CC] hover:bg-[#0052A3] rounded transition-colors cursor-pointer"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* 3. PRIVACY POLICY */}
            {pageType === 'privacy-policy' && (
              <div>
                <header className="mb-8 pb-5 border-b border-[#E5E5E5]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
                    Compliance &amp; Data Protection
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-2">
                    Privacy Policy
                  </h1>
                  <p className="text-xs text-[#666666]">
                    Last Updated: October 2026 &middot; Compliant with GDPR, CCPA, and Google Publisher Policies
                  </p>
                </header>

                <div className="space-y-6 text-sm text-[#1A1A1A]">
                  <section>
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">1. Overview</h2>
                    <p className="text-[#666666]">
                      At <strong className="text-[#1A1A1A]">TechForGo</strong> (accessible via techforgo.com), the privacy of our visitors is of paramount importance. This Privacy Policy outlines the types of personal information collected and recorded by TechForGo and how we use it ethically.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">2. Information We Collect</h2>
                    <p className="text-[#666666] mb-2">
                      We collect minimal information necessary to deliver and improve our technical journalism:
                    </p>
                    <ul className="space-y-1.5 text-[#666666] list-disc pl-5">
                      <li><strong>Log Files:</strong> Standard internet log files including IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, referring/exit pages, and click counts. These are not linked to personally identifiable information.</li>
                      <li><strong>User Communications:</strong> If you contact us directly (via info@techforgo.com or our contact form), we receive your name, email address, and the contents of your message.</li>
                      <li><strong>Newsletter Subscriptions:</strong> If you voluntarily subscribe to our Weekly Technical Dispatch, we store your email address solely to deliver requested briefings.</li>
                    </ul>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">3. Cookies, Analytics, and Advertising Disclosure</h2>
                    <p className="text-[#666666] mb-2">
                      TechForGo uses standard browser cookies to store visitor preferences and optimize user experience:
                    </p>
                    <ul className="space-y-2 text-[#666666] list-disc pl-5">
                      <li>
                        <strong>Google AdSense &amp; Third-Party Vendors:</strong> Google, as a third-party vendor, uses cookies to serve ads on TechForGo. Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and other sites on the Internet.
                      </li>
                      <li>
                        <strong>User Choices &amp; Opt-Outs:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] underline">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] underline">aboutads.info</a>.
                      </li>
                      <li>
                        <strong>Browser Controls:</strong> You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
                      </li>
                    </ul>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">4. GDPR and CCPA Data Protection Rights</h2>
                    <p className="text-[#666666] mb-2">
                      We want to ensure you are fully aware of all your data protection rights. Every user is entitled to the following:
                    </p>
                    <ul className="space-y-1.5 text-[#666666] list-disc pl-5">
                      <li>The right to access – You have the right to request copies of your personal data.</li>
                      <li>The right to rectification – You have the right to request that we correct inaccurate information.</li>
                      <li>The right to erasure – You have the right to request that we erase your personal data under certain conditions.</li>
                      <li>The right to restrict processing and object to processing.</li>
                    </ul>
                    <p className="text-[#666666] mt-2">
                      To exercise any of these rights, contact us at <a href="mailto:info@techforgo.com" className="text-[#991B1B] font-semibold hover:underline">info@techforgo.com</a>.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* 4. TERMS & CONDITIONS */}
            {pageType === 'terms' && (
              <div>
                <header className="mb-8 pb-5 border-b border-[#E5E5E5]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
                    Website Usage Guidelines
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-2">
                    Terms &amp; Conditions
                  </h1>
                  <p className="text-xs text-[#666666]">
                    Effective Date: October 2026
                  </p>
                </header>

                <div className="space-y-6 text-sm text-[#1A1A1A]">
                  <section>
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">1. Agreement to Terms</h2>
                    <p className="text-[#666666]">
                      By accessing and using <strong className="text-[#1A1A1A]">TechForGo</strong>, you accept and agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you must discontinue use of the website immediately.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">2. Intellectual Property Rights</h2>
                    <p className="text-[#666666]">
                      Unless otherwise stated, TechForGo and its licensors own all intellectual property rights for all material on TechForGo. All intellectual property rights are reserved. You may view and print pages for personal, non-commercial educational use subject to restrictions set in these terms.
                    </p>
                    <p className="text-[#666666] mt-2">
                      You must not: republish material without attribution, sell or sub-license material, or duplicate content for unauthorized commercial syndication.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">3. User Comments &amp; Discussion Conduct</h2>
                    <p className="text-[#666666]">
                      Parts of this website allow users to post peer comments and queries. TechForGo reserves the right to review and remove comments deemed defamatory, abusive, offensive, or infringing on intellectual property rights.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">4. Limitation of Liability</h2>
                    <p className="text-[#666666]">
                      In no event shall TechForGo, nor its authors, editors, or contributors, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract or tort.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* 5. DISCLAIMER */}
            {pageType === 'disclaimer' && (
              <div>
                <header className="mb-8 pb-5 border-b border-[#E5E5E5]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
                    Editorial &amp; Technical Disclosures
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] mb-2">
                    Disclaimer
                  </h1>
                  <p className="text-xs text-[#666666]">
                    General Informational and Technical Disclaimer
                  </p>
                </header>

                <div className="space-y-6 text-sm text-[#1A1A1A]">
                  <section>
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">1. Educational &amp; Informational Purpose</h2>
                    <p className="text-[#666666]">
                      All content, architectural teardowns, tutorials, benchmarks, and code snippets published on <strong className="text-[#1A1A1A]">TechForGo</strong> are provided in good faith for general educational and technical informational purposes only. TechForGo makes no representations or warranties of any kind regarding the completeness, reliability, or accuracy of this information.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">2. No Engineering or Professional Advice</h2>
                    <p className="text-[#666666]">
                      The technical analyses provided do not constitute professional engineering, cybersecurity certification, or legal IT compliance consulting. Any action you take based upon the information on this website is strictly at your own risk. TechForGo will not be liable for any losses or damages in connection with the implementation of architectural patterns, scripts, or driver code discussed.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">3. External Links Disclaimer</h2>
                    <p className="text-[#666666]">
                      TechForGo may contain links to external websites that are not provided or maintained by or in any way affiliated with TechForGo. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external sites.
                    </p>
                  </section>

                  <section className="pt-4 border-t border-[#E5E5E5]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">4. Contact Information</h2>
                    <p className="text-[#666666]">
                      If you require any more information or have questions regarding our site disclaimer, please contact us via email at <a href="mailto:info@techforgo.com" className="text-[#991B1B] font-semibold hover:underline">info@techforgo.com</a> or phone at <strong className="text-[#1A1A1A]">03069256639</strong>.
                    </p>
                  </section>
                </div>
              </div>
            )}

          </article>
        </main>

        {/* 30% Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar onNavigate={onNavigate} onSearchSubmit={onSearchSubmit} />
        </div>
      </div>
    </div>
  );
};
