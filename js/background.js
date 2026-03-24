/* ════════════════════════════════════════
   ANIMATED BACKGROUND
════════════════════════════════════════ */
let canvas, ctx, width, height;
let points = [];
let isMobile = false;

// Configuration
const CONFIG = {
    particleCount: 50,
    connectionDistance: 100,
    pointRadius: 2.5,
    pointAlpha: 0.7,
    lineAlpha: 0.4,
    speed: 0.5
};

// Initialize canvas when DOM is ready
function initCanvas() {
    canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return false;
    }
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return false;
    }
    return true;
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * CONFIG.speed;
        this.vy = (Math.random() - 0.5) * CONFIG.speed;
    }

    update() {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        
        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2) {
            this.vx = (this.vx / speed) * 2;
            this.vy = (this.vy / speed) * 2;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, CONFIG.pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 132, 255, ${CONFIG.pointAlpha})`;
        ctx.fill();
    }
}

function createParticles() {
    points = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        points.push(new Point(x, y));
    }
}

function drawConnections() {
    ctx.strokeStyle = `rgba(10, 132, 255, ${CONFIG.lineAlpha})`;
    ctx.lineWidth = 0.8;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i];
            const p2 = points[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONFIG.connectionDistance) {
                const alpha = (1 - dist / CONFIG.connectionDistance) * CONFIG.lineAlpha;
                ctx.strokeStyle = `rgba(10, 132, 255, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    // Clear canvas completely
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);

    // Update all points
    points.forEach(p => {
        p.update();
    });

    // Draw connections first (so they appear behind points)
    drawConnections();

    // Draw points on top
    points.forEach(p => {
        p.draw();
    });

    requestAnimationFrame(animate);
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    isMobile = width < 768;
    
    // Adjust particles for mobile
    if (isMobile) {
        CONFIG.particleCount = 30;
        CONFIG.connectionDistance = 80;
        CONFIG.pointRadius = 2;
    } else {
        CONFIG.particleCount = 50;
        CONFIG.connectionDistance = 100;
        CONFIG.pointRadius = 2.5;
    }
    
    createParticles();
}

window.addEventListener('resize', resize);

// Init - Ensure DOM is ready before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (initCanvas()) {
            resize();
            animate();
        }
    });
} else {
    // DOM is already loaded
    if (initCanvas()) {
        resize();
        animate();
    }
}