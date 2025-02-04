export function formatSecondsToPlaylistDuration(total: number) {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  let text = "";

  if (hours >= 1) text += `${hours}h`;
  if (minutes >= 1) text += ` ${minutes}min`;
  if (seconds >= 1 && hours < 1) text += ` ${seconds}s`;

  return text;
}
