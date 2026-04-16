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
                                                          navbar.classList.add('scrolled');
                                                          navbar.style.top = '';
                                                          navbar.style.left = '';
                                                          navbar.style.right = '';
                                                          navbar.style.width = '';
                                                          navbar.style.transform = '';
                                          } else {
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

                              // ── Purchase feed with MASSIVE name variety ──────────────────────────
                              const purchaseFeedList = document.getElementById('purchase-feed-list');
        if (purchaseFeedList) {
                    const firstNames = [
                                    'Liam','Noah','Oliver','Elijah','William','James','Benjamin','Lucas','Henry','Alexander',
                                    'Mason','Michael','Ethan','Jacob','Daniel','Logan','Jackson','Aiden','Sebastian','Matthew',
                                    'Samuel','David','Joseph','Carter','Wyatt','Jayden','John','Owen','Dylan','Luke',
                                    'Gabriel','Anthony','Isaiah','Grayson','Jack','Julian','Levi','Christopher','Joshua','Andrew',
                                    'Lincoln','Mateo','Ryan','Jaxon','Nathan','Adrian','Christian','Maverick','Elias','Aaron',
                                    'Hudson','Nolan','Easton','Xavier','Robert','Dominic','Jaxson','Kevin','Thomas','Charles',
                                    'Ashley','Avery','Charlotte','Amelia','Evelyn','Abigail','Harper','Emily','Ella','Scarlett',
                                    'Grace','Sofia','Chloe','Victoria','Riley','Aria','Zoe','Nora','Lily','Hannah',
                                    'Marcus','Trevor','Blake','Kyle','Tyler','Caleb','Hunter','Connor','Kai','Leo',
                                    'Finn','Miles','Theo','Axel','Jasper','Felix','Oscar','Milo','Luca','Rowan',
                                    'Silas','Declan','Ezra','Asher','Beckett','Brooks','Colton','Dawson','Everett','Greyson',
                                    'Hayes','Ivan','Jude','Knox','Landon','Maxwell','Nico','Parker','Quinn','Ryder',
                                    'Sawyer','Tate','Uriel','Victor','Weston','Xander','Zander','Atlas','Bodhi','Cash',
                                    'Dante','Emilio','Franco','Gael','Hugo','Idris','Jensen','Kian','Lorenzo','Marco',
                                    'Nathaniel','Orlando','Preston','Quentin','Rafael','Santiago','Tristan','Ulric','Vance','Warren',
                                    'Zayden','Alec','Brock','Cade','Drake','Emmett','Forrest','Gage','Harley','Iker',
                                    'Jayce','Kellan','Lance','Morgan','Noel','Omar','Pierce','Reid','Sterling','Troy',
                                    'Valentino','Wade','Zeke','Archer','Bishop','Cruz','Devin','Ellis','Flynn','Grant',
                                    'Heath','Isaiah','Joaquin','Kyrie','Lawson','Mitchell','Nash','Otto','Phoenix','Rome',
                                    'Spencer','Tucker','Vaughn','Wells','Ximena','Yusuf','Zain','Adriana','Bianca','Camila',
                                    'Diana','Elena','Fiona','Gabriella','Helena','Iris','Jade','Kira','Luna','Maya',
                                    'Natalia','Olivia','Penelope','Reina','Selena','Tessa','Uma','Vivian','Wendy','Ximena',
                                    'Yara','Zara','Aaliyah','Bella','Carmen','Delilah','Elise','Freya','Genevieve','Harlow',
                                    'Ivy','Juliana','Kenzie','Layla','Melody','Naomi','Ophelia','Piper','Raven','Sage',
                                    'Thea','Unity','Violet','Willow','Xiomara','Yasmine','Zelda','Addison','Brielle','Clara',
                                    'Daisy','Ember','Faith','Gemma','Hope','Isla','Josie','Kaia','Leah','Maisie',
                                    'Nova','Opal','Paige','Rosa','Stella','Teagan','Vera','Winter','Anya','Brynn',
                                    'Catalina','Daphne','Esme','Flora','Greta','Hailey','Ingrid','Joy','Kendall','Lola',
                                    'Mira','Nadia','Orla','Priya','Rae','Skye','Talia','Ursa','Veda','Wren'
                                ];
                    const lastInits = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                    const usernamePrefixes = ['xX','','','','','Dark','Shadow','Storm','Blaze','Frost','Neon','Cyber','Pixel','Nova','Ace','Pro','Elite','Zero','Ghost','Rapid','Turbo','Stealth','Hyper','Ultra','Mega','Alpha','Omega','Chaos','Fury','Venom','Titan','Iron','Steel','Rogue','Swift','Blitz','Surge','Volt','Viper','Apex','Prime','Zen','Onyx','Jade','Echo','Drift','Flux','Pulse','Rift','Sol','Arc'];
                    const usernameSuffixes = ['Xx','','','','','_YT','_TTV','HD','_fn','99','_pro','420','2k','_goat','_gg','_btw','777','_op','69','_cracked','101','_live','xd','_gaming','_clips','3000','_fps','_builds','_edits','_1v1'];
                    const emailDomains = ['gmail.com','yahoo.com','outlook.com','hotmail.com','protonmail.com','icloud.com','aol.com','mail.com','zoho.com','yandex.com'];
                    const emailWords = ['cool','gamer','pro','dark','fast','elite','real','the','mr','ms','dr','sir','king','queen','boss','chief','lord','duke','ace','top','big','red','blue','max','mega','super','ultra','hyper','best','epic','wild','free','true','one','new','old','hot','ice','sky','sun','moon','star','fire','rain','snow','wave','rock','gold','iron','oak','zen'];

            function generateName() {
                            const type = Math.random();
                            if (type < 0.35) {
                                                // First name + last initial (e.g., "Marcus T.")
                                return firstNames[Math.floor(Math.random()*firstNames.length)] + ' ' + lastInits[Math.floor(Math.random()*lastInits.length)] + '.';
                            } else if (type < 0.6) {
                                                // Gamer username (e.g., "xXDarkBlaze_YT")
                                const pre = usernamePrefixes[Math.floor(Math.random()*usernamePrefixes.length)];
                                                const name = firstNames[Math.floor(Math.random()*firstNames.length)];
                                                const suf = usernameSuffixes[Math.floor(Math.random()*usernameSuffixes.length)];
                                                const num = Math.random() < 0.5 ? Math.floor(Math.random()*999) : '';
                                                return pre + name + num + suf;
                            } else if (type < 0.8) {
                                                // Email-style (e.g., "coolgamer42@gmail.com")
                                const w1 = emailWords[Math.floor(Math.random()*emailWords.length)];
                                                const w2 = emailWords[Math.floor(Math.random()*emailWords.length)];
                                                const num = Math.floor(Math.random()*9999);
                                                const domain = emailDomains[Math.floor(Math.random()*emailDomains.length)];
                                                return w1 + w2 + num + '@' + domain;
                            } else {
                                                // Full name style (e.g., "Marcus Johnson")
                                const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Turner','Phillips','Evans','Collins','Edwards','Stewart','Morris','Murphy','Cook','Rogers','Morgan','Peterson','Cooper','Reed','Bailey','Bell','Howard','Ward','Cox','Diaz','Richardson','Wood','Watson','Brooks','Bennett','Gray','James','Reyes','Cruz','Hughes','Price','Myers','Long','Foster','Sanders','Ross','Morales','Powell','Sullivan','Russell','Ortiz','Jenkins','Gutierrez','Perry','Butler','Barnes','Fisher'];
                                                return firstNames[Math.floor(Math.random()*firstNames.length)] + ' ' + lastNames[Math.floor(Math.random()*lastNames.length)];
                            }
            }

            const products = ['Macro.io','PC Optimizations','Console Tweaks','Ping Optimizations','Bloom Reducer'];
                    const actions = ['purchased','bought','ordered','just bought','grabbed','picked up','snagged'];
                    const addEntry = () => {
                                    const li = document.createElement('li');
                                    li.innerHTML = generateName() + ' ' +
                                                        actions[Math.floor(Math.random()*actions.length)] + ' <strong>' +
                                                        products[Math.floor(Math.random()*products.length)] + '</strong>';
                                    purchaseFeedList.insertBefore(li, purchaseFeedList.firstChild);
                                    while (purchaseFeedList.children.length > 7) purchaseFeedList.removeChild(purchaseFeedList.lastChild);
                    };
                    for (let i = 0; i < 4; i++) addEntry();
                    setInterval(addEntry, 4000);
        }

                              // ── Product card video hover (PC only) ───────────────────────────────
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
                    document.querySelectorAll('.product-card video').forEach(v => {
                                    v.pause();
                                    v.removeAttribute('src');
                                    v.load();
                                    v.style.display = 'none';
                    });
        }

                              // ── Sparkle particles that follow cursor/touch ───────────────────────
                              const sparkleCanvas = document.createElement('canvas');
        sparkleCanvas.id = 'sparkle-canvas';
        sparkleCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
        document.body.appendChild(sparkleCanvas);
        const ctx = sparkleCanvas.getContext('2d');
        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        const sparkles = [];
        const MAX_SPARKLES = 60;

                              function resizeCanvas() {
                                          sparkleCanvas.width = window.innerWidth;
                                          sparkleCanvas.height = window.innerHeight;
                              }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

                              document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
        document.addEventListener('touchmove', e => {
                    if (e.touches.length > 0) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
        }, { passive: true });

                              function createSparkle() {
                                          const spread = 200;
                                          return {
                                                          x: mouseX + (Math.random() - 0.5) * spread,
                                                          y: mouseY + (Math.random() - 0.5) * spread,
                                                          size: Math.random() * 2.5 + 0.5,
                                                          opacity: Math.random() * 0.5 + 0.2,
                                                          life: Math.random() * 80 + 40,
                                                          maxLife: 0,
                                                          vx: (Math.random() - 0.5) * 0.3,
                                                          vy: (Math.random() - 0.5) * 0.3,
                                                          twinkleSpeed: Math.random() * 0.05 + 0.02
                                          };
                              }

                              let sparkleFrame = 0;
        function animateSparkles() {
                    ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
                    sparkleFrame++;

            if (sparkleFrame % 3 === 0 && sparkles.length < MAX_SPARKLES) {
                            sparkles.push(createSparkle());
                            sparkles[sparkles.length - 1].maxLife = sparkles[sparkles.length - 1].life;
            }

            for (let i = sparkles.length - 1; i >= 0; i--) {
                            const s = sparkles[i];
                            s.life--;
                            s.x += s.vx;
                            s.y += s.vy;
                            const lifeRatio = s.life / s.maxLife;
                            const twinkle = Math.sin(sparkleFrame * s.twinkleSpeed) * 0.3 + 0.7;
                            const alpha = s.opacity * lifeRatio * twinkle;

                        ctx.save();
                            ctx.globalAlpha = alpha;
                            ctx.fillStyle = '#00e5ff';
                            ctx.shadowColor = '#00e5ff';
                            ctx.shadowBlur = 6;
                            ctx.beginPath();
                            // Draw a 4-pointed star
                        const cx = s.x, cy = s.y, r = s.size;
                            ctx.moveTo(cx, cy - r * 2);
                            ctx.lineTo(cx + r * 0.4, cy - r * 0.4);
                            ctx.lineTo(cx + r * 2, cy);
                            ctx.lineTo(cx + r * 0.4, cy + r * 0.4);
                            ctx.lineTo(cx, cy + r * 2);
                            ctx.lineTo(cx - r * 0.4, cy + r * 0.4);
                            ctx.lineTo(cx - r * 2, cy);
                            ctx.lineTo(cx - r * 0.4, cy - r * 0.4);
                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();

                        if (s.life <= 0) sparkles.splice(i, 1);
            }
                    requestAnimationFrame(animateSparkles);
        }
        animateSparkles();

                              // ── Scroll reveal animations ─────────────────────────────────────────
                              const revealElements = document.querySelectorAll(
                                          '.product-highlight, .product-card, .benefit-item, .benefits-description, ' +
                                          '.testimonials-section, .purchase-feed-section, .product-grid, .hero-title, ' +
                                          '.hero-subtitle, .cta-button, .metrics .metric, h2, .section-subtitle'
                                      );
        revealElements.forEach(el => {
                    el.classList.add('scroll-reveal');
        });

                              const revealObserver = new IntersectionObserver((entries) => {
                                          entries.forEach((entry, index) => {
                                                          if (entry.isIntersecting) {
                                                                              // Stagger the animation slightly for elements entering at the same time
                                                              setTimeout(() => {
                                                                                      entry.target.classList.add('revealed');
                                                              }, index * 80);
                                                                              revealObserver.unobserve(entry.target);
                                                          }
                                          });
                              }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

                              revealElements.forEach(el => revealObserver.observe(el));

                              // ── Enhanced planet glow effect ──────────────────────────────────────
                              const hero = document.querySelector('.hero');
        if (hero) {
                    let glowFrame = 0;
                    function animateGlow() {
                                    glowFrame++;
                                    const flicker1 = Math.sin(glowFrame * 0.02) * 0.15 + 0.85;
                                    const flicker2 = Math.sin(glowFrame * 0.035 + 1) * 0.1 + 0.9;
                                    const flicker3 = Math.sin(glowFrame * 0.05 + 2) * 0.2 + 0.8;
                                    const combined = flicker1 * flicker2 * flicker3;
                                    const spread = 80 + Math.sin(glowFrame * 0.015) * 30;
                                    hero.style.setProperty('--glow-intensity', combined);
                                    hero.style.setProperty('--glow-spread', spread + 'px');
                                    requestAnimationFrame(animateGlow);
                    }
                    animateGlow();
        }

});
