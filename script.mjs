import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import { countListens, findMostListenedSong } from "./musicUtils.mjs";

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
    `;
  });
};
