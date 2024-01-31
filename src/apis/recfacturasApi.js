import axios from "axios";

const recfacturasApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/recibidos/facturas`
});

export default recfacturasApi;
