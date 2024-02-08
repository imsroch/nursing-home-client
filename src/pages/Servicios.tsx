import Services from "../components/Services"

function Servicios() {
  return (
    <div className="sm:py-20">
        <h2 className="text-black/80 font-bold text-3xl px-4 sm:px-0 sm:text-5xl text-center pt-8 pb-8 sm:pb-12">Nuestro plan de trabajo.</h2>        
        <p className="text-center px-4 sm:px-0 sm:w-2/5 m-auto pb-8 sm:pb-24">Descubrí nuestro enfoque integral para el bienestar de nuestros residentes, donde fusionamos cuidados médicos, atención enfermera, asesoramiento nutricional y terapias físicas. Nuestro plan de trabajo incluye un abordaje psicológico y social, ofreciendo tratamientos especializados y talleres que se adaptan a las necesidades individuales. Las actividades del Área Psicológica/Social pueden ser individuales, familiares, grupales o comunitarias, diseñadas con objetivos específicos para abordar desafíos particulares, brindar orientación y contención. Este enfoque interdisciplinario se refleja en nuestras reuniones mensuales de Equipo Interdisciplinario, donde los directivos médicos y administrativos colaboran para garantizar una atención personalizada y efectiva para cada residente.</p>
        <Services />
    </div>
  )
}

export default Servicios