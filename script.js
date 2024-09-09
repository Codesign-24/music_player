const songsList = [
    {
      name: "Lost in Your Eyes",
      artist: "TFLM",
      src: "assets/1.mp3",
      cover: "assets/1.jpg"
    },
    {
      name: "All Night",
      artist: "Ikson",
      src: "assets/2.mp3",
      cover: "assets/2.jpg"
    },
    {
      name: "Lie 2 You",
      artist: "Leonell Cassio",
      src: "assets/3.mp3",
      cover: "assets/3.jpg"
    }
  ]
  
  const artistName = document.querySelector('.artist-name');
  const musicName = document.querySelector('.song-name');
  const fillBar = document.querySelector('.fill-bar');
  const startTime = document.querySelector('.start-time');
  const endTime = document.querySelector('.end-time');
  const prog = document.querySelector('.progress-bar');
  const cover = document.getElementById('cover');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  
  const playIcon = "https://img.icons8.com/ios-glyphs/90/play--v1.png";
  const pauseIcon = "https://img.icons8.com/ios-filled/50/pause--v1.png";
  
  let song = new Audio();
  let currentSong = 0;
  let playing = false;
  
  document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click',prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click',togglePlayPause);
    prog.addEventListener('click',seek);
  })
  
  function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
  }
  
  function updateProgress() {
    if (song.duration) {
      const pos = (song.currentTime / song.duration) * 100;
      fillBar.style.width = `${pos}%`;
  
      startTime.innerText = formatTime(song.currentTime);
      endTime.innerText = formatTime(song.duration);
    }
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  function updatePlayButton() {
    playBtn.src = playing ? pauseIcon : playIcon;
    playBtn.alt = playing ? "pause--v1" : "play--v1";
    playBtn.id = "play";
  }
  
  function togglePlayPause() {
    playing ? song.pause() : song.play();
  
    playing = !playing;
    updatePlayButton();
    cover.classList.toggle('active', playing);
  }
  
  function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
  }
  
  function prevSong() {
    currentSong = (currentSong -1 + songsList.length) % songsList.length;
    playMusic(); 
  }
  
  function playMusic() {
    loadSong(currentSong);
    song.play();
  
    playing = true;
    updatePlayButton();
    cover.classList.add('active');
  }
  
  function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
  }
  