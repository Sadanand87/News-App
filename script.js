const apiKey = '36aae09b73c7453183f0044f4bea83e6';
const newsContainer = document.getElementById('newsContainer');

window.onload = function () {
  fetchNews();
};

function fetchNews(query = '') {
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayArticles(data.articles);
    })
    .catch(err => {
      console.error('Error fetching news:', err);
      newsContainer.innerHTML = '<p>Failed to load news. Try again later.</p>';
    });
}

function displayArticles(articles) {
  newsContainer.innerHTML = '';
  if (!articles.length) {
    newsContainer.innerHTML = '<p>No news found for your query.</p>';
    return;
  }

  articles.forEach(article => {
    const newsElement = document.createElement('div');
    newsElement.className = 'article';
    newsElement.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="news image"/>
      <div class="article-content">
        <h3>${article.title}</h3>
        <p>${article.description || ''}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `;
    newsContainer.appendChild(newsElement);
  });
}

function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    fetchNews(query);
  } else {
    fetchNews(); // default top headlines
  }
}
