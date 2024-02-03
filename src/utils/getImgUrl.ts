import { imgBasePaths } from "../../generate";

export function getImgUrl(str: (typeof imgBasePaths)[number]) {
  return new URL(`../assets/imgs/${str}`, import.meta.url).href;
}
