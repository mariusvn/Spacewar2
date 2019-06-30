

export default class Game {
    constructor () {
        this.app = new PIXI.Application({
            width: document.body.scrollWidth,
            height: window.innerHeight,
            antialias: true
        });
        document.body.appendChild(this.app.view);
        this.app.view.style.position = "absolute";
        this.app.view.style.display = "block";
        this.app.view.style.width = window.innerWidth + "px";
        this.app.view.style.height = window.innerHeight + "px";
        window.onresize = this.onResizeViewport;
    }

    onResizeViewport = () => {
        this.app.view.style.width = window.innerWidth + "px";
        this.app.view.style.height = window.innerHeight + "px";
    }
}