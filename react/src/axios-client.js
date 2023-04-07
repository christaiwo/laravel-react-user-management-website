import axios from "axios";
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((AxiosRequestConfig ) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;

    return AxiosRequestConfig;
})


axiosClient.interceptors.response.use((AxiosResponse) => {
    return AxiosResponse;
}, (error) => {
    try {
        const {response} = error;

        if(response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }catch(e){
        console.error(e)
    }
    throw error;
    
})

export default axiosClient;