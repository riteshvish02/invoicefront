import axios from "axios";

const instance = axios.create({

    baseURL: "https://invoiceback-oy3b.onrender.com",    
   
    withCredentials: true,
  });

export default instance;
