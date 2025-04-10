import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { request } from "../api/request";

export const sendPayload = async (endpoint: string, payload: FieldValues | FormData | Record<string, unknown>) => {
  const headers = payload instanceof FormData
    ? {'Content-Type': 'multipart/form-data'} 
    : { 'Content-Type': 'application/json' };
  try {
    const response = await request.post(endpoint, payload, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || 'An Axios error occurred';
      throw {error , message:errorMessage};
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getData = async (endpoint: string) => {
  try {
    const response = await request.get(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || 'An Axios error occurred';
      
      throw new AxiosError(errorMessage, error.code, error.config, error.request, error.response);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};



export const UpdateData = async (endpoint: string, payload: FieldValues | FormData) => {
  const headers = payload instanceof FormData
    ? {'Content-Type': 'multipart/form-data'} 
    : { 'Content-Type': 'application/json' };
    if (payload instanceof FormData) {
      payload.append('_method', 'put');
    }
  try {
    const response = await request.post(endpoint, {...payload , "_method":"put"} , {headers});
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || 'An Axios error occurred';
      throw new Error(errorMessage);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};



export const DeleteData = async (endpoint: string) => {
  try {
    const response = await request.delete(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "An Axios error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
