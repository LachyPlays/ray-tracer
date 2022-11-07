// Global canvas variables
var frame;
var render_context;
var width;
var height;
var frame_data;
var buffer;
var buf_u8;
var framebuffer;
// Make an RGBA pixel into a Number
var makeRGBA = function (r, g, b, a) {
    return ((a << 24) | (b << 16) | (g << 8) | (r << 0));
};
// Functions called from index.html
var loaded = function () {
    frame = document.getElementById("frame");
    render_context = frame.getContext('2d');
    width = frame.width;
    height = frame.height;
    frame_data = render_context.createImageData(width, height);
    buffer = new ArrayBuffer(frame_data.data.length);
    buf_u8 = new Uint8ClampedArray(buffer);
    framebuffer = new Uint32Array(buffer);
    console.log("Load complete!");
};
var renderFrame = function () {
    console.log("Rendering frame...");
    traceRay();
    for (var i = 0; i < width * height; i++) {
        framebuffer[i] = makeRGBA(0x00, 0x00, 0x00, 0xff);
    }
    frame_data.data.set(buf_u8);
    render_context.putImageData(frame_data, 0, 0);
    console.log("Rendered!");
};
// Raytracing code
var traceRay = function () { console.log("Traced a ray!"); };
// Vector 3 Addition
function v3Add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
// Vector 3 subtraction
function v3Sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
function v3Mul(a, b) {
    if (typeof b == 'number') {
        // If arg b is a number multiply vector * scalar
        return { x: a.x * b, y: a.y * b, z: a.z * b };
    }
    else {
        // Else is arg b is Vec3 multiply vector * vector
        return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z };
    }
}
