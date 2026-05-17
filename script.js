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
  const SCROLL_IN = 80;
  const SCROLL_OUT = 30;
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

  let _navScrollRaf = null;
  function throttledUpdateNavbar() {
    if (_navScrollRaf) return;
    _navScrollRaf = requestAnimationFrame(() => {
      _navScrollRaf = null;
      if (typeof throttledUpdateNavbar !== "undefined") throttledUpdateNavbar(); else updateNavbar();
    });
  }
  window.addEventListener('scroll', throttledUpdateNavbar, { passive: true });
  window.addEventListener('resize', () => { positionNavbar(); setBodyPadding(); }, { passive: true });

  // Initial state
  positionNavbar();
  setBodyPadding();
  if (typeof throttledUpdateNavbar !== "undefined") throttledUpdateNavbar(); else updateNavbar();

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
  // Names sourced from real gaming leaderboards (Fortnite Tracker) — authentic username styles
  const NAMES = [
    // Real-style gamertags from leaderboard data
    'Raskology','Domstaa','Avxry','ItsWiKKiD','Albinoyogurt','RuflessCat','FlyWyd',
    'StackyZB','Honsq.','Zero3ffort','Shock-N-Awe','NykZB','Magadian','Mud McFly',
    'Repulsives Beard','Prospering','DannyYoshida','AlexanderTheDad','Pup-pi',
    'H0RIBLE','stealthreaperXY','Carnseyy_','earthjad3','Nytrixz','AcidicWolfXBL',
    'C4_Monster_','QuietLlama42','Droev','NoScopeTaxes','blackandwhiteBob',
    'Liam5011','RakuaFN','polgot','anomalo2.0','biz da don','m1nsook',
    'Santi_Rocks','Disciple Taiyo','Vincenzo Cassano','Imonmobile_LOL1',
    'LuvDaCookieDough','dargun bol','Bobalt2862','TT UsuallyDolo','JZVL',
    'tt cassiusoffwb','ElSenorJorge','JustCallMeDaddy6','999Ghostboy999',
    'jeis3r70','Vinnies Goodboy','MK1NG1','kumakumao8888','BLMGamingYT',
    // Plausible everyday-player handles
    'wicked_aim','tryhard_sean','lowping_only','clutch_or_kick','daily_grinder',
    'consoleplayer_','notasmurfacc','sweaty_kyle','mw3_veteran','backline_tyler',
    'pc_masterrace_','ranked_anxiety','aimlab_daily','controller_tyler',
    'lagged_out_','tryingmybest_','diamond_grind','noscope_daily','respectfully_',
    'just_vibing99','2nd_account_lol','wifi_warrior_','couchgamer2k','spamming_daily',
    'fps_brainrot','stopspawning_','oneshot_wonder','warmup_routine','hardstuck_plat',
    // First name + number / casual handles
    'ryanfps','jaylen2k','devontae_','connorw_gg','tyler_builds','dkgaming_',
    'chasethegame','mikey_fps','bryanplays','nathan_does','lukas_gamer',
    'kyleishere','derekplays','seanw_','andrewg_gg','bradly_plays',
    'nate_on_pc','jakewins','matthewgg','hunter_fps','caleb_clutch',
    // More realistic first+last or first+initial styles
    'Chris M.','Jake R.','Liam W.','Ethan B.','Noah C.','Owen T.',
    'Zach K.','Dylan P.','Hunter S.','Kyle F.','Caleb J.','Sean A.',
    'Mia R.','Emma D.','Olivia S.','Sofia N.','Lexi B.'
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
    const nextDelay = 2500 + Math.floor(Math.random() * 4500);
    setTimeout(addPurchaseItem, nextDelay);
  }

  if (feedList) {
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
