// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyObject = (obj: any): boolean => {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return true;
  }

  return Object.values(obj).every(
    (value) =>
      value === '' || // Check for empty string
      (Array.isArray(value) && value.length === 0) || // Check for empty array
      (typeof value === 'object' && value !== null && isEmptyObject(value)),
  );
};
