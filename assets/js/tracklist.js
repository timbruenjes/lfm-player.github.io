function appendTemplate(append_selector, track_nr, artist, title, jingle = false, cover = false) {
    let template;
    !cover ? template = "#song_detailed" : template = "#song_detailed_cover";
    let appended = $(append_selector).append(
        $(template).html()
            .replace("{{track_nr}}", track_nr)
            .replace("{{artist}}", artist)
            .replace("{{title}}", title)
    );
    !cover ? void .0 : appended.find('[src*="{{cover}}"]').each(function () {
        $(this).attr("src", cover);
    });
    replaceInPopover(appended, {artist: artist, title: title, jingle: jingle});
}

function prependTemplate(prepend_selector, track_nr, artist, title, jingle = false, cover = false) {
    let template;
    !cover ? template = "#song_detailed" : template = "#song_detailed_cover";
    let prepended = $(prepend_selector).prepend(
        $(template).html()
            .replace("{{track_nr}}", track_nr)
            .replace("{{artist}}", artist)
            .replace("{{title}}", title)
    );
    !cover ? void .0 : prepended.find('[src*="{{cover}}"]').each(function () {
        $(this).attr("src", cover)
    });
    replaceInPopover(prepended, {artist: artist, title: title, jingle: jingle});
}

function replaceInPopover(DOMElement, data) {
    DOMElement.find('[title*="{{artist}}"]').each(function () {
        $(this).attr("title", data.artist)
    });
    DOMElement.find('[data-content*="{{title}}"]').each(function () {
        badges && (data.jingle ? data.title += '<br /><span class="badge badge-pill badge-info">Jingle</span>' : data.title += '<br /><span class="badge badge-pill badge-danger">Musik</span>');
        $(this).attr("data-content", data.title)
    });
}

function getItunesUrl(song, artist) {
    return "https://itunes.apple.com/search?term=" + encodeURIComponent(artist) + "+" + encodeURIComponent(song) + "&entity=album&entity=musicArtist&entity=musicTrack&limit=1";
}

function getImageUrl(url, width, height) {
    let imageUrl = url.substring(0, url.lastIndexOf('/')) + '/' + width + "x" + height + ".jpg";
    return imageUrl.replace(/^(http):\/\//gi, "https://")
}

function load_last_songs_fully(station_name) {
    $.getJSON("https://api.laut.fm/station/" + station_name + "/last_songs", function (full_data) {
        last_song_data_cache = full_data.slice(0);
        full_data.shift();
        for (const [key, value] of Object.entries(full_data)) {
            if (cover) {
                $.getJSON(getItunesUrl(value.artist.name, value.title), function (iTunesData) {
                    let img_url;
                    iTunesData.resultCount === 0 ? img_url = $("#station_logo").attr('src') : img_url = getImageUrl(iTunesData.results[0].artworkUrl100, 70, 70);
                    appendTemplate("#song_row", parseInt(key, 10) + 1, value.artist.name, value.title, value.type === "jingle", img_url);
                }).fail(function () {
                    appendTemplate("#song_row", parseInt(key, 10) + 1, value.artist.name, value.title, value.type === "jingle", $("#station_logo").attr('src'));
                });
            } else {
                appendTemplate("#song_row", parseInt(key, 10) + 1, value.artist.name, value.title, value.type === "jingle");
            }
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
            !cover && $("#song_row").children().each(function () {
                $(".track_nr", this).text(parseInt($(".track_nr", this).text(), 10) + 1);
            });
            if (cover) {
                $.getJSON(getItunesUrl(part_data[0].artist.name, part_data[0].title), function (iTunesData) {
                    let img_url;
                    iTunesData.resultCount === 0 ? img_url = $("#station_logo").attr('src') : img_url = getImageUrl(iTunesData.results[0].artworkUrl100, 70, 70);
                    prependTemplate("#song_row", 1, part_data[0].artist.name, part_data[0].title, part_data[0].type === "jingle", img_url);
                }).fail(function () {
                    prependTemplate("#song_row", 1, part_data[0].artist.name, part_data[0].title, part_data[0].type === "jingle", $("#station_logo").attr('src'));
                });
            } else {
                prependTemplate("#song_row", 1, part_data[0].artist.name, part_data[0].title, part_data[0].type === "jingle");
            }

        }
    });

    $('[data-toggle="popover"]').popover({
        trigger: 'focus',
        html: true
    })
}