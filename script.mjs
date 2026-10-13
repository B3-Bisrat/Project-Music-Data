import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import {
  countListens,
  findMostListenedSong,
  findMostListenedArtist,
  findMostListenedSongOnFridayNight,
  countListeningTime,
  findMostListenedSongByTime,
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

    const songCounts = countListens(listenEvents);
    console.log(songCounts);

    const mostListenedSong = findMostListenedSong(songCounts);
    console.log(mostListenedSong);

    const mostListenedArtist = findMostListenedArtist(listenEvents, getSong);
    console.log(mostListenedArtist);

    const fridayNightSong = findMostListenedSongOnFridayNight(
      listenEvents,
      getSong,
    );
    console.log(fridayNightSong);
    const fridaySong = getSong(fridayNightSong.songID);

    const listeningTimes = countListeningTime(listenEvents, getSong);
    const mostListenedSongByTime = findMostListenedSongByTime(listeningTimes);
    console.log(mostListenedSongByTime);
    const longestListeningSong = getSong(mostListenedSongByTime.songID);

    const song = getSong(mostListenedSong.songID);
    console.log(song);

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

      <h3>Most listened song on Friday night</h3>
      <p>Title: ${fridaySong.title}</p>
      <p>Artist: ${fridaySong.artist}</p>
      <p>Number of listens: ${fridayNightSong.count}</p>

      <h3>Song with the most listening time</h3>
      <p>Title: ${longestListeningSong.title}</p>
      <p>Artist: ${longestListeningSong.artist}</p>
      <p>Total listening time: ${mostListenedSongByTime.time} seconds</p>
    `;
  });
};
