# lautfm Player
Dieser Pop-Up Player spielt das mittels `station` definierte Radio, zeigt die Trackhistorie, sowie Stations Informationen an.


### GET Parameter
| Get Parameter | Type | Default | Description |
|:---|:---:|:---:|:---|
| station | String | None | The laut.fm station name |
| color | String<br />*Hex color* | `1ed9b4` | An 3 or 6 digit Hex color code without the leading `#` |
| badges | Boolean | `true` | Set in the Track History the jingles and music get labels. |
| current_show | Boolean | `true` | Set if the current playlist should get displayed |
| next_show | Boolean | `true` | Set if the next playlist should get displayed |
| station_info | Boolean | `true` | Set if the whole station information should get displayed (Playlist included) |
| cover | Boolean | `false` | Exchanges the track number with the cover display. |

