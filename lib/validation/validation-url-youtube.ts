/**
 * This function is used to check if the URL is a valid YouTube URL
 * @param {string} url - The URL to be checked
 * @returns {boolean}
 */

export function isValidYouTubeUrl(url: string): boolean {
  if (typeof url !== "string") return false;

  // Pola regex untuk URL YouTube
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}(&\S*)?$/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}(\?\S*)?$/,
    /^(https?:\/\/)?youtu\.be\/[\w-]{11}(\?\S*)?$/,
  ];

  // Cek apakah URL cocok dengan salah satu pola
  const isMatch = patterns.some((pattern) => pattern.test(url));

  if (!isMatch) return false;

  // Ekstrak ID video
  let videoId: string | null | undefined = null;
  try {
    const urlObj = new URL(url);
    if (url.includes("youtube.com/watch")) {
      videoId = urlObj.searchParams.get("v");
    } else if (url.includes("youtube.com/embed/")) {
      videoId = urlObj.pathname.split("/").pop();
    } else if (url.includes("youtu.be/")) {
      videoId = urlObj.pathname.split("/").pop();
    }
  } catch (error) {
    return false; // URL tidak valid
  }
  // Periksa apakah ID video valid (11 karakter)
  if (videoId?.length !== 11) return false;

  return true;
}
