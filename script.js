const viewport = document.getElementById('viewport');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
window.addEventListener('mousemove', (e) =>{
    mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -40;
});
window.addEventListener('scroll', () =>{
    let scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    viewport.style.transform = `rotateX(${mouseY + (scrollFraction * 120)}deg) rotateY(${mouseX + (scrollFraction * 180)}deg) translateZ(${scrollFraction * 150}px)`;
    });
    function renderLoop(){
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        let scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (window.scrollY === 0){
            viewport.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        }
        requestAnimationFrame(renderLoop);
    }
    renderLoop();
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        const particles = [];
        const particleCount = 45;
        for (let i = 0; i < particleCount; i++){
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.5 + 0.2
                });
            }
            function animateParticles(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p =>{
                    p.x += p.speedX;
                    p.y += p.speedY;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                    ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });
                requestAnimationFrame(animateParticles);
            }
            animateParticles();