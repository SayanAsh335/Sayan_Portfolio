/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");

const navMenu = document.querySelector(".nav-menu");


menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("mobile-menu");

});



/* =========================================
   CLOSE MOBILE MENU
========================================= */

const navLinks = document.querySelectorAll(".nav-menu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("mobile-menu");

    });

});



/* =========================================
   SCROLL EFFECT
========================================= */

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");


    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5, 8, 12, 0.97)";

    } else {

        navbar.style.background =
            "rgba(8, 11, 16, 0.9)";

    }

});

/* ==============================
   ANIMATED NETWORK BACKGROUND
   ============================== */

const canvas = document.getElementById("network-background");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 120
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 1.8 + 0.8;

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }

        if (mouse.x !== null && mouse.y !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;

                this.x += (dx / distance) * force * 1.5;
                this.y += (dy / distance) * force * 1.5;
            }
        }
    }

    draw() {
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00ff9d";
        ctx.fill();
    }
}

function createParticles() {
    particles = [];

    const particleCount =
        window.innerWidth < 768 ? 45 : 90;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx =
                particles[a].x - particles[b].x;

            const dy =
                particles[a].y - particles[b].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {

                const opacity =
                    1 - distance / 130;

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(0, 255, 157, ${opacity * 0.18})`;

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}

function animateBackground() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    connectParticles();

    requestAnimationFrame(
        animateBackground
    );
}

window.addEventListener(
    "mousemove",
    function (event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);

window.addEventListener(
    "mouseleave",
    function () {

        mouse.x = null;
        mouse.y = null;

    }
);

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();
animateBackground();

// ================================
// 3D CARD TILT EFFECT
// ================================

const cards3D = document.querySelectorAll(
    ".skill-card, .project-card, .cert-card, .education-card, .about-box"
);

cards3D.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", function () {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});

// ================================
// MOUSE GLOW EFFECT
// ================================

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", function (event) {

    mouseGlow.style.left = event.clientX + "px";
    mouseGlow.style.top = event.clientY + "px";

});

/* ================================
   3D BACKGROUND MOUSE DEPTH
================================ */

let mouseX3D = 0;
let mouseY3D = 0;

document.addEventListener("mousemove", function (event) {
    mouseX3D = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY3D = (event.clientY / window.innerHeight - 0.5) * 2;
});

const networkCanvas = document.getElementById("network-background");

document.addEventListener("mousemove", function () {
    if (networkCanvas) {
        networkCanvas.style.transform =
            `translate(${mouseX3D * 8}px, ${mouseY3D * 8}px) scale(1.02)`;
    }
});

document.addEventListener("mouseleave", function () {
    if (networkCanvas) {
        networkCanvas.style.transform =
            "translate(0, 0) scale(1)";
    }
});

/* ================================
   ABOUT SECTION 3D MOVEMENT
================================ */

const aboutBox = document.querySelector(".about-box");

if (aboutBox) {

    aboutBox.addEventListener("mousemove", function (event) {

        const rect = aboutBox.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        aboutBox.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    aboutBox.addEventListener("mouseleave", function () {

        aboutBox.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

}

/* ================================
   SCROLL REVEAL
================================ */

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show-section");
            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

/* ================================
   HERO TYPING EFFECT
================================ */

const typingText = document.getElementById("typing-text");

const typingWords = [
    "Cyber Security Enthusiast",
    "IT Support & Networking",
    "Technical Support",
    "Security Analyst"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {
            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;

            wordIndex++;

            if (wordIndex === typingWords.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 90);
}

if (typingText) {
    typeEffect();
}

const revealElements = document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});