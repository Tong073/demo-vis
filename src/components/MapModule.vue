<!--
 描述: 3D立体柱状图
 作者: Jack Chen
 日期: 2020-04-18
-->

<template>
  <div class="wrap-container trigle">
    <div class="bar bar-img"></div>
    <div class="bar bar-img1"></div>
    <div class="bar bar-img2"></div>
    <div>{{selectItem}}</div>
    <div class="chartsdom" id="chart_3d"></div>
  </div>
</template>

<script>
  export default {
    name: "MapModule",
    data() {
      return {
        option: null,
        selectItem:''
      }
    },
    mounted() {
      this.getEchart();
    },
    methods: {
      getEchart() {
        let myChart = this.$echarts.init(document.getElementById('chart_3d'));
        let xData = ['20-25', '25-30', '30-35', '35-40', '40-45', '45-50'];
        let days = ['1', '2', '3', '4', '5', '6'];
        let data =  //数据中可增加机器人的信息
          [[0, 0, 1, 1],
          [0, 1, 1, 2],
          [0, 2, 1, 3],
          [0, 3, 1, 4],
          [0, 4, 1, 5],
          [0, 5, 1, 6],

          [1, 5, 1.5, 7],
          [1, 1, 1.5, 8],
          [1, 2, 1.5, 9],
          [1, 3, 1.5, 10],
          [1, 4, 1.5, 11],
          [1, 0, 1.5, 12],

          [2, 2, 1, 13],
          [2, 1, 1, 14],
          [2, 2, 1, 15],
          [2, 5, 1, 16],
          [2, 0, 1, 17],
          [2, 0, 1, 18],

          [3, 2, 1.5, 19],
          [3, 3, 1.5, 20],
          [3, 2, 1.5, 21],
          [3, 5, 1.5, 22],
          [3, 1, 1.5, 23],
          [3, 0, 1.5, 24],

          [4, 2, 2,25],
          [4, 0, 2,26],
          [4, 1, 2,27],
          [4, 4, 2,28],
          [4, 1, 2,29],
          [3, 1, 2,30],

          [5, 2, 4, 31],
          [5, 1, 4, 32],
          [5, 1, 4, 33],
          [5, 5, 4, 34],
          [5, 2, 4, 35],
          // [3, 2, 5, 36]
        ];

        this.option = {
          tooltip: {
            backgroundColor:'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
            padding: 5,
            formatter: (params) => {
              let html = `${params.seriesName}${params.value[3]}`;
              return html;
            },
            textStyle: {
              color: '#FFA500',
              fontSize: 16
            }
          },
          xAxis3D: {
            type: 'category',
            data: xData
          },
          yAxis3D: {
            type: 'category',
            data: days
          },
          zAxis3D: {
            type: 'value'
          },
          grid3D: {
            show: false,
            boxWidth: 160,
            boxDepth: 80,
            viewControl: {
              alpha: 180,
              beta: 15
            }
          },
          series: [{
            type: 'bar3D',
            name: '机器人',
            data: data.map((item) => {
              return {
                value: [item[1], item[0], item[2], item[3]],
              }
            }),
            shading: 'lambert',
            label: {
              show: false
            },
            itemStyle: {
              color: '#0084ff',
              opacity: 0.8
            },
            emphasis: {
              label: {
                show: false
              },
              itemStyle: {
                color: '#0084ff'
              }
            }
          }]
        }

        myChart.setOption(this.option, true);

        window.addEventListener('resize', () => {
          myChart.resize();
        });
        myChart.on('click',(params)=>{
          console.log(params);
          let item =`${params.seriesName}${params.value[3]}`
          this.selectItem = item;
          //可处理点击事件
          console.log(item);
        })
      }
    },
    beforeDestroy() {

    }
  };
</script>

<style lang="scss" scoped>
  .trigle {
    width: 100%;
    height: 90%;

    .chartsdom {
      width: 100%;
      height: 100%;
    }

    .bar {
      width: 100%;
      height: 100%;
      position: absolute;

      &.bar-img {
        bottom: 0;
        background: url(/src/assets/image/bk_circle.png) no-repeat center 97%;
        background-size: 100%;
        filter: hue-rotate(180deg);
      }

      &.bar-img1 {
        bottom: 30%;
        background: url(/src/assets/image/bk_circle1.png) no-repeat center 97%;
        background-size: 75%;
        filter: hue-rotate(180deg);
      }

      &.bar-img2 {
        bottom: 60%;
        background: url(/src/assets/image/bk_circle2.png) no-repeat center 97%;
        background-size: 50%;
        filter: hue-rotate(180deg);
      }
    }

  }
</style>
