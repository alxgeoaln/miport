uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

struct Light {
  vec3 position;
  vec3 color;
};

vec3 addLight(Light l) {
		// calculate the new normals
  vec3 dx = dFdx(vPosition);
  vec3 dy = dFdy(vPosition);
  vec3 newNormal = normalize(cross(dx, dy));

		// light direction
  vec3 L = normalize(l.position - vPosition);

		// surface direction
  vec3 N = mix(vNormal, newNormal, 0.5);

		// ambient lighting
  float ambientScore = 0.1;
  vec3 ambientColor = ambientScore * l.color;

		// diffuse lighting
  float diffuseScore = max(dot(L, N), 0.0);
  vec3 diffuseColor = diffuseScore * l.color;

  return ambientColor + diffuseColor;
}

void main() {
  vec4 texture = texture(uTexture, vUv);

  Light l = Light(vec3(0.1, 0.1, 0.7), vec3(1., 1., 1.));

  vec3 rgb = addLight(l) * texture.rgb;
  vec4 finalColor = vec4(rgb, 1.0);

  gl_FragColor = finalColor;
}
