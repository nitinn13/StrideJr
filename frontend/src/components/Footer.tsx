import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-auto">
      {/* Subtle separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 sm:mb-6 md:mb-8"></div>
      
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-4 sm:pb-6 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 md:gap-8">
            
            {/* Left side - Brand and address */}
            <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 w-full lg:w-auto">
              <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-xl font-light font-manrope">
                Stride Jr.
              </div>
              <div className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light font-manrope leading-relaxed">
                <div>M85 Street 5, Rana Park</div>
                <div>Badli, Delhi 110042</div>
                
                <div className="mt-1 sm:mt-2">
                  <a href="mailto:stridejr.inc@gmail.com" className="hover:text-white transition-colors duration-300 break-all sm:break-normal">
                    stridejr.inc@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Quick links */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 w-full lg:w-auto">
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <h4 className="text-white text-xs sm:text-sm md:text-base lg:text-sm font-medium font-manrope mb-1 sm:mb-2">Company</h4>
                <a href="#" className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light hover:text-white transition-colors duration-300">About Us</a>
                <a href="#" className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light hover:text-white transition-colors duration-300">Careers</a>
                <a href="#" className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light hover:text-white transition-colors duration-300">Contact</a>
              </div>
              
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <h4 className="text-white text-xs sm:text-sm md:text-base lg:text-sm font-medium font-manrope mb-1 sm:mb-2">Product</h4>
                <a href="#" className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light hover:text-white transition-colors duration-300">Features</a>
                <a href="#" className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light hover:text-white transition-colors duration-300">Pricing</a>
                <a href="#" className="text-white/70 text-xs sm:text-sm md:text-base lg:text-sm font-light hover:text-white transition-colors duration-300">Support</a>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
              <div className="text-white/50 text-xs sm:text-xs md:text-sm lg:text-xs font-light font-manrope text-center sm:text-left">
                © 2025 Stride Jr. All rights reserved.
              </div>
              
              <div className="flex flex-col xs:flex-row space-y-1 xs:space-y-0 xs:space-x-4 sm:space-x-6 text-center sm:text-right">
                <a href="#" className="text-white/50 text-xs sm:text-xs md:text-sm lg:text-xs font-light hover:text-white/70 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/50 text-xs sm:text-xs md:text-sm lg:text-xs font-light hover:text-white/70 transition-colors duration-300">
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