const start = performance.now();
const MIN_LOAD = 1400;

document.body.classList.add('is-loading');

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const buildRadarChart = (radarEl) => {
  if (!radarEl) return;
  const values = (radarEl.dataset.values || '')
    .split(',')
    .map(v => parseFloat(v.trim()))
    .filter(v => !Number.isNaN(v));
  const labels = (radarEl.dataset.labels || '').split('|').map(l => l.trim()).filter(Boolean);

  if (!values.length || values.length !== labels.length) return;

  const svg = radarEl.querySelector('.radar-chart');
  if (!svg) return;

  const radius = 96;
  const labelRadius = radius + 28;
  const padding = 40;
  const size = (labelRadius + padding) * 2;
  const cx = size / 2;
  const cy = size / 2;
  const steps = 4;
  const count = values.length;

  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';
  const make = (tag) => document.createElementNS(ns, tag);

  for (let level = 1; level <= steps; level += 1) {
    const r = radius * (level / steps);
    const points = [];
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    const ring = make('polygon');
    ring.setAttribute('points', points.join(' '));
    ring.setAttribute('class', 'radar-grid');
    svg.appendChild(ring);
  }

  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    const axis = make('line');
    axis.setAttribute('x1', cx);
    axis.setAttribute('y1', cy);
    axis.setAttribute('x2', x);
    axis.setAttribute('y2', y);
    axis.setAttribute('class', 'radar-axis');
    svg.appendChild(axis);

    const label = make('text');
    const lx = cx + labelRadius * Math.cos(angle);
    const ly = cy + labelRadius * Math.sin(angle);
    label.setAttribute('x', lx);
    label.setAttribute('y', ly);
    label.setAttribute('class', 'radar-label');
    label.setAttribute('text-anchor', Math.cos(angle) > 0.2 ? 'start' : Math.cos(angle) < -0.2 ? 'end' : 'middle');
    label.setAttribute('dominant-baseline', Math.sin(angle) > 0.2 ? 'hanging' : Math.sin(angle) < -0.2 ? 'baseline' : 'middle');
    label.textContent = labels[i];
    svg.appendChild(label);
  }

  const dataPoints = [];
  for (let i = 0; i < count; i += 1) {
    const value = Math.max(0, Math.min(100, values[i]));
    const r = radius * (value / 100);
    const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    dataPoints.push(`${x},${y}`);
  }

  const area = make('polygon');
  area.setAttribute('points', dataPoints.join(' '));
  area.setAttribute('class', 'radar-area');
  svg.appendChild(area);

  for (let i = 0; i < count; i += 1) {
    const value = Math.max(0, Math.min(100, values[i]));
    const r = radius * (value / 100);
    const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    const dot = make('circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', 3.2);
    dot.setAttribute('class', 'radar-point');
    svg.appendChild(dot);
  }
};

buildRadarChart(document.querySelector('.radar'));

window.addEventListener('load', () => {
  const wait = Math.max(0, MIN_LOAD - (performance.now() - start));

  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hide');
    }

    document.body.classList.remove('is-loading');

    const app = document.getElementById('app');
    if (app) {
      app.removeAttribute('aria-hidden');
    }

    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('show'));
    }
  }, wait);
});
