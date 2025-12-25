import BestSeller from "../components/BestSeller";
import HeroSection from "../components/HeroSection";
import LatestCollection from "../components/LatestCollection";
import NewsletterBox from "../components/NewsletterBox";
import OurPolicy from "../components/OurPolicy";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}
