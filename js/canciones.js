const d = document,
$form = d.getElementById("song-search"),
$error = d.querySelector(".error"),
$main = d.querySelector(".main"),
$artist = d.querySelector(".artist"),
$song = d.querySelector(".song");

$form.addEventListener("submit", async e => {

	try{
        let artist = e.target.artist.value.toLowerCase(),
            song = e.target.song.value.toLowerCase(),
            $artistTemplate = "",
            $songTemplate = "",
            artistAPI = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
            songAPI = `https://api.lyrics.ovh/v1/${artist}/${song}`,
            artistFetch = fetch(artistAPI),
            songFetch = fetch(songAPI),
            [artistRes,songRes] = await Promise.all([artistFetch, songFetch]),
            artistData = await artistRes.json(),
            songData = await songRes.json(); 

            console.log(artistRes, songRes);
            console.log(artistData, songData);

        if(artistData.artists === null){
            $artistTemplate = `<h2>No existe el interprete ${artist} </h2>`;
        }
        else{
            let artist = artistData.artists[0];
            $artistTemplate = `
            <h2>${artist.strArtist}</h2>
            <img src="${artist.strArtistThumb}" alt="${artist.strArtist}">
            <p>${artist.intFormedYear} - ${(artist.intDiedYear||"Presente")}</p>
            <p>${artist.strCountry}</p>
            <p>${artist.strGenre} - ${artist.strStyle}</p>
            <a href="http://${artist.strWebsite}" target="_blank" id="sitioWeb">Sitio Web</a>
            <p>${artist.strBiographyEN}</p>
            `;
        }

     
        $artist.innerHTML = $artistTemplate;
       
        
        
    } catch (err) {
        alert("Por favor completa con caracteres alfanumericos");
    }

 });
