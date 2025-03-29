// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех анимаций
    initStars();
    initBubbles();
    setupScrollAnimations();
    addRippleEffectToButtons();
    initParticles();
    setupTypingEffect();
    initHoverEffects();
    initMessageAnimations();
    initScrollIndicator();
    setupParallaxEffect();
    initHeaderScroll();
    initMobileMenu();
    initCursorGlow();
    
    // Создаем звезды для фона
    createStars();
    
    // Инициализируем переменные для отслеживания текущей секции
    let sections = document.querySelectorAll('section');
    let scrollDots = document.querySelectorAll('.scroll-dot');
    let currentSectionIndex = 0;
    let isScrolling = false;
    
    // Функция для определения видимых элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Определяем текущую секцию для индикатора скролла
                sections.forEach((section, index) => {
                    if (section === entry.target) {
                        currentSectionIndex = index;
                        updateScrollDots();
                    }
                });
            }
        });
    }, { threshold: 0.2 });
    
    // Наблюдаем за всеми секциями
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('hidden');
    });
    
    // Добавляем класс hidden для всех элементов, которые нужно анимировать
    const animatedElements = document.querySelectorAll('.feature-card, .download-option, .btn-primary, .btn-secondary, .hero-content, .hero-image');
    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
    
    // Создание индикатора скролла
    function createScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'scroll-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                if (!isScrolling) {
                    isScrolling = true;
                    section.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => { isScrolling = false; }, 1000);
                }
            });
            
            scrollIndicator.appendChild(dot);
        });
        
        document.body.appendChild(scrollIndicator);
        return scrollIndicator.querySelectorAll('.scroll-dot');
    }
    
    // Обновление индикатора скролла
    function updateScrollDots() {
        scrollDots.forEach((dot, index) => {
            if (index === currentSectionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Инициализация индикатора скролла
    scrollDots = createScrollIndicator();
    
    // Добавляем обработчик колеса мыши для плавного скролла
    let wheelTimeout;
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(function() {
            if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
                // Скролл вниз
                isScrolling = true;
                currentSectionIndex++;
                sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                updateScrollDots();
                setTimeout(() => { isScrolling = false; }, 1000);
            } else if (e.deltaY < 0 && currentSectionIndex > 0) {
                // Скролл вверх
                isScrolling = true;
                currentSectionIndex--;
                sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                updateScrollDots();
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        }, 50);
    });
    
    // Добавляем обработчик клавиш стрелок для навигации
    window.addEventListener('keydown', function(e) {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
            isScrolling = true;
            currentSectionIndex++;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            updateScrollDots();
            setTimeout(() => { isScrolling = false; }, 1000);
        } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            isScrolling = true;
            currentSectionIndex--;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            updateScrollDots();
            setTimeout(() => { isScrolling = false; }, 1000);
        }
    });
    
    // Обработчик прокрутки для мобильных устройств
    let touchStartY = 0;
    let touchEndY = 0;
    
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, false);
    
    window.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const difference = touchStartY - touchEndY;
        const threshold = 70; // Минимальное расстояние для определения свайпа
        
        if (difference > threshold && currentSectionIndex < sections.length - 1) {
            // Свайп вверх - переход к следующей секции
            isScrolling = true;
            currentSectionIndex++;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            updateScrollDots();
            setTimeout(() => { isScrolling = false; }, 1000);
        } else if (difference < -threshold && currentSectionIndex > 0) {
            // Свайп вниз - переход к предыдущей секции
            isScrolling = true;
            currentSectionIndex--;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            updateScrollDots();
            setTimeout(() => { isScrolling = false; }, 1000);
        }
    }
    
    // Анимация курсора (эффект свечения)
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor-glow') || createCursorGlow();
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Создаем элемент для свечения курсора
    function createCursorGlow() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        document.body.appendChild(cursor);
        return cursor;
    }
    
    // Создаем звездное небо
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        document.body.appendChild(starsContainer);
        
        for (let i = 0; i < 100; i++) {
            createStar(starsContainer);
        }
    }
    
    // Создаем отдельную звезду
    function createStar(container) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайное положение
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        
        // Случайный размер
        const size = Math.random() * 2 + 1;
        
        // Случайная длительность анимации
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
    }
    
    // Параллакс эффект для фоновых элементов
    document.addEventListener('mousemove', function(e) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const moveX = (mouseX - windowWidth / 2) / (windowWidth / 2) * 15;
        const moveY = (mouseY - windowHeight / 2) / (windowHeight / 2) * 15;
        
        // Добавляем эффект параллакса к разным элементам
        document.querySelectorAll('.feature-icon, .option-icon').forEach(icon => {
            icon.style.transform = `translate(${moveX / 5}px, ${moveY / 5}px)`;
        });
        
        // Параллакс для фоновых градиентов
        document.querySelector('.container').style.backgroundPosition = `${50 + moveX / 50}% ${50 + moveY / 50}%`;
    });
    
    // Анимации для карточек при наведении
    document.querySelectorAll('.feature-card, .download-option').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Добавляем дополнительный эффект при наведении
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            // Возвращаем к обычному состоянию
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Добавляем эффект нажатия кнопкам
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Анимация для демо-приложения в Hero секции
    animateAppMessages();
    
    function animateAppMessages() {
        const messages = document.querySelectorAll('.message');
        const typingIndicator = document.querySelector('.typing-indicator');
        
        // Скрываем все сообщения вначале
        messages.forEach(msg => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(20px)';
        });
        
        typingIndicator.style.opacity = '0';
        
        // Анимируем появление сообщений последовательно
        setTimeout(() => {
            messages[0].style.opacity = '1';
            messages[0].style.transform = 'translateY(0)';
            messages[0].style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                messages[1].style.opacity = '1';
                messages[1].style.transform = 'translateY(0)';
                messages[1].style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    messages[2].style.opacity = '1';
                    messages[2].style.transform = 'translateY(0)';
                    messages[2].style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        typingIndicator.style.opacity = '1';
                        typingIndicator.style.transition = 'all 0.5s ease';
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
});

