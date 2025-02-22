import Count from "./Count";

const Hero = ({ events }) => {
  if (!events || !events.title) {
    return (
      <div className="container py-5">
        <div className="alert alert-info" role="alert">
          Cargando evento...
        </div>
      </div>
    ); // Evita errores si events no está definido
  }
  //console.log('Hero Event', events)
  return (
    <div className="p-5 bg-body-tertiary h-75">
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col text-left">
            <div className="text-uppercase">Próxima Actividad</div>
            <div className="text-warning text-uppercase">
              {events.category_name || "Sin categoría"}
            </div>
            <h1 className="text-body-emphasis">{events.title.rendered}</h1>
            <p className="mx-auto lead">
              {events.fecha_inicio || "Fecha no disponible"}{" "}
              {events.location_name || "Ubicación no disponible"}{" "}
              {events.acf.detcampus || "Ubicación no disponible"}
            </p>
            <p className="mx-auto lead">
              {events.organizer_name || "Fecha no disponible"}
            </p>
          </div>
          <div className="col d-flex align-items-center flex-column justify-content-center">
            <Count fechaInicio={events.fecha_inicio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
