import config from "./config";

const { API_ENDPOINT, REQUEST_ERROR } = config;

const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[500];
    }
  } catch (error) {
    alert(error.msg);
    return { data: null };
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
