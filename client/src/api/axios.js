import axios from "axios";

//api ko bar bar http://localhost:3000/api likhne se bachne ke liye
//api ko fetch karne ke liye
const instance = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,   //cookie ko send karne ke liye
})

export default instance