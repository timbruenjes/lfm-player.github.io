function $_GET(param) {
    let vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function getSong(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name + "/current_song", function (current) {
        if (song_str !== (current.title + " " + current.artist.name)) {
            song_str = current.title + " " + current.artist.name;
            $("#api_lfm_current_song1").html(current.title + " &mdash; " + current.artist.name);
        }
    })
}

function getWidth() {
    let wrapper = $("#nowplaying").width()
    let playing = $("#api_lfm_display_name").width() + $("#nowplaying span").width();
    $("#api_lfm_current_song1").width(wrapper - playing);
}

$(
    function () {
        let aud = $('audio')[0];
        aud.src = 'https://stream.laut.fm/' + station;
        aud.title = sender + ' - LIVE';
        $('.playbtn').on('click', function () {
            if (aud.paused) {
                aud.play();
                $('.play-pause').removeClass('fa-play').addClass('fa-stop');
            } else {
                aud.pause();
                $('.play-pause').removeClass('fa-stop').addClass('fa-play');
            }

        })
    }
);