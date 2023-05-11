export function getImgUrl(str: string) {
  return new URL(`../assets/imgs/${str}`, import.meta.url).href;
}
