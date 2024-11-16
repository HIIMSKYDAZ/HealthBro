import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', lineHeight: '1.6' }}>
      <header style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>Rólunk</h1>
      </header>
      <main>
        <section style={{ marginBottom: '20px' }}>
          <h2>Tervünk az oldallal</h2>
          <p>
            A HealthBro-nál küldetésünk, hogy támogassuk a sportolókat vagy az arra vágyó személyeket a legjobb eszközökkel az edzéseik nyomon követéséhez és fejlesztéséhez. 
            <br />
            Hiszünk az egyszerűségben, a hatékonyságban és a közösség által vezérelt fejlődésben.
          </p>
        </section>
        <section>
          <h2>Csapatunk</h2>
          <p>
            A csapatunk fitneszrajongókból és szoftver szakért kkb l áll, akik szenvedélyesen
            alkotnak intuitív edzés nyomon követési megoldásokat. Folyamatosan innoválunk és
            figyelünk közösségünk visszajelzésére.
          </p>
        </section>
      </main>
      <footer style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '10px' }}>
        <p>© 2024 HealthBro Studió. Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

export default AboutPage;