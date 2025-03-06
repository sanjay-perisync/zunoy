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
// export const deleteAPICall = (url, options) => {
//     return axios.delete(url, options)
// }



export const deleteAPICall = async (url, options = {}) => {
    try {
      console.log("Executing deleteAPICall for:", url);
      console.log("With options:", options);
  
      const response = await axios.delete(url, options);
  
      console.log("DELETE API Response:", response);
      return response.data;
    } catch (error) {
      console.error("DELETE API Error:", error.response || error);
      throw error;
    }
  };