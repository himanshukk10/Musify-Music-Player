console.log('Welcome to Musify');

// Listen to variables
let songIndex = 0; //initialize
let audioElement = new Audio("songs/1.mp3"); // default song
let masterPlay = document.getElementById("masterPlay"); // play/pause button
let myProgressBar = document.getElementById("myProgressBar"); // seekbar
let volumeBar = document.getElementById("volumeBar"); // volume
let gif = document.getElementById("gif"); // playing gif
let songItems = Array.from(document.getElementsByClassName("songItem")); // get each song item as an array
let masterSongName = document.getElementById("masterSongName"); // song name display
let bgPicVariable = document.getElementById("bg-pic");

let songs = [
  {
    songName: "Akuma No Ko",
    artist: "Ai Higuchi",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover1.jpg",
  },
  {
    songName: "Name of Love",
    artist: "Cinema Staff",
    filePath: "songs/2.mp3",
    coverPath: "covers/cover2.jpg",
  },
  {
    songName: "The Rumbling",
    artist: "SiM",
    filePath: "songs/3.mp3",
    coverPath: "covers/cover3.jpg",
  },
  {
    songName: "Akatsuki No Requiem",
    artist: "Linked Horizon",
    filePath: "songs/4.mp3",
    coverPath: "covers/cover4.jpg",
  },
  {
    songName: "My War",
    artist: "Shinsei Kamattechan",
    filePath: "songs/5.mp3",
    coverPath: "covers/cover5.jpg",
  },
  {
    songName: "Guren No Yumiya",
    artist: "Linked Horizon",
    filePath: "songs/6.mp3",
    coverPath: "covers/cover6.jpg",
  },
  {
    songName: "Jiyuu No Tsubasa",
    artist: "Linked Horizon",
    filePath: "songs/7.mp3",
    coverPath: "covers/cover7.jpg",
  },
  {
    songName: "Shock",
    artist: "Yuko Ando",
    filePath: "songs/8.mp3",
    coverPath: "covers/cover8.jpg",
  },
  {
    songName: "Shinzou Wo Sasageyo",
    artist: "Linked Horizon",
    filePath: "songs/9.mp3",
    coverPath: "covers/cover9.jpg",
  },
  {
    songName: "Red Swan",
    artist: "Yoshiki ft. Hyde",
    filePath: "songs/10.mp3",
    coverPath: "covers/cover10.jpg",
  },
  {
    songName: "ətˈæk 0N tάɪtn",
    artist: "Hiroyuki Sawano ft. Mika Kobayashi",
    filePath: "songs/11.mp3",
    coverPath: "covers/cover11.jpg",
  },
  {
    songName: "ətˈæk 0N tάɪtn WMId",
    artist: "Hiroyuki Sawano ft. Eliana",
    filePath: "songs/12.mp3",
    coverPath: "covers/cover12.jpg",
  },
  {
    songName: "YouSeeBIGGIRL/T:T",
    artist: "Hiroyuki Sawano ft. Gemie",
    filePath: "songs/13.mp3",
    coverPath: "covers/cover13.jpg",
  },
  {
    songName: "Call Your Name (GV)",
    artist: "Hiroyuki Sawano ft. Gemie",
    filePath: "songs/14.mp3",
    coverPath: "covers/cover14.jpg",
  },
  {
    songName: "Apple Seed",
    artist: "Hiroyuki Sawano ft. mpi and Laco",
    filePath: "songs/15.mp3",
    coverPath: "covers/cover15.jpg",
  },
  {
    songName: "Vogel im Käfig",
    artist: "Hiroyuki Sawano ft. Cyua",
    filePath: "songs/16.mp3",
    coverPath: "covers/cover16.jpg",
  },
];

//Get song name and cover image
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle main play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    let selectedIcon = document.getElementById(songIndex);
    selectedIcon.classList.remove('fa-play-circle');
    selectedIcon.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    getLyrics();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    let selectedIcon = document.getElementById(songIndex);
    selectedIcon.classList.remove('fa-pause-circle');
    selectedIcon.classList.add('fa-play-circle');
  }
});

