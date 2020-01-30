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
            $("#api_lfm_current_song1").html("<b>" + current.artist.name + "</b> mit: " + current.title);
        }
    })
}

function getDisplayName(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station, function (data) {
        $("#api_lfm_display_name").html(data.display_name);
    })
}

function getShowInformation(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station, function (data) {
        $("#show_start").html(data.current_playlist.hour);
		$("#show_name").html(data.current_playlist.name);
		$("#show_description").html(data.current_playlist.description);
    })
}

function getStationInformation(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station, function (data) {
        $("#station_logo").attr('src', data.images.station);
		$("#station_displayname").html(data.display_name);
		$("#station_slogan").html(data.format);
		$("#station_description").html(data.description);
		$("#hp-link").attr('href', data.website);
		$("#fb-link").attr('href', data.facebook_page);
		$("#tw-link").attr('href', "https://twitter.com/" + data.twitter_name);
		$("#ig-link").attr('href', "https://instagram.com/" + data.third_parties.instagram.name);
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
