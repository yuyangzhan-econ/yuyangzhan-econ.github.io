---
layout: single
title: "Research"
permalink: /Research/
author_profile: false
---

<style>
summary {
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  padding-left: 30px;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  list-style: none;
}

/* 移除默认的三角形 */
summary::-webkit-details-marker {
  display: none;
}

/* 三角形在Abstract前面 */
summary::before {
  content: '▶';
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease, color 0.3s ease;
}

body:not(.dark-mode) summary::before {
  color: #0066cc;
}

body.dark-mode summary::before {
  color: #9d7bea;
}

details[open] summary::before {
  transform: translateY(-50%) rotate(90deg);
}

summary::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 30px;
  width: 0;
  height: 2px;
  transition: width 0.3s ease;
}

body:not(.dark-mode) summary:hover::after {
  width: calc(100% - 30px);
  background-color: #0066cc;
}

body.dark-mode summary:hover::after {
  width: calc(100% - 30px);
  background-color: #9d7bea;
}

.abstract {
  padding: 15px;
  padding-left: 30px;
  margin-top: 5px;
  line-height: 1.6;
  overflow: hidden;
}

@keyframes fadeIn {
  0% { 
    opacity: 0;
    transform: translateY(-10px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate {
  animation: fadeIn 0.5s ease;
}

details {
  margin-bottom: 20px;
}

/* 调整论文内容的行间距 - 更紧凑 */
.paper-title {
  margin-top: 0;
  margin-bottom: 8px;
}

.paper-meta {
  color: #888;
  font-style: italic;
  margin-top: 0;
  margin-bottom: 8px;
}

.paper-author {
  color: #888;
  font-style: normal;
  margin-top: 0;
  margin-bottom: 8px;
}

/* 论文标题前的间距 */
h3.paper-title {
  margin-top: 40px;
}

/* 论文内部元素紧凑 */
.page__content > p {
  margin-bottom: 8px;
}
</style>

## Working Papers

### Strategic Land Supply and Booming Urban Greens in China <span style="color: #0066cc;">(New Draft Coming Soon)</span>
{: .paper-title}

Independent Research
{: .paper-author}

What changes will occur in the land transfer behavior of local officials when the cost of directly manipulating data increases?
{: .paper-meta}

<details>
  <summary>Abstract</summary>
  <div class="abstract">
    This paper examines shifting China's air-quality monitoring stations to independent private operators prompted municipal officials to strategically develop green spaces around monitoring stations. A simple model demonstrates that higher data manipulation costs caused by the reform generate substitution effects (expanded real green space) and signal-strength effects (increased reliance on credible data). Analysis of over one million land-transfer records with difference-in-differences design reveals park and green-space transfers nearly doubled within 5 km of monitoring stations post-reform, with effects diminishing by distance. These findings underscore the necessity of comprehensive, multi-metric evaluation systems to prevent unintended spatial resource allocation distortions.
  </div>
</details>

<script>
(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
  
  function initAnimations() {
    const allDetails = document.querySelectorAll('details');
    
    allDetails.forEach(function(details) {
      details.addEventListener('toggle', function() {
        if (this.open) {
          const abstract = this.querySelector('.abstract');
          abstract.style.display = 'none';
          setTimeout(function() {
            abstract.style.display = 'block';
            abstract.classList.remove('animate');
            abstract.offsetHeight;
            abstract.classList.add('animate');
          }, 10);
        }
      });
    });
  }
})();
</script>
