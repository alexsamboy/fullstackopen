import { useState, useEffect } from "react";

const Count = ({ fechaInicio, onCountdownEnd }) => {
  const obtenerFechaAhora = () => {
    return new Date()
      .toLocaleString("sv-SE", { timeZone: "America/Santo_Domingo" })
      .replace("T", " ");
  };

  const calcularTiempoRestante = () => {
    const ahora = new Date(obtenerFechaAhora());
    const inicio = new Date(fechaInicio);
    const diferencia = inicio - ahora;

    if (diferencia <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 }; // Evento ya comenzó
    }

    return {
      dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
      segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
    };
  };

  const [tiempo, setTiempo] = useState(calcularTiempoRestante());

  useEffect(() => {
    const intervalo = setInterval(() => {
      const nuevoTiempo = calcularTiempoRestante();
      setTiempo(nuevoTiempo);

      if (
        nuevoTiempo.dias === 0 &&
        nuevoTiempo.horas === 0 &&
        nuevoTiempo.minutos === 0 &&
        nuevoTiempo.segundos === 0
      ) {
        clearInterval(intervalo);
        if (onCountdownEnd) onCountdownEnd(); // Notificar que terminó el contador
      }
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
