// frontend/src/pages/Home.jsx
import React from 'react';
import HeroSection        from '../components/home/HeroSection';
import StorySection       from '../components/home/StorySection';
import TestimonialSection from '../components/home/TestimonialSection';

export default function Home() {
    return (
        <>
            <HeroSection />

            <StorySection />

            <TestimonialSection />

        </>
    );
}
