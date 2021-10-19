import axios from "axios";

export const QUOTES_URL = `${process.env.REACT_APP_API_URL}/service-orders`;

export function getServiceOrders(searchFilter) {
  
  return axios.get(QUOTES_URL, { params: searchFilter });
}
