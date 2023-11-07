let text = 'Оценка за задание 60 \n\nВёрстка +10 \n вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5 \n в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \nКнопка Play/Pause +10 \n есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5 \n внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5 \n При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10 \n При смене аудиотрека меняется изображение - обложка аудиотрека +10 \n Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n Отображается продолжительность аудиотрека и его текущее время проигрывания +10';
console.log(text);

let audio = document.querySelector('audio'),
  isPlay = false,
  background = document.querySelector('.background'),
  play = document.querySelector('.play'),
  stop = document.querySelector('.stop'),
  playStop = document.querySelector('.play-stop'),
  imgPlay = document.querySelector('.img-play-stop'),
  next = document.querySelector('.next'),
  previous = document.querySelector('.previous'),
  singer = document.querySelector('.singer'),
  song = document.querySelector('.song'),
  img = document.querySelector('.img'),
  songLength = document.querySelector('.song-length'),
  progressBar = document.querySelector('.progress-div'),
  songProgress = document.querySelector('.song-progress'),
  progress = document.querySelector('.progress'),
  songs = ["audio/The Irrepressibles - In This Shirt.mp3", "audio/Suriel Hess - Still Something.mp3", "audio/Sia - Saved My Life.mp3", "audio/Kaleo - Vor i vaglaskogi.mp3", "audio/Flora Cash - Chronically Beautiful.mp3"],
  imgs = ["img/The Irrepressibles.jpg", "img/Suriel Hess.jfif", "img/Sia.jpg", "img/Kaleo.jpg", "img/Flora Cash.jpg"],
  singers = ["The Irrepressibles", "Suriel Hess", "Sia", "Kaleo", "Flora Cash"]
songsName = ["In This Shirt", "Still Something", "Saved My Life", "Vor i vaglaskogi", "Chronically Beautiful"],
  songNum = 0;

window.addEventListener('load', loadMusic(songNum));
playStop.addEventListener('click', playPauseAudio);

function loadMusic(songNum) {
  singer.innerHTML = singers[songNum];
  song.innerHTML = songsName[songNum];
  img.src = imgs[songNum];
  audio.src = songs[songNum];
  background.src = imgs[songNum];

}
function playPauseAudio() {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    imgPlay.src = "img/pause.png";
    console.log(isPlay);
    console.log(songNum);
    return;
  }
  else
    audio.pause();
  isPlay = false;
  imgPlay.src = "img/play.png";
  console.log(isPlay);
}

nextAudio =() =>{
  if (songNum === songs.length - 1) {
    songNum = 0;
    isPlay = false;
    length.textContent = audio.duration;
    console.log(audio.duration);
    console.log(length.textContent);
    audio.src = songs[songNum];
    singer.textContent = singers[songNum];
    song.textContent = songsName[songNum];
    img.src = imgs[songNum];
    background.src = imgs[songNum];
    playPauseAudio();
  } else {
    songNum++
    length.textContent = audio.duration;
    console.log(audio.duration);
    console.log(length.textContent);
    isPlay = false;
    audio.src = songs[songNum];
    singer.textContent = singers[songNum];
    song.textContent = songsName[songNum];
    img.src = imgs[songNum];
    background.src = imgs[songNum];
    playPauseAudio();

  }
}
next.addEventListener('click', nextAudio);

previous.onclick = function previousAudio() {
  if (songNum === 0) {
    songNum = songs.length - 1;
    isPlay = false;
    length.textContent = audio.duration;
    console.log(audio.duration);
    console.log(length.textContent);
    audio.src = songs[songNum];
    singer.textContent = singers[songNum];
    song.textContent = songsName[songNum];
    img.src = imgs[songNum];
    background.src = imgs[songNum];
    playPauseAudio();
  } else {
    songNum--
    length.textContent = audio.duration;
    console.log(audio.duration);
    console.log(length.textContent);
    isPlay = false;
    audio.src = songs[songNum];
    singer.textContent = singers[songNum];
    song.textContent = songsName[songNum];
    img.src = imgs[songNum];
    background.src = imgs[songNum];
    playPauseAudio();

  }
}
audio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progress.style.width = progressWidth + '%';

  audio.addEventListener('loadeddata', () => {
    let length = audio.duration;
    let totalMin = Math.floor(length / 60);
    let totalSec = Math.floor(length % 60);
    if (totalSec < 10) {
      totalSec = '0' + totalSec;
    }
    songLength.innerText = totalMin + ':' + totalSec;
  });

    let passedMin = Math.floor(currentTime / 60);
    let passedlSec = Math.floor(currentTime % 60);
    if (passedlSec < 10) {
      passedlSec = '0' + passedlSec;
    }
    songProgress.innerText = passedMin + ':' + passedlSec;

})

progressBar.addEventListener('click',(e)=>{
let progressWidthClient = progressBar.clientWidth;
let clickedX = e.offsetX;

audio.currentTime = (clickedX / progressWidthClient) * audio.duration;
audio.play();
    isPlay = true;
    imgPlay.src = "img/pause.png";
})

audio.addEventListener('ended', ()=>{
  nextAudio();
})