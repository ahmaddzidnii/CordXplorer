/**
 * Menentukan apakah tab saat ini aktif berdasarkan path.
 *
 * @param href href - Path dari tab yang diperiksa.
 * @param string currpath - Path saat ini.
 * @returns boolean - Mengembalikan true jika tab aktif, false jika tidak.
 *
 * @example
 * // Menentukan jika '/admin' adalah path saat ini
 * isActive('/admin', '/admin'); // true
 *
 * @example
 * // Menentukan jika '/admin/songs' adalah sub-path dari path saat ini
 * isActive('/admin/songs', '/admin/songs/123'); // true
 *
 * @example
 * // Menentukan jika '/admin' bukan sub-path dari path saat ini
 * isActive('/admin', '/admin/songs'); // false
 */
export const isActive = (href: string, currpath: string) => {
  if (href === "/admin") {
    return currpath === href;
  }
  return currpath.startsWith(href);
};
