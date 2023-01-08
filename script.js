let API_KEY="AIzaSyD1T0aeL2b2ia6bws3YNUOAFQoGzvlvI04";
let VIDEO_HTTP="https://www.googleapis.com/youtube/v3/videos?";
let CHANNEL_HTTP="https://www.googleapis.com/youtube/v3/channels?";

let SUBSCRIPTION="https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.subscriptions.list?"
        
const videoCardContainer = document.querySelector('.video-container');

fetch(VIDEO_HTTP + new URLSearchParams({
    key: API_KEY,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 5,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));


const getChannelIcon = (video_data) => {
    fetch(CHANNEL_HTTP + new URLSearchParams({
        key: API_KEY,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}





const searchInput = document.querySelector('.search-bar');
 const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

 searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})