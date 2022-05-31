<template>
  <div>
    <div class="wrapper-comm">
      <div class="title">环境监测</div>
      <div>
        <div id="echartsMain" class="echarts-main"></div>
      </div>
    </div>
    <div class="wrapper-comm">
      <warning-info/>
    </div>
  </div>
</template>

<script>
  import WarningInfo from "@/components/WarningInfo";

  export default {
    name: "SlideRight",
    components: {
      WarningInfo
    },
    data() {
      return {
        swiperOption: {
          loop: true, //是否循环轮播
          direction: 'vertical',
          speed: 1000, //切换速度
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          }
        },
        swiperTextList: [{warningText: '机器失联告警', date: '2022-2-13'},
          {warningText: '机器人温度过高', date: '2022-2-13'},
          {warningText: '环境气体浓度超标', date: '2022-2-13'},
          {warningText: '环境气体浓度超标1', date: '2022-2-14'},
          {warningText: '环境气体浓度超标23', date: '2022-2-13'},
          {warningText: '环境气体浓度超标4', date: '2022-2-13'},
          {warningText: '环境气体浓度超标4', date: '2022-2-13'},
          {warningText: '环境气体浓度超标5', date: '2022-2-13'},
          {warningText: '环境气体浓度超标3', date: '2022-2-13'}]
      }
    },
    mounted() {
      console.log(this.$echarts);
      this.$nextTick(() => {
        this.getEchart();
        // this.getSwiper();
      })
    },
    methods: {
      getEchart() {
        console.log(this.$echarts);
        console.log((this.$three));
        var myChart = this.$echarts.init(document.getElementById('echartsMain'));
        var option = {
          legend: {
            data: ['溫度']
          },
          xAxis: {
            data: ["12", "13", "14", "15", "16", "17"],
            axisLabel: {
              color: '#FFA500'
            }
          },
          yAxis: {
            name: '温度/℃',
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#FFA500'
            },
            nameTextStyle: {
              color: '#FFA500'
            }
          },
          series: [{
            name: '销量',
            type: 'line',
            smooth: true,
            data: [25, 20, 36, 40, 28, 20],
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,255,0.9)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,222,173,0.3)' // 100% 处的颜色
                }]
              }
            }
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .echarts-main {
    height: 300px;
    width: 100%;
  }

  .wrapper-comm {
    overflow: hidden;
    background-image: url("/src/assets/image/frame.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 28px;
    height: 40%;
    box-sizing: border-box;
    margin-bottom: 30px;

    .title {
      color: rgb(255, 165, 0);
      font-weight: 600;
    }
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 35px;
  }
</style>