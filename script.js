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
            'Liam', 'Noah', 'Oliver', 'Elijah', 'Amelia', 'Sophia', 'Mason', 'Isabella',
            'James', 'Charlotte', 'Lucas', 'Mia', 'Henry', 'Evelyn', 'Aiden', 'Harper',
            'Jack', 'Luna', 'Caleb', 'Ella',
            // Include anonymous user IDs to add variety
            'User101', 'User234', 'User567', 'PlayerX', 'Gamer42'
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