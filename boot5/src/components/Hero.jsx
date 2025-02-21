const Hero = ({ event }) => {
    console.log('Evento Actual', event)
    return (
        <>
            <div className="p-5 bg-body-tertiary h-75">
                <div className="container py-5">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col text-left">
                            <div className="text-uppercase">Próxima Actividad</div>
                            <div className="text-warning text-uppercase">{event.category_name}</div>
                            <h1 className="text-body-emphasis">{event.title.rendered}</h1>
                            <p className="mx-auto lead">
                                {event.fecha_inicio} {event.fecha_inicio} {event.location_name}
                            </p></div>
                        <div className="col text-center">4</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero