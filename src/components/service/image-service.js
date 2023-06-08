import axios from 'axios';

const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '36249306-fe6d8c4d86ae48706cd60efae',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  },
});

const fetchImages = async (query, page) => {
  const { data } = await pixabayAPI.get('', { params: { q: query, page } });
  return data;
};

export default fetchImages;
