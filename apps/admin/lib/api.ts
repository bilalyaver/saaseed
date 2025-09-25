import axios, { AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  code?: number;
}

const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey: string | undefined = process.env.API_KEY;

interface Headers {
  [key: string]: string | undefined;
}

interface ErrorWithStatus {
  status?: number;
}

export const getAccessToken = async (): Promise<unknown> => {
  const session = await getSession();
  // Use type assertion to access custom property
  return (session as { accessToken?: unknown })?.accessToken;
};



export const getHeaders = async (isFile: boolean, pathToken?: string): Promise<Headers> => {
  const token = await getAccessToken();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;


  const headers: Headers = {
    'Content-Type': isFile ? 'application/x-www-form-urlencoded' : 'application/json',
    'Authorization': `Bearer ${token || pathToken}`,
    'X-Api-Key': apiKey,
    'X-Timezone': tz,
    "X-Client-Platform": "web",
  };

  return headers;
};

const api = {
  get: async <T = unknown>(path: string): Promise<ApiResponse<T>> => {
    const url = new URL(`${apiUrl}${path}`);
    const pathToken = url.searchParams.get('token');
    if (pathToken) {
      url.searchParams.delete('token');
    }

    try {
      const result: AxiosResponse<ApiResponse<T>> = await axios.get(url.toString(), {
        headers: await getHeaders(false, pathToken || undefined),
      });
      return result.data; // ApiResponse döndürüyoruz
    } catch (error: ErrorWithStatus | unknown) {
      const statusCode = (error as ErrorWithStatus).status;
      if (statusCode === 401) {
        signOut();
      }
      if (typeof error === "object" && error !== null && "response" in error && typeof (error as { response?: unknown }).response === "object") {
        throw (error as { response?: { data?: unknown } }).response?.data || error;
      }
      throw error;
    }
  },

  

  post: async <T = unknown>(path: string, data: unknown): Promise<ApiResponse<T>> => {
    try {
      const result: AxiosResponse<ApiResponse<T>> = await axios.post(`${apiUrl}${path}`, data, {
        headers: await getHeaders(false),
      });

      return result.data; // ApiResponse döndürüyoruz
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error && typeof (error as { response?: unknown }).response === "object") {
        throw (error as { response?: { data?: unknown } }).response?.data || error;
      }
      throw error;
    }
  },

  put: async <T = unknown>(path: string, data?: unknown): Promise<ApiResponse<T>> => {
    try {
      const result: AxiosResponse<ApiResponse<T>> = await axios.put(`${apiUrl}${path}`, data, {
        headers: await getHeaders(false),
      });

      return result.data; // ApiResponse döndürüyoruz
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error && typeof (error as { response?: unknown }).response === "object") {
        throw (error as { response?: { data?: unknown } }).response?.data || error;
      }
      throw error;
    }
  },

  delete: async <T = unknown>(path: string, data?: unknown): Promise<ApiResponse<T>> => {
    try {
      const result: AxiosResponse<ApiResponse<T>> = await axios.delete(`${apiUrl}${path}`, {
        headers: await getHeaders(false),
        data,
      });
  
      return result.data; // ApiResponse döndürüyoruz
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error && typeof (error as { response?: unknown }).response === "object") {
        throw (error as { response?: { data?: unknown } }).response?.data || error;
      }
      throw error;
    }
  },
};

export default api;