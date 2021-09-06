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

function handleApiError(_function) {
    try{
        _function;
    } catch (e) {
        console.error(e);
    }
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
    $("#station_logo").attr('src', apiData.images.station_640x640 || apiData.images.station_120x120);
    $("#station_displayname").html(apiData.display_name);
    $("#station_slogan").html(apiData.format);
    $("#station_description").html(apiData.description);
    handleApiError(apiData.third_parties.website ? $("#hp-link").attr('href', apiData.third_parties.website.url) : $("#hp-link").hide());
    handleApiError(apiData.page_url ? $("#lfm-link").attr('href', apiData.page_url) : $("#lfm-link").hide());
    handleApiError(apiData.third_parties.rss ? $("#rss-link").attr('href', apiData.third_parties.rss.url) : $("#rss-link").hide());
    handleApiError(apiData.third_parties.facebook ? $("#fb-link").attr('href', apiData.third_parties.facebook.page) : $("#fb-link").hide());
    handleApiError(apiData.third_parties.twitter ? $("#tw-link").attr('href', "https://twitter.com/" + apiData.third_parties.twitter.name) : $("#tw-link").hide());
    handleApiError(apiData.third_parties.instagram ? $("#ig-link").attr('href', "https://instagram.com/" + apiData.third_parties.instagram.name) : $("#ig-link").hide());
    handleApiError(apiData.third_parties.radiode ? $("#radiode-link").attr('href', apiData.third_parties.radiode.url): $("#radiode-link").hide());
    handleApiError(apiData.third_parties.phonostar ? $("#phonostar-link").attr('href', apiData.third_parties.phonostar.url) : $("#phonostar-link").hide());
    handleApiError(apiData.third_parties.tunein ? $("#tunein-link").attr('href', apiData.third_parties.tunein.url) : $("#tunein-link").hide());
    handleApiError($("#m3u-link").attr('href', apiData.stream_url + ".m3u"));
    handleApiError($("#pls-link").attr('href', apiData.stream_url + ".pls"));
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
    let link = document.createElement('link'),
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
    let link1 = document.createElement('link'),
        oldLink1 = document.getElementById('dynamic-webapp-1');
    link1.id = 'dynamic-webapp-1';
    link1.rel = 'icon';
    link1.type = 'image/png';
    link1.size = '96x96';
    link1.href = apiData.images.station_120x120;
    if (oldLink1) {
        document.head.removeChild(oldLink1);
    }
    document.head.appendChild(link1);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    let link2 = document.createElement('link'),
        oldLink2 = document.getElementById('dynamic-webapp-2');
    link2.id = 'dynamic-webapp-2';
    link2.rel = 'icon';
    link2.type = 'image/png';
    link2.size = '32x32';
    link2.href = apiData.images.station_80x80;
    if (oldLink2) {
        document.head.removeChild(oldLink2);
    }
    document.head.appendChild(link2);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    let link3 = document.createElement('meta'),
        oldLink3 = document.getElementById('dynamic-webapp-3');
    link3.id = 'dynamic-webapp-3';
    link3.name = 'theme-color';
    link3.content = '#' + color;
    if (oldLink3) {
        document.head.removeChild(oldLink3);
    }
    document.head.appendChild(link3);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    let link4 = document.createElement('link'),
        oldLink4 = document.getElementById('dynamic-webapp-4');
    link4.id = 'dynamic-webapp-4';
    link4.rel = 'apple-touch-icon';
    link4.size = '180x180';
    link4.href = apiData.images.station;
    if (oldLink4) {
        document.head.removeChild(oldLink4);
    }
    document.head.appendChild(link4);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    let link5 = document.createElement('meta'),
        oldLink5 = document.getElementById('dynamic-webapp-5');
    link5.id = 'dynamic-webapp-5';
    link5.name = 'msapplication-TileColor';
    link5.content = '#' + color;
    if (oldLink5) {
        document.head.removeChild(oldLink5);
    }
    document.head.appendChild(link5);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    let link6 = document.createElement('meta'),
        oldLink6 = document.getElementById('dynamic-webapp-6');
    link6.id = 'dynamic-webapp-6';
    link6.name = 'msapplication-TileImage';
    link6.content = apiData.images.station;
    if (oldLink6) {
        document.head.removeChild(oldLink6);
    }
    document.head.appendChild(link6);

    document.head || (document.head = document.getElementsByTagName('head')[0]);
    let link7 = document.createElement('link'),
        oldLink7 = document.getElementById('dynamic-webapp-7');
    link7.id = 'dynamic-webapp-7';
    link7.rel = 'shortcut icon';
    link7.sizes = '1024x1024';
    link7.href = apiData.images.station_640x640;
    if (oldLink7) {
        document.head.removeChild(oldLink7);
    }
    document.head.appendChild(link7);
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
    let wrapper = $("#nowplaying").width();
    let playing = $("#api_lfm_display_name").width() + $("#nowplaying span").width();
    $("#api_lfm_current_song1").width(wrapper - playing);
}

function audiobtn(autoplay, station) {
    let aud = $('audio')[0];
    aud.src = 'https://stream.laut.fm/' + station;
    aud.title = sender + ' - LIVE';
    if (autoplay) {
        aud.play();
        $('.play-pause').removeClass('fa-play').addClass('fa-stop');
        $('.icon.audio').removeClass('hidden');
    }
    $('.playbtn').on('click', function () {
        if (aud.paused) {
            aud.play();
            $('.play-pause').removeClass('fa-play').addClass('fa-stop');
            $('.icon.audio').removeClass('hidden');


        } else {
            aud.pause();
            $('.play-pause').removeClass('fa-stop').addClass('fa-play');
            $('.icon.audio').addClass('hidden');
        }

    })
    $('.mutebtn').on('click', function(){
        if (aud.muted == false) {
            aud.muted = true;
            $('.mute-unmute').removeClass('fa-volume-up');
            $('.mute-unmute').addClass('fa-volume-mute');
            $('.mute-unmute').addClass('muted');
        }
        else {
            aud.muted = false;
            $('.mute-unmute').removeClass('fa-volume-mute');
            $('.mute-unmute').removeClass('muted');
            $('.mute-unmute').addClass('fa-volume-up');
        }
    })
}

window.setInterval(CheckPlayerState, 5000);

function CheckPlayerState() {
    let aud = $('audio')[0];
    if (aud.paused) {
    } else {
        updateMetadata();
    }
}

function updateMetadata() {
    $.getJSON("https://api.laut.fm/station/" + station + "/current_song", function (current) {
        let npartist = current.artist.name;
        let nptitle = current.title;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: nptitle,
            artist: npartist,
        });
        $.getJSON("https://api.laut.fm/station/" + station , function (apiData) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: nptitle,
                artist: npartist,
                 album: apiData.display_name.toUpperCase(),
                 artwork: [
                 {src: apiData.images.station_80x80, sizes: "80x80"},
                 {src: apiData.images.station_120x120, sizes: "120x120"},
                 {src: apiData.images.station_640x640, sizes: "640x640"}
                ]
            });
        })
    })
}