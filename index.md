---
layout: default
---

<div class="index-wrapper">
<section id="hero" class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>Maulana Iskak</h1>
      <h2 id="typed-text" data-strings='["Backend Developer", "Java Spring Boot Developer", "Golang Developer"]'></h2>
      <p>Building robust, scalable, and maintainable backend systems</p>
      <div class="hero-buttons">
        <a href="#contact" class="btn primary">Contact Me</a>
        <a href="#projects" class="btn secondary">View Projects</a>
      </div>
      <div class="hero-social">
        <a href="https://github.com/maulanaiskak" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://linkedin.com/in/maulanaiskak" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
        <a href="mailto:maulanaiskak9@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
  </div>
</section>

<section id="about" class="section">
  <div class="container">
    <h2 class="section-title">About Me</h2>
    <div class="about-content">
      <div class="about-image" data-aos="fade-right">
        <img src="{{ site.baseurl }}/assets/img/profile.jpg" alt="Maulana Iskak" class="profile-img">
      </div>
      <div class="about-info" data-aos="fade-left">
        <div class="about-text">
          <p>
            I'm a passionate Backend Developer with extensive experience in Java Spring Boot and Golang.
            Currently working at Nanovest, I specialize in building secure, scalable systems for financial applications
            with a focus on robust architecture and clean code.
          </p>
          <p>
            With a background in Engineering Physics from Universitas Gadjah Mada and a Google Cloud certification,
            I bring a unique analytical perspective to software development challenges.
          </p>
          <p>
            My experience ranges from developing authentication systems and KYC verification to
            building transaction processing platforms and data migration frameworks.
          </p>
        </div>
        <div class="about-stats">
          <div class="stat-item">
            <span class="stat-count">3+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-item">
            <span class="stat-count">5+</span>
            <span class="stat-label">Major Projects</span>
          </div>
          <div class="stat-item">
            <span class="stat-count">10+</span>
            <span class="stat-label">Technologies</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{% include experience.html %}

{% include projects.html %}

{% include education.html %}

{% include skills.html %}

<section id="contact" class="section">
  <div class="container">
    <h2 class="section-title">Get In Touch</h2>
    <div class="contact-content">
      <div class="contact-info" data-aos="fade-right">
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <div class="contact-details">
            <h3>Email</h3>
            <p><a href="mailto:maulanaiskak9@gmail.com">maulanaiskak9@gmail.com</a></p>
          </div>
        </div>
        <div class="contact-item">
          <i class="fab fa-linkedin"></i>
          <div class="contact-details">
            <h3>LinkedIn</h3>
            <p><a href="https://linkedin.com/in/maulanaiskak" target="_blank">linkedin.com/in/maulanaiskak</a></p>
          </div>
        </div>
        <div class="contact-item">
          <i class="fab fa-github"></i>
          <div class="contact-details">
            <h3>GitHub</h3>
            <p><a href="https://github.com/maulanaiskak" target="_blank">github.com/maulanaiskak</a></p>
          </div>
        </div>
      </div>
      <div class="contact-form" data-aos="fade-left">
        <form id="contact-form" action="https://formspree.io/f/manebwoy" method="POST">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn primary">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>
</div>
