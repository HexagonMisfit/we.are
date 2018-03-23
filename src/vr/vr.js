import './assets/Merica.mp4';
import './assets/wood_planks_new_0035_02_tiled.jpg';

const vertexShader = `

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }

`

const skyShader = `

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

    float pct = plot(st,x);
    float pct2 = plot2(st, y);
    color = (pct)*color+pct*vec3(1.0,1.0,1.0);
    color2 = (pct2)*color+pct2*vec3(1.0,1.0,1.0);
    color = mix(color, colorIn, abs(sin(time)) * 0.4 + 0.4);
    color = mix(color, color2, 0.5);
	gl_FragColor = vec4(vec3(st.y) + (color * (1.0 - st.y)),1.0);
  }
`

console.log('1');
AFRAME.registerComponent('globe-sky', {
    schema: { color: { type: 'color' } },
    init: function () {
        const data = this.data;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                colorIn: { value: new THREE.Color(data.color) }
            },
            vertexShader: vertexShader,
            fragmentShader: skyShader
        });
        this.applyToMesh();
        this.el.addEventListener('model-loaded', () => this.applyToMesh());
    },
    
    update: function () {
        this.material.uniforms.colorIn.value.set(this.data.color);
    },
    
    applyToMesh: function () {
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
            mesh.material = this.material;
        }
    },
    
    tick: function (t) {
        this.material.uniforms.time.value = t / 1000;
    }
});

const groundShader = `

varying vec2 vUv;

void main()
{
    vec3 col = vec3(1.0, 1.0, 1.0);
    float pct = distance(vUv, vec2(0.5, 0.5));
    col -= pct;

    gl_FragColor = vec4(col,1.0);
}

`

AFRAME.registerComponent('ground-gradient', {
    schema: { color: { type: 'color' } },
    init: function () {
        this.material = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader,
            fragmentShader: groundShader
        });
        this.applyToMesh();
        this.el.addEventListener('model-loaded', () => this.applyToMesh());
    },
    applyToMesh: function () {
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
            mesh.material = this.material;
        }
    }
});

$(window).on('load', function () {
    console.log('all loaded');
    var sceneEl = document.querySelector('a-scene');
    var videoBottomLeft = document.querySelector('#video-bottom-left');
    var videoBottomCenter = document.querySelector('#video-bottom-center');
    var videoBottomRight = document.querySelector('#video-bottom-right');
    var videoTopLeft = document.querySelector('#video-top-left');
    var videoTopCenter = document.querySelector('#video-top-center');
    var videoTopRight = document.querySelector('#video-top-right');
    var mariposaVid = document.querySelector('#mariposa-chandelier');

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
