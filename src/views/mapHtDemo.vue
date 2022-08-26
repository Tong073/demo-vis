<template>
  <div id="mapDiv" class="map-home"></div>
</template>

<script>
import "ol/ol.css";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

export default {
  name: "mapHtDemo",
  mounted() {
    console.log('mapHtDemo!!!!!!!!!!!!!!!!')
    // let dataModel = new ht.DataModel();
    // console.log(dataModel)

    new Map({
      target: "mapDiv",
      layers: [
        new TileLayer({
          // source: {
          //   name: "高德地图",
          //   value: new XYZ({
          //     url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
          //   }),
          //   id: "0",
          // },
          source: new OSM()
      })],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }
}
</script>

<style scoped lang="scss">
.map-home {
  width: 100vw;
  height: 100vh;
}
</style>
