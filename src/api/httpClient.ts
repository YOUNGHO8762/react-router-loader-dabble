import axios, { AxiosRequestConfig } from 'axios';
import { ZodSchema } from 'zod';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const { data } = await instance.get<T>(url, config);
  return data;
};

export const getWithSchema = async <T>(
  url: string,
  schema: ZodSchema<T>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const result = schema.safeParse(await get<T>(url, config));

  if (!result.success) {
    throw new Error('Schema validation failed');
  }

  return result.data;
};
