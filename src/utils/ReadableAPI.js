const API_URL = 'http://localhost:5001'

export function fetchAllPosts() {
  return fetch(`${API_URL}/posts`, { headers: { Authorization: 'readable' }})
  .then((res) => res.json())
}

export function fetchCategories() {
  return fetch(`${API_URL}/categories`, { headers: { Authorization: 'readable' }})
  .then((res) => res.json())
}
