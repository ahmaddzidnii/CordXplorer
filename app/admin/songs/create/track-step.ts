export const isValidStep = (step: string): boolean => {
  switch (step) {
    case "1":
    case undefined:
    case "":
    case null:
      return true;
    case "2":
      return true;
    default:
      return false;
  }
};
