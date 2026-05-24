import { HeaderSection } from "@/sections/header/header-section";
import { HeroSection } from "@/sections/hero/hero-section";
import { WorkSection } from "@/sections/work/work-section";
import { ExperienceSection } from "@/sections/experience/experience-section";
import { ContactSection } from "@/sections/contact/contact-section";

export default function Home() {
  return (
    <main className="flex w-full flex-col py-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-[640px] flex-col px-5">
        <HeaderSection />
        <HeroSection />
      </div>
      <WorkSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
