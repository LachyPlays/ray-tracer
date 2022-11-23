// Global canvas variables
var frame: HTMLCanvasElement
var render_context: CanvasRenderingContext2D
var width: number
var height: number
var frame_data: ImageData
var buffer: ArrayBuffer
var buf_u8: Uint8ClampedArray
var framebuffer: Uint32Array

// Make an RGBA pixel into a Number
const makeRGBA = (r: number, g: number, b: number, a: number) => {
    return ((a << 24) | (b << 16) | (g << 8) | (r << 0))
}

// Functions called from index.html
const loaded = () => {
    frame = document.getElementById("frame") as HTMLCanvasElement
    render_context = frame.getContext('2d') as CanvasRenderingContext2D
    width = frame.width
    height = frame.height
    frame_data = render_context.createImageData(width, height)
    buffer = new ArrayBuffer(frame_data.data.length)
    buf_u8 = new Uint8ClampedArray(buffer)
    framebuffer = new Uint32Array(buffer)

    console.log("Load complete!")
}

const renderFrame = () => {
    console.log("Rendering frame...")

    traceRay()

    for (let i = 0; i < width * height; i++) {
        framebuffer[i] = makeRGBA(0x00, 0x00, 0x00, 0xff)
    }

    frame_data.data.set(buf_u8)
    render_context.putImageData(frame_data, 0, 0)

    console.log("Rendered!")
}

// Raytracing code
const traceRay = () => {
    const a = {x: 2.0, y: 2.0, z: 2.0}
    const b = {x: 2.0, y: 2.0, z: 2.0}

    console.log(v3Add(a, b))

    console.log("Traced a ray!")
}

class ray {
    // Fields
    private origin: Vec3
    private direction: Vec3

    // Constructor
    constructor(origin?: Vec3, direction?: Vec3) {
        this.origin = origin ?? {x: 0.0, y: 0.0, z: 0.0}
        this.direction = origin ?? {x: 0.0, y: 0.0, z: 0.0}
    }

    // Methods
    at(t: number): Vec3 {
        return v3Add(this.origin, v3Mul(this.direction, t))
    }
}

// Vector 3
interface Vec3 {
    x: number,
    y: number,
    z: number
}

// Vector 3 Addition
function v3Add(a: Vec3, b: Vec3) : Vec3 {
    return {x: a.x + b.x, y: a.y + b.y, z: a.z + b.z} 
}

// Vector 3 subtraction
function v3Sub(a: Vec3, b: Vec3) : Vec3 {
    return {x: a.x - b.x, y: a.y - b.y, z: a.z - b.z} 
}

// Vector 3 multiply
function v3Mul(a: Vec3, b: Vec3) : Vec3;
function v3Mul(a: Vec3, b: number) : Vec3

function v3Mul(a: Vec3, b: Vec3 | number) : Vec3 {
    if(typeof b == 'number'){
        // If arg b is a number multiply vector * scalar
        return {x: a.x * b, y: a.y * b, z: a.z * b} 
    } else {
        // Else is arg b is Vec3 multiply vector * vector
        return {x: a.x * b.x, y: a.y * b.y, z: a.z * b.z} 
    }
}

// Vector 3 divide
function v3Div(a: Vec3, b: Vec3) : Vec3;
function v3Div(a: Vec3, b: number) : Vec3;

function v3Div(a: Vec3, b: Vec3 | number) : Vec3 {
    if(typeof b == 'number'){
        return {x: a.x / b, y: a.y / b, z: a.z / b} 
    } else {
        return {x: a.x / b.x, y: a.y / b.y, z: a.z / b.z} 
    }
}

// Vector 3 dot-product
function v3Dot(a: Vec3, b: Vec3): number {
    return (a.x * b.y) + (a.y * b.y) + (a.z * b.z)
}

// Vector 3 cross-product
function v3Cross(a: Vec3, b: Vec3): Vec3 {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.z
    }
}

// Vector 3 length
function v3LengthSquared(a: Vec3) : number {
    return (a.x * a.x + a.y * a.y, + a.z * a.z)
}

function v3Length(a: Vec3) : number {
    return Math.sqrt(v3LengthSquared(a))
}

// Vector 3 unit vector
function v3Unit(a: Vec3): Vec3 {
    return v3Div(a,v3Length(a))
}