import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedProjects from "../components/FeaturedProjects";
import WhyChoose from "../components/WhyChoose";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <FeaturedProjects />
      <WhyChoose />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;