// Get seekbar progress and display time elapsed/duration
//Also to automatically play the next song
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;

  let totalDuration =
    Math.floor(audioElement.duration / 60) +
    ":" +
    Math.floor(audioElement.duration % 60);
  let timeElapsedSec = Math.floor(audioElement.currentTime % 60);
  let timeElapsedMin = Math.floor(audioElement.currentTime / 60);
  document.getElementById("songMin").innerText = timeElapsedMin;
  if (timeElapsedSec < 10) {
    document.getElementById("songSec").innerText = ":0" + timeElapsedSec;
  } else {
    document.getElementById("songSec").innerText = ":" + timeElapsedSec;
  }
  document.getElementById("totalSongDuration").innerText = "/" + totalDuration;

  if (audioElement.currentTime == audioElement.duration &&
    document.getElementById('repeatText').innerText == 'Repeat One') {
    audioElement.currentTime = 0;
    audioElement.play();

  } else if (audioElement.currentTime == audioElement.duration &&
    document.getElementById('repeatText').innerText == 'Shuffle') {
      songIndex = Math.floor(Math.random() * 15);
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      makeAllPlays();
      let selectedIcon = document.getElementById(songIndex);
      selectedIcon.classList.remove('fa-play-circle');
      selectedIcon.classList.add('fa-pause-circle');
      masterSongName.innerText = songs[songIndex].songName + " - " + songs[songIndex].artist;
      changeBanner();
      getLyrics();
  }
  else if (audioElement.currentTime == audioElement.duration && songIndex == 15) {
    songIndex = 0;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName + " - " + songs[songIndex].artist;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    let selectedIcon = document.getElementById(songIndex);
    selectedIcon.classList.remove('fa-play-circle');
    selectedIcon.classList.add('fa-pause-circle');
    changeBanner();
    getLyrics();
  } else if (
    audioElement.currentTime == audioElement.duration &&
    songIndex != 15
  ) {
    songIndex++;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName + " - " + songs[songIndex].artist;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    let selectedIcon = document.getElementById(songIndex);
    selectedIcon.classList.remove('fa-play-circle');
    selectedIcon.classList.add('fa-pause-circle');
    changeBanner();
    getLyrics();
  } 
});

// Update seek bar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value / 100) * audioElement.duration;
});

//Change volume using volume bar
volumeBar.addEventListener("change", (e) => {
  audioElement.volume = e.currentTarget.value / 100;

  if (audioElement.volume < 0.5) {
    document.getElementById('volumeIcon').classList.remove('fa-volume-high');
    document.getElementById('volumeIcon').classList.add('fa-volume-low');
  }
  else if (audioElement.volume >= 0.5) {
    document.getElementById('volumeIcon').classList.remove('fa-volume-low');
    document.getElementById('volumeIcon').classList.add('fa-volume-high');
  }

  if (document.getElementById('volumeIcon').classList.contains('fa-volume-xmark')) {
    console.log('volume function is working');
    document.getElementById('volumeIcon').classList.remove('fa-volume-xmark');
    if (volumeBar.value / 100 < 0.5) {
      document.getElementById('volumeIcon').classList.add('fa-volume-low');
    }
    else if (volumeBar.value / 100 >= 0.5) {
      document.getElementById('volumeIcon').classList.add('fa-volume-high');
    }
  }
});