// Инициализация эффекта подсветки курсора
function initCursorGlow() {
    const container = document.querySelector('.container');
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    container.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
        
        if (cursorGlow.style.opacity === '0') {
            cursorGlow.style.opacity = '1';
        }
    });
    
    // Скрываем подсветку курсора, когда мышь покидает окно
    document.addEventListener('mouseout', () => {
        cursorGlow.style.opacity = '0';
    });
}

// Инициализация скролла заголовка
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Инициализация мобильного меню
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            body.classList.toggle('mobile-menu-open');
            
            // Блокируем/разблокируем скролл страницы
            if (body.classList.contains('mobile-menu-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Закрываем меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('mobile-menu-open');
                body.style.overflow = '';
            });
        });
    }
}

// Создание звездного фона
function initStars() {
    const container = document.querySelector('.container');
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    
    // Создаем звезды с разными размерами и позициями
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайное размещение и размер
        const size = Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 3 + Math.random() * 9;
        const delay = Math.random() * 10;
        
        // Устанавливаем стили для звезды
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Добавляем контейнер со звездами в DOM
    container.appendChild(starsContainer);
}

// Создание декоративных пузырьков
function initBubbles() {
    const sections = document.querySelectorAll('.hero, .features, .download');
    
    sections.forEach(section => {
        // Добавляем пузырьки только на определенные секции
        const numBubbles = 15;
        
        for (let i = 0; i < numBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Случайные размеры и позиции
            const size = 5 + Math.random() * 15;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = 15 + Math.random() * 30;
            const delay = Math.random() * 5;
            const opacity = 0.05 + Math.random() * 0.1;
            
            // Устанавливаем стили для пузырька
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${posX}%`;
            bubble.style.bottom = `${posY}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.opacity = `${opacity}`;
            
            section.appendChild(bubble);
        }
    });
}

