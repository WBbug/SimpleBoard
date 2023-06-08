<template>
  <div class="container" ref="container">
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import type { BoardElement } from "../interface/basic";
import { Rectangle } from "../elements/rectangle";
import { clearCanvas } from "../utils/canvas";
import { onMounted, ref } from "vue";

const container = ref();
const canvas = ref()
let ctx: CanvasRenderingContext2D;

let activeElement: Rectangle | null = null;
let allElements: BoardElement[] = [];

const initCanvas = () => {
  let { width, height } = container.value.getBoundingClientRect();
  canvas.value.width = width;
  canvas.value.height = height;

  ctx = canvas.value.getContext("2d");
  if (ctx) {
    ctx.translate(width / 2, height / 2);
  }
};

const bindEvent = () => {
  canvas.value.addEventListener("mousedown", onMousedown);
  canvas.value.addEventListener("mousemove", onMousemove);
  canvas.value.addEventListener("mouseup", onMouseup);
};

let mousedownX = 0;
let mousedownY = 0;
let isMousedown = false;

const onMousedown = (event: MouseEvent) => {
  mousedownX = event.x;
  mousedownY = event.y;
  isMousedown = true;
};

const onMousemove = (event: MouseEvent) => {
  if (!isMousedown) {
    return;
  }

  if (activeElement) {
    activeElement.width = event.x - mousedownX;
    activeElement.height = event.y - mousedownY;
  } else {
    activeElement = new Rectangle({
      x: mousedownX,
      y: mousedownY,
    }, ctx, canvas);
    allElements.push(activeElement);
  }

  renderAllElements();

};
const onMouseup = (event: MouseEvent) => {
  isMousedown = false
  activeElement = null
};


const renderAllElements = () => {
  clearCanvas(canvas,ctx);
  allElements.forEach((element) => {
    element.render();
  });
}

onMounted(() => {
  initCanvas();
  bindEvent();
});

</script>

<style>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
