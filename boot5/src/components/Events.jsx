import Date from "./FormatDateTime";

const Events = ({ events }) => {
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {events.map((event) => (
            <div className="col" key={event.id}>
              <div className="card h-100">
                <div className="card-header p-0" style={{ height: 240 }}>
                  <span className="position-absolute top-0 end-0 m-3 p-3 badge rounded-pill bg-primary">
                    {event.category_name}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                  <img
                    src="https://dia.pucmm.edu.do/wp-content/uploads/2023/05/PUCMM-jpg.webp"
                    className="card-img-top object-fit-cover img-fluid h-100" alt={event.title.rendered} />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title h6">{event.title.rendered}</h5>
                  <p className="card-text d-none"></p>
                  <ul className="list-group list-group-flush mx-n3">
                    <li className="list-group-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                      </svg> <Date.formatDate date={event.fecha_inicio} /> <Date.formatTime12h time={event.acf.hora_de_inicio} /> <Date.formatTime12h time={event.acf.hora_termino} /></li>
                    <li className="list-group-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg> {event.location_name}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary hstack d-flex justify-content-between text-uppercase fw-normal">
                    <span>{event.acf.detcampus}</span><div className="vr"></div>
                    <span>{event.acf.status}</span><div className="vr"></div>
                    <span>{event.acf.modalidad}</span>
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
