// Lonware main script
document.addEventListener('DOMContentLoaded', () => {

  /* Dynamic hero word */
  const dynamicWord = document.getElementById('dynamic-word');
  const words = ['performance','optimization','precision','control','efficiency'];
  let wordIndex = 0;
  const updateWord = () => {
    if (!dynamicWord) return;
    dynamicWord.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
  };
  if (dynamicWord) { updateWord(); setInterval(updateWord, 2000); }

  /* =============================================
     ANNOUNCEMENT BAR + NAVBAR POSITIONING
     Layout order (top to bottom):
       1. Announcement bar  — fixed, top: 0, z-index: 1002
       2. Navbar            — fixed, top: annBarH, z-index: 1000
     On scroll down (past SCROLL_IN px):
       - Announcement bar slides up and hides (transform: translateY(-100%))
       - Navbar becomes floating pill at top: 10px
     On scroll back up (below SCROLL_OUT px):
       - Announcement bar slides back into view
       - Navbar returns to full-width below announcement bar
  ============================================= */
  const announcementBar = document.querySelector('.announcement-bar');
  const navbar = document.querySelector('.navbar');

  // Add smooth transition to announcement bar
  if (announcementBar) {
    announcementBar.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  function getAnnHeight() {
    return announcementBar ? announcementBar.offsetHeight : 0;
  }

  function positionNavbar() {
    if (!navbar) return;
    if (!navbar.classList.contains('scrolled')) {
      navbar.style.top = getAnnHeight() + 'px';
    }
  }

  function setBodyPadding() {
    if (!navbar) return;
    const annH = getAnnHeight();
    const navH = navbar.offsetHeight;
    document.body.style.paddingTop = (annH + navH) + 'px';
  }

  /* Scroll with hysteresis */
  const SCROLL_IN = 60;
  const SCROLL_OUT = 20;
  let isScrolled = false;

  function updateNavbar() {
    const y = window.scrollY;

    if (!isScrolled && y > SCROLL_IN) {
      isScrolled = true;
      // Hide announcement bar (slide up)
      if (announcementBar) {
        announcementBar.style.transform = 'translateY(-100%)';
      }
      // Navbar becomes pill — CSS handles positioning via .scrolled
      if (navbar) {
        navbar.classList.add('scrolled');
        navbar.style.top = ''; // let CSS .scrolled rule handle top: 10px
      }
    } else if (isScrolled && y < SCROLL_OUT) {
      isScrolled = false;
      // Show announcement bar again
      if (announcementBar) {
        announcementBar.style.transform = 'translateY(0)';
      }
      // Navbar returns to full-width below announcement bar
      if (navbar) {
        navbar.classList.remove('scrolled');
        positionNavbar();
      }
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  window.addEventListener('resize', () => { positionNavbar(); setBodyPadding(); }, { passive: true });

  // Initial state
  positionNavbar();
  setBodyPadding();
  updateNavbar();

  /* Mobile menu toggle */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  /* Particle background */
  (function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;touch-action:none;z-index:0;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W, H;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 40;
    let mouseX = -9999, mouseY = -9999;
    if (!isMobile) {
      document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
      document.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });
    }
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
        radius: Math.random()*2+0.5,
        opacity: Math.random()*0.15+0.05,
        baseOpacity: Math.random()*0.15+0.05,
        pulseSpeed: Math.random()*0.005+0.002,
        pulsePhase: Math.random()*Math.PI*2
      });
    }
    function animate() {
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<particles.length;i++) {
        const p=particles[i];
        p.x+=p.vx; p.y+=p.vy;
        p.pulsePhase+=p.pulseSpeed;
        p.opacity=p.baseOpacity+Math.sin(p.pulsePhase)*0.04;
        if (!isMobile && mouseX>-9000) {
          const dx=mouseX-p.x,dy=mouseY-p.y,dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<200&&dist>0){const f=(1-dist/200)*0.015;p.vx+=dx/dist*f;p.vy+=dy/dist*f;p.opacity=Math.min(p.baseOpacity+0.12,0.35);}
        }
        p.vx*=0.995;p.vy*=0.995;
        const spd=Math.sqrt(p.vx*p.vx+p.vy*p.vy);
        if(spd>0.5){p.vx=p.vx/spd*0.5;p.vy=p.vy/spd*0.5;}
        if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<-10)p.y=H+10;if(p.y>H+10)p.y=-10;
        ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fillStyle='rgba(0,255,255,'+p.opacity+')';ctx.fill();
      }
      requestAnimationFrame(animate);
    }
    animate();
  })();

  /* Macro slider */
  const macroSlides = document.querySelectorAll('.macro-slide');
  let macroIndex = 0;
  function showMacroSlide(index) {
    if (!macroSlides.length) return;
    macroIndex=((index%macroSlides.length)+macroSlides.length)%macroSlides.length;
    macroSlides.forEach((s,i)=>s.classList.toggle('active',i===macroIndex));
  }
  if (macroSlides.length > 1) { setInterval(()=>showMacroSlide(macroIndex+1),4000); }

  /* Testimonial slider */
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-nav.left');
  const nextBtn = document.querySelector('.testimonial-nav.right');
  let currentSlide = 0;
  const testimonialContainer = document.querySelector('.testimonials-container');
  let dotsContainer = null;
  if (testimonialSlides.length > 0 && testimonialContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    testimonialContainer.parentElement.appendChild(dotsContainer);
    for (let i=0;i<testimonialSlides.length;i++) {
      const dot=document.createElement('button');
      dot.className='testimonial-dot'+(i===0?' active':'');
      dot.setAttribute('aria-label','Go to testimonial '+(i+1));
      dot.addEventListener('click',()=>showSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  function showSlide(index) {
    if (!testimonialSlides.length) return;
    currentSlide=((index%testimonialSlides.length)+testimonialSlides.length)%testimonialSlides.length;
    testimonialSlides.forEach((s,i)=>s.classList.toggle('active',i===currentSlide));
    if(dotsContainer){dotsContainer.querySelectorAll('.testimonial-dot').forEach((d,i)=>d.classList.toggle('active',i===currentSlide));}
  }
  if(prevBtn)prevBtn.addEventListener('click',()=>showSlide(currentSlide-1));
  if(nextBtn)nextBtn.addEventListener('click',()=>showSlide(currentSlide+1));
  if(testimonialSlides.length>1){setInterval(()=>showSlide(currentSlide+1),6000);}
  showSlide(0);

  /* Purchase feed */
  const feedList = document.getElementById('purchase-feed-list');
  const NAMES = [
    // Gamertags / usernames
    'xKlutch','NovaStrike_','ColdFront_','Zerolag404','RogueSniper77','NightHawk99',
    'SilentReaper','FrostByte_','PixelGhost','BladeX','StormBreaker_','IronSight',
    'NeonPulse','CrimsonFang','QuantumShift','OmegaForce_','DeltaX','ShadowDrop__',
    'VoidKing','ArcticFox_','GlitchHunter','NitroSnipe','PrecisionX','PhantomDrift',
    'ZephyrAim','HyperFocus_','VortexPlayer','Gridlock99','EclipseShot','NullPointer_',
    // First names only
    'Tyler','Jaylen','Marcus','Damian','Connor','Nathan','Brandon','Derek','Cameron','Kevin',
    'Sofia','Priya','Alicia','Jasmine','Lexi','Megan','Kayla','Brianna','Ashley','Dani',
    'Jordan','Riley','Alex','Casey','Blake','Morgan','Taylor','Jesse','Avery','Reese',
    // First name + last initial
    'Chris M.','Jake R.','Liam W.','Ethan B.','Noah C.','Owen T.','Mason H.',
    'Zach K.','Dylan P.','Hunter S.','Kyle F.','Caleb J.','Sean A.','Andre L.',
    'Mia R.','Emma D.','Olivia S.','Ava N.','Chloe B.','Sara K.','Isabel T.',
    // Mixed styles that look like real accounts
    'ttvNightOwl','xd_clutchking','not_a_bot_lol','tryhard2024','lowpingonly',
    'forti_fanatic','consolekid_','pcmr_user','ranked_grinder','aimlab_daily',
    'sweaty_setups','controller_god','mnk_player','fps_nerd_','comp_player99',
    // Numbers/year-style handles
    'jake2024_','m.sanchez','r.patel99','k.nguyen_','luis_gm','dev0n_','t.brooks',
    'j_rivera','a.johnson2k','sam_the_goat','nick_fps','gabe.w','will_lonware'
  ];
  const PRODUCTS = ['PC Optimizations','Console Tweaks','Ping Optimizations','Bloom Reducer','Controller Macro'];

  function randomPurchase() {
    return { name: NAMES[Math.floor(Math.random() * NAMES.length)], product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)] };
  }

  function addPurchaseItem() {
    if (!feedList) return;
    const { name, product } = randomPurchase();
    const li = document.createElement('li');
    li.innerHTML = '<strong>' + name + '</strong> purchased <em>' + product + '</em>';
    li.style.opacity = '0';
    li.style.transform = 'translateY(-10px)';
    feedList.prepend(li);
    requestAnimationFrame(() => {
      li.style.transition = 'opacity .4s, transform .4s';
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
    });
    while (feedList.children.length > 5) { feedList.removeChild(feedList.lastChild); }
    // Schedule next purchase at a random interval (2.5s–7s) so it feels organic
    const nextDelay = 2500 + Math.floor(Math.random() * 4500);
    setTimeout(addPurchaseItem, nextDelay);
  }

  if (feedList) {
    // Stagger the initial 5 items so they don't all appear at once
    for (let i = 0; i < 5; i++) {
      setTimeout(addPurchaseItem, i * 600);
    }
  }
  
  /* Scroll reveal */
  const revealSelectors = 'section:not(.hero),.product-card,.package-card,.stat-item,.benefit-item,.testimonials-section,.purchase-feed-section,.metric,footer';
  const revealEls = document.querySelectorAll(revealSelectors);
  if (revealEls.length) {
    revealEls.forEach(el=>{if(!el.closest('.hero'))el.classList.add('reveal-hidden');});
    requestAnimationFrame(()=>{requestAnimationFrame(()=>{
      const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal-visible');entry.target.classList.remove('reveal-hidden');obs.unobserve(entry.target);}});},{threshold:0,rootMargin:'0px 0px 0px 0px'});
      revealEls.forEach(el=>{if(el.classList.contains('reveal-hidden'))obs.observe(el);});
    });});
  }

  /* Hero glow pulse */
  const planet = document.querySelector('.hero');
  if (planet && planet.tagName) {
    let glowPhase=0;
    const ag=()=>{glowPhase+=0.02;const i=0.3+Math.sin(glowPhase)*0.15,s=80+Math.sin(glowPhase*0.7)*30;planet.style.setProperty('--glow-intensity',i);planet.style.setProperty('--glow-spread',s+'px');requestAnimationFrame(ag);};
    ag();
  }

  /* Video hover desktop only */
  function isMobileDevice(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<768;}
  if(!isMobileDevice()){document.querySelectorAll('.product-card').forEach(card=>{const video=card.querySelector('.product-media video');if(!video)return;card.addEventListener('mouseenter',()=>video.play());card.addEventListener('mouseleave',()=>{video.pause();video.currentTime=0;});});}

  /* Hero video autoplay */
  const heroVideo=document.querySelector('.macro-slide.active video');
  if(heroVideo)heroVideo.play().catch(()=>{});

  /* Scroll-down indicator */
  const scrollIndicator=document.querySelector('.scroll-indicator');
  if(scrollIndicator){const upd=()=>{scrollIndicator.classList.toggle('is-hidden',window.scrollY>40);};window.addEventListener('scroll',upd,{passive:true});upd();}

});
