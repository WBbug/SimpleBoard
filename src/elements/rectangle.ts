import { screenToCanvas } from "@/utils/canvas";
import type { Ref } from "vue";

export class Rectangle {
  constructor(opt: any, ctx: CanvasRenderingContext2D, canvas: Ref<any>) {
    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.width = opt.width || 0;
    this.height = opt.height || 0;
    this.ctx = ctx;
    this.canvas = canvas;
  }
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private ctx: CanvasRenderingContext2D;
  private canvas: Ref<any>;

  render() {
    this.ctx.beginPath();
    const truePosition = screenToCanvas(this.x, this.y, this.canvas);
    this.ctx.rect(truePosition.x, truePosition.y, this.width, this.height);
    this.ctx.stroke();
  }
}
