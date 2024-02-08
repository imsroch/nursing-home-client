import {Button, Input, Textarea} from "@nextui-org/react";
import  { useState } from 'react';

function Contacto() {
    const [estadoBoton, setEstadoBoton] = useState('ENVIAR');
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setEstadoBoton('ENVIANDO');
        setIsLoading(true);

        setTimeout(() => {
        setEstadoBoton('ENVIADO!');
        setIsLoading(false);
        }, 2000);

        setTimeout(() => {
        setEstadoBoton('ENVIAR');
        }, 4000);
    };
  return (
    <div className="text-center flex flex-col items-center justify-center h-[841px] ">
        <h2 className="text-black/80 font-bold text-4xl sm:text-5xl mb-12 sm:mb-28">Contactános</h2>
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
           <div className="flex w-full px-8 sm:px-0 sm:w-2/6 flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input size="sm" type="text" label="Nombre Completo" variant="bordered"/>
                <Input isRequired size="sm" type="email" label="Email" variant="bordered" />
                <Input size="sm" type="text" label="Teléfono" variant="bordered" />
                <Textarea isRequired size="sm" type="text" label="Consulta" variant="bordered" />
                <Button
                    isLoading={isLoading}
                    className={`w-2/3 m-auto ${estadoBoton === 'ENVIANDO' ? 'bg-green-700/50' : 'bg-green-700/90'} text-white font-bold`}
                    onClick={handleClick}
                    disabled={isLoading}
                    >
                    {estadoBoton}
                </Button>
            </div>
            <iframe className="h-[330px] sm:w-[600px] " src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3283.527435998273!2d-58.4359707353868!3d-34.61610936447341!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca4180e4bec9%3A0x9b4bd5d87c109119!2sEstablecimiento%20Geri%C3%A1trico%20Neuqu%C3%A9n!5e0!3m2!1ses!2sar!4v1707244939232!5m2!1ses!2sar" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>  
    </div>
  )
}

export default Contacto