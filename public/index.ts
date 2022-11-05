// Functions called from index.html
function canvasLoaded() {
    console.log("Canvas loaded")
}

function renderFrame() {
    let frame = document.getElementById("frame") as HTMLCanvasElement | null

    // If canvas found begin
    if(frame){
        const render_context = frame.getContext('2d') as CanvasRenderingContext2D
        render_context.fillStyle = "#000000"

        render_context?.fillRect(0, 0, frame.width, frame.height)
    }

    console.log("Rendering frame...")
    console.log("Rendered!")
}