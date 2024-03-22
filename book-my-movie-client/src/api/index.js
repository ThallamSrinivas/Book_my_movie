import axios from 'axios';

export const apiV1Instance=axios.create({
    baseURL:'http://localhost:8000/v1/',
    responseType:'json',
})

