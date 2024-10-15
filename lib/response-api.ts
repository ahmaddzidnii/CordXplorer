export class ApiResponse {
  static success<T>(data: T, message: string = "Success") {
    return {
      error: false,
      msg: message,
      data,
    };
  }

  static error(message: string) {
    return {
      error: true,
      msg: message,
      data: null,
    };
  }
}
