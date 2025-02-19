import axios from 'axios'

const url = "https://dia.pucmm.edu.do/wp-json/wp/v2/posts";
const USERNAME = "mperez";
const PASSWORD = "mw5s 7Pjd WRXH 2KdE m4sV Dyro";

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

// URL final
const baseUrl = `${url}?_fields=${selectFields}`;

const getAll = async () => {
    try {
      const response = await axios.get(baseUrl, {
        auth: {
          username: USERNAME,
          password: PASSWORD,
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