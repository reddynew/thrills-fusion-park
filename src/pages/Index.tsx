
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ThrillingZones from '../components/ThrillingZones';
import UpcomingEvents from '../components/UpcomingEvents';
import Reviews from '../components/Reviews';
import SocialFeed from '../components/SocialFeed';
import Footer from '../components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ThrillingZones />
      <UpcomingEvents />
      <Reviews />
      <SocialFeed />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
