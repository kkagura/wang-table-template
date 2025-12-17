export function getSizeValue(size: number | string) {
  if (typeof size === "number") {
    return size + "px";
  }
  return size;
}
