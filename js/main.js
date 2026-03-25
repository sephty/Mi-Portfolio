/* ════════════════════════════════════════
   i18n SYSTEM
════════════════════════════════════════ */
const translations = {
    es: {
        nav_home: "Inicio",
        nav_about: "Sobre mí",
        nav_projects: "Proyectos",
        nav_skills: "Habilidades",
        nav_contact: "Contacto",
        btn_contact: "Contáctame",
        about_title: "Sobre mí",
        about_text: "Desarrollador apasionado por construir soluciones tecnológicas escalables. Especializado en APIs REST y desarrollo web interactivo. Combina pensamiento lógico con creatividad y adaptabilidad.",
        mission_title: "Misión",
        mission_text: "Crecer como dev backend construyendo arquitecturas robustas y eficientes, manteniendo siempre un código limpio y escalable.",
        vision_title: "Visión",
        vision_text: "Contribuir a productos que resuelvan problemas reales mediante la tecnología, liderando proyectos innovadores a nivel global.",
        stat_label: "proyectos completados",
        motivation1: "Aprender cada día",
        motivation2: "Crear soluciones",
        motivation3: "Mejorar siempre",
        motivation4: "Innovar constantemente",
        projects_title: "Proyectos",
        proj1_desc: "LMS educativo con gestión de cursos, lecciones y usuarios. Panel seguro con autenticación.",
        proj2_desc: "Sitio hotelero con integración REST API, gestión de usuarios y sistema de reservas.",
        proj3_desc: "Tienda de relojes construida solo con CSS puro. Carrusel simulado sin JavaScript.",
        proj4_desc: "App de consola para gestionar colecciones de libros, películas y música con valoraciones.",
        btn_github: "Ver en GitHub",
        skills_title: "Habilidades",
        skills_tech: "Técnicas",
        skills_soft: "Blandas",
        soft1: "Paciencia", soft2: "Creatividad", soft3: "Empatía", soft4: "Disciplina",
        soft5: "Proactividad", soft6: "Comunicación", soft7: "Adaptabilidad",
        contact_title: "Contáctame",
        contact_sub: "Disponible para proyectos y oportunidades.",
        cabinet_open: "Abrir recursos",
        cabinet_close: "Cerrar",
        btn_cv: "Descargar CV",
        footer: "Hecho con código y café",
        roles:["Junior Backend Developer", "API REST Enthusiast", "Problem Solver"]
    },
    en: {
        nav_home: "Home",
        nav_about: "About me",
        nav_projects: "Projects",
        nav_skills: "Skills",
        nav_contact: "Contact",
        btn_contact: "Contact me",
        about_title: "About me",
        about_text: "Passionate developer building scalable technological solutions. Specialized in REST APIs and interactive web development. Combines logical thinking with creativity and adaptability.",
        mission_title: "Mission",
        mission_text: "Keep growing as a backend dev building robust and efficient architectures, always maintaining clean and scalable code.",
        vision_title: "Vision",
        vision_text: "Contribute to products that solve real problems through technology, leading innovative projects globally.",
        stat_label: "completed projects",
        motivation1: "Learn every day",
        motivation2: "Create solutions",
        motivation3: "Always improve",
        motivation4: "Innovate constantly",
        projects_title: "Projects",
        proj1_desc: "Educational LMS with course, lesson and user management. Secure panel with authentication.",
        proj2_desc: "Hotel website with REST API integration, user management and reservation system.",
        proj3_desc: "Watch store built with pure CSS only. Simulated carousel without JavaScript.",
        proj4_desc: "Console app to manage collections of books, movies and music with ratings.",
        btn_github: "View on GitHub",
        skills_title: "Skills",
        skills_tech: "Technical",
        skills_soft: "Soft skills",
        soft1: "Patience", soft2: "Creativity", soft3: "Empathy", soft4: "Discipline",
        soft5: "Proactivity", soft6: "Communication", soft7: "Adaptability",
        contact_title: "Contact Me",
        contact_sub: "Available for projects and opportunities.",
        cabinet_open: "Open resources",
        cabinet_close: "Close",
        btn_cv: "Download CV",
        footer: "Made with code and coffee",
        roles:["Junior Backend Developer", "API REST Enthusiast", "Problem Solver"]
    }
};

let currentLang = localStorage.getItem('lang') || 'es';
let isCabinetOpen = false;

