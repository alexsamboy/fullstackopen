import axios from 'axios'

const url = "https://pucmm.edu.do/_api/web/lists/getbyid('ef090f7d-6d64-4483-a1ff-323863b4186c')/Items";

// Campos a seleccionar
const selectFields = [
    "Id",
    "Actividad",
    "Fecha",
    "Per_x00ed_odo",
    "Categor_x00ed_a",
    "D_x00ed_a",
    "Mes",
    "DiaNum",
    "DiaLetra",
    "MesVista",
    "Visible"
].join(",");

// Filtros dinámicos
const today = new Date().toISOString().split("T")[0]; // Fecha actual en YYYY-MM-DD
const filters = `Visible eq 1 and Fecha ge '${today}'`;

// URL final
const baseUrl = `${url}?$select=${selectFields}&$filter=${filters}`;

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data.value)
}

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