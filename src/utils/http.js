import Axios from "axios";

const http = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data
  });
};

export default http;