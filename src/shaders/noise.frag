varying vec2 vUv;
varying float noise;

void main() {
    vec3 color = vec3(noise * 2., 0.0, noise * 20.);
    
    gl_FragColor = vec4(color.rgb, 1.);
}