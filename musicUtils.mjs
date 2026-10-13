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

export function findMostListenedArtist(listenEvents, getSong) {
  const artistCounts = {};

  for (const event of listenEvents) {
    const song = getSong(event.song_id);
    const artist = song.artist;

    if (artistCounts[artist]) {
      artistCounts[artist] = artistCounts[artist] + 1;
    } else {
      artistCounts[artist] = 1;
    }
  }

  let mostListenedArtist = null;
  let highestCount = 0;

  for (const artist in artistCounts) {
    if (artistCounts[artist] > highestCount) {
      highestCount = artistCounts[artist];
      mostListenedArtist = artist;
    }
  }

  return {
    artist: mostListenedArtist,
    count: highestCount,
  };
}

export function isFridayNight(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDay();
  const hour = date.getHours();

  return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
}

export function findMostListenedSongOnFridayNight(listenEvents, getSong) {
  const fridayNightEvents = listenEvents.filter(function (event) {
    return isFridayNight(event.timestamp);
  });

  const songCounts = countListens(fridayNightEvents);

  return findMostListenedSong(songCounts);
}

export function countListeningTime(listenEvents, getSong) {
  const listeningTimes = {};

  for (const event of listenEvents) {
    const song = getSong(event.song_id);
    const songID = event.song_id;

    if (listeningTimes[songID]) {
      listeningTimes[songID] += song.duration_seconds;
    } else {
      listeningTimes[songID] = song.duration_seconds;
    }
  }

  return listeningTimes;
}

export function findMostListenedSongByTime(listeningTimes) {
  let mostListenedSongID = null;
  let longestTime = 0;

  for (const songID in listeningTimes) {
    if (listeningTimes[songID] > longestTime) {
      longestTime = listeningTimes[songID];
      mostListenedSongID = songID;
    }
  }

  return {
    songID: mostListenedSongID,
    time: longestTime,
  };
}

export function countArtistListeningTime(listenEvents, getSong) {
  const artistTimes = {};

  for (const event of listenEvents) {
    const song = getSong(event.song_id);
    const artist = song.artist;

    if (artistTimes[artist]) {
      artistTimes[artist] += song.duration_seconds;
    } else {
      artistTimes[artist] = song.duration_seconds;
    }
  }

  return artistTimes;
}

export function findMostListenedArtistByTime(artistTimes) {
  let mostListenedArtist = null;
  let longestTime = 0;

  for (const artist in artistTimes) {
    if (artistTimes[artist] > longestTime) {
      longestTime = artistTimes[artist];
      mostListenedArtist = artist;
    }
  }

  return {
    artist: mostListenedArtist,
    time: longestTime,
  };
}
