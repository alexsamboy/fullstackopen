import { useState, useEffect } from "react";

const Count = ({ fechaInicio }) => {
  const obtenerFechaAhora = () => {
    return new Date()
      .toLocaleString("sv-SE", { timeZone: "America/Santo_Domingo" })
      .replace("T", " ");
  };

  const calcularTiempoRestante = () => {
    const ahora = new Date(obtenerFechaAhora()); // Fecha y hora actual con formato correcto
    const inicio = new Date(fechaInicio); // Convertimos la fecha de inicio a objeto Date
    const diferencia = inicio - ahora;

    if (diferencia <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 }; // Evento ya comenzó
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos };
  };

  const [tiempo, setTiempo] = useState(calcularTiempoRestante());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempoRestante());
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fechaInicio]);

  return (
    <div className="w-100 text-center">
      <h3>Faltan:</h3>
      <div className="row row-cols-4">
        <div className="col px-2">
          <div className="border vstack pb-2">
            <div className="display-4 w-100">{tiempo.dias}</div>
            <div className="w-100">Días</div>
          </div>
        </div>
        <div className="col px-2">
          <div className="border vstack pb-2">
            <div className="display-4 w-100">{tiempo.horas}</div>
            <div className="w-100">Horas</div>
          </div>
        </div>
        <div className="col px-2">
          <div className="border vstack pb-2">
            <div className="display-4 w-100">{tiempo.minutos}</div>
            <div className="w-100">Minutos</div>
          </div>
        </div>
        <div className="col px-2">
          <div className="border vstack pb-2">
            <div className="display-4 w-100">{tiempo.segundos}</div>
            <div className="w-100">Segundos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
