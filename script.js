// Lonware main script

document.addEventListener('DOMContentLoaded', () => {

                            // --- Dynamic word rotation ---
                            const dynamicWord = document.getElementById('dynamic-word');
    const words = ['performance', 'optimization', 'precision', 'control', 'efficiency'];
    let wordIndex = 0;
    const updateWord = () => {
          if (!dynamicWord) return;
          dynamicWord.textContent = words[wordIndex];
          wordIndex = (wordIndex + 1) % words.length;
    };
    if (dynamicWord) { updateWord(); setInterval(updateWord, 2000); }

                            // --- Navbar: pill animation on scroll ---
                            const announcementBar = document.querySelector('.announcement-bar');
    const navbar = document.querySelector('.navbar');

                            const getAnnouncementHeight = () => announcementBar ? announcementBar.offsetHeight : 0;

                            const updateNavbar = () => {
                                  if (!navbar) return;
                                  const annHeight = getAnnouncementHeight();
                                  const scrolled = window.scrollY > annHeight;

                                  if (scrolled) {
                                          navbar.classList.add('scrolled');
                                  } else {
                                          navbar.classList.remove('scrolled');
                                  }
                            };

                            window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

                            // --- Mobile menu toggle ---
                            const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
          menuToggle.addEventListener('click', () => {
                  navLinks.classList.toggle('active');
                  menuToggle.classList.toggle('active');
          });
    }

                            // --- Ambient Particle System ---
                            (function initParticles() {
                                  const canvas = document.createElement('canvas');
                                  canvas.id = 'particle-canvas';
                                  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
                                  document.body.appendChild(canvas);
                                  const ctx = canvas.getContext('2d');

                                 let W, H;
                                  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
                                  resize();
                                  window.addEventListener('resize', resize);

                                 const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
                                  const PARTICLE_COUNT = isMobile ? 25 : 40;
                                  const MAGNETIC_RADIUS = 200;
                                  const MAGNETIC_STRENGTH = 0.015;

                                 let mouseX = -9999, mouseY = -9999;
                                  if (!isMobile) {
                                          document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
                                          document.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });
                                  }

                                 const particles = [];
                                  for (let i = 0; i < PARTICLE_COUNT; i++) {
                                          particles.push({
                                                    x: Math.random() * W,
                                                    y: Math.random() * H,
                                                    vx: (Math.random() - 0.5) * 0.3,
                                                    vy: (Math.random() - 0.5) * 0.3,
                                                    radius: Math.random() * 2 + 0.5,
                                                    opacity: Math.random() * 0.15 + 0.05,
                                                    baseOpacity: Math.random() * 0.15 + 0.05,
                                                    pulseSpeed: Math.random() * 0.005 + 0.002,
                                                    pulsePhase: Math.random() * Math.PI * 2
                                          });
                                  }

                                 function animate() {
                                         ctx.clearRect(0, 0, W, H);

                                    for (let i = 0; i < particles.length; i++) {
                                              const p = particles[i];

                                           // Slow drift
                                           p.x += p.vx;
                                              p.y += p.vy;

                                           // Gentle pulse
                                           p.pulsePhase += p.pulseSpeed;
                                              p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.04;

                                           // Magnetic attraction on PC
                                           if (!isMobile && mouseX > -9000) {
                                                       const dx = mouseX - p.x;
                                                       const dy = mouseY - p.y;
                                                       const dist = Math.sqrt(dx * dx + dy * dy);
                                                       if (dist < MAGNETIC_RADIUS && dist > 0) {
                                                                     const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
                                                                     p.vx += dx / dist * force;
                                                                     p.vy += dy / dist * force;
                                                                     p.opacity = Math.min(p.baseOpacity + 0.12, 0.35);
                                                       }
                                           }

                                           // Dampen velocity
                                           p.vx *= 0.995;
                                              p.vy *= 0.995;

                                           // Clamp speed
                                           const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                                              if (speed > 0.5) {
                                                          p.vx = (p.vx / speed) * 0.5;
                                                          p.vy = (p.vy / speed) * 0.5;
                                              }

                                           // Wrap around edges
                                           if (p.x < -10) p.x = W + 10;
                                              if (p.x > W + 10) p.x = -10;
                                              if (p.y < -10) p.y = H + 10;
                                              if (p.y > H + 10) p.y = -10;

                                           // Draw particle
                                           ctx.beginPath();
                                              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                                              ctx.fillStyle = 'rgba(0, 255, 255, ' + p.opacity + ')';
                                              ctx.fill();
                                    }

                                    requestAnimationFrame(animate);
                                 }
                                  animate();
                            })();

                            // --- Testimonials Tab Slider ---
                            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-nav.left');
    const nextBtn = document.querySelector('.testimonial-nav.right');
    let currentSlide = 0;

                            // Create dot indicators
                            const testimonialContainer = document.querySelector('.testimonials-container');
    let dotsContainer = null;

                            if (testimonialSlides.length > 0 && testimonialContainer) {
                                  dotsContainer = document.createElement('div');
                                  dotsContainer.className = 'testimonial-dots';
                                  testimonialContainer.parentElement.appendChild(dotsContainer);

      for (let i = 0; i < testimonialSlides.length; i++) {
              const dot = document.createElement('button');
              dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
              dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
              dot.addEventListener('click', () => showSlide(i));
              dotsContainer.appendChild(dot);
      }
                            }

                            function showSlide(index) {
                                  if (testimonialSlides.length === 0) return;
                                  currentSlide = ((index % testimonialSlides.length) + testimonialSlides.length) % testimonialSlides.length;
                                  testimonialSlides.forEach((slide, i) => {
                                          slide.classList.toggle('active', i === currentSlide);
                                  });
                                  if (dotsContainer) {
                                          dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                                                    dot.classList.toggle('active', i === currentSlide);
                                          });
                                  }
                            }

                            function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

                            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

                            // Auto-advance every 6 seconds
                            if (testimonialSlides.length > 1) {
                                  setInterval(nextSlide, 6000);
                            }
    showSlide(0);

                            // --- Purchase feed (Trusted by Players) ---
                            const feedContainer = document.querySelector('.purchase-feed');
    const NAMES = [
          'xShadow','Drift_King','NovaStrike','SilentSpectre','BladeRunner99','FrostByte',
          'ThunderCl4p','PixelPhantom','VenomViper','CyberW0lf','GhostReaper','NightHawk',
          'SteelTitan','DarkMatter42','AceOfSpades','BlazeTrail','RogueAgent','IronClad',
          'StormBreaker','ZeroGravity','NeonKnight','CrimsonTide','QuantumLeap','ShadowFax',
          'OmegaForce','DeltaStrike','AlphaWolf','BetaTest3r','GammaRay','EpsilonEagle',
          'Jake M.','Sarah K.','Chris P.','Mia L.','Alex D.','Jordan W.',
          'Taylor R.','Morgan S.','Casey B.','Drew F.','Riley N.','Sam T.',
          'Avery H.','Quinn J.','Blake V.','Cameron Z.','Dakota G.','Emery C.',
          'Finley A.','Harper X.','j.rodriguez','m.chen2024','k_patel','a.wilson',
          'r.martinez','s.thompson','d.anderson','l.jackson','n.white','b.harris',
          'c.martin','p.garcia','t.robinson','e.clark','f.lewis','g.lee',
          'h.walker','i.hall','TTVShroud','YT_Clips','TTV_NoScope','Twitch_Pro',
          'FaZeWannabe','OpTicFan','100T_Grind','NRG_Energy','G2_Esports',
          'CloudNine','TSM_Fan','LiquidFlow','SENfam','FNATICboost',
          'xXDemonSlayerXx','L3g3ndKill3r','ProGamerMom','EliteSniper2k',
          'gg_ez_lol','1TapMachine','H3adshotHero','ClutchMaster','PogChampion',
          'MLG_Quickscope','WallBangKing','SprayAndPray','BunnyH0pper','FlickGod',
          'NickS_2026','j_doe_gaming','maria.g','liam.watts','emma.stone99',
          'noah.clark','olivia.j','william.b','ava.martinez','james.davis',
          'isabella.w','benjamin.t','sophia.lee','mason.h','charlotte.r'
        ];

                            const PRODUCTS = ['PC Optimizations','Console Tweaks','Ping Optimizations','Bloom Reducer','Ultimate Bundle','Controller Macro'];

                            function randomPurchase() {
                                  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
                                  const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
                                  const minutes = Math.floor(Math.random() * 55) + 1;
                                  return { name, product, minutes };
                            }

                            function addPurchaseNotification() {
                                  if (!feedContainer) return;
                                  const { name, product, minutes } = randomPurchase();
                                  const item = document.createElement('div');
                                  item.className = 'purchase-item';
                                  item.innerHTML = '<strong>' + name + '</strong> purchased <em>' + product + '</em> <span>' + minutes + ' min ago</span>';
                                  item.style.opacity = '0';
                                  item.style.transform = 'translateY(-10px)';
                                  feedContainer.prepend(item);
                                  requestAnimationFrame(() => {
                                          item.style.transition = 'opacity .4s, transform .4s';
                                          item.style.opacity = '1';
                                          item.style.transform = 'translateY(0)';
                                  });
                                  while (feedContainer.children.length > 5) {
                                          feedContainer.removeChild(feedContainer.lastChild);
                                  }
                            }

                            if (feedContainer) {
                                  for (let i = 0; i < 5; i++) addPurchaseNotification();
                                  setInterval(addPurchaseNotification, 4000);
                            }

                            // --- Scroll reveal ---
                            const revealEls = document.querySelectorAll(
                                  'section:not(.hero-section), .product-card, .stat-item, .testimonials-section, .purchase-feed-section, footer'
                                );
    if (revealEls.length) {
          revealEls.forEach(el => {
                  if (!el.closest('.hero-section')) {
                            el.classList.add('reveal-hidden');
                  }
          });
          const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                        entry.target.classList.add('reveal-visible');
                                        entry.target.classList.remove('reveal-hidden');
                                        observer.unobserve(entry.target);
                            }
                  });
          }, { threshold: 0.12 });
          revealEls.forEach(el => { if (el.classList.contains('reveal-hidden')) observer.observe(el); });
    }

                            // --- Planet glow animation ---
                            const planet = document.querySelector('.hero-image img, .hero-image');
    if (planet) {
          let glowPhase = 0;
          const animateGlow = () => {
                  glowPhase += 0.02;
                  const glow = 15 + Math.sin(glowPhase) * 10;
                  const glow2 = 30 + Math.sin(glowPhase * 0.7) * 20;
                  planet.style.filter = 'drop-shadow(0 0 ' + glow + 'px rgba(0,255,255,0.5)) drop-shadow(0 0 ' + glow2 + 'px rgba(0,255,255,0.2))';
                  requestAnimationFrame(animateGlow);
          };
          animateGlow();
    }

                            // --- Bloom Reducer hover video (PC only) ---
                            const bloomCard = document.querySelector('.product-card[onclick*="bloom"]');
    if (bloomCard && !isMobileDevice()) {
          const img = bloomCard.querySelector('img');
          const videoSrc = bloomCard.getAttribute('data-video');
          if (img && videoSrc) {
                  let video = null;
                  bloomCard.addEventListener('mouseenter', () => {
                            if (!video) {
                                        video = document.createElement('video');
                                        video.src = videoSrc;
                                        video.muted = true;
                                        video.loop = true;
                                        video.playsInline = true;
                                        video.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:inherit;z-index:1;';
                                        const container = img.parentElement;
                                        container.style.position = 'relative';
                                        container.appendChild(video);
                            }
                            video.play();
                            video.style.opacity = '1';
                  });
                  bloomCard.addEventListener('mouseleave', () => {
                            if (video) {
                                        video.style.opacity = '0';
                                        video.pause();
                            }
                  });
          }
    }

                            function isMobileDevice() {
                                  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
                            }

});

});
