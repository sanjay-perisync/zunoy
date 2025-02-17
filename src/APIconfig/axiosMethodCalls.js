/* eslint-disable */
import axios from "axios";

// API axios get method
export const getAPICall = (url, options) => {
    return axios.get(url, options)
}
// API axios post method
export const postAPICall = (url, details, options) => {
    return axios.post(url, details, options)
}
// API axios put method
export const putAPICall = (url, data, options) => {
    return axios.put(url, data, options)
}
// API axios delete method
export const deleteAPICall = (url, options) => {
    return axios.delete(url, options)
}