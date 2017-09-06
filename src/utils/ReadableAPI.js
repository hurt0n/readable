const API_URL = 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': 'readable',
  'Content-Type': 'application/json'
}

export function fetchAllPosts() {
  return fetch(`${API_URL}/posts`, { headers: { Authorization: 'readable' }})
  .then((res) => res.json())
}

export function fetchCategories() {
  return fetch(`${API_URL}/categories`, { headers: { Authorization: 'readable' }})
  .then((res) => res.json())
}

export function fetchComments(postId) {
  return fetch(`${API_URL}/posts/${postId}/comments`, { headers: { Authorization: 'readable' }})
  .then((res) => res.json())
}

export function addPost(post) {
  return fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify(post)
  })
  .then((res) => res.json())
}

export function deletePost(id) {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }})
  .then(res => res.text())
}
