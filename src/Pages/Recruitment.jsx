import Navbar from '@/components/recruitment/Navbar';
import HeroSection from '@/components/recruitment/HeroSection';
import ActivitiesSection from '@/components/recruitment/ActivitiesSection';
import TeamsSection from '@/components/recruitment/TeamsSection';
import BenefitsSection from '@/components/recruitment/BenefitsSection';
import TimelineSection from '@/components/recruitment/TimelineSection';
import RecruitmentForm from '@/components/recruitment/RecruitmentForm';
import Footer from '@/components/recruitment/Footer';

export default function Recruitment() {
  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0A1F0D] min-h-screen">
      <Navbar />
      <HeroSection onScrollToForm={scrollToForm} />
      <div id="about">
        <ActivitiesSection />
      </div>
      <div id="teams">
        <TeamsSection />
      </div>
      <div id="benefits">
        <BenefitsSection />
      </div>
      <TimelineSection />
      <RecruitmentForm />
      <Footer />
    </div>
  );
}