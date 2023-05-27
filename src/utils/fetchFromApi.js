import axios from "axios";


const options = {
  params: {
    maxResults: '30'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromApi = async(url) => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/${url}`,options)
    // console.log(data)
    return data;
}