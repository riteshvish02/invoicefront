import axios from "../../utlis/Axios";
import { setError,logout,Success,Request,newinvoice,getallinvoice} from "../Reducers/UserReducer";



export const userSignin =  (info) => async (dispatch) => {
    dispatch(Request());
      try {
        console.log(info);
        
        const { data } = await axios.post("/register", info);
        localStorage.setItem("user", data.token);
        dispatch(Success(data));
        
      } catch (error) {
        dispatch(setError(error.response.data));
      }
    };

export const userLogin =  (info) => async (dispatch) => {
    dispatch(Request());
      try {
        const { data } = await axios.post("/login", info);
        localStorage.setItem("user", data.token);
        dispatch(Success(data));
        
      } catch (error) {
        dispatch(setError(error.response.data));
      }
    };

export const createinvoice =  (info) => async (dispatch) => {
    dispatch(Request());
      try {
        console.log(info);
        
        const { data } = await axios.post("/createinvoice", info);
    
        dispatch(newinvoice(data));
        
      } catch (error) {
        dispatch(setError(error.response.data));
      }
    };

    export const userLoggedin =  () => async (dispatch) => {
      dispatch(Request());
        try {
          const { data } = await axios.get("/loggedin");
    
          dispatch(Success(data));
          
        } catch (error) {
          dispatch(setError(error.response.data));
        }
      };
  
      export const GetAllInvoices =  () => async (dispatch) => {
        dispatch(Request());
          try {
            const { data } = await axios.get("/getallinvoice");
      
            dispatch(getallinvoice(data));
            
          } catch (error) {
            dispatch(setError(error.response?.data));
          }
        };