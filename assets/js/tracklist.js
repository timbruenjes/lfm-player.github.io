function appendTemplate(append_selector, track_nr, artist, title, jingle = false) {
    let appended = $(append_selector).append(
        $("#song_detailed").html()
            .replace("{{track_nr}}", track_nr)
            .replace("{{artist}}", artist)
            .replace("{{title}}", title)
    );
    appended.find('[title*="{{artist}}"]').each(function () {
        $(this).attr("title", artist)
    });
    appended.find('[data-content*="{{title}}"]').each(function () {
        if (jingle) {
            title += "<br /><span class=\"badge badge-pill badge-info\">Jingle</span>";
        } else {
            title += "<br /><span class=\"badge badge-pill badge-danger\">Musik</span>";
        }
        $(this).attr("data-content", title)
    })
}

function prependTemplate(prepend_selector, track_nr, artist, title, jingle = false) {
    let prepended = $(prepend_selector).prepend(
        $("#song_detailed").html()
            .replace("{{track_nr}}", track_nr)
            .replace("{{artist}}", artist)
            .replace("{{title}}", title)
    );
    prepended.find('[title*="{{artist}}"]').each(function () {
        $(this).attr("title", artist)
    });
    prepended.find('[data-content*="{{title}}"]').each(function () {
        if (jingle) {
            title += "<br /><span class=\"badge badge-pill badge-info\">Jingle</span>";
        } else {
            title += "<br /><span class=\"badge badge-pill badge-danger\">Musik</span>";
        }
        $(this).attr("data-content", title)
    })
}

function getItunesUrl(song, artist, german) {
    let url = "https://itunes.apple.com/search?term=" + encodeURIComponent(artist) + "+" + encodeURIComponent(song) + "&entity=album&entity=musicArtist&entity=musicTrack&limit=1";
    if (german) {
        url = url + "&country=de"
    }
    return url;
}


function load_last_songs_fully(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name + "/last_songs", function (full_data) {
        last_song_data_cache = full_data.slice(0);
        full_data.shift();
        for (const [key, value] of Object.entries(full_data)) {
            appendTemplate("#song_row", parseInt(key, 10) + 1, value.artist.name, value.title, value.type === "jingle");
        }
    });
    $('[data-toggle="popover"]').popover({
        trigger: 'focus',
        html: true
    })
}

function load_last_song(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name + "/last_songs", function (part_data) {
        if (JSON.stringify(last_song_data_cache) !== JSON.stringify(part_data)) {
            last_song_data_cache = part_data.slice(0);
            part_data.shift();
            $("#song_row div.col-md-4:last-child").remove();
            $("#song_row").children().each(function () {
                $(".track_nr", this).text(parseInt($(".track_nr", this).text(), 10) + 1);
            });
            prependTemplate("#song_row", 1, part_data[0].artist.name, part_data[0].title, part_data[0].type === "jingle");

        }
    });
    $('[data-toggle="popover"]').popover({
        trigger: 'focus',
        html: true
    })
}