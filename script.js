const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const playBtn = document.getElementById('play')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')

// current song
let songIndex = 0
// Array of songs
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Sanyam vatta'
  },
  {
    name: 'jacinto-2',
    displayName: 'Good song',
    artist: 'Sanyam vatta'
  },
  {
    name: 'jacinto-3',
    displayName: 'Very good song',
    artist: 'Sanyam vatta'
  },
  {
    name: 'metric-1',
    displayName: 'Super good song',
    artist: 'Sanyam vatta'
  },
]

// Playing or not
let isPlaying = false

// play
function playSong(){
  isPlaying = true
  music.play()
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title','Pause')
}

// pause
function pauseSong(){
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title','Play')
  music.pause()
}

playBtn.addEventListener('click',()=>(isPlaying ? pauseSong() : playSong()))



//update dom
function loadSong(song){
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

// onload select song 
loadSong(songs[songIndex])

function nextSong(){
  songIndex += 1
  if(songIndex > songs.length-1){
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

function prevSong(){
  songIndex = songIndex - 1
  if(songIndex<0){
    songIndex = songs.length-1
  }
  loadSong(songs[songIndex])
  playSong()
}

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

// Update progress bar
function updateProgressBar(e){
  if(isPlaying){
    const {duration,currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = `${progressPercent}%`
    // Updating the display for duration
    const durationMinutes = Math.floor(duration/60)
    let durationSeconds = Math.floor(duration%60)
    if(durationSeconds<10){
      durationSeconds = `0${durationSeconds}`
    }
    // Delay switching duration el
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

    const currentMinutes = Math.floor(currentTime/60)
    let currentSeconds = Math.floor(currentTime%60)
    if(currentSeconds<10){
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
  }
}

function setProgressBar(e){
  console.log(e);
  const width = this.clientWidth
  const clickX = e.offsetX
  const {duration} = music;
  music.currentTime = Math.floor((clickX/width)*duration)
}

music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
music.addEventListener('ended',nextSong);