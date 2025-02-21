const Banner = () => {
    return (
      <section 
        className="bg-[rgb(28,37,54)] bg-no-repeat bg-top bg-cover text-gray-200 py-28 mt-16"
        style={{ backgroundImage: "url('https://account.zunoy.com/assets/gradient-bg.svg')" }}
      >
        <div className="text-center max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start saving time today!
          </h2>
          <p className="text-[18px] mb-6">
            Not just a set of tools, the package includes ready-to-deploy conceptual applications 
            written in JavaScript & TypeScript.
          </p>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-lg font-semibold transition">
            Purchase Now
          </button>
        </div>
      </section>
    );
  };
  
  export default Banner;
  