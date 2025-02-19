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
    "author",
    "featured_media",
  ].join(",");

  const perPage ='per_page='+ 16;

// URL final
const baseUrl = `${apiUrl}/posts?_fields=${selectFields}&${perPage}`;

const getPostsWithRelations = async () => {
  try {
    // Obtener los posts
    const response = await axios.get(baseUrl, {
      auth: {
        username: apiUser,
        password: apiPass,
      },
    });

    // Verificar si la respuesta contiene los datos esperados
    console.log("API Response:", response.data);

    // Asegurar que 'posts' sea un array
    const posts = Array.isArray(response.data) ? response.data : [];

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
          axios.get(`${apiUrl}/categories?include=${categoryIds.join(",")}`),
          axios.get(`${apiUrl}/locations?include=${locationIds.join(",")}`),
          axios.get(`${apiUrl}/organizers?include=${organizerIds.join(",")}`),
          axios.get(`${apiUrl}/media?include=${mediaIds.join(",")}`)
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
      }));

      console.log('Posts:', enrichedPosts);
      
      return enrichedPosts;

  } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
  }
};


getPostsWithRelations();

const getAll = async () => {
    try {
      const response = await axios.get(baseUrl, {
        auth: {
          username: apiUser,
          password: apiPass,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

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
    remove: remove
}