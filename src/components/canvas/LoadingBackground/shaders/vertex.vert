uniform float dragValue;

varying vec2 vUv;

float M_PI = 3.141529;

void main() {
    vUv = uv;

    vec3 augumentedPosition = position;

    augumentedPosition.y = augumentedPosition.y + (sin(uv.x * M_PI) * -dragValue);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(augumentedPosition, 1.0);
}
