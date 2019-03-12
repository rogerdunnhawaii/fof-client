import axios from 'axios'
import apiUrl from './apiConfig'

export const getAllPosts = () => {
  return axios({
    url: apiUrl + '/posts',
    method: 'get'
  })
}

export const createPost = (user, data) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'post',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: data
  })
}
