import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Material } from 'three'


const textureLoader = new THREE.TextureLoader

const normalTexture = textureLoader.load('../public/textures/NormalMap.png')
// Debug
const gui = new dat.GUI()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

const canvas = document.querySelector('#bg')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30)


renderer.render(scene, camera)

// Object
const geometry = new THREE.SphereBufferGeometry(5,120,120)

const moonTexture = textureLoader.load('../public/textures/moon.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(2, 22 ,22),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
    })
)
scene.add(moon)

moon.position.z = 15
moon.position.setX(20)


//Materials
const material = new THREE.MeshStandardMaterial
material.metalness = 0.9
material.roughness = 0.7
// material.map = moonTexture
material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const pointLight = new THREE.PointLight(0xffffff, 0.4)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(pointLight, ambientLight)


const pointLight2 = new THREE.PointLight(0xe000ff, 2)
// Yellow
pointLight2.position.set(4.51,2.32,3)
pointLight2.intensity = 0.27
scene.add(pointLight2)
const light2 = gui.addFolder('Light 1')

light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xe000ff
}

light2.addColor(light2Color, 'color').onChange(() => {
    pointLight2.color.set(light2Color.color)
})
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, .9)

scene.add(pointLightHelper2)

const pointLight3 = new THREE.PointLight(0x13d3e8, 2)
// purple
pointLight3.position.set(-6,-3 ,3)
pointLight3.intensity = 0.27
scene.add(pointLight3)
const light3 = gui.addFolder('Light 2')

light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light3Color = {
    color: 0x13d3e8
}

light3.addColor(light3Color, 'color').onChange(() => {
    pointLight3.color.set(light3Color.color)
})

const pointLightHelper = new THREE.PointLightHelper(pointLight3, .7)
const gridHelper = new THREE.GridHelper(200, 50) // grid helper

scene.add(pointLightHelper)

// Controls (mouse animation)
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24,24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
    const star = new THREE.Mesh( geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = textureLoader.load('../public/textures/space.jpg')
scene.background = spaceTexture



//  avatar - texture mapping test

const adaTexture = textureLoader.load('../public/textures/git-logo-adazolhub-small.png')

const ada = new THREE.Mesh(
    new THREE.SphereGeometry(1,60,60),
    new THREE.MeshBasicMaterial({ map: adaTexture})
)
scene.add(ada)


function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    moon.rotation.x +=  0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05

    ada.rotation.y += 0.01
    ada.rotation.z += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002

}

// document.body.onscroll = moveCamera



function animate() {
    requestAnimationFrame( animate )
    sphere.rotation.x += 0.01
    sphere.rotation.y += 0.005
    sphere.rotation.z += 0.01
    renderer.render( scene, camera)
}

animate()