import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../Landing/Button.jsx";
import heroImage from './images/bliss.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the home page where the nav bar is located
    navigate('/login');
  };


  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388 -top-[90px]">
            <div className="caption small-2 uppercase text-p3">
             Bliss!
            </div>
            <h2 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
            Connect, Share, and Shine
            </h2>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
            A social media app that connects people, fosters communities, and empowers authentic self-expression.            </p>
            <LinkScroll to="features" offset={-100} spy smooth>
             <div onClick={handleGetStarted}> <Button icon="/images/zap.svg">Get Started</Button></div>
            </LinkScroll>
          </div>

          <div className="absolute top-10 left-[calc(50%-120px)] w-[800px] pointer-events-none hero-img_res ">
            <img
              src={heroImage}
              className="size-99"
              alt="hero"
          
             />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
