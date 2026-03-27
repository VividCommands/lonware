// Lonware main script
document.addEventListener('DOMContentLoaded', () => {

    // ── Dynamic word rotation ──────────────────────────────────────────────
    const dynamicWord = document.getElementById('dynamic-word');
    const words = ['performance', 'optimization', 'precision', 'control', 'efficiency'];
    let wordIndex = 0;
    const updateWord = () => {
        if (!dynamicWord) return;
        dynamicWord.textContent = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;
    };
    if (dynamicWord) { updateWord(); setInterval(updateWord, 2000); }

    // ── Navbar: pill animation on scroll ──────────────────────────────────
    const announcementBar = document.querySelector('.announcement-bar');
    const navbar = document.querySelector('.navbar');

    const getAnnouncementHeight = () => announcementBar ? announcementBar.offsetHeight : 0;

    const updateNavbar = () => {
        if (!navbar) return;
        const annHeight = getAnnouncementHeight();
        const scrolled = window.scrollY > annHeight;

        if (scrolled) {
            // Pill state: announcement bar has scrolled away
            navbar.classList.add('scrolled');
            navbar.style.top = '';   // CSS handles top via .scrolled rule
            navbar.style.left = '';
            navbar.style.right = '';
            navbar.style.width = '';
            navbar.style.transform = '';
        } else {
            // Default state: sitting below announcement bar
            navbar.classList.remove('scrolled');
            navbar.style.top = annHeight - window.scrollY + 'px';
            navbar.style.left = '';
            navbar.style.right = '';
            navbar.style.width = '';
            navbar.style.transform = '';
        }
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar, { passive: true });

    // ── CTA button → reveal packages ──────────────────────────────────────
    const ctaBtn = document.querySelector('.cta-button');
    const packagesSection = document.getElementById('packages');
    if (ctaBtn && packagesSection) {
        ctaBtn.addEventListener('click', () => {
            packagesSection.style.display = 'block';
            setTimeout(() => packagesSection.scrollIntoView({ behavior: 'smooth' }), 50);
        });
    }

    // ── Testimonials slider ───────────────────────────────────────────────
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-nav.left');
    const nextBtn = document.querySelector('.testimonial-nav.right');
    let slideIndex = 0;
    const showSlide = n => slides.forEach((s, i) => s.classList.toggle('active', i === n));
    const nextSlide = () => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); };
    const prevSlide = () => { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); };
    if (prevBtn && nextBtn) { prevBtn.addEventListener('click', prevSlide); nextBtn.addEventListener('click', nextSlide); }
    if (slides.length > 1) setInterval(nextSlide, 6000);

    // ── Macro showcase slider ────────────────────────────────────────────
    const macroSlides = document.querySelectorAll('.macro-slider .macro-slide');
    let macroIndex = 0;
    if (macroSlides.length > 1) {
        macroSlides.forEach((s, i) => { s.style.display = i === 0 ? 'block' : 'none'; });
        const showMacroSlide = n => macroSlides.forEach((s, i) => { s.style.display = i === n ? 'block' : 'none'; });
        // Auto-play macro video if first slide has a video
        const firstVideo = macroSlides[0] && macroSlides[0].querySelector('video');
        if (firstVideo) {
            firstVideo.muted = true;
            firstVideo.setAttribute('playsinline', '');
            firstVideo.play().catch(() => {});
        }
        setInterval(() => { macroIndex = (macroIndex + 1) % macroSlides.length; showMacroSlide(macroIndex); }, 4000);
    }

    // ── Auto-play any standalone macro video (non-slider) ────────────────
    document.querySelectorAll('.macro-slide video').forEach(v => {
        v.muted = true;
        v.setAttribute('playsinline', '');
        v.removeAttribute('controls');
        v.play().catch(() => {});
    });

    // ── Purchase feed ─────────────────────────────────────────────────────
    const purchaseFeedList = document.getElementById('purchase-feed-list');
    if (purchaseFeedList) {
        const names = [
            'Liam','Noah','Oliver','Elijah','William','James','Benjamin','Lucas','Henry','Alexander',
            'Mason','Michael','Ethan','Jacob','Daniel','Logan','Jackson','Aiden','Sebastian','Matthew',
            'Samuel','David','Joseph','Carter','Wyatt','Jayden','John','Owen','Dylan','Luke',
            'Gabriel','Anthony','Isaiah','Grayson','Jack','Julian','Levi','Christopher','Joshua','Andrew',
            'Lincoln','Mateo','Ryan','Jaxon','Nathan','Adrian','Christian','Maverick','Elias','Aaron',
            'Hudson','Nolan','Easton','Xavier','Robert','Dominic','Jaxson','Kevin','Thomas','Charles',
            'Ashley','Avery','Charlotte','Amelia','Evelyn','Abigail','Harper','Emily','Ella','Scarlett',
            'Grace','Sofia','Chloe','Victoria','Riley','Aria','Zoe','Nora','Lily','Hannah',
            'Anonymous','AnonymousBuyer','Customer42','Buyer77','PlayerOne','GamerGirl','GamerGuy','Shopper99',
            'User001','User002','User003','User004','User005','User006','User007','User008','User009','User010',
            'User011','User012','User013','User014','User015','User016','User017','User018','User019','User020',
            'User021','User022','User023','User024','User025','User026','User027','User028','User029','User030'
        ];
        const products = [
            'Macro.io','PC Optimizations','Console Tweaks','Ping Optimizations','Bloom Reducer'
        ];
        const actions = ['purchased','bought','ordered','just bought'];
        const addEntry = () => {
            const li = document.createElement('li');
            li.innerHTML = names[Math.floor(Math.random()*names.length)] + ' ' +
                actions[Math.floor(Math.random()*actions.length)] + ' <strong>' +
                products[Math.floor(Math.random()*products.length)] + '</strong>';
            purchaseFeedList.insertBefore(li, purchaseFeedList.firstChild);
            while (purchaseFeedList.children.length > 7) purchaseFeedList.removeChild(purchaseFeedList.lastChild);
        };
        for (let i = 0; i < 4; i++) addEntry();
        setInterval(addEntry, 6000);
    }

    // ── Product card video hover (PC) ────────────────────────────────────
    // Desktop-only: enable video hover previews on product cards.
    // On mobile, hover fires on tap causing accidental video playback.
    const isMobile = ('ontouchstart' in window) || window.innerWidth <= 768;
    if (!isMobile) {
        document.querySelectorAll('.product-card').forEach(card => {
            const video = card.querySelector('video');
            if (!video) return;
            video.pause();
            video.currentTime = 0;
            card.addEventListener('mouseenter', () => video.play().catch(() => {}));
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });
    } else {
        // On mobile: hide product-card hover videos entirely
        document.querySelectorAll('.product-card video').forEach(v => {
            v.pause();
            v.removeAttribute('src');
            v.load();
            v.style.display = 'none';
        });
    }

});
