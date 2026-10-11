export function countListens(listenEvents) {
  const counts = {};

  for (const event of listenEvents) {
    const songID = event.song_id;

    if (counts[songID]) {
      counts[songID] = counts[songID] + 1;
    } else {
      counts[songID] = 1;
    }
  }

  return counts;
}

export function findMostListenedSong(songCounts) {
  let mostListenedSongID = null;
  let highestCount = 0;

  for (const songID in songCounts) {
    if (songCounts[songID] > highestCount) {
      highestCount = songCounts[songID];
      mostListenedSongID = songID;
    }
  }

  return {
    songID: mostListenedSongID,
    count: highestCount,
  };
}
