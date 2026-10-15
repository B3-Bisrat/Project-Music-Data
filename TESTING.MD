# Testing

This file explains how each rubric point was tested.

To run the unit tests:

```bash
npm install
npm test
```

To test the website by hand, serve the folder over HTTP (opening `index.html` directly may not work with modules):

```bash
npx http-server
```

Open the local URL provided by the server in your browser.

## Rubric points

| **Rubric point**                                                   | **How it was tested**                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The website displays the Music Data Explorer title                 | Manual test: opened the page and checked that the heading displays "Music Data Explorer".                                                                                                                                                                                   |
| The website contains a drop-down listing users                     | Manual test: opened the drop-down and checked that the users are listed.                                                                                                                                                                                                    |
| Selecting a user displays their listening data                     | Manual test: selected different users and checked that the results update for the selected user.                                                                                                                                                                            |
| The total number of listening events is displayed                  | Manual test: selected a user and checked the total listening events displayed.                                                                                                                                                                                              |
| The most listened song is displayed                                | Manual test: checked the displayed song and listen count against the selected user's listening data.                                                                                                                                                                        |
| The most listened artist is displayed                              | Manual test: checked the displayed artist and listen count against the selected user's listening data.                                                                                                                                                                      |
| The most listened song on Friday night is displayed                | Manual test: checked the displayed song against the selected user's Friday-night listening events.                                                                                                                                                                          |
| The song with the most listening time is displayed                 | Manual test: checked the displayed song and listening time against the listening data and song durations.                                                                                                                                                                   |
| The artist with the most listening time is displayed               | Manual test: checked the displayed artist and listening time against the listening data and song durations.                                                                                                                                                                 |
| The song with the most listening time on Friday night is displayed | Manual test: checked the result against Friday-night listening events and song durations.                                                                                                                                                                                   |
| The longest consecutive song streak is displayed                   | Unit tests in `musicUtils.test.mjs` test `findLongestSongStreak`. Manual test: checked the displayed song and number of consecutive listens.                                                                                                                                |
| Songs listened to every day are displayed                          | Manual test: checked the displayed songs against the listening dates for the selected user.                                                                                                                                                                                 |
| The top three genres are displayed                                 | Manual test: checked the displayed genres and listen counts against the selected user's listening data.                                                                                                                                                                     |
| A message is displayed when a user has no listening data           | Manual test: selected a user with no listening events and checked that an appropriate message appears.                                                                                                                                                                      |
| Lighthouse accessibility score                                     | Manual test: ran Lighthouse in Chrome DevTools using Desktop mode and checked the Accessibility score on the required views. Verified that the Accessibility score was 100% on both views: the initial page with no user selected and a user with listening data displayed. |
| Unit tests for at least one non-trivial function                   | Unit tests in `musicUtils.test.mjs` test `findLongestSongStreak`.                                                                                                                                                                                                           |
| No dead code                                                       | Reviewed `script.mjs`, `musicUtils.mjs`, `data.mjs`, `index.html` and the test files for unused code.                                                                                                                                                                       |
