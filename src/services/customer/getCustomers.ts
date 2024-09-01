import { isAxiosError } from "axios";
import { type Customer } from "~/types/Models";
import fetchData from "~/utils/fetchData";

interface GetCustomersParams {
  page: number;
  pageSize: number;
}

export const getCustomers = async ({
  page,
  pageSize,
}: GetCustomersParams): Promise<Customer[] | undefined> => {
  const response = await fetchData<Customer[]>({
    path: "/customer",
    params: {
      page,
      pageSize,
    },
    data: undefined,
    method: "GET",
  });

  if (isAxiosError(response) || !response) return undefined;

  return response;
};
