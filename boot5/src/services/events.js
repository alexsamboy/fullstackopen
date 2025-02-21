import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;
const apiUser = import.meta.env.VITE_API_USERNAME;
const apiPass = import.meta.env.VITE_API_PASSWORD;

// Campos a seleccionar
const selectFields = [
  "id",
  "title",
  "categories",
  "location",
  "organizer",
  "acf",
  "featured_media",
].join(",");

const perPage = 'per_page=' + 100;

// URL final
const baseUrl = `${apiUrl}/posts?_fields=${selectFields}&${perPage}`;

const axiosConfig = {
  auth: {
    username: apiUser,
    password: apiPass
  }
};

const getPosts = async () => {
  try {
    // Obtener los posts
    const response = await axios.get(baseUrl,
      axiosConfig,
    );

    const hoy = new Date().toLocaleString("sv-SE", { timeZone: "America/Santo_Domingo" }).replace("T", " ");
    // Formato: YYYY-MM-DD HH:MM:SS

    //console.log(hoy)

    // Filtrar eventos donde acf.fecha_inicio sea >= hoy
    const eventosFiltrados = response.data.filter(evento => 
      evento.acf && evento.acf.fecha_contador >= hoy
    );

    // Ordenar los eventos por fecha de inicio (ascendente)
    eventosFiltrados.sort((a, b) => a.acf.fecha_contador.localeCompare(b.acf.fecha_contador));
    //console.log('Filtrados y ordenados',eventosFiltrados)

    // Verificar si la respuesta contiene los datos esperados
    //console.log("API Response:", response.data);

    // Asegurar que 'posts' sea un array
    const posts = Array.isArray(eventosFiltrados) ? eventosFiltrados : [];

    if (posts.length === 0) {
      console.warn("No se encontraron posts en la API.");
      return [];
    }

    // Extraer IDs únicos de categorías, ubicaciones, organizadores y media
    const categoryIds = [...new Set(posts.flatMap(post => post.categories))];
    const locationIds = [...new Set(posts.flatMap(post => post.location))];
    const organizerIds = [...new Set(posts.flatMap(post => post.organizer))];
    const mediaIds = [...new Set(posts.map(post => post.featured_media).filter(id => id))]; // Filtrar valores vacíos

    // Obtener datos relacionados en paralelo
    const [categories, locations, organizers, media] = await Promise.all([
      axios.get(`${apiUrl}/categories?include=${categoryIds.join(",")}`, axiosConfig),
      axios.get(`${apiUrl}/location?include=${locationIds.join(",")}`, axiosConfig),
      axios.get(`${apiUrl}/organizer?include=${organizerIds.join(",")}`, axiosConfig),
      axios.get(`${apiUrl}/media?include=${mediaIds.join(",")}`, axiosConfig)
    ]);

    // Convertir arrays en objetos para acceso rápido
    const categoryMap = Object.fromEntries(categories.data.map(cat => [cat.id, cat.name]));
    const locationMap = Object.fromEntries(locations.data.map(loc => [loc.id, loc.name]));
    const organizerMap = Object.fromEntries(organizers.data.map(org => [org.id, org.name]));
    const mediaMap = Object.fromEntries(media.data.map(med => [med.id, med.source_url])); // Guardar solo la URL de la imagen

    // Agregar datos relacionados como strings
    const enrichedPosts = posts.map(post => ({
      ...post,
      category_name: categoryMap[post.categories[0]] || "Desconocido",
      location_name: locationMap[post.location[0]] || "Desconocido",
      organizer_name: organizerMap[post.organizer[0]] || "Desconocido",
      featured_media_url: mediaMap[post.featured_media] || null, // Asignar la URL de la imagen

      // Formatear fecha y hora en formato datetime
      fecha_inicio: `${post.acf.fecha_inicio.slice(0, 4)}-${post.acf.fecha_inicio.slice(4, 6)}-${post.acf.fecha_inicio.slice(6, 8)} ${post.acf.hora_de_inicio}`,
      fecha_termino: `${post.acf.fecha_termino.slice(0, 4)}-${post.acf.fecha_termino.slice(4, 6)}-${post.acf.fecha_termino.slice(6, 8)} ${post.acf.hora_termino}`,
    }));

    //console.log('Posts:', enrichedPosts);

    return enrichedPosts;

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
};


const getAll = async () => {
  try {
    const response = await axios.get(baseUrl, {
      auth: {
        username: apiUser,
        password: apiPass,
      },
    });

    const hoy = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    // Filtrar eventos donde acf.fecha_inicio sea >= hoy
    const eventosFiltrados = response.data.filter(evento =>
      evento.acf && evento.acf.fecha_contador >= hoy
    );

    // Ordenar los eventos por fecha de inicio (ascendente)
    eventosFiltrados.sort((a, b) => a.acf.fecha_contador.localeCompare(b.acf.fecha_contador));

    console.log("Eventos filtrados", eventosFiltrados);
    console.log("Cantidad de eventos filtrados:", eventosFiltrados.length);
    console.log("Cantidad de eventos:", response.data.length);
    return eventosFiltrados;

  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};


//getAll();

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
  getPosts: getPosts
}