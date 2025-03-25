---
layout: default
title: Projects
permalink: /projects/
---

<section class="section">
  <div class="container">
    <h1 class="section-title">My Projects</h1>
    <p class="section-subtitle">A collection of my work and projects</p>

    <div class="projects-grid">
      {% for project in site.data.projects %}
      <div class="project-card" data-aos="fade-up">
        <div class="project-header">
          <h3>{{ project.title }}</h3>
        </div>
        <div class="project-body">
          <p>{{ project.description }}</p>
          {% if project.highlights %}
          <h4>Key Features:</h4>
          <ul>
            {% for highlight in project.highlights %}
            <li>{{ highlight }}</li>
            {% endfor %}
          </ul>
          {% endif %}
          <div class="tech-stack">
            {% for tech in project.technologies %}
            <span class="tech-tag">{{ tech }}</span>
            {% endfor %}
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
