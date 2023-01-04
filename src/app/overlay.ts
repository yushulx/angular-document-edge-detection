export class OverlayManager {
    overlay: HTMLCanvasElement | undefined;
    context: CanvasRenderingContext2D | undefined;

    initOverlay(overlay: HTMLCanvasElement): void {
        this.overlay = overlay;
        this.context = this.overlay.getContext('2d') as CanvasRenderingContext2D;
    }

    updateOverlay(width: number, height: number): void {
        if (this.overlay) {
            this.overlay.width = width;
            this.overlay.height = height;
            this.clearOverlay();
        }
    }

    clearOverlay(): void {
        if (this.context && this.overlay) {
            this.context.clearRect(0, 0, this.overlay.width, this.overlay.height);
            this.context.strokeStyle = '#ff0000';
            this.context.lineWidth = 5;
        }
    }

    drawOverlay(points: any): void {
        if (this.context) {
            this.context.beginPath();
            this.context.moveTo(points[0].x, points[0].y);
            this.context.lineTo(points[1].x, points[1].y);
            this.context.lineTo(points[2].x, points[2].y);
            this.context.lineTo(points[3].x, points[3].y);
            this.context.lineTo(points[0].x, points[0].y);
            this.context.stroke();
        }
    }
}