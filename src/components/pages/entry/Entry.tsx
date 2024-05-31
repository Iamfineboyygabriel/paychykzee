import About from "../../contents/about-us/About";
import ContactUs from "../../contents/contact/ContactUs";
import { Footer } from "../../contents/footer/Footer";
import GetStated from "../../contents/get-started/GetStated";
import HeroSection from "../../contents/hero-section/HeroSection";
import Navbar from "../../contents/navbar/Navbar";
import OurServices from "../../contents/our-services/OurServices";

const Entry = () => {
  return (
    <>
      <div>
        <Navbar />
        <HeroSection />
        <div id="about-us">
          <About />
        </div>
        <div id="services">
          <OurServices />
        </div>
        <GetStated />
        <div id="contact-us">
          <ContactUs />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Entry;
