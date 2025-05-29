import React from 'react';
import HeroSection        from '../components/home/HeroSection';
import StorySection       from '../components/home/StorySection';
import TestimonialSection from '../components/home/TestimonialSection';
import ContactSection     from '../components/home/ContactSection';


export default function Home() {
    return (
        <>
            <HeroSection />

            <StorySection />

            <TestimonialSection />

            <ContactSection />
        </>
    );
}
