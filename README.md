# Mental Math

Mental Math is a browser app for practising mental arithmetic by ear, built for children doing abacus or mental-math training at home. Instead of showing a column of numbers, it plays recorded voice clips that read out a sequence of two-digit numbers, some of them negative, one after another with a configurable pause; the student keeps the running total in their head and types the final answer. Each session is timed and scored, the latest session is shown as a report with every sum and answer, and a "Weakness" screen collects the sums the student has got wrong before so they can be practised again. It is a single-page React 16 app made with Create React App and Material-UI, keeps all settings and history in the browser's `localStorage`, and is served from GitHub Pages. It was built between March and May 2020 for home use and has not been developed since.

> Personal project from 2020. Not actively maintained.

**Live demo:** https://www.rach.im/mental-math/

## Features

- Number sequences read aloud from recorded audio clips (`public/audio/1.wav` to `99.wav`, plus `minus.mp3` for negative numbers)
- Numbers are two-digit (10 to 98), about 30% are negative, round numbers and repeated digits (11, 22, …) are skipped, and the running total never drops to zero or below
- Settings for student name, number of sums per session, numbers per sum and the pause between numbers (in milliseconds)
- A timer and a Recharts progress ring during the session
- A report of the latest session: date, number of sums and questions, duration, score and a table of every sum with the given answer and time taken
- A "Weakness" screen that groups previously wrong sums by how often they were missed and lets the student practise them again
- Settings and history saved in `localStorage`, so no account or server is needed
- Works in iOS Safari

## Tech stack

React 16 · Material-UI 4 · Recharts · Moment.js · Create React App (react-scripts 3) · GitHub Pages

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
npm start          # dev server on http://localhost:3000
npm run build      # production build, then renames build/ to docs/ for GitHub Pages
```

The `build` script calls the `rename` command, so on Linux or macOS you may need to delete the old `docs/` folder and run `mv build docs` yourself instead.

## Project structure

```text
public/
  audio/                 number clips (1-99.wav) and minus.mp3
  index.html
src/
  App.js                 page switcher and side drawer (Home, Change Settings, View Report, Weakness)
  AppContext.js          settings, session history and weakness analysis in localStorage
  component/
    SetupScreen.js       settings form
    ExerciseScreen.js    question generator, audio playback, answer input, timer
    SoundContext.js      preloads the audio clips and plays a number sequence
    SummaryScreen.js     report of the latest session
    WeaknessScreen.js    list of frequently missed sums
docs/                    built site served by GitHub Pages
```

## How it works

1. On first visit the settings screen is shown; saving writes a `config` object to `localStorage`.
2. A session generates all sums up front. Pressing "Click To Begin Session" plays the first sum's numbers, each after the configured pause; a negative number plays `minus.mp3` followed by the number clip.
3. When the student submits an answer, the time taken is recorded and the next sum is played.
4. At the end the session (sums, answers, times, total duration) is appended to `sessions` in `localStorage` and the report opens.
5. The Weakness screen scans the stored sessions for wrong answers, groups them by the exact number sequence, and sorts them by how often each was missed.
