import React, { useEffect, useState } from "react";
const Banner = ({ imageUrl, title, subtitle }) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image with lax */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)", // Membuat area bawah miring
        }}
      />
      {/* Text Overlay */}
      <div
        className="relative flex flex-col justify-center items-center h-full text-white text-center"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-2xl">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
