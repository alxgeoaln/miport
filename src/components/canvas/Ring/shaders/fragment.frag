uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float time;

varying vec2 vUv;

#define NUM_OCTAVES 5.0

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (float i = 0.0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}


void main() {
    vec2 uv = vUv;

    float distIris = distance(uv, vec2(0.5));
    float distBg = distance(uv, vec2(0.5));
    float distInnerIris = distance(uv, vec2(0.5));
    
    float stepIris =  smoothstep(0.4, 0.5, distIris);
    float stepInnerIris = smoothstep(0.0, 0.55, distInnerIris) - smoothstep(1.0, 0.0, distInnerIris);
    float stepCenter = smoothstep(0.1, 0.2, distBg);
    
    vec3 backgroundColor = vec3(0.0, 0.0, 0.0);
    vec3 innerColor = vec3(1.0, 0.0, 0.0);
    vec3 innerIrisColor = vec3(0.0, 1.0, 1.0);
    
    float steps = 10.0;
    
    float x = fract(uv.x + fbm(uv * 100.0) * steps) / steps;
    float y = fract(uv.y + fbm(uv) * steps + time * 0.1) / steps;
    
    float fbmPatter = fbm(
        vec2(0.5 * sin(x + y), 0.1 * cos(x + y))
    ) * stepCenter;
    
    float irisPattern = smoothstep(0.0, 0.3, fract(fbmPatter * -10.0));
    
    vec3 color = mix(backgroundColor, innerIrisColor, stepCenter);
    color = mix(color, innerColor , stepInnerIris + irisPattern);
    color = mix(color, backgroundColor, stepIris);

    gl_FragColor = vec4(color, 1.0);
}