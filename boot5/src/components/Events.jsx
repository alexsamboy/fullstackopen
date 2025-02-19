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
                    {event.categories} Charla
                    <span class="visually-hidden">unread messages</span>
                  </span>
                  <img
                    src="https://dia.pucmm.edu.do/wp-content/uploads/2023/05/PUCMM-jpg.webp"
                    className="card-img-top object-fit-cover img-fluid h-100" alt={event.title.rendered} />
                </div>
                <div className="card-body">
                  <h5 className="card-title h6">{event.title.rendered}</h5>
                  <p className="card-text d-none"></p>
                  <ul className="list-group list-group-flush mx-n3">
                    <li className="list-group-item">{event.acf.fecha_inicio}</li>
                    <li className="list-group-item">{event.acf.ubicacion}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    {event.acf.detcampus}
                    {event.acf.status}
                    {event.acf.modalidad}
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
