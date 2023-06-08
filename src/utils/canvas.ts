import type { Ref } from "vue";

export const screenToCanvas = (x: number, y: number, canvas: any) => {
  return {
    x: x - canvas.value.width / 2,
    y: y - canvas.value.height / 2,
  };
};

export const clearCanvas = (
  canvas: Ref<any>,
  ctx: CanvasRenderingContext2D
) => {
  let width = canvas.value.width;
  let height = canvas.value.height;
  ctx!.clearRect(-width / 2, -height / 2, width, height);
};
