console.log("Welcome to Spotify");

// INitialsing the variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar'); 
let gif = document.getElementById('gif');
let songItems  =Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Ez-Ez", filePath: "1.mp3" , coverPath: "dhurandhar.jpg" },
    { songName: "Run Down The City - Monica", filePath: "2.mp3" , coverPath: "dhurandhar.jpg" },
    { songName: "Jaan Se Guzarte Hain", filePath: "3.mp3" , coverPath: "dhurandhar2.jpg" },
    { songName: "Teri Ni Kararan", filePath: "4.mp3" , coverPath: "dhurandhar.jpg" },
    { songName: "Ishq Jalakar-Karvaan", filePath: "5.mp3" , coverPath: "dhurandhar.jpg" },
    { songName: "Lutt Le Gaya", filePath: "6.mp3" , coverPath: "dhurandhar.jpg" },
    { songName: "Ramba Ho", filePath: "7.mp3" , coverPath: "dhurandhar.jpg" },
];

    songItems.forEach((element, i) => {
        console.log(element, i);
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    }   );


// audioElement.play();

// handel play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        // Update current song icon
        updateSongListIcons();

        gif.style.opacity = 1;
    }
    else {

        audioElement.pause();

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

        // Change all song icons back to play
        makeAllPlays();

        gif.style.opacity = 0;
    }
});


// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

const updateSongListIcons = () => {
    makeAllPlays();

    let currentSongBtn = document.getElementById(songIndex);
    currentSongBtn.classList.remove('fa-circle-play');
    currentSongBtn.classList.add('fa-circle-pause');
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        // If the clicked song is already playing, pause it
        if (
            parseInt(e.target.id) === songIndex &&
            !audioElement.paused
        ) {
            audioElement.pause();

            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');

            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');

            gif.style.opacity = 0;
            return;
        }

        // Play a new song
        makeAllPlays();

        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = `${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();
        updateSongListIcons();

        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;  
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongListIcons();

    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongListIcons();

    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});