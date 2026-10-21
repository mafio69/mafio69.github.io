// <bg-fx kind="blobs|dots|contours|network|spotlight|aurora"> — tło animowane na canvas.
// Kolory z tokenów CSS (--php --py --cpp --line --faint --bg). Szanuje prefers-reduced-motion, pauzuje poza ekranem.
(() => {
  if (customElements.get('bg-fx')) return;
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  class BgFx extends HTMLElement {
    connectedCallback() {
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>:host{position:absolute;inset:0;display:block;overflow:hidden;pointer-events:none}canvas{width:100%;height:100%;display:block}</style><canvas></canvas>';
      this.c = root.querySelector('canvas');
      this.ctx = this.c.getContext('2d');
      this.t0 = performance.now(); this.frame = 0; this.visible = true;
      this.mouse = null;
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this);
      this.io = new IntersectionObserver(e => { this.visible = e[0].isIntersecting; if (this.visible) this.loop(); });
      this.io.observe(this);
      this.onMove = e => { const r = this.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        this.mouse = x >= 0 && y >= 0 && x <= r.width && y <= r.height ? { x, y } : null; };
      addEventListener('pointermove', this.onMove, { passive: true });
      this.resize(); this.loop();
    }
    disconnectedCallback() { this.ro.disconnect(); this.io.disconnect(); cancelAnimationFrame(this.raf); this.raf = null; removeEventListener('pointermove', this.onMove); }
    resize() {
      const r = this.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      this.w = r.width; this.h = r.height; this.c.width = Math.max(1, r.width * d); this.c.height = Math.max(1, r.height * d);
      this.ctx.setTransform(d, 0, 0, d, 0, 0); this.nodes = null;
    }
    colors() {
      const s = getComputedStyle(this), g = n => s.getPropertyValue(n).trim() || '#888';
      this.col = { accent: s.getPropertyValue('--accent').trim(), php: g('--php'), py: g('--py'), cpp: g('--cpp'), line: g('--line'), strong: g('--line-strong'), faint: g('--faint'), bg: g('--bg'), dark: (this.closest('[data-theme]')?.getAttribute('data-theme') || '') === 'dark' };
    }
    loop() {
      if (this.raf) return;
      const step = now => {
        this.raf = null;
        if (this.frame++ % 30 === 0) this.colors();
        this.draw((now - this.t0) / 1000);
        if (this.visible && !RM.matches && this.isConnected) this.raf = requestAnimationFrame(step);
      };
      this.raf = requestAnimationFrame(step);
    }
    draw(t) {
      const { ctx, w, h } = this; if (!w || !h) return;
      ctx.clearRect(0, 0, w, h); ctx.globalAlpha = 1;
      (this['fx_' + (this.getAttribute('kind') || 'blobs')] || this.fx_blobs).call(this, ctx, w, h, t, this.col);
    }
    glow(ctx, x, y, r, color, a) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color); g.addColorStop(1, 'transparent');
      ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.globalAlpha = 1;
    }
    // 1. Rozmyte kółka — jak obecnie, ale w kolorach projektów
    fx_blobs(ctx, w, h, t, c) {
      const a = c.dark ? 0.32 : 0.22, s = 0.12, R = Math.max(w, h) * 0.38;
      [[c.php, 0], [c.py, 2.1], [c.cpp, 4.2]].forEach(([col, p], i) => {
        const x = w * (0.5 + 0.36 * Math.sin(t * s * (1 + i * 0.17) + p));
        const y = h * (0.5 + 0.34 * Math.cos(t * s * (0.8 + i * 0.13) + p * 1.3));
        this.glow(ctx, x, y, R * (0.9 + 0.12 * Math.sin(t * 0.3 + i)), col, a);
      });
    }
    // 2. Siatka kropek z falą
    fx_dots(ctx, w, h, t, c) {
      const gap = 24; ctx.fillStyle = c.strong;
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) {
        const v = Math.sin(x * 0.012 + t * 0.8) * Math.cos(y * 0.016 - t * 0.6);
        const r = 0.8 + 1.4 * Math.max(0, v);
        ctx.globalAlpha = 0.35 + 0.65 * Math.max(0, v);
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    // 3. Linie konturowe (topografia)
    fx_contours(ctx, w, h, t, c) {
      const n = Math.round(h / 22); ctx.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const base = (i + 0.5) * (h / n);
        ctx.strokeStyle = i % 6 === 3 ? c.php : c.strong; ctx.globalAlpha = i % 6 === 3 ? 0.7 : 0.55;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = base + 14 * Math.sin(x * 0.006 + t * 0.25 + i * 0.35) + 9 * Math.sin(x * 0.013 - t * 0.18 + i * 0.9);
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    // 4. Sieć węzłów
    fx_network(ctx, w, h, t, c) {
      if (!this.nodes) {
        const n = Math.round(w * h / 9000), cols = ['php', 'py', 'cpp'];
        this.nodes = Array.from({ length: n }, (_, i) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, k: i % 7 === 0 ? cols[i % 3] : null }));
      }
      const N = this.nodes, D = 130;
      N.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; });
      ctx.strokeStyle = c.strong; ctx.lineWidth = 1;
      for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) {
        const dx = N[i].x - N[j].x, dy = N[i].y - N[j].y, d = Math.hypot(dx, dy);
        if (d < D) { ctx.globalAlpha = (1 - d / D) * 0.8; ctx.beginPath(); ctx.moveTo(N[i].x, N[i].y); ctx.lineTo(N[j].x, N[j].y); ctx.stroke(); }
      }
      N.forEach(p => { ctx.globalAlpha = 1; ctx.fillStyle = p.k ? c[p.k] : c.faint; ctx.beginPath(); ctx.arc(p.x, p.y, p.k ? 3 : 1.8, 0, 6.283); ctx.fill(); });
    }
    // 5. Siatka + światło za kursorem
    fx_spotlight(ctx, w, h, t, c) {
      const gap = 40;
      const m = this.mouse || { x: w * (0.5 + 0.3 * Math.sin(t * 0.35)), y: h * (0.5 + 0.3 * Math.cos(t * 0.27)) };
      this.sm = this.sm || { ...m }; this.sm.x += (m.x - this.sm.x) * 0.08; this.sm.y += (m.y - this.sm.y) * 0.08;
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.globalAlpha = 1; ctx.beginPath();
      for (let x = 0.5; x < w; x += gap) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0.5; y < h; y += gap) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();
      const ac = c.accent || c.php;
      this.glow(ctx, this.sm.x, this.sm.y, 260, ac, c.dark ? 0.28 : 0.18);
      ctx.save(); ctx.beginPath(); ctx.arc(this.sm.x, this.sm.y, 200, 0, 6.283); ctx.clip();
      ctx.strokeStyle = ac; ctx.globalAlpha = 0.35; ctx.beginPath();
      for (let x = 0.5; x < w; x += gap) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0.5; y < h; y += gap) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke(); ctx.restore(); ctx.globalAlpha = 1;
    }
    // 6. Zorza — szerokie, miękkie pasma
    fx_aurora(ctx, w, h, t, c) {
      const a = c.dark ? 0.26 : 0.17;
      [[c.php, 0.3, 0], [c.py, 0.55, 1.7], [c.cpp, 0.8, 3.4]].forEach(([col, yy, p]) => {
        ctx.save();
        const cx = w * (0.5 + 0.25 * Math.sin(t * 0.09 + p)), cy = h * (yy + 0.08 * Math.sin(t * 0.13 + p));
        ctx.translate(cx, cy); ctx.rotate(-0.25 + 0.1 * Math.sin(t * 0.07 + p)); ctx.scale(3.2, 0.7);
        this.glow(ctx, 0, 0, Math.max(w, h) * 0.3, col, a);
        ctx.restore();
      });
    }
  }
  customElements.define('bg-fx', BgFx);
})();
