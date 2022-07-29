uniform sampler2D uTexture;
uniform sampler2D uWhiteTexture;
uniform float uTime;
uniform float uTimeline;

varying vec2 vUv;

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

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
}

vec4 sampleColor(vec2 uv) {

    if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        return vec4(0.0);
    }

    return texture(uTexture, uv);
}

void main() {

    vec2 uv = fract(
        vec2(
            vUv.x * 1.2 - 0.1, 
            vUv.y * 1.5 - 0.25
        )) - 0.05;

    vec3 fbmValue = 0.25 * floor(
        vec3(
            sin(uTime + uv.x * 8.0 + uv.y * 0.5), 
            distance(cos(uTime + uv.x * 8.0 + uv.y * 0.5), 0.5), 
            length(sin(uTime + uv.x * 8.0 + uv.y * 0.5)) * 2.0
        )
    );

    vec2 distortion = 0.04 * vec2(fbm(fbmValue), sin(uTime + uv.x * 8.0 + uv.y * 0.5));

    vec4 rChannel = sampleColor(uv + distortion * rotation2d(1.0));
    rChannel.g = 0.0;
    rChannel.b = 0.0;


    vec4 gChannel = sampleColor(uv + distortion * rotation2d(2.0));
    gChannel.r = 0.0;
    gChannel.b = 0.0;


    vec4 bChannel = sampleColor(uv + distortion * rotation2d(3.0));
    bChannel.r = 0.0;
    bChannel.g = 0.0;

    vec4 avatar = rChannel + gChannel + bChannel;

    vec4 whiteTexture = texture(uWhiteTexture, uv);

    float mixer = smoothstep(0.0, 1.0, uTimeline);

    vec4 color = mix(avatar, whiteTexture, mixer);

    gl_FragColor = color;
}
