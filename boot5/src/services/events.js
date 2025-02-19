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

  const perPage ='per_page='+ 8;

// URL final
const baseUrl = `${apiUrl}/v2/posts?_fields=${selectFields}&${perPage}`;

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