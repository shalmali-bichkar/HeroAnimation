import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "../assets/car.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    statsRef.current = [];

    // 🔤 Title animation
    gsap.fromTo(
      titleRef.current.children,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      }
    );

    // 📊 Stats animation
    gsap.fromTo(
      statsRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        delay: 0.5,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // 🚗 Scroll animation
    gsap.to(imageRef.current, {
      y: 250,
      rotate: 8,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 bg-black">
      
      {/* 🔤 Title */}
      <h1
        ref={titleRef}
        className="text-white text-3xl md:text-6xl tracking-[0.5em] flex flex-wrap justify-center text-center z-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      >
        {text.map((char, i) => (
          <span key={i}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* 📊 Stats */}
      <div className="flex gap-8 md:gap-12 mt-10 flex-wrap justify-center text-white z-20">
        {[
          { value: "90%", label: "Performance" },
          { value: "85%", label: "Efficiency" },
          { value: "95%", label: "Speed" },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => el && statsRef.current.push(el)}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              {item.value}
            </h2>
            <p className="text-sm opacity-70">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* 🚗 Car Image */}
      <img
        ref={imageRef}
        src={carImage}
        alt="car"
        className="absolute bottom-5 w-64 md:w-96 object-contain pointer-events-none z-10"
      />
    </section>
  );
};

export default Hero;