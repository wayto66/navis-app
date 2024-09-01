/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios, {
  HttpStatusCode,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { env } from "~/env";

import { type NextApiRequest, type NextApiResponse } from "next";
import { type FetchDataParams } from "~/utils/fetchData";

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, method, params, path } = req.body as FetchDataParams;
  if (!path) {
    res.status(HttpStatusCode.BadRequest).json({ message: "Caminho inválido" });
    return;
  }

  const response = await fetchData(path.toString(), {
    data,
    method,
    params,
  });

  res.status(200).json(response.data ?? { data: null, error: response.error });
}

const fetchData = async <T>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<FetchResponse<T>> => {
  const url = env.API_URL + path;

  try {
    const response: AxiosResponse<T> = await axios({
      url,
      timeout: 10000, // 10 segundos de timeout
      ...config,
    });

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      errorMessage = error.response?.data?.message || error.message;
    }

    return {
      data: null,
      error: errorMessage,
    };
  }
};
