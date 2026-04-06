import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "../assets/car.png"; // 👈 make sure this exists

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    // reset refs (important)
    statsRef.current = [];

    // 🎬 Headline animation (letters stagger)
    gsap.from(titleRef.current.children, {
      opacity: 0,
      y: 60,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out",
    });

    // 📊 Stats animation
    gsap.from(statsRef.current, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      delay: 0.5,
      duration: 0.8,
      ease: "power2.out",
    });

    // 🚗 Scroll animation (SMOOTH)
    gsap.to(imageRef.current, {
      y: 250,
      rotate: 8,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true, // 🔥 key for smooth scroll sync
      },
    });

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
      
      <h1
        ref={titleRef}
        className="text-3xl md:text-6xl tracking-[0.5em] flex flex-wrap justify-center text-center"
      >
        {text.map((char, i) => (
          <span key={i}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* 📊 Stats */}
      <div className="flex gap-8 md:gap-12 mt-10 flex-wrap justify-center">
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

      {/* 🚗 Image (from assets) */}
      <img
        ref={imageRef}
        src={carImage}
        alt="car"
        className="absolute bottom-5 w-64 md:w-96 object-contain pointer-events-none"
      />
    </section>
  );
};

export default Hero;