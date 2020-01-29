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

$(
    function () {
        let aud = $('audio')[0];
        aud.src = 'https://stream.laut.fm/' + station;
        aud.title = sender + ' - LIVE';
        $('.playbtn').on('click', function () {
            if (aud.paused) {
                aud.play();
                $('.play-pause').removeClass('fa-play');
                $('.play-pause').addClass('fa-stop');
            } else {
                aud.pause();
                $('.play-pause').removeClass('fa-stop');
                $('.play-pause').addClass('fa-play');
            }

        })
    })