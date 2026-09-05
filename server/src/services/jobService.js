import axios from "axios";

export const fetchJobFromUrl = async(url) => {
    
    const response = await axios.get(url, {
        timeout: 10000
    });

    return response.data;
}