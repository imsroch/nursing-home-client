import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

type FormData = {
  vinculo: string;
  contacto: string;
  salud: string;
  motivos: string;
  cobertura: string;
  cud: string;
};

const emptyForm: FormData = {
  vinculo: "",
  contacto: "",
  salud: "",
  motivos: "",
  cobertura: "",
  cud: "",
};

function Formulario() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendToSheet = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;
    if (!sheetsUrl) {
      setStatus("error");
      setErrorMessage(
        "Falta configurar VITE_GOOGLE_SHEETS_URL. Revisá el archivo .env.local."
      );
      return;
    }

    if (!formData.contacto.trim() || !formData.cud) {
      setStatus("error");
      setErrorMessage("Completá el contacto y si cuenta con CUD.");
      return;
    }

    setStatus("sending");

    const payload = {
      timestamp: new Date().toISOString(),
      vinculo: formData.vinculo.trim(),
      contacto: formData.contacto.trim(),
      salud: formData.salud.trim(),
      motivos: formData.motivos.trim(),
      cobertura: formData.cobertura.trim(),
      cud: formData.cud,
    };

    try {
      // text/plain + no-cors: patrón fiable con Google Apps Script Web Apps
      // (evita preflight CORS; la respuesta es opaca pero la fila se guarda).
      await fetch(sheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setStatus("success");
      setFormData(emptyForm);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      setStatus("error");
      setErrorMessage(
        "No pudimos enviar el formulario. Intentá de nuevo en unos minutos."
      );
    }
  };

  const buttonLabel =
    status === "sending"
      ? "ENVIANDO"
      : status === "success"
        ? "ENVIADO!"
        : "ENVIAR";

  return (
    <div className="flex flex-col items-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl text-center mb-8 sm:mb-10">
        <h1 className="text-black/80 font-bold text-3xl sm:text-5xl mb-4">
          Establecimiento Geriátrico Neuquén
        </h1>
        <p className="text-black/70 text-base sm:text-lg mb-4">
          Establecimiento geriátrico habilitado. Atención profesional y cálida,
          con tarifas accesibles.
        </p>
        <p className="text-black/70 text-sm sm:text-base leading-relaxed">
          Dirección: Dr. Gregorio Aráoz Alfaro 258, Caballito, CABA.
          <br />
          WhatsApp:{" "}
          <a
            className="text-green-800 font-semibold underline"
            href="https://wa.me/5491161504440"
            target="_blank"
            rel="noreferrer"
          >
            11-6150-4440
          </a>
          {" · "}
          Email:{" "}
          <a
            className="text-green-800 font-semibold underline"
            href="mailto:giocar.neuquen@gmail.com"
          >
            giocar.neuquen@gmail.com
          </a>
        </p>
        <p className="text-black/60 text-sm sm:text-base mt-5 leading-relaxed">
          Te ayudamos a encontrar el cuidado adecuado. Para tu tranquilidad y
          privacidad, en esta etapa inicial no solicitamos nombres, apellidos ni
          datos personales sensibles del adulto mayor ni de tu familia.
        </p>
      </div>

      <form
        onSubmit={sendToSheet}
        className="w-full max-w-xl flex flex-col gap-4 text-left"
      >
        <p className="text-black/80 font-semibold text-lg mb-1">
          Por favor, completá los siguientes datos para que podamos asesorarte:
        </p>

        <Input
          size="sm"
          type="text"
          label="1. Vínculo con el adulto mayor"
          description="Ej: Hijo/a, Sobrino/a, Cónyuge, etc."
          variant="bordered"
          value={formData.vinculo}
          onValueChange={(value) => updateField("vinculo", value)}
        />

        <Input
          isRequired
          size="sm"
          type="text"
          label="2. WhatsApp o correo electrónico"
          description="Vía de contacto exclusiva para enviarte el presupuesto y la información"
          variant="bordered"
          value={formData.contacto}
          onValueChange={(value) => updateField("contacto", value)}
        />

        <Textarea
          size="sm"
          label="3. Breve relato de su estado de salud"
          description="Mencionar nivel de movilidad, lucidez o diagnósticos relevantes"
          variant="bordered"
          minRows={3}
          value={formData.salud}
          onValueChange={(value) => updateField("salud", value)}
        />

        <Textarea
          size="sm"
          label="4. Motivos por los cuales busca residencia geriátrica"
          description="Ej: Necesidad de cuidados permanentes, rehabilitación, compañía, etc."
          variant="bordered"
          minRows={3}
          value={formData.motivos}
          onValueChange={(value) => updateField("motivos", value)}
        />

        <Input
          size="sm"
          type="text"
          label="5. Obra Social / cobertura médica / privado"
          variant="bordered"
          value={formData.cobertura}
          onValueChange={(value) => updateField("cobertura", value)}
        />

        <RadioGroup
          isRequired
          label="6. ¿Cuenta con Certificado Único de Discapacidad (CUD)?"
          orientation="horizontal"
          value={formData.cud}
          onValueChange={(value) => updateField("cud", value)}
          classNames={{ label: "text-sm text-foreground-600" }}
        >
          <Radio value="Sí">Sí</Radio>
          <Radio value="No">No</Radio>
        </RadioGroup>

        {status === "success" && (
          <p className="text-green-800 text-sm font-medium text-center">
            Gracias. Recibimos tus datos y te contactaremos a la brevedad.
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className="text-red-700 text-sm font-medium text-center">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          isLoading={status === "sending"}
          disabled={status === "sending"}
          className={`w-2/3 m-auto mt-2 ${
            status === "sending" ? "bg-green-700/50" : "bg-green-700/90"
          } text-white font-bold`}
        >
          {buttonLabel}
        </Button>
      </form>
    </div>
  );
}

export default Formulario;
