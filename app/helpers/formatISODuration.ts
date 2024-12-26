export function formatISODurationToSeconds(duration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [
    ,
    hoursInString = "0",
    minutesInStringInString = "0",
    secondsInString = "0",
  ] = duration.match(regex) as RegExpMatchArray;

  const hours = parseInt(hoursInString, 10);
  const minutes = parseInt(minutesInStringInString, 10);
  const seconds = parseInt(secondsInString, 10);

  return hours * 3600 + minutes * 60 + seconds;
}
