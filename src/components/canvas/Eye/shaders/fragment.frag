precision highp float;

uniform bool uIsTop;
uniform float uEyeDetail;

uniform float time;

varying vec2 vUv;

#define NUM_OCTAVES 5.0

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for(float i = 0.0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {

    vec2 uv;

    if(uIsTop) {
        uv = 1.0 - vUv;
    } else {
        uv = vUv;
    }

    uv.x = fract(uv.x * 5.0);

    float x = fract(uv.x * NUM_OCTAVES) / NUM_OCTAVES;
    float y = floor(uv.y * NUM_OCTAVES) / NUM_OCTAVES;

    float distort = 0.2 * fbm(vec2(sin(x + y + time), cos(x + y + time)));

    float randomX = -fbm(uv * abs(sin(time)));

    float grain = rand(vec2(sin(uv.x + y), sin(x + uv.y)));

    float leftCircleDist = distance(uv, vec2(randomX * grain, 0.0));
    float rightCircleDist = distance(uv, vec2(1.5, grain * 0.1));

    float leftCircle = step(2.0 - uEyeDetail, leftCircleDist + distort);
    float rightCircle = step(2.0 - uEyeDetail, rightCircleDist + distort);

    float triangle = leftCircle * rightCircle;

    vec3 color = 1.0 - vec3(triangle, triangle, triangle);

    gl_FragColor = vec4(color, 1.0);
}