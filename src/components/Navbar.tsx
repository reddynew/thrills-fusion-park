
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
      <a href="#" className="relative z-10 flex items-center space-x-2">
  {/* Logo Image */}
  <img 
    src="/freepik__thrillsfusion-adventure-theme-park-logo-a-vintages__88164.png" 
    alt="logo" 
    className="h-20 w-20 object-contain" 
  />
  
  {/* Text */}
  <h1 className={`font-bold text-2xl md:text-3xl ${isScrolled ? 'text-br1' : 'text-secondary'}`}>
    THRILLS<span className="text-secondary">FUSION</span>
  </h1>
</a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className={`nav-link ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>
            Home
          </a>
          <a href="#thrilling-zones" className={`nav-link ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>
            Thrilling Zones
          </a>
          <a href="#reviews" className={`nav-link ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>
            Reviews
          </a>
          <a href="#social" className={`nav-link ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>
            Social
          </a>
          <a href="#about" className={`nav-link ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>
            About Us
          </a>
          <a href="#location" className={`nav-link ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>
            Location
          </a>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative z-10" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
          )}
        </button>

        {/* Mobile Navigation */}
        <div className={`fixed inset-0 bg-background/98 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a href="#home" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#thrilling-zones" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Thrilling Zones
            </a>
            <a href="#reviews" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Reviews
            </a>
            <a href="#social" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Social
            </a>
            <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </a>
            <a href="#location" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Location
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
