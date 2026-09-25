# Mental Math

A browser app for practising mental arithmetic by listening. It reads numbers out loud one at a time, the student adds them up in their head, then types the answer. Useful for abacus and mental-math training.

**Live demo:** https://www.rach.im/mental-math/

## Features

- Number sequences read aloud from recorded audio clips
- Settings for student name, number of sums, questions per sum and the pause between numbers
- A summary report of past sessions with charts (Recharts)
- A "Weakness" screen that finds the questions the student gets wrong and lets them practise those again
- Settings and history are saved in `localStorage`, so no account is needed
- Works on iOS Safari

## Tech stack

React 16 · Material-UI · Recharts · Create React App

## Development

```bash
npm install
npm start          # dev server
npm run build      # production build, output renamed to docs/ for GitHub Pages
```
