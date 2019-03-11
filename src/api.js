import axios from 'axios'
import apiUrl from './apiConfig'

export const getAllPosts = () => {
  return axios({
    url: apiUrl + '/posts',
    method: 'get'
  })
}
