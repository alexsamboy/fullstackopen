import React from "react";

const ICalGenerator = ({ events }) => {
  // Convierte la fecha a formato iCal
  const formatDate = (date) => {
    return (
      new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    );
  };

  // Función para generar el archivo .ics
  const generateICal = () => {
    const eventList = Array.isArray(events) ? events : [events];

    if (!eventList || eventList.length === 0) {
      alert("No hay eventos disponibles para exportar.");
      return;
    }

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PUCMM DÍA A DÍA//Agenda//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:America/Santo_Domingo
TZOFFSETFROM:-0400
TZOFFSETTO:-0400
TZNAME:AST
END:VTIMEZONE`;

    eventList.forEach((event) => {
      const title = event.title.rendered;
      const startDate = formatDate(event.fecha_inicio);
      const endDate = formatDate(event.fecha_termino);
      const eventType =
        event.acf.modalidad === "Presencial"
          ? "Presencial"
          : event.tipo === "Online"
          ? "Online"
          : event.tipo === "Híbrido"
          ? "Híbrido (Presencial + Online)"
          : "Desconocido";

      const description = event.description
        ? event.description.replace(/\n/g, "\\n")
        : "Sin descripción";

      icsContent += `
BEGIN:VEVENT
UID:${event.id}@dia.pucmm.edu.do
DTSTAMP:${startDate}
DTSTART;TZID=America/Santo_Domingo:${startDate}
DTEND;TZID=America/Santo_Domingo:${endDate}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${event.location || "Ubicación no especificada"}
URL:dia.pucmm.edu.do/${event.id || ""}
CATEGORIES:${event.category_name} - ${eventType}
STATUS:CONFIRMED
ORGANIZER;CN=${event.organizer_name}:MAILTO:${event.organizer_email || ""}
PRIORITY:3
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Recordatorio: ${event.category_name}
END:VALARM
END:VEVENT`;
    });

    icsContent += `\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    // Determinar nombre del archivo según si es un evento o varios
    const fileName =
      eventList.length === 1
        ? `${eventList[0].title.rendered}.ics`
        : "Agenda-PUCMM-Dia-a-Dia.ics";

    // Crear y hacer clic en el enlace de descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={generateICal}
      className="btn btn-primary text-white px-2 py-1 rounded"
    >
      📅 {Array.isArray(events) ? "Agendar todos" : "Agendar"}
    </button>
  );
};

export default ICalGenerator;
