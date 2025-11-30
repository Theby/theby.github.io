---
layout: default
title: Resume
permalink: /resume
---

<style>
.page-content h1 {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 5px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.page-content h1::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0%;
  height: 2px;
  background: currentColor;
  transform: translateX(-50%);
  transition: width 0.4s ease;
}

.page-content h1.in-view::after {
  width: 120%;
}

.page-content h1:not(:first-of-type) {
  margin-top: 60px;
}

.pdf-wrapper object {
  width: 100%;
}

.pdf-text {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.btn-download .icon {
  opacity: 0.6;
  background: url("{{ site.url }}{{ site.baseurl }}/assets/images/btn-download.png") no-repeat 0 0;
  width: 16px;
  height: 16px;
  display: inline-block;
  background-size: contain;
}

.download-wrapper {
  text-align: center;
  margin-bottom: 20px;
}

.back-wrapper {
  text-align: left;
  margin-bottom: -20px;
}

.back-link {
  color: var(--green);
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  text-decoration: underline;
}

</style>

<div class="back-wrapper">
  <a href="/" class="back-link">← Back</a>
</div>

# Resume

<div class="download-wrapper">
  <a href="{{ site.url }}{{ site.baseurl }}/assets/pdfs/Esteban%20Gaete%20Flores%20-%20Senior%20Unity%20Developer.pdf" class="btn btn-download" download><span class="icon"></span>Download PDF</a>
</div>

<div class="pdf-wrapper">
	<object
	  data="{{ site.url }}{{ site.baseurl }}/assets/pdfs/Esteban%20Gaete%20Flores%20-%20Senior%20Unity%20Developer.pdf"
	  width="1000"
	  height="1000"
	  type="application/pdf">
		<p class="pdf-text">Your browser can't display the PDF. Please reload the page or Download instead.</p>
	</object>
</div>