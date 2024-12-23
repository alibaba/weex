export class PreRenderUrl {
  url: string;
  keepLive: boolean;  // 预渲染实例是否保持存活不受页面回退影响
  backFreeRender: boolean = false;  // 是否回退重新预渲染

  constructor(url: string, keepLive: boolean, backFreeRender: boolean) {
    this.url = url;
    this.keepLive = keepLive;
    this.backFreeRender = backFreeRender;
  }
}