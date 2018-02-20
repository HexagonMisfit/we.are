import { brandColors } from './theming.js';
import '../assets/video/Merica.mp4';

const vertexShader = `

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }

`

const fragmentShader = `

varying vec2 vUv;
uniform float time;
uniform vec3 colorIn;

float plot(vec2 st, float pct){
    return  smoothstep( pct-0.2, pct, st.y) -
            smoothstep( pct, pct+0.2, st.y);
  }

float plot2(vec2 st, float pct){
    return  smoothstep( pct-0.1, pct, st.x) -
            smoothstep( pct, pct+0.1, st.x);
  }
  
  void main()
  {
    vec2 st = vUv.xy;
  
    float x = fract( (st.y + time * 0.05) * 20.0) * 10.0 - 5.0;    
    float y = fract(st.x * 20.0) * 10.0 / 2.0 - 3.9;
    float z = x;
    vec3 color, color2 = vec3(y,x,z);

    // Plot a line
    float pct = plot(st,x);
    float pct2 = plot2(st, y);
    color = (pct)*color+pct*vec3(1.0,1.0,1.0);
    color2 = (pct2)*color+pct2*vec3(1.0,1.0,1.0);
    color = mix(color, colorIn, abs(sin(time)) * 0.4 + 0.4);
    color = mix(color, color2, 0.5);
	gl_FragColor = vec4(vec3(st.y) + (color * (1.0 - st.y)),1.0);
  }
`;

AFRAME.registerComponent('material-grid-glitch', {
    schema: { color: { type: 'color' } },
    /**
     * Creates a new THREE.ShaderMaterial using the two shaders defined
     * in vertex.glsl and fragment.glsl.
     */
    init: function () {
        const data = this.data;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                colorIn: { value: new THREE.Color(data.color) }
            },
            vertexShader,
            fragmentShader
        });
        this.applyToMesh();
        this.el.addEventListener('model-loaded', () => this.applyToMesh());
    },
    /**
     * Update the ShaderMaterial when component data changes.
     */
    update: function () {
        this.material.uniforms.colorIn.value.set(this.data.color);
    },
    /**
     * Apply the material to the current entity.
     */
    applyToMesh: function () {
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
            mesh.material = this.material;
        }
    },
    /**
     * On each frame, update the 'time' uniform in the shaders.
     */
    tick: function (t) {
        this.material.uniforms.time.value = t / 1000;
    }
})

$(function () {
    var sceneEl = document.querySelector('a-scene');
    var videoBottomLeft = document.querySelector('#video-bottom-left');
    var videoBottomCenter = document.querySelector('#video-bottom-center');
    var videoBottomRight = document.querySelector('#video-bottom-right');
    var videoTopLeft = document.querySelector('#video-top-left');
    var videoTopCenter = document.querySelector('#video-top-center');
    var videoTopRight = document.querySelector('#video-top-right');
    var mariposaVid = document.querySelector('#mariposa-chandelier');

    var fooComponent = document.querySelector('#foo');
    fooComponent.setAttribute('foo');

    videoBottomLeft.addEventListener('click', playVideo);
    videoBottomCenter.addEventListener('click', playVideo);
    videoBottomRight.addEventListener('click', playVideo);
    videoTopLeft.addEventListener('click', playVideo);
    videoTopCenter.addEventListener('click', playVideo);
    videoTopRight.addEventListener('click', playVideo);

    function playVideo(video) {
        if (mariposaVid.paused === true) {
            mariposaVid.play();
        } else {
            mariposaVid.pause();
        }
    }
});
