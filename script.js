console.log("Welcome");

// Variables
let masterPlay = document.getElementById("masterPlay");
let audioElement = new Audio("songs/1.mp3");
let gif = document.getElementById("gif");
let myProgressBar = document.getElementById("progressionBar");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let songIndex = 0;
let masterSongName = document.getElementById("masterSongName");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let newSong = 0;
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

// Songs list
let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Format time in minutes and seconds
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Preload audio elements to retrieve durations for each song
window.addEventListener("DOMContentLoaded", () => {
  songItem.forEach((element, i) => {
    const audio = new Audio(songs[i].filePath); // Create a new audio element for each song
    audio.addEventListener("loadedmetadata", () => {
      let songDuration = formatTime(audio.duration); // Format the song duration
      element.getElementsByClassName(
        "timeStamp"
      )[0].innerHTML = `${songDuration} <i id="${i}" class="far songItemPlay fa-play-circle"></i>`;
    });
  });
});

// Play/Pause the song
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    audioElement.play();
    gif.style.opacity = 1;
  } else {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    audioElement.pause();
    gif.style.opacity = 0;
  }
});

// Update song metadata and display total duration
audioElement.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audioElement.duration);
});

// Update the current time and the progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;

  // Update current time display
  currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
});

// Update song time when progress bar changes
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Handle song selection and play
songItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.add("fa-pause-circle");
    e.target.classList.remove("fa-play-circle");
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add("fa-pause-circle");
    masterPlay.classList.remove("fa-play-circle");

    // Update duration display when a new song is selected
    audioElement.addEventListener("loadedmetadata", () => {
      durationDisplay.textContent = formatTime(audioElement.duration);
    });
  });
});

// Function to reset all play icons
const makeAllPlays = () => {
  songItemPlay.forEach((e) => {
    e.classList.remove("fa-pause-circle");
    e.classList.add("fa-play-circle");
  });
};

// Next and Previous button logic
next.addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  makeAllPlays();
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerHTML = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
});

previous.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  makeAllPlays();
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerHTML = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
});