// Project images data structure
// Format: { projectId: [array of image URLs] }
const projectImages = {
    0: ['imgs/projects/abc_campus.webp', 'imgs/projects/abc_campus_2.webp'], // ABC Campus
    1: ['imgs/projects/delrincon.webp'], // DelRincón Hotel
    2: [], // LuxTime Watch Shop
    3: []  // Library Management
};

// Track current image index for each project
const projectImageIndex = {
    0: 0,
    1: 0,
    2: 0,
    3: 0
};

// Stat card image
let statCardImage = 'imgs/projects/campuslands-jovenes.jpg';

function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if(translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Adjust cabinet text if open
    if (isCabinetOpen) {
        document.getElementById('cabinet-text').textContent = translations[lang]['cabinet_close'];
    }
    
    // Update language button text (shows target language)
    document.getElementById('lang-btn').textContent = lang === 'es' ? 'EN' : 'ES';
}

document.getElementById('lang-btn').addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    const mainContent = document.getElementById('main-content');
    
    gsap.to(mainContent, { opacity: 0, duration: 0.2, onComplete: () => {
        currentLang = newLang;
        localStorage.setItem('lang', currentLang);
        applyLang(currentLang);
        gsap.to(mainContent, { opacity: 1, duration: 0.2 });
    }});
});

/* ════════════════════════════════════════
   INIT & PLUGINS
════════════════════════════════════════ */
function initProjectImages() {
    // Initialize project image gallery navigation
    document.querySelectorAll('.carousel-card[data-project]').forEach(card => {
        const projectId = parseInt(card.dataset.project);
        const images = projectImages[projectId] || [];
        
        if (images.length === 0) return; // No images for this project
        
        const prevBtn = card.querySelector('.prev-image');
        const nextBtn = card.querySelector('.next-image');
        const counter = card.querySelector('.image-counter');
        const imgElement = card.querySelector('.project-image');
        const placeholder = card.querySelector('.image-placeholder');
        
        // Show image and navigation if there are images
        if (images.length > 0) {
            imgElement.style.display = 'block';
            imgElement.src = images[0];
            placeholder.style.display = 'none';
            counter.style.display = 'inline-block';
            counter.textContent = `1/${images.length}`;
            
            if (images.length > 1) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
            
            prevBtn.addEventListener('click', () => {
                projectImageIndex[projectId] = (projectImageIndex[projectId] - 1 + images.length) % images.length;
                updateProjectImage(card, projectId);
            });
            
            nextBtn.addEventListener('click', () => {
                projectImageIndex[projectId] = (projectImageIndex[projectId] + 1) % images.length;
                updateProjectImage(card, projectId);
            });
        }
    });
    
    // Initialize stat card image if exists
    if (statCardImage) {
        const statImg = document.getElementById('stat-image');
        const statPlaceholder = document.querySelector('.stat-placeholder');
        statImg.src = statCardImage;
        statImg.style.display = 'block';
        statPlaceholder.style.display = 'none';
    }
}

function updateProjectImage(card, projectId) {
    const images = projectImages[projectId];
    const currentIndex = projectImageIndex[projectId];
    const imgElement = card.querySelector('.project-image');
    const counter = card.querySelector('.image-counter');
    
    imgElement.src = images[currentIndex];
    counter.textContent = `${currentIndex + 1}/${images.length}`;
}

function setProjectImages(projectId, imageArray) {
    if (projectId >= 0 && projectId < 4) {
        projectImages[projectId] = imageArray;
        // Reinitialize if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initProjectImages);
        } else {
            initProjectImages();
        }
    }
}

function setStatImage(imageUrl) {
    statCardImage = imageUrl;
    // Update if DOM is ready
    if (document.readyState !== 'loading') {
        const statImg = document.getElementById('stat-image');
        const statPlaceholder = document.querySelector('.stat-placeholder');
        if (statImg) {
            statImg.src = imageUrl;
            statImg.style.display = 'block';
            statPlaceholder.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    applyLang(currentLang);
    initTypewriter();
    initMotivationCycle();
    initProjectImages();
    initGSAPAnimations();
    initCarousel();
});

/* ════════════════════════════════════════
   TYPEWRITER
════════════════════════════════════════ */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const roles = translations[currentLang].roles;
        const currentRole = roles[roleIndex % roles.length];
        
        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
}

