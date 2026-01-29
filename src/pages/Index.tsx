import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ClassesSection from "@/components/landing/ClassesSection";
import ActivitiesSection from "@/components/landing/ActivitiesSection";
import TeachersSection from "@/components/landing/TeachersSection";
import GallerySection from "@/components/landing/GallerySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import EnrollmentModal from "@/components/landing/EnrollmentModal";

const Index = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onEnrollClick={() => setIsEnrollmentOpen(true)} />
      <HeroSection onEnrollClick={() => setIsEnrollmentOpen(true)} />
      <AboutSection />
      <ClassesSection />
      <ActivitiesSection />
      <TeachersSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection onEnrollClick={() => setIsEnrollmentOpen(true)} />
      <ContactSection />
      <Footer />
      <EnrollmentModal 
        isOpen={isEnrollmentOpen} 
        onClose={() => setIsEnrollmentOpen(false)} 
      />
    </div>
  );
};

export default Index;
