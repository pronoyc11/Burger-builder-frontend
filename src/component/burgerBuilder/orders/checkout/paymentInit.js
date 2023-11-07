import axios from "axios"

export const initPayment = (token) =>{
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/payment`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
}