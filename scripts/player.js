// Данные плейлиста (в реальности будут приходить с сервера)
const playlistData = [
  {
    id: 1,
    title: "SLAY!",
    artist: "Eternxlkz",
    duration: "2:45",
    file: "assets/music/Eternxlkz-SLAY!.mp3",
    cover: "assets/images/SLAY!.jpg",
  },
];

// Элементы DOM
const playlistElement = document.getElementById("playlist");
const audioPlayer = new Audio();
let currentTrackIndex = 0;

// Функция для создания элемента трека
function createTrackElement(track, index) {
  const trackElement = document.createElement("div");
  trackElement.className = "playlist-item";
  trackElement.dataset.index = index;

  trackElement.innerHTML = `
        <div class="playlist-item-img">
            <i class="fas fa-music"></i>
        </div>
        <div class="playlist-info">
            <h4>${track.title}</h4>
            <p>${track.artist}</p>
        </div>
        <div class="playlist-duration">${track.duration}</div>
    `;

  // Обработчик клика на трек
  trackElement.addEventListener("click", () => {
    playTrack(index);
  });

  return trackElement;
}

// Функция загрузки плейлиста
function loadPlaylist() {
  playlistElement.innerHTML = ""; // Очищаем плейлист

  playlistData.forEach((track, index) => {
    const trackElement = createTrackElement(track, index);
    playlistElement.appendChild(trackElement);
  });
}

// Функция воспроизведения трека
function playTrack(index) {
  if (index >= 0 && index < playlistData.length) {
    currentTrackIndex = index;
    const track = playlistData[index];

    // Обновляем аудиоплеер
    audioPlayer.src = track.file;
    audioPlayer.play();

    // Обновляем UI
    updateNowPlaying(track);
    updateActiveTrack(index);

    // Меняем иконку play/pause
    const playIcon = document.getElementById("play-icon");
    playIcon.className = "fas fa-pause";
  }
}

// Функция обновления информации о текущем треке
function updateNowPlaying(track) {
  document.getElementById("track-title").textContent = track.title;
  document.getElementById("track-artist").textContent = track.artist;
  document.getElementById("cover-image").src = track.cover;
}

// Функция обновления активного трека в плейлисте
function updateActiveTrack(index) {
  // Убираем класс active у всех треков
  const allTracks = playlistElement.querySelectorAll(".playlist-item");
  allTracks.forEach((track) => track.classList.remove("active"));

  // Добавляем класс active текущему треку
  const currentTrack = playlistElement.querySelector(`[data-index="${index}"]`);
  if (currentTrack) {
    currentTrack.classList.add("active");

    // Прокручиваем к активному треку
    currentTrack.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

// Функция следующего трека
function nextTrack() {
  let nextIndex = currentTrackIndex + 1;
  if (nextIndex >= playlistData.length) nextIndex = 0;
  playTrack(nextIndex);
}

// Функция предыдущего трека
function prevTrack() {
  let prevIndex = currentTrackIndex - 1;
  if (prevIndex < 0) prevIndex = playlistData.length - 1;
  playTrack(prevIndex);
}

// Функция play/pause
function togglePlay() {
  const playIcon = document.getElementById("play-icon");

  if (audioPlayer.paused) {
    if (audioPlayer.src) {
      audioPlayer.play();
      playIcon.className = "fas fa-pause";
    } else {
      // Если ничего не играет, начинаем с первого трека
      playTrack(0);
    }
  } else {
    audioPlayer.pause();
    playIcon.className = "fas fa-play";
  }
}

// Обработчики событий для аудиоплеера
audioPlayer.addEventListener("ended", nextTrack);
audioPlayer.addEventListener("timeupdate", updateProgressBar);

// Функция обновления прогресс-бара
function updateProgressBar() {
  const progressBar = document.querySelector(".progress-bar::after");
  const currentTimeElement = document.getElementById("current-time");
  const totalTimeElement = document.getElementById("total-time");

  if (progressBar) {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = percentage + "%";
  }

  if (currentTimeElement) {
    currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
  }

  if (totalTimeElement && audioPlayer.duration) {
    totalTimeElement.textContent = formatTime(audioPlayer.duration);
  }
}

// Функция форматирования времени
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Инициализация плейлиста при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  loadPlaylist();

  // Обработчик громкости
  const volumeControl = document.getElementById("volume");
  if (volumeControl) {
    volumeControl.addEventListener("input", function () {
      audioPlayer.volume = this.value;
    });
  }
});
