import { onMounted, onUnmounted, type Ref } from "vue";

export interface IDraggerOptions {
  onDragStart?: (event: MouseEvent) => void;
  onDrag?: (deltaX: number, deltaY: number, event: MouseEvent) => void;
  onDragEnd?: (event: MouseEvent) => void;
}

export function useDragger(
  elementRef: Ref<HTMLElement | undefined>,
  options: IDraggerOptions
) {
  function handleMouseDown(event: MouseEvent) {
    if (event.which !== 1) return;
    let lastX = event.clientX;
    let lastY = event.clientY;
    options.onDragStart?.(event);
    function handleMouseMove(event: MouseEvent) {
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      if (deltaX === 0 && deltaY === 0) {
        return;
      }
      options.onDrag?.(deltaX, deltaY, event);
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function handleMouseUp(event: MouseEvent) {
      options.onDragEnd?.(event);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseUp);
  }

  onMounted(() => {
    elementRef.value!.addEventListener("mousedown", handleMouseDown);
  });

  onUnmounted(() => {
    elementRef.value!.removeEventListener("mousedown", handleMouseDown);
  });
}
