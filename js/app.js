/**
 * Kupal Floral Boutique Homepage - Custom Interactions
 * Designed with modern responsive features and micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initStickyNavbar();
  initMobileMenu();
  initHeroSlider();
  initCategoryFilters();
  initCartSimulation();
  initSearchModal();
  initNewsletterForm();
  initTestimonialSlider();
  initSmoothScroll();
});

/* 1. Announcement Bar */
function initAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  const closeBtn = document.getElementById('close-announcement');
  
  if (bar && closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.classList.add('hidden-bar');
      // Adjust navbar offset if sticky
      setTimeout(() => {
        bar.style.display = 'none';
      }, 400);
    });
  }
}

/* 2. Sticky Navbar */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
      navbar.classList.remove('bg-white', 'border-transparent');
    } else {
      navbar.classList.add('bg-white', 'border-transparent');
      navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check on load
  handleScroll();
}

/* 3. Mobile Hamburger Menu */
function initMobileMenu() {
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.contains('hidden');
      if (isExpanded) {
        mobileMenu.classList.remove('hidden');
        // Simple animation entry
        mobileMenu.classList.add('animate-scale-in');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-scale-in');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });

    // Close mobile menu when clicking nav links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }
}

/* 4. Hero Slider */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  // Auto-play slider
  const startInterval = () => {
    slideInterval = setInterval(nextSlide, 6000);
  };

  const resetInterval = () => {
    clearInterval(slideInterval);
    startInterval();
  };

  startInterval();
}

/* 5. Category Filtering */
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-filterable');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active', 'border-brand-coral', 'text-brand-coral'));
      tabs.forEach(t => t.classList.add('border-transparent', 'text-gray-500'));
      
      // Add active state to clicked tab
      tab.classList.add('active', 'border-brand-coral', 'text-brand-coral');
      tab.classList.remove('border-transparent', 'text-gray-500');

      const filterValue = tab.getAttribute('data-filter');

      products.forEach(product => {
        // Simple scale transition
        product.style.transform = 'scale(0.95)';
        product.style.opacity = '0';
        
        setTimeout(() => {
          if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
            product.classList.remove('hidden');
            setTimeout(() => {
              product.style.transform = 'scale(1)';
              product.style.opacity = '1';
            }, 50);
          } else {
            product.classList.add('hidden');
          }
        }, 200);
      });
    });
  });
}

/* 6. Cart Counter Simulation */
function initCartSimulation() {
  const addCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const cartCounters = document.querySelectorAll('.cart-count');
  let currentCount = 0;

  addCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      currentCount += 1;
      
      // Update all cart count displays (desktop/mobile)
      cartCounters.forEach(counter => {
        counter.textContent = currentCount;
        counter.classList.remove('hidden');
        
        // Bounce animation
        counter.classList.remove('animate-cart-pop');
        void counter.offsetWidth; // trigger reflow
        counter.classList.add('animate-cart-pop');
      });

      // Show beautiful premium toast notification
      const productName = btn.getAttribute('data-name') || 'Beautiful Blooms';
      showToast(`Added "${productName}" to your boutique bag!`);
    });
  });
}

/* 7. Search Modal overlay */
function initSearchModal() {
  const openBtns = document.querySelectorAll('.search-open-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const modal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close search modal on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* 8. Newsletter Form Submission */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim() !== '') {
        const email = input.value.trim();
        input.value = '';
        showToast(`Thank you for subscribing! Seasonal blooms await at ${email}.`);
      }
    });
  }
}

/* 9. Testimonial Slider */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentIndex = 0;

  if (testimonials.length === 0) return;

  const showTestimonial = (index) => {
    testimonials.forEach((slide, i) => {
      slide.classList.add('hidden');
      slide.classList.remove('animate-scale-in');
      if (i === index) {
        slide.classList.remove('hidden');
        slide.classList.add('animate-scale-in');
      }
    });
  };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });
  }

  // Initial render
  showTestimonial(currentIndex);
}

/* 10. Smooth Scroll for Navigation Anchors */
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Account for sticky navbar height
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Helper: Toast Notifications */
function showToast(message) {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.custom-toast');
  existingToasts.forEach(toast => toast.remove());

  // Create new toast container
  const toast = document.createElement('div');
  toast.className = 'custom-toast fixed bottom-6 right-6 bg-brand-dark text-white px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-fade-in border border-gray-800 text-sm md:text-base';
  toast.style.backgroundColor = '#1a1a1a';
  
  // Custom Icon inside toast (elegant mini flower or success check)
  toast.innerHTML = `
    <svg class="w-5 h-5 text-brand-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span class="font-sans-clean font-medium tracking-wide">${message}</span>
  `;

  document.body.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 4000);
}
