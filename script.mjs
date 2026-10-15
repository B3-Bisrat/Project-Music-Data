import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import {
  countListens,
  findMostListenedSong,
  findMostListenedArtist,
  findMostListenedSongOnFridayNight,
  countListeningTime,
  findMostListenedSongByTime,
  countArtistListeningTime,
  findMostListenedArtistByTime,
  findMostListenedSongByTimeOnFridayNight,
  findLongestSongStreak,
  findSongsListenedToEveryDay,
  findTopGenres,
} from "./musicUtils.mjs";

window.onload = function () {
  const userSelect = document.querySelector("#user-select");
  const results = document.querySelector("#results");
  const userIDs = getUserIDs();

  for (const userID of userIDs) {
    const option = document.createElement("option");

    option.value = userID;
    option.textContent = `User ${userID}`;

    userSelect.appendChild(option);
  }

  userSelect.addEventListener("change", function () {
    const selectedUserID = userSelect.value;
    const listenEvents = getListenEvents(selectedUserID);

    if (listenEvents.length === 0) {
      results.innerHTML = `
        <h2>User ${selectedUserID}</h2>
        <p>This user didn't listen to any song.</p>
      `;
      return;
    }

    const songCounts = countListens(listenEvents);

    const mostListenedSong = findMostListenedSong(songCounts);

    const mostListenedArtist = findMostListenedArtist(listenEvents, getSong);

    const fridayNightSong = findMostListenedSongOnFridayNight(listenEvents);

    const fridayNightSongByTime = findMostListenedSongByTimeOnFridayNight(
      listenEvents,
      getSong,
    );

    const fridaySong = fridayNightSong.songID
      ? getSong(fridayNightSong.songID)
      : null;

    const fridaySongByTime = fridayNightSongByTime.songID
      ? getSong(fridayNightSongByTime.songID)
      : null;

    const listeningTimes = countListeningTime(listenEvents, getSong);
    const mostListenedSongByTime = findMostListenedSongByTime(listeningTimes);

    const longestListeningSong = getSong(mostListenedSongByTime.songID);

    const artistTimes = countArtistListeningTime(listenEvents, getSong);
    const mostListenedArtistByTime = findMostListenedArtistByTime(artistTimes);

    const longestStreak = findLongestSongStreak(listenEvents);
    const streakSong = longestStreak.songID
      ? getSong(longestStreak.songID)
      : null;

    const dailySongs = findSongsListenedToEveryDay(listenEvents);

    const topGenres = findTopGenres(listenEvents, getSong);

    const song = getSong(mostListenedSong.songID);

    results.innerHTML = `
      <h2>User ${selectedUserID}</h2>
      <p>Total listening events: ${listenEvents.length}</p>
      <h3>Most listened song</h3>
      <p>Title: ${song.title}</p>
      <p>Artist: ${song.artist}</p>
      <p>Genre: ${song.genre}</p>
      <p>Number of listens: ${mostListenedSong.count}</p>

      <h3>Most listened artist</h3>
      <p>Artist: ${mostListenedArtist.artist}</p>
      <p>Number of listens: ${mostListenedArtist.count}</p>

      ${
        fridaySong
          ? `
            <h3>Most listened song on Friday night</h3>
            <p>Title: ${fridaySong.title}</p>
            <p>Artist: ${fridaySong.artist}</p>
            <p>Number of listens: ${fridayNightSong.count}</p>
          `
          : ""
      }

      ${
        fridaySongByTime
          ? `
            <h3>Song with the most listening time on Friday night</h3>
            <p>Title: ${fridaySongByTime.title}</p>
            <p>Artist: ${fridaySongByTime.artist}</p>
            <p>Total listening time: ${fridayNightSongByTime.time} seconds</p>
          `
          : ""
      }

      <h3>Song with the most listening time</h3>
      <p>Title: ${longestListeningSong.title}</p>
      <p>Artist: ${longestListeningSong.artist}</p>
      <p>Total listening time: ${mostListenedSongByTime.time} seconds</p>

      <h3>Artist with the most listening time</h3>
      <p>Artist: ${mostListenedArtistByTime.artist}</p>
      <p>Total listening time: ${mostListenedArtistByTime.time} seconds</p>

      ${
        streakSong
          ? `
            <h3>Longest consecutive song streak</h3>
            <p>Title: ${streakSong.title}</p>
            <p>Artist: ${streakSong.artist}</p>
            <p>Consecutive listens: ${longestStreak.count}</p>
          `
          : ""
      }

      ${
        dailySongs.length > 0
          ? `
            <h3>Songs listened to every day</h3>
            <ul>
              ${dailySongs
                .map(function (songID) {
                  const song = getSong(songID);
                  return `<li>${song.title} — ${song.artist}</li>`;
                })
                .join("")}
            </ul>
          `
          : ""
      }
      
      ${
        topGenres.length > 0
          ? `
            <h3>Top genres</h3>
            <ol>
              ${topGenres
                .map(function (genreEntry) {
                  return `<li>${genreEntry[0]} — ${genreEntry[1]} listens</li>`;
                })
                .join("")}
            </ol>
          `
          : ""
      }
      
    `;
  });
};