// For individual play buttons. When one song is played, the rest are paused.
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Use the icons to change songs.
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("fa-play-circle") &&
        audioElement.currentTime <= 0
      ) {
        // play first song
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        masterSongName.innerText = songs[songIndex].songName + " - " + songs[songIndex].artist; // Song name displayed
        gif.style.opacity = 1; // Playing gif displayed
        console.log("first song has been played");
        changeBanner();
        getLyrics();
        // songItemBg();
      } else if (e.target.classList.contains("fa-pause-circle")) {
        // pause song
        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0; // Playing gif removed
        console.log("song has been paused");
      } else if (
        e.target.classList.contains("fa-play-circle") &&
        audioElement.currentTime > 0 &&
        audioElement.paused &&
        songIndex === parseInt(e.target.id)
      ) {
        //resume song
        audioElement.play();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1; // Playing gif displayed
        console.log("song has been resumed");
      } else if (
        e.target.classList.contains("fa-play-circle") &&
        songIndex !== parseInt(e.target.id)
      ) {
        //play new song
        makeAllPlays();
        audioElement.pause();
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        masterSongName.innerText = songs[songIndex].songName + " - " + songs[songIndex].artist; // Song name displayed
        gif.style.opacity = 1; // Playing gif displayed
        console.log("next song has been played");
        changeBanner();
        getLyrics();
      }
    });
  }
);

// Next song button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 15) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  let selectedIcon = document.getElementById(songIndex);
  selectedIcon.classList.remove('fa-play-circle');
  selectedIcon.classList.add('fa-pause-circle');
  changeBanner();
  getLyrics();
});

// Previous song button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 15;
  } else {
    songIndex -= 1;
  }
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  let selectedIcon = document.getElementById(songIndex);
  selectedIcon.classList.remove('fa-play-circle');
  selectedIcon.classList.add('fa-pause-circle');
  changeBanner();
  getLyrics();
});

// Back 10s button
document.getElementById("left-10s").addEventListener("click", () => {
  audioElement.currentTime -= 10;
});

// Forward 10s button
document.getElementById("right-10s").addEventListener("click", () => {
  audioElement.currentTime += 10;
});

// Function to change song banner
const changeBanner = () => {
  document.getElementById(
    "songBannerBg"
  ).style.backgroundImage = `url(covers/cover${songIndex + 1}.jpg)`;
};

//Volume icon mute/unmute
document.getElementById('volumeIcon').addEventListener("click", (e) => {
  if (e.target.classList.contains('fa-volume-high')) {
    e.target.classList.remove('fa-volume-high');
    e.target.classList.add('fa-volume-xmark');
    audioElement.volume = 0;
  }
  else if (e.target.classList.contains('fa-volume-xmark')) {
    e.target.classList.remove('fa-volume-xmark');
    if (volumeBar.value / 100 < 0.5) {
      e.target.classList.add('fa-volume-low');
      audioElement.volume = volumeBar.value / 100;
    }
    else if (volumeBar.value / 100 >= 0.5) {
      e.target.classList.add('fa-volume-high');
      audioElement.volume = volumeBar.value / 100;
    }
  }
  else if (e.target.classList.contains('fa-volume-low')) {
    e.target.classList.remove('fa-volume-low');
    e.target.classList.add('fa-volume-xmark');
    audioElement.volume = 0;
  }
});

function getLyrics() {
  document.getElementById('lyricsDisplay').scrollTo(0, 0);
  url = `./lyrics/${songIndex + 1}.txt`;
  fetch(url).then((response) => {
    return response.text();
  }).then((lyrics) => {
    document.getElementById('lyricsDisplay').innerText = lyrics;
  })
};

document.getElementById('repeatIcon').addEventListener('click', () => {
  console.log('it works');
  if (document.getElementById('repeatText').innerText === "Repeat All") {
    document.getElementById('repeatText').innerText = "Repeat One";
  }
  else if(document.getElementById('repeatText').innerText === "Repeat One") {
    document.getElementById('repeatText').innerText = "Shuffle";
  }
  else {
    document.getElementById('repeatText').innerText = "Repeat All";
  }
});

function songItemBg () {
  console.log('sontitembg works');
  if(document.getElementById('song'+(songIndex+1)).style.backgroundColor != 'blue') {
  document.getElementById('song'+(songIndex+1)).style.backgroundColor = 'blue';
  }

  audioElement.addEventListener('ended', () => {
    console.log('rgb works');
    document.getElementById('song'+(songIndex+1)).style.backgroundColor = 'rgb(' + 13 + ',' + 106 + ',' + 23 + ')';
  })
}