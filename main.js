import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import starsTexture from './public/img/stars.jpg';
import sunTexture from './public/img/sun.jpg';
import mercuryTexture from './public/img/mercury.jpg';
import venusTexture from './public/img/venus.jpg';
import earthTexture from './public/img/earth.jpg';
import marsTexture from './public/img/mars.jpg';
import jupiterTexture from './public/img/jupiter.jpg';
import saturnTexture from './public/img/saturn.jpg';
import saturnRingTexture from './public/img/saturn ring.png';
import uranusTexture from './public/img/uranus.jpg';
import uranusRingTexture from './public/img/uranus ring.png';
import neptuneTexture from './public/img/neptune.jpg';
import plutoTexture from './public/img/pluto.jpg';

//render obj
const renderer = new THREE.WebGLRenderer();
//adding shadow
renderer.shadowMap.enabled = true;
//window size
// Sizes
const size = {
    width: window.innerWidth,
    height: window.innerWidth
}

//set aspect
renderer.setSize( size.width, size.height);

//add renderer to dom
document.body.appendChild(renderer.domElement);


//create scene
const scene = new THREE.Scene();


//create camera

const camera = new THREE.PerspectiveCamera( 45,
     size.width / size.height,
     0.1,
     1000);

//adding orbit controller on the canvas
const orbit = new OrbitControls(camera, renderer.domElement);

//setting camera position

camera.position.set(-90, 140, 140);

orbit.update();
//add ambient light in the scene
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//6 side cubeTextureLoader
const cubeTextureLoader = new THREE.CubeTextureLoader();

//setting the scene background pic;
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);


const textureLoader = new THREE.TextureLoader();





const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});

const sun = new THREE.Mesh(sunGeo, sunMat);
sun.castShadow = true;
scene.add(sun);


function createPlanet(size, texture, position, ring){
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture),
    })
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring){
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map : textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj};
}




// // mercury 3.2 28
// // venus 5.8 44
// // earth 6 62
// // mars  4  78
// // jupiter  12  100
// // saturn 10 , 138
// // ir 10
// // or 20
// // uranus 7  176
// // ir 7
// // or 12
// // neptune = 7 200
// // pluto = 2.8  216



 const mercury = createPlanet(3.2, mercuryTexture, 28);
 const venus  = createPlanet(5.8, venusTexture, 44);
 const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);

const  saturn = createPlanet(10, saturnTexture, 138,{
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture,
});
const  uranus  = createPlanet(7, uranusTexture, 176,{
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture,
});
const neptune = createPlanet(7, uranusTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);


//adding point light 
const pointLight = new  THREE.PointLight(0xFFFFFF, 2, 300);
pointLight.castShadow = true;
scene.add(pointLight);



function animate(time) {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.002);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
     mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);


    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

});










