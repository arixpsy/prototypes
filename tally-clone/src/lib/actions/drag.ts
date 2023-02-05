import type { ActionReturn } from "svelte/action";

type DragParameters = {};
type DragAttributes = {
  "on:dragstart": (e: CustomEvent<{ x: number; y: number }>) => void;
  "on:dragmove": (e: CustomEvent<{ dx: number; dy: number }>) => void;
  "on:dragend": (e: CustomEvent<{ x: number; y: number }>) => void;
};

export function drag(
  node: HTMLElement
): ActionReturn<DragParameters, DragAttributes> {
  let x: number;
  let y: number;

  function handleMousedown(event: TouchEvent | MouseEvent) {
    if (event instanceof TouchEvent) {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    node.dispatchEvent(
      new CustomEvent("dragstart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("touchmove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
    window.addEventListener("touchend", handleMouseup);
  }

  function handleMousemove(event: TouchEvent | MouseEvent) {
    let clientX = x;
    let clientY = y;

    if (event instanceof TouchEvent) {
      clientX = event.touches[0].pageX;
      clientY = event.touches[0].pageY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const dx = clientX - x;
    const dy = clientY - y;
    x = clientX;
    y = clientY;

    node.dispatchEvent(
      new CustomEvent("dragmove", {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseup(event: Event) {
    x = 0;
    y = 0;

    node.dispatchEvent(
      new CustomEvent("dragend", {
        detail: { x, y },
      })
    );

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("touchmove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
    window.removeEventListener("touchend", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);
  node.addEventListener("touchstart", handleMousedown, { passive: true });

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
      node.removeEventListener("touchstart", handleMousedown);
    },
  };
}
