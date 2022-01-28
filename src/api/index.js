import axios from "axios";

const productionURL = "https://memories-project-s.herokuapp.com/"; 
const developmentURL = "http://localhost:5000/"; 
const API = axios.create({
  baseURL: developmentURL,
});

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    ).token}`;
  }
  return req 
})
/* const url = "https://memories-project-s.herokuapp.com/posts"; */

/* POST API */
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

/* AUTH API */
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