// Настройка плавной прокрутки и анимаций при скроллинге
function setupScrollAnimations() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Учитываем высоту хедера
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Устанавливаем активную ссылку при скролле
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150; // С небольшим отступом
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Активируем начальную ссылку
    
    // Анимации элементов при прокрутке
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    // Функция проверки видимости элемента
    function checkVisibility() {
        animatedElements.forEach(element => {
            // Проверяем, виден ли элемент в viewport
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Если элемент виден
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                // Получаем тип анимации из data-атрибута
                const animationType = element.getAttribute('data-animation');
                
                // Добавляем соответствующий класс
                element.classList.add(`animate-${animationType}`);
                element.classList.add('animated');
            }
        });
    }
    
    // Запускаем проверку при скролле
    window.addEventListener('scroll', checkVisibility);
    // И при загрузке страницы
    checkVisibility();
}

// Добавление эффекта ряби (ripple) на кнопки
function addRippleEffectToButtons() {
    const buttons = document.querySelectorAll('.ripple-effect');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Создаем элемент ряби
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Определяем позицию клика относительно кнопки
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Устанавливаем стили для элемента ряби
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Добавляем элемент ряби в кнопку
            button.appendChild(ripple);
            
            // Удаляем элемент после анимации
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
}

// Инициализация декоративных частиц
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Создаем уникальную анимацию для каждой частицы
        const duration = 20 + (index * 5);
        const delay = index * 2;
        const size = 5 + (index * 3);
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
    });
}

// Эффект печатающегося текста
function setupTypingEffect() {
    const typingIndicator = document.querySelector('.typing-indicator');
    
    if (typingIndicator) {
        // Пульсирующая анимация индикатора печати
        setInterval(() => {
            typingIndicator.classList.toggle('active');
        }, 1500);
    }
}

// Инициализация hover-эффектов
function initHoverEffects() {
    // Эффект свечения для кнопок с классом .shine-effect
    const shineButtons = document.querySelectorAll('.shine-effect');
    
    shineButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            // Вычисляем позицию мыши относительно кнопки
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Смещаем блик в зависимости от позиции курсора
            button.style.setProperty('--shine-x', `${x}px`);
            button.style.setProperty('--shine-y', `${y}px`);
        });
    });
    
    // Эффект наведения для карточек
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Вычисляем угол наклона карточки
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Применяем эффект 3D-трансформации
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Добавляем свечение с той стороны, где находится курсор
            card.style.setProperty('--highlight-x', `${x / rect.width * 100}%`);
            card.style.setProperty('--highlight-y', `${y / rect.height * 100}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            // Возвращаем карточку в исходное положение
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Анимация сообщений в чате
function initMessageAnimations() {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach((message, index) => {
        // Добавляем задержку появления сообщений
        setTimeout(() => {
            message.classList.add('message-visible');
        }, 1000 + (index * 800));
    });
    
    // Активируем индикатор печати после появления всех сообщений
    setTimeout(() => {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.classList.add('typing-visible');
        }
    }, 1000 + (messages.length * 800));
}

// Индикатор прокрутки
function initScrollIndicator() {
    const header = document.querySelector('header');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    if (header) {
        header.appendChild(scrollIndicator);
        
        window.addEventListener('scroll', () => {
            // Вычисляем процент прокрутки страницы
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            // Обновляем ширину индикатора
            scrollIndicator.style.width = `${scrollPercent}%`;
            
            // Добавляем класс для видимости индикатора
            if (scrollTop > 50) {
                scrollIndicator.classList.add('scroll-indicator-visible');
            } else {
                scrollIndicator.classList.remove('scroll-indicator-visible');
            }
        });
    }
}

// Эффект параллакса при движении мыши
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    const techElements = document.querySelectorAll('.tech-circle, .tech-line');
    
    if (heroSection && techElements.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            // Вычисляем позицию мыши относительно секции
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;
            
            // Применяем эффект параллакса к техническим элементам
            techElements.forEach((element, index) => {
                const factor = 0.02 + (index * 0.01);
                const translateX = x * factor;
                const translateY = y * factor;
                
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
        
        // Возвращаем элементы в исходное положение при уходе мыши
        heroSection.addEventListener('mouseleave', () => {
            techElements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
                element.style.transition = 'transform 0.5s ease-out';
            });
        });
    }
} 