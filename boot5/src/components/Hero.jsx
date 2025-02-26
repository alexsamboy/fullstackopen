import Count from "./Count";
import Date from "./FormatDateTime";

const Hero = ({ events, onCountdownEnd }) => {
  if (!events || !events.title) {
    return (
      <div className="container py-5">
        <div className="alert alert-info" role="alert">
          Cargando evento...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 p-sm-5 bg-body-tertiary h-75">
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col text-left">
            <div className="text-uppercase">Próxima Actividad</div>
            <div className="text-warning text-uppercase">
              {events.category_name || "Sin categoría"}
            </div>
            <h1 className="text-body-emphasis">{events.title.rendered}</h1>
            <p className="mx-auto lead">
              <Date.formatDate date={events.fecha_inicio} />{" "}
              <Date.formatTime12h time={events.acf.hora_de_inicio} />{" "}
              <Date.formatTime12h time={events.acf.hora_termino} />{" "}                   
              {events.location_name || "Ubicación no disponible"}{" "}
              {events.acf.detcampus || "Ubicación no disponible"}
            </p>
            <p className="mx-auto lead">
              {events.organizer_name || "Fecha no disponible"}
            </p>
          </div>
          <div className="col d-flex align-items-center flex-column justify-content-center">
            <Count fechaInicio={events.fecha_inicio} onCountdownEnd={onCountdownEnd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
