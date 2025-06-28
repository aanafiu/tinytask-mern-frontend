const Hero = () => {
    return (
      <section className="hero relative h-[90vh]">
  
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h4 className=" text-Light text-md font-Main uppercase font-bold tracking-widest mb-2">
            Smart Earning
          </h4>
  
          <h1 className="text-Gold text-4xl md:text-6xl font-extrabold leading-tight">
            FOR GAMING & TASKING
          </h1>
  
          <p className="text-Light max-w-2xl mt-4 text-base font-Main md:text-lg">
            Play, Invest, Exchange and join the Contest with high rewards at TinyTask!
          </p>
  
          <button className="mt-6 bg-Gold hover:bg-Muted hover:text-Gold text-Muted font-semibold font-Main px-6 py-3 rounded-full transition">
            Get Started Now
          </button>
        </div>
      </section>
    );
  };
  
  export default Hero;
  