/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from "react";
import { reactContext } from "~/context";

export const CustomerOptions = () => {
  const ctx = useContext(reactContext);
  const customers = ctx.data.customers;

  return useMemo(() => {
    return customers.map((customer) => (
      <option key={`customer-${customer.id}`} value={customer.id}>
        {customer.name}
      </option>
    ));
  }, [customers]);
};
