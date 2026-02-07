// JavaScript to handle dynamic word rotation in the hero section

document.addEventListener('DOMContentLoaded', () => {
    const dynamicWord = document.getElementById('dynamic-word');
    // Updated dynamic words for a grammatically correct sentence
    // These words complete the phrase "Experience the best in ... today"
    const words = ['performance', 'optimization', 'precision', 'control', 'efficiency'];
    let index = 0;

    // Function to update the dynamic word
    const updateWord = () => {
        if (!dynamicWord) return;
        dynamicWord.textContent = words[index];
        index = (index + 1) % words.length;
    };

    // If the dynamic word element exists on the page, start rotating words
    if (dynamicWord) {
        updateWord();
        // Rotate slightly faster to give a snappier feel
        setInterval(updateWord, 2000);
    }

    // Navbar scroll shrink functionality
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Reveal packages section when CTA button is clicked
    const ctaBtn = document.querySelector('.cta-button');
    const packagesSection = document.getElementById('packages');
    if (ctaBtn && packagesSection) {
        ctaBtn.addEventListener('click', () => {
            /* When the call‑to‑action button is clicked we reveal the packages section.  
               Do not call preventDefault so the URL updates with #packages; this triggers 
               the CSS :target selector. We still explicitly set display to block as a fallback. */
            packagesSection.style.display = 'block';
            // After a short timeout, scroll into view to ensure the section is visible
            setTimeout(() => {
                packagesSection.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        });
    }

    // Testimonials slider functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-nav.left');
    const nextBtn = document.querySelector('.testimonial-nav.right');
    let slideIndex = 0;

    const showSlide = (n) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === n);
        });
    };
    const nextSlide = () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    };
    const prevSlide = () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    };
    // Attach event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    // Auto rotate testimonials every 6 seconds
    setInterval(nextSlide, 6000);

    // Macro showcase slider: automatically cycle through video and images on the home page
    const macroSlides = document.querySelectorAll('.macro-slider .macro-slide');
    let macroIndex = 0;
    if (macroSlides.length > 1) {
        // Hide all slides except the first
        macroSlides.forEach((slide, i) => {
            slide.style.display = i === 0 ? 'block' : 'none';
        });
        const showMacroSlide = (n) => {
            macroSlides.forEach((slide, i) => {
                slide.style.display = i === n ? 'block' : 'none';
            });
        };
        setInterval(() => {
            macroIndex = (macroIndex + 1) % macroSlides.length;
            showMacroSlide(macroIndex);
        }, 4000);
    }

    // Dynamic purchase feed: display randomly generated purchase events on the home page
    const purchaseFeedList = document.getElementById('purchase-feed-list');
    if (purchaseFeedList) {
        // Sample first names and product titles for the feed
        const names = [
            // Extended name list for the purchase feed. Including common boy and girl
            // names plus a large range of anonymous user IDs. This ensures that
            // visitors rarely see the same buyer name twice.
            'Liam','Noah','Oliver','Elijah','William','James','Benjamin','Lucas','Henry','Alexander',
            'Mason','Michael','Ethan','Jacob','Daniel','Logan','Jackson','Aiden','Sebastian','Matthew',
            'Samuel','David','Joseph','Carter','Wyatt','Jayden','John','Owen','Dylan','Luke',
            'Gabriel','Anthony','Isaiah','Grayson','Jack','Julian','Levi','Christopher','Joshua','Andrew',
            'Lincoln','Mateo','Ryan','Jaxon','Nathan','Adrian','Christian','Maverick','Elias','Aaron',
            'Hudson','Nolan','Easton','Xavier','Robert','Dominic','Jaxson','Kevin','Thomas','Charles',
            'Caleb','Ezekiel','Landon','Hunter','Jonathan','Connor','Santiago','Jeremiah','Angel','Roman',
            'Josiah','Tyler','Austin','Colton','Zachary','Brayden','Nicholas','Bryson','Ayden','Lorenzo',
            'Alex','Diego','Declan','Micah','Jason','Miles','Maxwell','Titus','Vincent','Weston',
            'Rowan','Harrison','Oscar','Theodore','Ashley','Avery','Charlotte','Amelia','Evelyn','Abigail',
            'Harper','Emily','Ella','Scarlett','Grace','Sofia','Chloe','Victoria','Riley','Aria',
            'Zoe','Nora','Lily','Hannah','Lillian','Mila','Leah','Addison','Aubrey','Stella',
            'Natalie','Violet','Claire','Hazel','Aurora','Savannah','Audrey','Brooklyn','Bella','Skylar',
            'Lucy','Paisley','Anna','Caroline','Nova','Genesis','Emilia','Kennedy','Kinsley','Sarah',
            'Allison','Gabriella','Madeline','Serenity','Nevaeh','Adalyn','Cora','Katherine','Vivian','Elena',
            'Clara','Piper','Cecilia','Reagan','Eliana','Maya','Naomi','Rylee','Delilah','Lyla',
            'Isla','Adeline','Athena','Sadie','Willow','Ruby','Eva','Alice','Quinn','Ivy',
            'Josephine','Mackenzie','Georgia','Sienna','Summer','Jasmine','Sydney','Morgan','Faith','Alexa',
            'Harmony','Elise','Daisy','Hope','Trinity','Marley','Talia','Camille','Nyla','Tessa',
            'Anonymous','AnonymousBuyer','AnonymousUser','Customer42','Buyer77','PlayerOne','PlayerTwo','GamerGirl','GamerGuy','Shopper99',
            // Sequential user IDs for even more variety
            'User001','User002','User003','User004','User005','User006','User007','User008','User009','User010',
            'User011','User012','User013','User014','User015','User016','User017','User018','User019','User020',
            'User021','User022','User023','User024','User025','User026','User027','User028','User029','User030',
            'User031','User032','User033','User034','User035','User036','User037','User038','User039','User040',
            'User041','User042','User043','User044','User045','User046','User047','User048','User049','User050',
            'User051','User052','User053','User054','User055','User056','User057','User058','User059','User060',
            'User061','User062','User063','User064','User065','User066','User067','User068','User069','User070',
            'User071','User072','User073','User074','User075','User076','User077','User078','User079','User080',
            'User081','User082','User083','User084','User085','User086','User087','User088','User089','User090',
            'User091','User092','User093','User094','User095','User096','User097','User098','User099','User100'
        ];
        const products = [
            { name: 'Macro.io', short: 'Macro.io' },
            { name: 'PC Optimizations', short: 'PC Optimizations' },
            { name: 'Console Tweaks', short: 'Console Tweaks' },
            { name: 'Ping Optimizations', short: 'Ping Optimizations' },
            { name: 'Bloom Reducer', short: 'Bloom Reducer' },
        ];
        // Function to create a random purchase message
        function createPurchaseMessage() {
            const firstName = names[Math.floor(Math.random() * names.length)];
            const product = products[Math.floor(Math.random() * products.length)];
            const actions = ['purchased', 'bought', 'ordered', 'just bought'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            return `${firstName} ${action} <strong>${product.short}</strong>`;
        }
        // Function to add a new purchase entry to the feed
        function addPurchaseEntry() {
            const li = document.createElement('li');
            li.innerHTML = createPurchaseMessage();
            // Prepend to show newest first
            if (purchaseFeedList.firstChild) {
                purchaseFeedList.insertBefore(li, purchaseFeedList.firstChild);
            } else {
                purchaseFeedList.appendChild(li);
            }
            // Limit the feed to last 7 entries
            while (purchaseFeedList.children.length > 7) {
                purchaseFeedList.removeChild(purchaseFeedList.lastChild);
            }
        }
        // Start by populating a few entries
        for (let i = 0; i < 4; i++) {
            addPurchaseEntry();
        }
        // Add a new entry every 6 seconds
        setInterval(addPurchaseEntry, 6000);
    }
});