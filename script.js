// Lonware main script
document.addEventListener('DOMContentLoaded', () => {
    const dynamicWord = document.getElementById('dynamic-word');
    const words = ['performance','optimization','precision','control','efficiency'];
    let wordIndex = 0;
    const updateWord = () => {
        if (!dynamicWord) return;
        dynamicWord.textContent = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;
    };
    if (dynamicWord) { updateWord(); setInterval(updateWord, 2000); }

    const announcementBar = document.querySelector('.announcement-bar');
    const navbar = document.querySelector('.navbar');
    const getAnnH = () => announcementBar ? announcementBar.offsetHeight : 0;
    const updateNavbar = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > getAnnH());
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

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
            particles.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, radius: Math.random()*2+0.5, opacity: Math.random()*0.15+0.05, baseOpacity: Math.random()*0.15+0.05, pulseSpeed: Math.random()*0.005+0.002, pulsePhase: Math.random()*Math.PI*2 });
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

    const macroSlides = document.querySelectorAll('.macro-slide');
    let macroIndex = 0;
    function showMacroSlide(index) {
        if(!macroSlides.length)return;
        macroIndex=((index%macroSlides.length)+macroSlides.length)%macroSlides.length;
        macroSlides.forEach((s,i)=>s.classList.toggle('active',i===macroIndex));
    }
    if (macroSlides.length > 1) { setInterval(()=>showMacroSlide(macroIndex+1), 4000); }

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
        if(!testimonialSlides.length)return;
        currentSlide=((index%testimonialSlides.length)+testimonialSlides.length)%testimonialSlides.length;
        testimonialSlides.forEach((s,i)=>s.classList.toggle('active',i===currentSlide));
        if(dotsContainer){dotsContainer.querySelectorAll('.testimonial-dot').forEach((d,i)=>d.classList.toggle('active',i===currentSlide));}
    }
    if(prevBtn)prevBtn.addEventListener('click',()=>showSlide(currentSlide-1));
    if(nextBtn)nextBtn.addEventListener('click',()=>showSlide(currentSlide+1));
    if(testimonialSlides.length>1){setInterval(()=>showSlide(currentSlide+1),6000);}
    showSlide(0);

    const feedList = document.getElementById('purchase-feed-list');
    const NAMES = [
        'Jake M.','Sarah K.','Chris P.','Mia L.','Alex D.','Jordan W.',
        'Taylor R.','Morgan S.','Casey B.','Drew F.','Riley N.','Sam T.',
        'Avery H.','Quinn J.','Blake V.','Cameron Z.','Dakota G.','Emery C.',
        'Finley A.','Harper X.','j.rodriguez','m.chen2024','k_patel','a.wilson',
        'r.martinez','s.thompson','d.anderson','l.jackson','n.white','b.harris',
        'c.martin','p.garcia','t.robinson','e.clark','f.lewis','g.lee',
        'h.walker','i.hall','AceOfSpades','xShadow','NovaStrike','SilentSpectre',
        'BladeRunner99','FrostByte','PixelPhantom','GhostReaper','NightHawk',
        'SteelTitan','BlazeTrail','RogueAgent','IronClad','StormBreaker',
        'NeonKnight','CrimsonTide','QuantumLeap','OmegaForce','DeltaStrike',
        'NickS_2026','j_doe_gaming','maria.g','liam.watts','emma.stone99',
        'noah.clark','olivia.j','william.b','ava.martinez','james.davis',
        'isabella.w','benjamin.t','sophia.lee','mason.h','charlotte.r',
        'ethan.k','zoe.m','logan.p','amelia.t','lucas.r',
        'nora.b','caleb.s','ella.d','owen.f','lily.w'
    ];
    const PRODUCTS = ['PC Optimizations','Console Tweaks','Ping Optimizations','Bloom Reducer','Controller Macro'];
    function randomPurchase(){return{name:NAMES[Math.floor(Math.random()*NAMES.length)],product:PRODUCTS[Math.floor(Math.random()*PRODUCTS.length)]};}
    function addPurchaseItem(){
        if(!feedList)return;
        const{name,product}=randomPurchase();
        const li=document.createElement('li');
        li.innerHTML='<strong>'+name+'</strong> purchased <em>'+product+'</em>';
        li.style.opacity='0';li.style.transform='translateY(-10px)';
        feedList.prepend(li);
        requestAnimationFrame(()=>{li.style.transition='opacity .4s, transform .4s';li.style.opacity='1';li.style.transform='translateY(0)';});
        while(feedList.children.length>5){feedList.removeChild(feedList.lastChild);}
    }
    if(feedList){for(let i=0;i<5;i++)addPurchaseItem();setInterval(addPurchaseItem,4000);}

    // SCROLL REVEAL: Elements fade up as they enter the viewport
    // FIX: Use requestAnimationFrame to ensure classes are applied before observer fires
    // This prevents the observer from immediately triggering for already-in-viewport elements
    const revealSelectors = 'section:not(.hero),.product-card,.package-card,.stat-item,.benefit-item,.testimonials-section,.purchase-feed-section,.metric,footer';
    const revealEls = document.querySelectorAll(revealSelectors);

    if (revealEls.length) {
        // Step 1: Add hidden class to all elements immediately
        revealEls.forEach(el => {
            if (!el.closest('.hero')) el.classList.add('reveal-hidden');
        });

        // Step 2: After browser paints the hidden state, set up the observer
        // Using two rAF calls ensures the CSS transition is applied first
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const obs = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal-visible');
                            entry.target.classList.remove('reveal-hidden');
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

                revealEls.forEach(el => {
                    if (el.classList.contains('reveal-hidden')) obs.observe(el);
                });
            });
        });
    }

    const planet = document.querySelector('.hero');
    if(planet&&planet.tagName){
        let glowPhase=0;
        const ag=()=>{
            glowPhase+=0.02;
            const i=0.3+Math.sin(glowPhase)*0.15,s=80+Math.sin(glowPhase*0.7)*30;
            planet.style.setProperty('--glow-intensity',i);
            planet.style.setProperty('--glow-spread',s+'px');
            requestAnimationFrame(ag);
        };
        ag();
    }

    function isMobileDevice(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<768;}
    if(!isMobileDevice()){
        document.querySelectorAll('.product-card').forEach(card=>{
            const video=card.querySelector('.product-media video');
            if(!video)return;
            card.addEventListener('mouseenter',()=>video.play());
            card.addEventListener('mouseleave',()=>{video.pause();video.currentTime=0;});
        });
    }

    const heroVideo=document.querySelector('.macro-slide.active video');
    if(heroVideo)heroVideo.play().catch(()=>{});
});
