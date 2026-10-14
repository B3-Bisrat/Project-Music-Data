import assert from "node:assert";
import test from "node:test";
import { findLongestSongStreak } from "./musicUtils.mjs";

test("Finds the longest consecutive song streak", () => {
  const listenEvents = [
    { song_id: "song-1" },
    { song_id: "song-1" },
    { song_id: "song-2" },
    { song_id: "song-2" },
    { song_id: "song-2" },
    { song_id: "song-1" },
  ];

  const result = findLongestSongStreak(listenEvents);

  assert.deepEqual(result, {
    songID: "song-2",
    count: 3,
  });
});

test("Returns no streak when there are no listening events", () => {
  const listenEvents = [];

  const result = findLongestSongStreak(listenEvents);

  assert.deepEqual(result, {
    songID: null,
    count: 0,
  });
});
