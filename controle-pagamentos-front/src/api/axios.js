import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5118/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição GET", error);
        throw error;
    }
};

export const post = async (url, body) => {
    try {
        const response = await api.post(url, body);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição POST", error);
        throw error;
    }
};

export const patch = async (url, body) => {
    try {
        const response = await api.patch(url, body);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição PATCH", error);
        throw error;
    }
};

export const put = async (url, body) => {
    try {
        const response = await api.put(url, body);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição PUT", error);
        throw error;
    }
};

export const del = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        console.error("Erro na requisição DELETE", error);
        throw error;
    }
};
