import axios from "axios";

const url = 'https://developer-lostark.game.onstove.com'
const APIKEY = process.env.REACT_APP_LOSTARK_API_KEY

const axiosDefault = axios.create({
  baseURL: url,
  headers: {
    'accept': 'application/json',
    'authorization': `bearer ${APIKEY}`
  }
})

export default axiosDefault;