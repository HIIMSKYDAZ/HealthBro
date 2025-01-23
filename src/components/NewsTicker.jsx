import React, { useState, useEffect } from 'react';
import './NewsTicker.css'; // Ezzel importálod a CSS fájlt

const NewsList = () => {
  const [news, setNews] = useState([]);
  const API_KEY = '21b61813fec1479ebc236d9121311d41';
  const API_URL = `https://newsapi.org/v2/everything?q=fitness&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNews(data.articles.slice(0, 10)); // Csak 10 hírt jelenítünk meg
      } catch (error) {
        console.error('Hiba a hírek betöltésekor:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="outercontainer">
      <div className="news-container">
        <h2 className="news-title">Fitness Hírek</h2>
        <div className="scroll-container">
          {news.length > 0 ? (
            <ul className="news-list">
              {news.map((article, index) => (
                <li key={index} className="news-item">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                    <img src={article.urlToImage} alt={article.title} className="news-image" />
                    <p>{article.title}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Hírek betöltése...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
