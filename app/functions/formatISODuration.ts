export function formatISODuration(duration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    throw new Error("Formato de duração inválido");
  }

  const hours = parseInt((matches[1] || 0) as any, 10);
  const minutes = parseInt((matches[2] || 0) as any, 10);
  const seconds = parseInt((matches[3] || 0) as any, 10);

  return hours * 3600 + minutes * 60 + seconds;
}
