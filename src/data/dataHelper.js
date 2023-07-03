import puzzlesJSON from './puzzles.json';

export function getLaunchText(date) {
  return puzzlesJSON[date].text?puzzlesJSON[date].text:"Sorry, no daily puzzles available";
}
export function getPuzzles(date) {
  return puzzlesJSON[date].puzzles?puzzlesJSON[date].puzzles:{};
}