export async function formattedDate(epochTime) {
  const date = new Date(epochTime);

  return date.toLocaleString('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
