import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-auto">
      {/* Subtle separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
      
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Left side - Brand and address */}
            <div className="flex flex-col space-y-4">
              <div className="text-white text-xl font-light font-manrope">
                Stride Jr.
              </div>
              <div className="text-white/70 text-sm font-light font-manrope leading-relaxed">
                <div>M85 Street 5, Rana Park</div>
                <div> Badli, Delhi 110042</div>
                
                <div className="mt-2">
                  <a href="mailto:hello@stridejr.com" className="hover:text-white transition-colors duration-300">
                    stridejr.inc@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Quick links */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col space-y-2">
                <h4 className="text-white text-sm font-medium font-manrope mb-2">Company</h4>
                <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">About Us</a>
                <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">Careers</a>
                <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">Contact</a>
              </div>
              
              <div className="flex flex-col space-y-2">
                <h4 className="text-white text-sm font-medium font-manrope mb-2">Product</h4>
                <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">Features</a>
                <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">Pricing</a>
                <a href="#" className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">Support</a>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white/50 text-xs font-light font-manrope">
                © 2025 Stride Jr. All rights reserved.
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-white/50 text-xs font-light hover:text-white/70 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/50 text-xs font-light hover:text-white/70 transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;