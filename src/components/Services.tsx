import HealingIcon from '@mui/icons-material/Healing';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';

interface Service {
  icon: React.ReactElement,
  title: string,
  subtitle: string,
  roles: string[],
}

const servicesData: Service[] = [
  {
    icon: <HealingIcon className='text-white' fontSize='large' />,
    title: 'Área de Salud',
    subtitle: 'Director Médico',
    roles: ['Médico Gerontólogo', 'Enfermera Profesional', 'Enfermera 24hs.', 'Nutricionista', 'Kinesióloga'],
  },
  {
    icon: <GroupIcon className='text-white' fontSize='large' />,
    title: 'Área Preventivo Social',
    subtitle: 'Asistente Social',
    roles: ['Psicóloga', 'Musicoterapeuta', 'Yoga ó Actividad Física', 'Terapia ocupacional', "Asistente Social"],
  },
  {
    icon: <WorkIcon className='text-white' fontSize='large' />,
    title: 'Área de Servicios',
    subtitle: 'Director Administrativo',
    roles: ['Asistentes geriátricas', 'Cocinera', 'Mucamas', 'Peluquera', 'Podóloga', 'Personal de mantenimiento'],
  },
];

function Services() {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-evenly sm:w-2/3 m-auto'>
      {servicesData.map((service, index) => (
        <div key={index} className='flex flex-col items-center justify-center pt-4'>
          <div className='bg-green-700 rounded-full p-3 w-[60px] m-auto'>
            {service.icon}
          </div>
          <p className='text-center text-2xl pt-2 font-bold sm:w-auto text-black/80'>
           {service.title}
          </p>
          <div className='text-center pb-8'>
            {service.roles.map((role, i) => (
              <p key={i} className='font-semibold pt-1.5 text-black/80'>- {role}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
