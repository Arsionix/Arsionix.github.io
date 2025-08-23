// Плавная прокрутка для якорных ссылок
document.addEventListener("DOMContentLoaded", function () {
  // Обрабатываем только якорные ссылки
  const anchorLinks = document.querySelectorAll(".anchor-link");

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Отменяем стандартное поведение ТОЛЬКО для якорных ссылок
      e.preventDefault();

      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Плавная прокрутка к элементу
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Обновляем URL в адресной строке
          history.pushState(null, "", href);
        }
      }
    });
  });

  console.log(
    "Навигация инициализирована: якорные ссылки работают с плавной прокруткой"
  );
});

// Функция для кнопки "Слушать сейчас" на главной
function openPlayer() {
  window.location.href = "player.html";
}

// Обработка формы (если нужно)
document.addEventListener("DOMContentLoaded", function () {
  const artistForm = document.getElementById("artist-form");
  if (artistForm) {
    artistForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        musicLink: this.querySelector('input[placeholder*="ссылку"]').value,
      };

      console.log("Форма отправлена:", formData);
      alert(
        "Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время."
      );
      this.reset();
    });
  }
});

// Анимация визуализатора музыки на главной
function animateVisualizer() {
  const bars = document.querySelectorAll(".bar");
  if (bars.length > 0) {
    bars.forEach((bar) => {
      const randomHeight = 20 + Math.random() * 80;
      bar.style.height = `${randomHeight}px`;
    });
  }
}

// Запускаем анимацию только если есть визуализатор
document.addEventListener("DOMContentLoaded", function () {
  const visualizer = document.querySelector(".music-visualizer");
  if (visualizer) {
    setInterval(animateVisualizer, 150);
  }
});

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
