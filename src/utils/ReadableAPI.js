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

export function editPost(post) {
  return fetch(`${API_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
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

export function votePost(vote, postId) {
  return fetch(`${API_URL}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify(vote)
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

export const fetchComment = commentId => {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'GET',
    headers: {...headers}
  })
  .then(res => res.json())
}

export const editComment = comment => {
  return fetch(`${API_URL}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {...headers},
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
}

export const deleteComment = commentId => {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {...headers}
  })
  .then(res => res.text())
}

export const addComment = comment => {
  return fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {...headers},
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
}

export function voteComment(vote, commentId) {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify(vote)
  })
  .then((res) => res.json())
}
