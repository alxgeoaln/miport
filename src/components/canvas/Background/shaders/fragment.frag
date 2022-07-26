uniform sampler2D uTexture;
uniform float uTime;
uniform float uAnimationSpeed;
uniform float uAlphaChannel;

varying vec2 vUv;

#define NUM_OCTAVES 5

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
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

void main() {

    vec2 test = vec2(
        distance(vUv.x, 0.03) * vUv.y * (uTime * uAnimationSpeed),
        vUv.x * (uTime * uAnimationSpeed) * distance(vUv.y, 0.03)
    );

    float rChannel = smoothstep(0.0, 0.7, fbm(test * -10.0));

    gl_FragColor = vec4(rChannel, rChannel, rChannel, uAlphaChannel);
}
