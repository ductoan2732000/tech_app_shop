import Axios from "axios";

const baseURL = "http://192.168.1.233:8082/v1";

const tss = Axios.create({
  baseURL,
});
export default tss;
