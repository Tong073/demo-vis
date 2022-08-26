<template>
  <div id="mapContainer" class="map_demo"></div>
</template>

<script>
import * as THREE from 'three';

import WebGL from 'three/examples/jsm/capabilities/WebGL'

export default {
  name: "MapDemo",
  created() {
    if (WebGL.isWebGLAvailable()) { //支持，然后运行
      this.$nextTick(()=>{
        this.drawLine();
      })
      // Initiate function or other initializations here
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      document.getElementById('mapContainer').appendChild(warning);
    }
  },
  methods: {
    drawLine() {
      //场景，相机、渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('mapContainer').appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.set(0, 0, 100);
      camera.lookAt(0, 0, 0);

      const scene = new THREE.Scene();

      const material = new THREE.LineBasicMaterial({color: 0x0000ff});

      const points = [];
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(10, 0, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      const line = new THREE.Line(geometry, material);

      scene.add(line);
      renderer.render(scene, camera)
    }
  }
}
</script>

<style scoped lang="scss">
.map_demo{
  position: fixed;
  top: 10vh;
  left: 0;
  width: 100vw;
  height: 80vh;
  z-index: 1;
}
</style>
