const Message = ({ type }) => {
  const messages = {
    tooMany: "Demasiados países encontrados, por favor sea más específico.",
    noResults: "No hay países que coincidan con la búsqueda.",
    emptyFilter: "Ingrese un término de búsqueda.",
  };

  return <p>{messages[type] || "Mensaje no disponible."}</p>;
};

export default Message;
