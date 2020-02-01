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
        createWebApp(data);
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

function createWebApp(apiData) {
    document.head || (document.head = document.getElementsByTagName('head')[0]);
    var link1 = document.createElement('link'),
        oldLink1 = document.getElementById('dynamic-webapp-1');
    link1.id = 'dynamic-webapp-1';
    link1.rel = 'icon';
    link1.type = 'image/png';
    link1.size = '96x96';
    link1.href = apiData.images.station;
    if (oldLink1) {
        document.head.removeChild(oldLink1);
    }
    document.head.appendChild(link1);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    var link2 = document.createElement('link'),
        oldLink2 = document.getElementById('dynamic-webapp-2');
    link2.id = 'dynamic-webapp-2';
    link2.rel = 'icon';
    link2.type = 'image/png';
    link2.size = '32x32';
    link2.href = apiData.images.station;
    if (oldLink2) {
        document.head.removeChild(oldLink2);
    }
    document.head.appendChild(link2);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    var link4 = document.createElement('meta'),
        oldLink4 = document.getElementById('dynamic-webapp-4');
    link4.id = 'dynamic-webapp-4';
    link4.name = 'theme-color';
    link4.content = '#' + color;
    if (oldLink3) {
        document.head.removeChild(oldLink4);
    }
    document.head.appendChild(link4);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    var link3 = document.createElement('link'),
        oldLink3 = document.getElementById('dynamic-webapp-3');
    link3.id = 'dynamic-webapp-3';
    link3.rel = 'apple-touch-icon';
    link3.size = '180x180';
    link3.href = apiData.images.station;
    if (oldLink3) {
        document.head.removeChild(oldLink3);
    }
    document.head.appendChild(link3);
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