import { apiGet, apiPost } from "../api/commonApi";
import { ENDPOINTS } from "../api/endpoints";

export const getCustomers = () => apiGet(ENDPOINTS.CUSTOMER.LIST);

export const createCustomer = (data: any) =>
  apiPost(ENDPOINTS.CUSTOMER.CREATE, data.payload);

export const retrievePartyData = (params?: Record<string, any>) => {
  return apiGet(ENDPOINTS.CUSTOMER.CREATE, params);
};
