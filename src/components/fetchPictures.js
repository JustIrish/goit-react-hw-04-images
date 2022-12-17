const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30708131-dca16e544fe536739b53ab461';

export function fetchPicturesApi(value, page) {
  return fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(
        `Sorry, there are no images matching your search query ${value}`
      )
    );
  });
}