/* ════════════════════════════════════════
   MOTIVATION CYCLE (SYNCED WITH STAT IMAGE)
════════════════════════════════════════ */
function initMotivationCycle() {
    const el = document.getElementById('motivation-text');
    if (!el) return;
    
    let motivationIndex = 0;
    const motivations = ['motivation1', 'motivation2', 'motivation3', 'motivation4'];
    
    // Set campuslands-jovenes image
    const statImg = document.getElementById('stat-image');
    const statPlaceholder = document.querySelector('.stat-placeholder');
    if (statImg && statPlaceholder) {
        statImg.src = 'imgs/campuslands-jovenes.jpg';
        statImg.style.display = 'block';
        statPlaceholder.style.display = 'none';
    }
    
    function cycleMotivation() {
        const key = motivations[motivationIndex % motivations.length];
        el.textContent = translations[currentLang][key];
        motivationIndex++;
    }
    
    // Change every 5 seconds
    cycleMotivation();
    setInterval(cycleMotivation, 5000);
}

function updateStatImageFromProject() {
    // This function can be called when carousel changes to update the stat image
    // Currently the stat image cycles independently every 5 seconds
}


/* ════════════════════════════════════════
   GSAP ANIMATIONS
════════════════════════════════════════ */
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loading Timeline
    const tl = gsap.timeline();
    
    // Setup Hero Name for stagger
    const nameEl = document.getElementById('hero-name');
    const nameText = nameEl.textContent;
    nameEl.innerHTML = '';
    nameText.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        nameEl.appendChild(span);
    });

    tl.fromTo('.navbar', {y: -50, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, ease: 'power3.out'})
      .fromTo('.hero-photo-wrapper', {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)'}, "-=0.2")
      .to(nameEl.children, {opacity: 1, stagger: 0.03, duration: 0.1}, "-=0.2")
      .fromTo('.hero-role-wrapper', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.4}, "-=0.1")
      .fromTo('.hero-btn', {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 0.4}, "-=0.2");

    // Scroll Animations
    gsap.utils.toArray('.gs-reveal').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

/* ════════════════════════════════════════
   CAROUSEL - INFINITE AUTO-SCROLL
════════════════════════════════════════ */
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-card'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    let currentIndex = 0;
    let autoScrollInterval = null;
    let isHovering = false;
    let isManualScroll = false;

    function getCardsPerView() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const slideIndex = currentIndex % slides.length;
        const translatePercent = (slideIndex / cardsPerView) * 100;
        track.style.transform = `translateX(-${translatePercent}%)`;
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel();
        updateStatImageFromProject();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateCarousel();
        updateStatImageFromProject();
    }

    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        
        autoScrollInterval = setInterval(() => {
            if (!isHovering && !isManualScroll) {
                nextSlide();
            }
        }, 5000); // Scroll every 5 seconds (was 4s)
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Event listeners - don't reset auto scroll
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    carouselWrapper.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Initialize
    updateCarousel();
    startAutoScroll();
}

/* ════════════════════════════════════════
   CABINET TOGGLE
════════════════════════════════════════ */
const cabinetToggle = document.getElementById('cabinet-toggle');
const cabinetContent = document.getElementById('cabinet-content');
const iconLock = document.getElementById('icon-lock');
const iconUnlock = document.getElementById('icon-unlock');

cabinetToggle.addEventListener('click', () => {
    isCabinetOpen = !isCabinetOpen;
    
    if (isCabinetOpen) {
        iconLock.style.display = 'none';
        iconUnlock.style.display = 'block';
        document.getElementById('cabinet-text').textContent = translations[currentLang]['cabinet_close'];
        gsap.to(cabinetContent, {height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out'});
    } else {
        iconUnlock.style.display = 'none';
        iconLock.style.display = 'block';
        document.getElementById('cabinet-text').textContent = translations[currentLang]['cabinet_open'];
        gsap.to(cabinetContent, {height: 0, opacity: 0, duration: 0.4, ease: 'power2.in'});
    }
});

/* ════════════════════════════════════════
   SCROLL PROGRESS & NAVBAR & MOBILE MENU
════════════════════════════════════════ */
const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    // Progress
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;

    // Navbar
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('active'));
});

/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function loop() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.transform = `translate(calc(${curX}px - 50%), calc(${curY}px - 50%))`;
    requestAnimationFrame(loop);
}
if(window.innerWidth >= 768) {
    loop();
}