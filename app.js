document.querySelector('.search-btn').addEventListener('click', function () {
    const inputValue = document.querySelector('.input-value').value;
    document.querySelector('.single-lyrics').innerText = ''
    fetchSearchResult(inputValue); 
})




//fetch search result api
const fetchSearchResult = (title)=> {
    fetch(`https://api.lyrics.ovh/suggest/${title}`)
    .then(response => response.json())
    .then(data => {
        const dataLength = data.data;
        showSearchResult(dataLength);
        
    })
    .catch(error=>alert('Please, Enter your artist song name'))
}
// fetchSearchResult('titanic')


 //show search result function
    const showSearchResult = (title) => {
        const searchResult = document.querySelector('.search-result');
        searchResult.innerHTML = ''
        for (let i = 0; i < title.length; i++) {

            const songTitle = title[i].title;
            const singerName = title[i].artist.name;
            const audioTrack = title[i].preview;

            
            searchResult.innerHTML += 
                        `<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9 lyric-section">
                                <h3 class="lyrics-name" id="lyrics-name">${songTitle}</h3>
                                <p class="author lead">Album by <span class="authors-name">${singerName}</span></p>
                                <audio controls>
                                <source src="${audioTrack}" type="audio/ogg">
                                
                                </audio>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button class="btn btn-success" id='get-lyric' onclick="getSingleLyric('${singerName}','${songTitle}')">Get Lyrics</button>
                            </div>
                        </div>`
            if(i == 9)
            break;
        }
    }

    //get single lyric function
    const getSingleLyric = (artist, title)=>{
      fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(res=>res.json())
      .then(data=> {
       if (data.lyrics == undefined){
        document.querySelector('.single-lyrics').innerText = `Lyrics not found`;
       }
       else {
        document.querySelector('.single-lyrics').innerText = data.lyrics;
       }
      })
    }

    
