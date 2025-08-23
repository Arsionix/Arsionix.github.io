document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Если это якорная ссылка (начинается с #)
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }
    // Если это ссылка на другой HTML-файл
    else if (href.endsWith(".html")) {
      // Переход произойдет автоматически
      // Можно добавить прелоадер или анимацию перехода
    }
  });
});

// Плавная прокрутка к секциям
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Обработка формы
document.getElementById("artist-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: this.querySelector('input[type="text"]').value,
    email: this.querySelector('input[type="email"]').value,
    musicLink: this.querySelector('input[placeholder*="ссылку"]').value,
  };

  // Здесь будет отправка данных на сервер
  console.log("Форма отправлена:", formData);

  // Показываем уведомление
  alert(
    "Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время."
  );
  this.reset();
});

// Анимация визуализатора музыки
function animateVisualizer() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => {
    const randomHeight = 20 + Math.random() * 80;
    bar.style.height = `${randomHeight}px`;
  });
}

// Запускаем анимацию визуализатора
setInterval(animateVisualizer, 150);

// Параллакс эффект для герой секции
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.backgroundPositionY = -(scrolled * 0.5) + "px";
  }
});

// Функция для открытия плеера (заглушка)
function openPlayer() {
  window.location.href = "player.html";
}

// Анимация появления элементов при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Наблюдаем за элементами с анимацией
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .step, .join-form, .join-info"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Обработка навигации
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});
