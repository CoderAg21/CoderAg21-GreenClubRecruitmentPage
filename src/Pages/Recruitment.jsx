import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import ActivitiesSection from "../Components/ActivitiesSection";
import TeamsSection from "../Components/TeamsSection";
import RecruitmentForm from "../Components/RecruitmentForm";
import Footer from "../Components/Footer";
import BenefitsSection from "../Components/BenifitsSection";
export default function Recruitment() {
  const scrollToForm = () => {
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection onScrollToForm={scrollToForm} />
      <div id="about">
        <ActivitiesSection />
      </div>
      <div id="benifits">
        <BenefitsSection />
      </div>
      <div id="teams">
        <TeamsSection />
      </div>
      <RecruitmentForm />
      <Footer />
    </div>
  );
}
