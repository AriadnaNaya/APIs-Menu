// frontend/src/pages/Home.jsx
import React from 'react';
import HeroSection        from '../components/home/HeroSection';
import FeaturedSection    from '../components/home/FeaturedSection';
import StorySection       from '../components/home/StorySection';
import TestimonialSection from '../components/home/TestimonialSection';
import ReservaSection     from '../components/home/ReservaSection';

export default function Home() {
    return (
        <>
            <HeroSection />

            <StorySection />

            <TestimonialSection />

            <FeaturedSection />
            
            <ReservaSection />

        </>
    );
}
