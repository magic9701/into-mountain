import axios from 'axios'
const baseURL = 'https://trail-finder-project-final-zkqznr2c5a-de.a.run.app/api'
const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
  }
)
export default axiosInstance