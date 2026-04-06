import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current = [];

    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const cards = [
    {
      title: "Fast Performance",
      desc: "Optimized animations and smooth UI transitions.",
    },
    {
      title: "Clean Design",
      desc: "Minimal and modern interface for better UX.",
    },
    {
      title: "Scroll Animations",
      desc: "Interactive scroll-based motion using GSAP.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#fff355] flex flex-col items-center justify-center px-6 py-20"
    >
      <h2 className="text-5xl font-semibold mb-12 text-black">Features</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => el && cardsRef.current.push(el)}
            className="bg-black p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-white"
          >
            <h3 className="text-xl font-bold mb-3">
              {card.title}
            </h3>
            <p className="text-sm opacity-70">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;