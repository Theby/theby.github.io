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
			 	<h3>{{ p.title }}</h3>
			 	<p>{{ p.description }}</p>
			</div>
	  </div>
</div>
{% endfor %}


