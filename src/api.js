import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getCharacters = async (page, name, status) => {
  const response = await apiClient.get('/character', {
    params: {
      page,
      name,
      status,
    },
  });
  return response.data;
};

export default getCharacters;
