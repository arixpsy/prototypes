import type { ActionReturn } from "svelte/action";

type LongpressParameters = {
  enabled: boolean;
  threshold: number;
};
type LongpressAttributes = {
  "on:longpress": () => void;
}

export function longpress(
  node: HTMLElement,
  { enabled = true, threshold = 500 }
): ActionReturn<LongpressParameters, LongpressAttributes> {
  const handleMousedown = () => {
    if (!enabled) return
    const start = Date.now();

    const timeout = setTimeout(() => {
      node.dispatchEvent(new CustomEvent("longpress"));
    }, threshold);

    const handleCancel = () => {
      clearTimeout(timeout);
      node.removeEventListener("mousemove", handleCancel);
      node.removeEventListener("touchmove", handleCancel);
      node.removeEventListener("mouseup", handleCancel);
      node.removeEventListener("touchend", handleCancel);
    };

    node.addEventListener("mousemove", handleCancel);
    node.addEventListener("touchmove", handleCancel);
    node.addEventListener("mouseup", handleCancel);
    node.addEventListener("touchend", handleCancel);
  };

  node.addEventListener("mousedown", handleMousedown);
  node.addEventListener("touchstart", handleMousedown, { passive: true });

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    },
  };
}
