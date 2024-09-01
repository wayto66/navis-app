import axios, { type AxiosError, type AxiosResponse } from "axios";

export interface FetchDataParams {
  path: string;
  data: unknown;
  method: "GET" | "POST" | "PATCH";
  params?: Record<string, unknown>;
}

const fetchData = async <T>({
  data,
  method,
  params,
  path,
}: FetchDataParams): Promise<T | AxiosError | null> => {
  try {
    const response: AxiosResponse<T> = await axios({
      url: "http://localhost:3000/api/fetch",
      method: "POST",
      timeout: 10000, // 10 segundos de timeout
      data: {
        data,
        method,
        params,
        path,
      },
    });

    return response.data;
  } catch (error) {
    console.error({ error });
    if (axios.isAxiosError(error)) {
      return error;
    }

    return null;
  }
};

export default fetchData;
