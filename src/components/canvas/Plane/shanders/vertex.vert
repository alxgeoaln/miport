uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

#define NUM_OCTAVES 5

float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 perm(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float noise(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for(int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    vec3 newPosition = position;

    vec3 wind = vec3(0.5 * fbm(position) + 0.3 * uTime, 0.7 * fbm(position) - 0.2 * uTime, 0.3 * fbm(position) + 0.3 * uTime);

    float wave = mix(-3.0, 3.0, fbm(0.5 * position + wind));

    // set pegs
    vec2 peg1 = vec2(0.0, 1.0);
    vec2 peg2 = vec2(1.0, 1.0);

    float tension = distance(uv, peg1) * distance(uv, peg2);
    float gravity = -0.07 * sin(uv.x * 3.141);

    newPosition.y += gravity;
    newPosition.z += tension * wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

}
