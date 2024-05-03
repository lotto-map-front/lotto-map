function formatTime(time: string | number) {
  // if (typeof time !== 'string') {
  //   time = String(time);
  // }
  // const hours = time.substring(0, 2);
  // const minutes = time.substring(2);
  // return `${hours}:${minutes}`;

  // Right Code for ES-Lint rule
  const timeStr = typeof time === 'string' ? time : String(time);
  const hours = timeStr.substring(0, 2);
  const minutes = timeStr.substring(2);
  return `${hours}:${minutes}`;
}

export { formatTime };
