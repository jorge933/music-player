export function formatISODuration(duration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex) as RegExpMatchArray;

  if (!matches) return 0;

  const [
    ,
    hoursInString = "0",
    minutesInStringInString = "0",
    secondsInString = "0",
  ] = matches;

  const hours = parseInt(hoursInString, 10);
  const minutes = parseInt(minutesInStringInString, 10);
  const seconds = parseInt(secondsInString, 10);

  return hours * 3600 + minutes * 60 + seconds;
}
