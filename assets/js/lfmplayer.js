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

function setDisplayName(apiData) {
    $("#api_lfm_display_name").html(apiData.display_name);
}

function setCurrentPlaylist(apiData) {
    $("#show_start").html(apiData.current_playlist.hour);
    $("#show_name").html(apiData.current_playlist.name);
    $("#show_description").html(apiData.current_playlist.description);
}

function setNextPlaylist(apiData) {
    $("#next_start").html(apiData.next_playlist.hour);
    $("#next_name").html(apiData.next_playlist.name);
    $("#next_description").html(apiData.next_playlist.description);
}

function setStationInformation(apiData) {
    $("#station_logo").attr('src', apiData.images.station);
    $("#station_displayname").html(apiData.display_name);
    $("#station_slogan").html(apiData.format);
    $("#station_description").html(apiData.description);
    apiData.website ? $("#hp-link").attr('href', apiData.website) : $("#hp-link").hide();
    apiData.facebook_page ? $("#fb-link").attr('href', apiData.facebook_page) : $("#fb-link").hide();
    apiData.twitter_name ? $("#tw-link").attr('href', "https://twitter.com/" + apiData.twitter_name) : $("#tw-link").hide();
    apiData.third_parties.instagram ? $("#ig-link").attr('href', "https://instagram.com/" + apiData.third_parties.instagram.name) : $("#ig-link").hide();
    $("#radiode-link").attr('href', apiData.third_parties.radiode.url);
    $("#phonostar-link").attr('href', apiData.third_parties.phonostar.url);
    $("#m3u-link").attr('href', apiData.stream_url + ".m3u");
    $("#pls-link").attr('href', apiData.stream_url + ".pls");
}

function crawleLautApi(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name, function (data) {
        setDisplayName(data);
        changeFavicon(data);
        document.title = data.display_name.toUpperCase() + " - PLAYER";
        station_info && setStationInformation(data);
        current_show && setCurrentPlaylist(data);
        next_show && setNextPlaylist(data);
    });
}

function crawlePlaylist(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name, function (data) {
        current_show && setCurrentPlaylist(data);
        next_show && setNextPlaylist(data);
    });
}

function changeFavicon(apiData) {
    document.head || (document.head = document.getElementsByTagName('head')[0]);
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = apiData.images.station;
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}

function getSong(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name + "/current_song", function (current) {
        if (song_str !== (current.title + " " + current.artist.name)) {
            song_str = current.title + " " + current.artist.name;
            $("#api_lfm_current_song1").html("<b>" + current.artist.name + "</b> mit: " + current.title);
        }
    })
}

function getWidth() {
    let wrapper = $("#nowplaying").width()
    let playing = $("#api_lfm_display_name").width() + $("#nowplaying span").width();
    $("#api_lfm_current_song1").width(wrapper - playing);
}

function audiobtn() {
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