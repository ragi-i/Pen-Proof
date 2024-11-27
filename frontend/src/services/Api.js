import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const fetchPosts = async () => axios.get("/posts");
export const createPost = async (data) => axios.post("/posts", data);
export const updatePost = async (id, data) => axios.put(`/posts/${id}`, data);
export const deletePost = async (id) => axios.delete(`/posts/${id}`);

export const fetchUsers = async () => axios.get("/users");
export const fetchPendingUsers = async () => axios.get("/users/pending");
export const approveUser = async (id) => axios.put(`/users/approve/${id}`);
export const rejectUser = async (id) => axios.put(`/users/reject/${id}`);
