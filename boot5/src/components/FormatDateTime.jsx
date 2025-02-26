const formatDate = ({date}) => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const year = date.slice(0, 4);
    const month = months[parseInt(date.slice(5, 7), 10) - 1];
    const day = parseInt(date.slice(8, 10), 10);

    return `${day} de ${month}, ${year}`;
};

const formatTime12h = ({time}) => {
    const [hours, minutes] = time.split(":");
    //console.log(hours);
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
};

export default {formatDate: formatDate, formatTime12h: formatTime12h}