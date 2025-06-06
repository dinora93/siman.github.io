
    document.addEventListener('DOMContentLoaded', function() {
        const slide = document.querySelector('.carousel-slide');
        const images = document.querySelectorAll('.carousel-slide img');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        let counter = 0;
        const size = images[0].clientWidth;
        
        // Crear dots
        images.forEach((img, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Configurar el slide
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        
        // Botón siguiente
        nextBtn.addEventListener('click', () => {
            if(counter >= images.length - 1) return;
            counter++;
            slide.style.transition = "transform 0.5s ease-in-out";
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateDots();
        });
        
        // Botón anterior
        prevBtn.addEventListener('click', () => {
            if(counter <= 0) return;
            counter--;
            slide.style.transition = "transform 0.5s ease-in-out";
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateDots();
        });
        
        // Transición infinita
        slide.addEventListener('transitionend', () => {
            if(images[counter].id === 'last-clone') {
                slide.style.transition = "none";
                counter = images.length - 2;
                slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
            if(images[counter].id === 'first-clone') {
                slide.style.transition = "none";
                counter = images.length - counter;
                slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
        });
        
        // Función para ir a un slide específico
        function goToSlide(index) {
            counter = index;
            slide.style.transition = "transform 0.5s ease-in-out";
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateDots();
        }
        
        // Actualizar dots activos
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === counter);
            });
        }
        
        // Auto-slide (opcional)
        setInterval(() => {
            if(counter >= images.length - 1) counter = -1;
            counter++;
            slide.style.transition = "transform 0.5s ease-in-out";
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateDots();
        }, 5000);
    });
//segundo slider
    class CategoryCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('dotsContainer');
                this.items = this.track.querySelectorAll('.category-item');
                this.currentIndex = 0;
                this.itemsPerView = this.getItemsPerView();
                this.maxIndex = Math.max(0, this.items.length - this.itemsPerView);
                
                this.init();
            }

            getItemsPerView() {
                const containerWidth = this.track.parentElement.offsetWidth;
                return Math.floor(containerWidth / 160); // 140px item + 20px gap
            }

            init() {
                this.createDots();
                this.bindEvents();
                this.startAutoPlay();
                this.updateCarousel();
            }

            createDots() {
                const dotsCount = Math.ceil(this.items.length / this.itemsPerView);
                for (let i = 0; i < dotsCount; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }

            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());
                
                // Touch events for mobile
                let startX = 0;
                let currentX = 0;
                let isDragging = false;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                    this.pauseAutoPlay();
                });

                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    currentX = e.touches[0].clientX;
                });

                this.track.addEventListener('touchend', () => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const diff = startX - currentX;
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                    
                    this.startAutoPlay();
                });

                // Pause auto-play on hover
                this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
                this.track.addEventListener('mouseleave', () => this.startAutoPlay());

                // Handle window resize
                window.addEventListener('resize', () => {
                    this.itemsPerView = this.getItemsPerView();
                    this.maxIndex = Math.max(0, this.items.length - this.itemsPerView);
                    this.updateCarousel();
                });
            }

            updateCarousel() {
                const translateX = -(this.currentIndex * 160); // 140px + 20px gap
                this.track.style.transform = `translateX(${translateX}px)`;
                
                // Update dots
                const dots = this.dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', 
                        index === Math.floor(this.currentIndex / this.itemsPerView));
                });
            }

            next() {
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 0; // Loop back to start
                }
                this.updateCarousel();
            }

            prev() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                } else {
                    this.currentIndex = this.maxIndex; // Loop to end
                }
                this.updateCarousel();
            }

            goToSlide(index) {
                this.currentIndex = index * this.itemsPerView;
                if (this.currentIndex > this.maxIndex) {
                    this.currentIndex = this.maxIndex;
                }
                this.updateCarousel();
            }

            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.next();
                }, 4000);
            }

            pauseAutoPlay() {
                clearInterval(this.autoPlayInterval);
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new CategoryCarousel();
        });