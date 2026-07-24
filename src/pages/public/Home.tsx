import React from 'react';
import Hero from '@/components/sections/Hero';
import Statistics from '@/components/sections/Statistics';
import BlogSection from '@/components/sections/Blog';
import Pricing from '@/components/sections/Pricing';
import CTA from '@/components/sections/CTA';
import FAQ from '@/components/sections/FAQ';

const Home: React.FC = () => (
  <div>
    <Hero />
    <Statistics />
    <BlogSection />
    <Pricing />
    <FAQ />
    <CTA />
  </div>
);

export default Home;
