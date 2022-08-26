<template>
  <div style="width: 100%;height: 100%" ref="mapChart" :options="mapOptions" autoresize></div>
</template>

<script>
// import geoJson from '@/assets/map/SXLF.json'

export default {
  name: "MapModules",
  data() {
    return {
      mapOptions: null
    }
  },
  mounted() {
    // console.log(geoJson)
    // let canvas = document.createElement('canvas');
    // this.$echarts.registerMap('linfen', geoJson);
    // let mapBg = this.$echarts.init(canvas, null, {
    //   width: 1024,
    //   height: 1024
    // })
    // mapBg.setOption({
    //   geo: {
    //     show: true,
    //     map: 'linfen',
    //     top: 0,
    //     width: 1024,
    //     label: {
    //       position: 'top',
    //       distance: 5,
    //       normal: {
    //         show: true,
    //         textStyle: {
    //           color: '#fff'
    //         }
    //       },
    //       emphasis: {
    //         textStyle: {
    //           color: '#fff'
    //         }
    //       }
    //     },
    //     itemStyle: {
    //       normal: {
    //         areaColor: {
    //           type: 'radial',
    //           x: 0.5,
    //           y: 0.5,
    //           r: 0.8,
    //           colorStops: [{
    //             offset: 0,
    //             color: '#09132c' // 0% 处的颜色
    //           }, {
    //             offset: 1,
    //             color: '#274d68'  // 100% 处的颜色
    //           }],
    //         },
    //       },
    //     },
    //     emphasis: {
    //       label: {
    //         show: true,
    //         textStyle: {
    //           color: '#fff',
    //           fontSize: 13,
    //           backgroundColor: 'rgba(0,23,11,1)'
    //         }
    //       },
    //       itemStyle: {
    //         areaColor: '#f00', // 高亮时地图板块颜色改变
    //       }
    //     },
    //   },
    //   series: [
    //     {
    //       type: `effectScatter`,
    //       coordinateSystem: `geo`,
    //       showEffectOn: 'render',
    //       zlevel: 1,
    //       rippleEffect: {
    //         period: 5,
    //         scale: 4,
    //         brushType: 'fill'
    //       },
    //       hoverAnimation: true,
    //       label: {
    //         normal: {
    //           formatter: '{b}',
    //           position: 'bottom',
    //           offset: [15, 0],
    //           color: '#fff',
    //           show: true,
    //           fontSize: 16
    //         },
    //       },
    //       itemStyle: {
    //         normal: {
    //           color: '#1DE9B6',
    //           // color: function (value) { //随机颜色
    //           //     return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    //           // },
    //           shadowBlur: 10,
    //           shadowColor: '#333'
    //         }
    //       },
    //       symbolSize: 16,
    //       data: [[36.252109, 111.065474, 1],
    //         [36.12109, 111.2065474, 1],
    //         [36.32109, 111.765474, 1],],
    //     },
    //   ]
    // })
    // this.mapOptions = {
    //   grid: {
    //     left: '5%',
    //     bottom: '5%',
    //     right: '5%',
    //     top: '0%',
    //     height: '100%',
    //     containLabel: true
    //   },
    //   geo3D: {
    //     type: 'map3D',//我们需要使用3d地图
    //     map: 'linfen', //地图类型。echarts-gl 中使用的地图类型同 geo 组件相同
    //     colorMaterial: {
    //       detailTexture: mapBg,
    //       textureTiling: 1
    //     },
    //     itemStyle: {
    //       opacity: 0.8,
    //       borderWidth: 1,
    //       borderColor: '#fff',
    //     }
    //   }
    // };
    // let chart = this.$echarts.init(this.$refs.mapChart);
    // chart.setOption(this.mapOptions);
    // window.addEventListener('resize', () => {
    //   chart.resize()
    // })
  },
}
</script>

<style scoped lang="scss">

</style>
