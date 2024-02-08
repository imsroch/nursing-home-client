import Background from "../assets/fondo.jpg"

  function Home() {
    return (
      <div className='overflow-x-hidden relative'>
        <div className="relative">
          <img
            src={Background}
            className='object-cover absolute h-screen w-screen -z-10 top-0 left-0'
            style={{ zIndex: -10 }} 
          />
          <div className="bg-black/50 relative z-0">
            <div className='px-4 md:px-10 lg:px-20 xl:px-40 w-full md:w-[80%] h-screen flex flex-col justify-center items-center text-white space-y-5 m-auto text-center text-montserrat'>
              <span className='font-extrabold text-4xl md:text-6xl lg:text-7xl'>
                Juntos, en un espacio de respeto y dedicación para una vida en plenitud.
              </span>
              <span className='text-xl md:text-3xl font-semibold w-full md:w-[78%]'>
                Geriátrico Neuquén
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
