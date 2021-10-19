import axios from "axios";

export const GET_QUOTES_URL = `${process.env.REACT_APP_API_URL}/sales-quotes`;
export const APPROVE_QUOTE_URL = `${process.env.REACT_APP_API_URL}/sales-quotes/approve`;
export const COMMENT_QUOTE_URL = `${process.env.REACT_APP_API_URL}/sales-quotes/comment`;
export const REJECT_QUOTE_URL = `${process.env.REACT_APP_API_URL}/sales-quotes/reject`;

export function getQuotes(searchFilter) {
  
  return axios.get(GET_QUOTES_URL, { params: searchFilter });
}

export function approveQuote(id, values) {
  let formData = new FormData();
  formData.append("quoteId", id);
  Object.keys(values).forEach((key) => formData.append(key, values[key]));

  return axios.post(
    APPROVE_QUOTE_URL,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
  );
}

export function commentQuote(id, values) {
  let formData = new FormData();
  formData.append("quoteId", id);
  Object.keys(values).forEach((key) => formData.append(key, values[key]));

  return axios.post(
    COMMENT_QUOTE_URL,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
  );
}

export function rejectQuote(id, values) {
  let formData = new FormData();
  formData.append("quoteId", id);
  Object.keys(values).forEach((key) => formData.append(key, values[key]));

  return axios.post(
    REJECT_QUOTE_URL,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
  );
}