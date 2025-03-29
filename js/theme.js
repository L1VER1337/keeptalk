// Управление темой
document.addEventListener('DOMContentLoaded', function() {
    // Создаем переключатель темы
    createThemeToggle();
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeToggleIcon('light');
    }
    
    // Создаем кнопку переключения темы
    function createThemeToggle() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('title', 'Переключить тему');
        
        themeToggle.addEventListener('click', toggleTheme);
        
        document.body.appendChild(themeToggle);
    }
    
    // Функция переключения темы
    function toggleTheme() {
        const body = document.body;
        
        if (body.classList.contains('light-theme')) {
            // Переключение на темную тему
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeToggleIcon('dark');
        } else {
            // Переключение на светлую тему
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeToggleIcon('light');
        }
        
        // Анимируем переключение темы
        animateThemeTransition();
    }
    
    // Обновляем иконку переключателя
    function updateThemeToggleIcon(theme) {
        const icon = document.querySelector('.theme-toggle i');
        
        if (theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // Анимация перехода между темами
    function animateThemeTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500);
        }, 200);
    }
    
    // Эффект пульсации для переключателя темы
    const themeToggle = document.querySelector('.theme-toggle');
    
    let pulseTimeout;
    function pulsateThemeToggle() {
        themeToggle.classList.add('pulsate');
        
        clearTimeout(pulseTimeout);
        pulseTimeout = setTimeout(() => {
            themeToggle.classList.remove('pulsate');
        }, 1000);
    }
    
    // Запускаем пульсацию при загрузке страницы
    setTimeout(pulsateThemeToggle, 3000);
    
    // Запускаем пульсацию периодически
    setInterval(pulsateThemeToggle, 30000);
}); 