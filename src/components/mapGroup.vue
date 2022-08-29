<template>
  <div id="container" ref="container">
    <canvas id="name"></canvas>
  </div>
</template>

<script>
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from "three";
import * as d3 from 'd3';
import bigGreen from "@/assets/image/header/title-bg.png";
import img from "@/assets/image/s1/green-circle.png";

let mapScreenDataGroup = {
      mainScreen: {
        screen: null,
        map3d: null,
        mapGroup: null
      }
    },
    camera = null,
    renderer = null,
    controller = null,
    geoJson = null,
    activeScreenData = null,
    preScreenDataName = '',
    preScreenData = null,
    cityPointGroup = null;
let meshGroup = { //有点击事件的mesh类型
  mapMesh: "mapMesh", //地图
  markMesh: "markMesh" //标记点
}
export default {
  name: 'mapGroup',
  data() {
    return {
      a: '',
      mapGroup: null,
      bgColor: 0x2defff,
      raycaster: null,
      previousObj: null,
      map: null,
      mapMainAdCode: '',
      activePosition: [112.322147, 37.960573] //中心坐标
    }
  },
  created() {
    this.getMap();
  },
  beforeDestroy() {
    mapScreenDataGroup = {
      mainScreen: {
        screen: null,
        map3d: null,
        mapGroup: null
      }
    };
    activeScreenData = null;
    camera = null;
    controller = null;
    renderer = null;
    activeScreenData = null;
    preScreenDataName = '';
    preScreenData = null;
    cityPointGroup = null;
  },
  methods: {
    /**
     * 获取地图数据
     */
    getMap() {
      //json数据需要从网站中下载，放在本地的src/assets/map目录下
      //地图的json数据获取网址https://datav.aliyun.com/portal/school/atlas/area_selector
      //this.geoJson = require(`@/assets/map/map_${res.data.adcode}.json`);
      geoJson = require(`@/assets/map/map_140000.json`);
      this.mapMainAdCode = 140000
      this.$nextTick(() => {
        this.init();
      })
    },
    init() {
      // 初始化3D环境
      this.initEnvironment()
      // 构建光照系统
      this.buildLightSystem()
      // 创建地图
      this.initMap(geoJson, true)
      // 控制器
      this.setController()
      // 动画循环
      this.loop()
    },
    /**
     * @desc: 初始化3D环境
     */
    initEnvironment() {
      this.MWidth = window.innerWidth;
      this.MHeight = window.innerHeight;

      // 创建场景对象sceneGroup
      mapScreenDataGroup.mainScreen.screen = new THREE.Scene();

      // 设置相机参数
      this.setCamera();

      // 初始化渲染器对象
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(this.MWidth, this.MHeight); // 设置渲染器区域尺寸
      renderer.setClearColor(0x000000, 1); // 设置背景颜色

      // 坐标轴 辅助
      document.getElementById('container').appendChild(renderer.domElement)
      document.addEventListener('click', this.onDocumentMouseMove, false)
      window.addEventListener('resize', this.onWindowResize, false);

      this.init3DData(mapScreenDataGroup.mainScreen);
      activeScreenData = mapScreenDataGroup.mainScreen;
    },

    init3DData(curScreenData) {
      if (!curScreenData?.screen) {
        return
      }
      // 建一个空对象存放地图对象
      curScreenData.map3d = new THREE.Object3D()
      this.raycaster = new THREE.Raycaster(); //光线投影
      this.previousObj = {material: [{color: new THREE.Color(0x0000ff)}]};
      curScreenData.mapGroup = new THREE.Group();
      curScreenData.screen.add(curScreenData.mapGroup)
    },

    /**
     * @desc: 光照系统
     */
    buildLightSystem() {
      let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
      directionalLight.position.set(300, 1000, 500);
      directionalLight.target.position.set(0, 0, 0);
      directionalLight.castShadow = true;

      // let d = 300;
      const fov = 45 //拍摄距离  视野角值越大，场景中的物体越小
      const near = 1 //相机离视体积最近的距离
      const far = 1000//相机离视体积最远的距离
      const aspect = this.MWidth / this.MHeight; //纵横比
      directionalLight.shadow.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      directionalLight.shadow.bias = 0.0001;
      directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
      mapScreenDataGroup.mainScreen.screen.add(directionalLight)

      let light = new THREE.AmbientLight(0xffffff, 0.6)
      mapScreenDataGroup.mainScreen.screen.add(light)
    },
    /**
     * @desc: 设置相机
     */
    setCamera() {
      camera = new THREE.PerspectiveCamera(
          20,
          this.MWidth / this.MHeight,
          1,
          1000
      )
      camera.position.set(5, -20, 30);
      camera.lookAt(0, 0, 0);
    },

    /**
     * @desc: 实现拖拽地图操作
     */
    setController() {
      controller = new OrbitControls(camera, renderer.domElement)
      controller.addEventListener('change', () => {
        // this.render()
      })
    },

    dealCenterPosition(centerPosition, scaleRotate = 80) {
      return d3.geoMercator().center(centerPosition).scale(scaleRotate).translate([0, 0]);
    },

    dealMapJson(mapJson, projection, curScreenData) {
      if (!mapJson || !projection) return;
      // 初始化一个地图对象
      //地图code可配置后，那地图的中心坐标怎么确定？

      mapJson.features.forEach((elem) => {
        const province = new THREE.Object3D()

        // 每个的 坐标 数组
        const coordinates = elem.geometry.coordinates

        // 循环坐标数组
        coordinates.forEach((multiPolygon) => {
          multiPolygon.forEach((polygon) => {
            const mesh = this.drawExtrudeMesh(polygon, projection)
            const line = this.lineDraw(polygon, projection)
            province.add(line)
            province.add(mesh)

            mesh.meshType = meshGroup.mapMesh;
            mesh.activeMapCode = elem?.properties?.adcode;
            mesh.preScreenDataName = mapJson?.mapLevel == 'province' ? 'mainScreen' : `screen_${elem?.properties?.adcode}`;
            mesh.activePosition = elem?.properties?.centroid;
            curScreenData.mapGroup.add(mesh)
          })
        })

        // 将geojson的properties放到模型中，后面会用到
        province.properties = elem.properties
        if (elem.properties.centroid) {
          const [x, y] = projection(elem.properties.centroid)
          province.properties._centroid = [x, y] //省市中心坐标转换后的坐标
          elem.properties._centroid = [x, y];
        }
        curScreenData.map3d.add(province)
        if (mapJson?.mapLevel == 'province') {
          this.drawLabel(elem, curScreenData?.screen) //画标记点
          this.childInitMap(elem?.properties?.adcode, elem?.properties?.centroid)
        }
      })
    },
    /**
     * @desc: 加载地图数据
     */
    initMap(mapJson) {
      this.dealMapJson(mapJson, this.dealCenterPosition(this.activePosition), mapScreenDataGroup.mainScreen);
      mapScreenDataGroup.mainScreen.screen.add(mapScreenDataGroup.mainScreen.mapGroup)
      mapScreenDataGroup.mainScreen.screen.add(mapScreenDataGroup.mainScreen.map3d)
    },

    childInitMap(code, centerPosition) {
      if (!code) return;
      let childMapJson;
      try {
        childMapJson = require(`@/assets/map/map_${code}.json`);
      } catch (e) {
        console.log(e)
      }
      if (!childMapJson) return;
      let screeChildName = `screen_${code}`;
      mapScreenDataGroup[screeChildName] = {
        screen: new THREE.Scene(),
        mapGroup: {},
        map3d: {}
      };
      this.init3DData(mapScreenDataGroup[screeChildName]);
      console.log(mapScreenDataGroup[screeChildName])
      this.dealMapJson(childMapJson, this.dealCenterPosition(centerPosition, 200), mapScreenDataGroup[screeChildName]);
      mapScreenDataGroup[screeChildName].screen.add(mapScreenDataGroup.mainScreen.mapGroup)
      mapScreenDataGroup[screeChildName].screen.add(mapScreenDataGroup.mainScreen.map3d)
    },
    /**
     * 立体几何图形
     * @param polygon 多边形 点数组
     * @param projection
     * */
    drawExtrudeMesh(polygon, projection) {
      const shape = new THREE.Shape()
      polygon.forEach((row, i) => {
        const [x, y] = projection(row)
        if (i === 0) {
          shape.moveTo(x, -y)
        }
        shape.lineTo(x, -y)
      })

      // 拉伸
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.5,
        bevelEnabled: false
      })
      const material = new THREE.MeshBasicMaterial({
        color: '#2defff',
        transparent: true,
        opacity: 0.5
      })
      const material1 = new THREE.MeshBasicMaterial({
        color: '#3480C4',
        transparent: true,
        opacity: 0.5,
      })
      return new THREE.Mesh(geometry, [material, material1])
    },
    /**
     * 边框 图形绘制
     * @param polygon 多边形 点数组
     * @param projection
     * */
    lineDraw(polygon, projection) {
      const lineGeometry = new THREE.BufferGeometry()
      const pointsArray = new Array()
      polygon.forEach((row) => {
        const [x, y] = projection(row)
        // 创建三维点
        pointsArray.push(new THREE.Vector3(x, -y, 0.4))
      })
      // 放入多个点
      lineGeometry.setFromPoints(pointsArray)

      const lineMaterial = new THREE.LineBasicMaterial({
        color: '#fff'
      })
      return new THREE.Line(lineGeometry, lineMaterial)
    },
    /**
     * @desc: 显示名称
     */
    showName() {
      const width = this.MWidth
      const height = this.MHeight
      let canvas = document.querySelector('#name')
      if (!canvas) return
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      // 新建一个离屏canvas
      const offCanvas = document.createElement('canvas')
      offCanvas.width = width
      offCanvas.height = height
      const ctxOffCanvas = canvas.getContext('2d');
      // 设置canvas字体样式
      ctxOffCanvas.font = '16.5px Arial';
      ctxOffCanvas.strokeStyle = '#FFFFFF';
      ctxOffCanvas.fillStyle = '#000000';
      // texts用来存储显示的名称，重叠的部分就不会放到里面
      const texts = [];
      /**
       * 遍历省份数据，有2个核心功能
       * 1. 将3维坐标转化成2维坐标
       * 2. 后面遍历到的数据，要和前面的数据做碰撞对比，重叠的就不绘制
       * */
      if (!activeScreenData?.map3d?.children) return;
      activeScreenData.map3d.children.forEach((elem) => {
        if (!elem.properties._centroid) return
        // 找到中心点
        const y = -elem.properties._centroid[1]
        const x = elem.properties._centroid[0]
        const z = 0.5
        // 转化为二维坐标
        const vector = new THREE.Vector3(x, y, z)
        vector.project(camera)
        // 构建文本的基本属性：名称，left, top, width, height -> 碰撞对比需要这些坐标数据
        const name = elem.properties.name
        const left = (vector.x + 1) / 2 * width
        const top = -(vector.y - 1) / 2 * height
        const text = {
          name,
          left,
          top,
          width: ctxOffCanvas.measureText(name).width,
          height: 16.5
        }
        // 碰撞对比
        let show = true
        for (let i = 0; i < texts.length; i++) {
          if (
              (text.left + text.width) < texts[i].left ||
              (text.top + text.height) < texts[i].top ||
              (texts[i].left + texts[i].width) < text.left ||
              (texts[i].top + texts[i].height) < text.top
          ) {
            show = true
          } else {
            show = false
            break
          }
        }
        if (show) {
          texts.push(text)
          ctxOffCanvas.strokeText(name, left, top)
          ctxOffCanvas.fillText(name, left, top)
        }
      })
      // 离屏canvas绘制到canvas中
      ctx.drawImage(offCanvas, 0, 0)
    },

    /**
     * 画标记点
     */
    drawLabel(positionItem, curScreen) {
      let pos = positionItem.properties.center
      if (pos && pos.length > 0) {
        // 添加圆圈
        let geometry = new THREE.PlaneGeometry(1, 1) // 矩形平面
        // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
        let textureLoader = new THREE.TextureLoader();
        cityPointGroup = new THREE.Group()
        // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        textureLoader.load(img, (texture) => {
          let material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
            map: texture, // 设置颜色贴图属性值
            depthTest: false,
            transparent: true // 使用背景透明的png贴图，注意开启透明计算
          }) // 材质对象Material
          let size = Math.random();
          size = size > 0.5 ? 0.5 : (size < 0.3 ? 0.3 : parseFloat(size, 2))
          let mesh = new THREE.Mesh(geometry, material)
          mesh.position.set(positionItem.properties._centroid[0], -positionItem.properties._centroid[1], 0.7) // 设置mesh位置
          mesh.scale.set(size, size, size) // 设置mesh大小
          mesh._s = size // mesh自定义一个属性表征大小
          cityPointGroup.add(mesh)
        })
        curScreen.add(cityPointGroup)

        // 添加圆柱
        let geometry2 = new THREE.CylinderGeometry(0.15, 0.15, 1, 32, 1, true)
        geometry2.rotateX(Math.PI / 2)
        geometry2.translate(0, 0, 1)
        let barGroup = new THREE.Group();
        // geometry2.cityData = item
        new THREE.TextureLoader().load(bigGreen, (texture) => {
          let material2 = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthTest: false,
            blending: THREE.AdditiveBlending
          })
          let mesh2 = new THREE.Mesh(geometry2, material2)
          mesh2.position.set(positionItem.properties._centroid[0], -positionItem.properties._centroid[1], 0.05) // 设置mesh位置
          mesh2.cityData = positionItem // 保存对应的城市数据
          barGroup.add(mesh2)

          //
          mesh2.meshType = meshGroup.markMesh;
          mesh2.name = positionItem?.properties?.name + '变电站';
          activeScreenData.mapGroup.add(mesh2)
        })
        curScreen.add(barGroup)
      }
    },

    /**
     * @desc:  动画循环
     */
    loop() {
      this.showName();
      this.render()
      requestAnimationFrame(this.loop)
    },

    /**
     * @desc: 渲染画布
     */
    render() {
      renderer.render(activeScreenData.screen, camera)
      if (cityPointGroup.children.length) {
        cityPointGroup.children.forEach(function (mesh) {
          mesh._s += 0.008;
          mesh.scale.set(mesh._s, mesh._s, mesh._s);
          if (mesh._s <= 0.5) {
            mesh.material.opacity = (1 - mesh._s) * 1.5;
          } else if (mesh._s > 0.5 && mesh._s <= 1) {
            mesh.material.opacity = (1 - mesh._s) * 2;
          } else {
            mesh._s = 0.5;
          }
        })
      }
    },

    // 根据浏览器窗口变化动态更新尺寸
    onWindowResize() {
      camera.aspect = this.MWidth / this.MHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(this.MWidth, this.MHeight);
    },

    onDocumentMouseMove(event) {
      event.preventDefault();
      let mouse = new THREE.Vector2(0, 0);
      mouse.x = (event.clientX / this.MWidth) * 2 - 1;
      mouse.y = -(event.clientY / this.MHeight) * 2 + 1;
      this.raycaster.setFromCamera(mouse, camera);
      let intersects = this.raycaster.intersectObjects(activeScreenData.mapGroup.children);
      if (intersects.length == 0) {
        if (preScreenDataName == 'mainScreen') {
          this.a = preScreenData
          // activeScreenData = JSON.parse(JSON.stringify(preScreenData));
          // preScreenData = null;
          // this.loop()
          // preScreenDataName = ''
        }
      }
      if (intersects[0]?.object?.meshType == meshGroup.markMesh) { //变电站点击处理
        alert(intersects[0]?.object?.name)
      } else if (intersects[0]?.object?.meshType == meshGroup.mapMesh) { //地图板块点击处理
        this.previousObj.material[0].color = new THREE.Color(this.bgColor);
        if (mapScreenDataGroup?.[`screen_${intersects[0]?.object?.activeMapCode}`]) {
          this.activePosition = intersects[0]?.object?.activePosition;
          activeScreenData = mapScreenDataGroup?.[`screen_${intersects[0]?.object?.activeMapCode}`];
          preScreenDataName = intersects[0]?.object?.preScreenDataName;
          preScreenData = mapScreenDataGroup[intersects[0]?.object?.preScreenDataName];
        } else {
          if (intersects[0] && intersects[0]?.object && intersects[0]?.object.material[0]?.color) {
            intersects[0].object.material[0].color = new THREE.Color(0xffaa00);
            this.previousObj = intersects[0].object;
          }
        }
      }
    },
  },
}
</script>

<style>
#container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

#name {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
