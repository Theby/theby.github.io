---
layout: default
title: Home
---

## Published Games

<style>

/* ------------------------------
   PROJECT ROW (outer container)
   ------------------------------ */

.project-row {
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 60px 0;

  /* Hover animation */
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  padding: 20px;
  border-radius: 12px;
}

/* Hover: gentle lift + scale */
.project-row:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 12px 28px rgba(0,0,0,0.18);
}


/* -----------------------------------------
   INNER WRAPPER (handles fade-in animation)
   ----------------------------------------- */

.project-inner {
  display: flex;
  align-items: center;
  gap: 30px;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  width: 100%;
}

.project-inner.visible {
  opacity: 1;
  transform: translateY(0);
}


/* -----------------------
   LEFT/RIGHT ALTERNATION
   ----------------------- */

.project-row.reverse .project-inner {
  flex-direction: row-reverse;
}


/* ---------------
   IMAGE + LINK
   --------------- */

.project-row a {
  display: block;
  width: 50%;
  text-decoration: none;
}

.project-row img {
  width: 100%;
  display: block;
  max-width: 500px;
  border-radius: 10px;
  object-fit: cover;
}


/* ---------------
   TEXT CONTENT
   --------------- */

.project-text {
  flex: 1;
}

.project-text p {
  text-align: justify;
}


/* ----------------
   RESPONSIVE RULES
   ---------------- */

@media (max-width: 800px) {
  .project-inner,
  .project-row.reverse .project-inner {
    flex-direction: column;
    text-align: center;
  }

  .project-row a {
    width: 100%;
  }

  .project-row img {
    max-width: none;
    width: 100%;
  }

  .project-text {
    width: 100%;
  }
}

/* -------------------------
   PLATFORM ICON BADGES
   ------------------------- */

.platform-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-top: 10px;
}

.platform-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,0,0,0.06);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.platform-badge img {
  width: 18px;
  height: 18px;
  display: block;
}

/* Meta info row (tags + release date) */
.project-meta {
  font-size: 0.85rem;
  color: rgba(0,0,0,0.7);
  margin: 4px 0 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  align-items: center;
}

.project-tag {
  background: rgba(0,0,0,0.06);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
}

/* Title row: title on left, release on right */
.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}

.project-title-row h3 {
  margin: 0;
}

.project-title-release {
  font-size: 0.85rem;
  color: rgba(0,0,0,0.7);
  white-space: nowrap;
}


</style>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".project-inner");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach(item => observer.observe(item));
});
</script>

{% for p in site.data.projects %}
<div class="project-row {% if p.reverse %}reverse{% endif %}">
	  <div class="project-inner">
	  		<a href="{{ p.url }}" target="_blank">
			 	<img src="{{ p.image }}" alt="{{ p.title }}">
			</a>
			<div class="project-text">
			 	<div class="project-title-row">
				  <h3>{{ p.title }}</h3>
				  {% if p.release %}
				    <span class="project-title-release">{{ p.release }}</span>
				  {% endif %}
				</div>
			 	<div class="project-meta">
				  {% if p.tags %}
				    {% for tag in p.tags %}
				      <span class="project-tag">{{ tag }}</span>
				    {% endfor %}
				  {% endif %}
				</div>
			 	<p>{{ p.description }}</p>
			 	<div class="project-meta">
				    {% if p.platforms %}
					  <div class="platform-badges">
					    {% for plat in p.platforms %}
					      <div class="platform-badge">
					        <img src="assets/icons/platforms/{{ plat }}.svg" alt="{{ plat }} icon">
					        {{ plat | capitalize }}
					      </div>
					    {% endfor %}
					  </div>
					{% endif %}
				</div>
			</div>
	  </div>
</div>
{% endfor %}

