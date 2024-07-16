/**
 *
 * Array of private routes
 * @type {String[]}
 **/
export const privateRoutes = ["/settings", "/admin/(.*)"];

/**
 *
 * Array of auth routes
 * @type {String[]}
 */

export const authRoutes = ["/auth/login", "/auth/logout", "/auth/callback"];

/**
 * prefix for api routes
 * @type {String}
 * **/

export const apiAuthPrefix = "/api/auth";

/**
 * default login redirect
 * @type {String}
 * **/
export const DEFAULT_LOGIN_REDIRECT = "/settings";
