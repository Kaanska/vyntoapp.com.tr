/**
 * Splash Cursor Effect for Vynto
 * Simplified fluid simulation inspired by React Bits
 */

class SplashCursor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, px: 0, py: 0 };
        this.hue = 0;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;

            const dx = this.mouse.x - this.mouse.px;
            const dy = this.mouse.y - this.mouse.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 2) {
                this.createSplash(this.mouse.x, this.mouse.y, dx, dy);
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;

            const dx = this.mouse.x - this.mouse.px;
            const dy = this.mouse.y - this.mouse.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 2) {
                this.createSplash(this.mouse.x, this.mouse.y, dx, dy);
            }
        }, { passive: false });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSplash(x, y, dx, dy) {
        const velocity = Math.sqrt(dx * dx + dy * dy);
        const particleCount = Math.min(Math.floor(velocity * 2), 30);

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            const speed = Math.random() * velocity * 0.5 + velocity * 0.3;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed + dx * 0.3,
                vy: Math.sin(angle) * speed + dy * 0.3,
                life: 1,
                size: Math.random() * 15 + 10,
                hue: this.hue,
                saturation: 70 + Math.random() * 30,
                lightness: 50 + Math.random() * 20
            });
        }

        this.hue = (this.hue + 2) % 360;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life -= 0.01;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.life * 0.8})`);
            gradient.addColorStop(0.5, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.life * 0.4})`);
            gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashCursor);
} else {
    initSplashCursor();
}

function initSplashCursor() {
    const canvas = document.getElementById('splash-cursor-canvas');
    if (canvas) {
        new SplashCursor(canvas);
    }
}
