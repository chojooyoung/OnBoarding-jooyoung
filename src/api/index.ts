import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostBody {
  title: string;
  body: string;
}

interface ParamType {
  post: string;
}

interface idParam {
  id: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

async function getPostList(param: ParamType) {
  const response = await axios.get(`http://localhost:3001/${param.post}`);
  const resData = response.data;
  return resData;
}

async function getPostById(param: idParam) {
  const response = await axios.get(`http://localhost:3001/post/${param.id}`);
  const resData = response.data;
  return resData;
}

async function deletePost(param: idParam) {
  const response = await axios.delete(`http://localhost:3001/post/${param.id}`);
  const resData = response;
  return resData;
}

async function createPost(body: PostBody) {
  const response = await axios.post(`http://localhost:3001/post/`, body);
  const resData = response.data;
  return resData;
}
async function modyfyPost(param: Post) {
  const requestBody = {
    title: param.title,
    body: param.body,
  };
  const response = await axios.put(
    `http://localhost:3001/post/${param.id}`,
    requestBody,
  );
  const resData = response.data;
  return resData;
}
const API = { getPostList, getPostById, deletePost, createPost, modyfyPost };

export default API;
