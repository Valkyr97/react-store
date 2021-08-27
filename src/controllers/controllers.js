import axios from "axios";

export const getAll = async (address) => {
  const { data } = await axios.get(`/${address}`);
  return data;
};

export const getById = async (address, id) => {
  const { data } = await axios.get(`/${address}/:${id}`);
  return data;
};

export const post = async (address, element) => {
  await axios.post(`/${address}`, element);
};

export const putById = async (address, id, update) => {
  await axios.put(`/${address}/:${id}`, update);
};

export const delById = async (address, id) => {
  await axios.delete(`/${address}/${id}`);
};
