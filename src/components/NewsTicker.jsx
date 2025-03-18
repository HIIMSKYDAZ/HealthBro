import React, { useState, useEffect } from 'react';
import './NewsTicker.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const API_URL = 'https://newsdata.io/api/1/news?apikey=pub_749002c29a93c25cffd498c60af7cdd93cdbb&language=hu&category=health,sports';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.status === 'success') {
          // Szűrjük ki a képek nélküli híreket és limitáljuk 10-re
          const filteredNews = data.results
            .filter(article => article.image_url)
            .slice(0, 10);
          
          setNews(filteredNews);
        }
      } catch (error) {
        console.error('Hiba a hírek betöltésekor:', error);
      }
    };

    fetchNews();
  }, []);

  // Képbetöltési hiba kezelése
  const handleImageError = (e) => {
    e.target.parentElement.parentElement.style.display = 'none';
  };

  return (
    <div className="outercontainer">
      <div className="news-container">
        <h2 className="news-title">Fitness Hírek</h2>
        <div className="scroll-container">
          {news.length > 0 ? (
            <ul className="news-list">
              {news.map((article, index) => (
                <li key={index} className="news-item">
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
                    <img 
                      src={article.image_url} 
                      alt={article.title} 
                      className="news-image"
                      onError={handleImageError}
                    />
                    <p className="news-title-text">{article.title}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nincsenek elérhető hírek</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsList;