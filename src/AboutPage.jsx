import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', lineHeight: '1.6' }}>
      <header style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>About Us</h1>
      </header>
      <main>
        <section style={{ marginBottom: '20px' }}>
          <h2>Our Mission</h2>
          <p>
            At Hevy, our mission is to empower athletes worldwide with the best tools for
            tracking and improving their workouts. We believe in simplicity, effectiveness,
            and community-driven progress.
          </p>
        </section>
        <section>
          <h2>Meet the Team</h2>
          <p>
            Our team is made up of fitness enthusiasts and software experts passionate about
            creating intuitive workout tracking solutions. We are committed to continuous
            innovation and listening to our community's feedback.
          </p>
        </section>
      </main>
      <footer style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '10px' }}>
        <p>© 2024 Hevy Studios. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;