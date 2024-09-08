/**
 * Converts a given time in seconds to a military time format (HH:MM:SS).
 *
 * @param second The time in seconds.
 * @returns {string} The time in military format (HH:MM:SS).
 *
 * @example
 * convertTimeToMilitary(213); // Returns "03:33"
 */

export const convertTimeToMilitary = (second: number): string => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = second % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
};
