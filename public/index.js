// Functions called from index.html
function canvasLoaded() {
    console.log("Canvas loaded");
}
function renderFrame() {
    var frame = document.getElementById("frame");
    // If canvas found begin
    if (frame) {
        var render_context = frame.getContext('2d');
        render_context.fillStyle = "#000000";
        render_context === null || render_context === void 0 ? void 0 : render_context.fillRect(0, 0, frame.width, frame.height);
    }
    console.log("Rendering frame...");
    console.log("Rendered!");
}
