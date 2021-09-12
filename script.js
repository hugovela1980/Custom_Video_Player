const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')
let xMousePos = undefined
let videoWidth = video.scrollWidth

//Play and pause video
const toggleVideoStatus = () => {
    if(video.paused) {
        video.play()
    } else {
        video.pause();
    }
}

// Update play/pause icon
const updatePlayIcon = () => {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// Update progress and timestamp
const updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100

    // Get minutes
    let mins = Math.floor(video.currentTime / 60)
    if (mins < 10) {
        mins = '0' + String(mins)
    }

    // Get seconds
    let secs = Math.floor(video.currentTime % 60)
    if (secs < 10) {
        secs = '0' + String(secs)
    }

    timestamp.innerHTML = `${mins}:${secs}`
}

// Set video time to progress
const setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100
}

// Stop video
const stopVideo = () => {
    video.currentTime = 0
    video.pause()
}

// Seek 10 seconds
const getMousePosition = (e) => {
    xMousePos = e.layerX
}

const seekTenSeconds = () => {
    videoWidth = video.scrollWidth
    if (xMousePos > videoWidth / 2) video.currentTime += 10
    else video.currentTime -= 10
}

// Event listeners
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('mousemove', getMousePosition)
video.addEventListener('dblclick', seekTenSeconds)

play.addEventListener('click', toggleVideoStatus)

stop.addEventListener('click', stopVideo)

progress.addEventListener('change', setVideoProgress)