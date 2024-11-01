/* eslint-disable no-useless-catch */
import axios from "axios";
import { toast } from "sonner";

export const API_URL = "http://localhost:8080/";

const axiosInstancia = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * URL_API: http://localhost:8080/
 * @param {String} endpoint
 * @returns
 */
export const getData = async (endpoint) => {
  try {
    const response = await axiosInstancia.get(endpoint);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * URL_API: http://localhost:8080/
 * @param {String} endpoint
 * @param {Object} data
 * @returns
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstancia.post(endpoint, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * URL_API: http://localhost:8080/
 * @param {String} endpoint
 * @param {Object} data
 * @returns
 */
export const putData = async (endpoint, data) => {
  try {
    const response = await axiosInstancia.put(endpoint, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * URL_API: http://localhost:8080/
 * @param {String} endpoint
 * @returns
 */
export const deleteData = async (endpoint, rol) => {
  if (rol == "ADMIN") {
    try {
      const response = await axiosInstancia.delete(endpoint);
      return response?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    toast.error("No autorizado para realizar esta operación");
    throw new Error("Rol no autorizado", { cause: "El Rol" });
  }
};
