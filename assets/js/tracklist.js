function appendTemplate(append_selector, track_nr, artist, title) {
    $(append_selector).append($("#song_detailed").html().replace("{{track_nr}}", track_nr).replace("{{artist}}", artist).replace("{{title}}", title));
}

function load_last_songs_fully(station_name) {
    $.getJSON("https://api.laut.fm/station/"+ station_name +"/last_songs", function (data) {
        data.shift();
        for (const [key, value] of Object.entries(data)) {
            appendTemplate("#song_row", parseInt(key, 10) +1, value.artist.name, value.title);
        }
    });
}