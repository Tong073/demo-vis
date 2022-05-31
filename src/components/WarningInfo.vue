<!--
 描述: 新闻无缝滚动
 作者: Jack Chen
 日期: 2020-04-18
-->

<template>
  <div class="wrap-container sn-container">
    <div class="sn-content">
      <div class="sn-title" style="color: rgb(255, 165, 0);">告警信息</div>
      <div class="sn-body">
        <div class="wrap-container">

          <div class="table">
            <vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="optionSetting">
              <table border="0" cellpadding="0" cellspacing="0" class="item">
                <tbody>
                <tr v-for="(item, index) in listData" :key="index">
                  <td width="100%" class="title">
                    <span>{{index+1}}、{{ item.title }}</span>
                  </td>
                  <td width="20%">
                    <span>{{ item.date }}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'

  export default {
    name: "WaringInfo",
    components: {
      vueSeamlessScroll
    },
    data() {
      return {
        listData: [{
          title: '机器人告警',
          date: '2020-05-05',
          hot: 2306
        }, {
          title: '机器人1失联',
          date: '2020-05-02',
          hot: 5689
        }, {
          title: '温度升高',
          date: '2020-05-02',
          hot: 9
        }, {
          title: '气体浓度超标',
          date: '2020-04-25',
          hot: 288
        }, {
          title: '温度升高',
          date: '2020-04-21',
          hot: 158
        }, {
          title: '气体浓度超标',
          date: '2020-04-20',
          hot: 889
        }, {
          title: '温度升高',
          date: '2020-04-01',
          hot: 5800
        }, {
          title: '气体浓度超标',
          date: '2020-03-25',
          hot: 6
        }, {
          title: '机器人失联失联',
          date: '2020-03-16',
          hot: 88
        }, {
          title: '温度升高',
          date: '2020-03-12',
          hot: 88
        }, {
          title: '机器人失联失联',
          date: '2020-02-28',
          hot: 5
        }, {
          title: '机器人失联失联',
          date: '2020-02-15',
          hot: 258
        }]
      }
    },
    computed: {
      optionSetting() {
        return {
          step: 0.5, // 数值越大速度滚动越快
          limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          // autoPlay: false,
          openWatch: true, // 开启数据实时监控刷新dom
          singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        }
      }
    },
    mounted() {

    },
    methods: {},
    beforeDestroy() {

    }
  };
</script>

<style lang="scss" scoped>
  .sn-container {
    left: 1370px;
    top: 110px;

    %table-style {
      width: 100%;
      height: 35px;
      table-layout: fixed;

      tr {
        td {
          padding: 10px 5px;
          background-color: transparent;
          white-space: nowrap;
          overflow: hidden;
          color: #E2E5FF;
          font-size: 14px;
        }
      }
    }

    .table {
      .table-header {
        @extend %table-style;
      }

      .seamless-warp {
        height: 400px;
        overflow: hidden;
        visibility: visible;

        .colorRed {
          color: #FF4669;
        }

        .colorOrange {
          color: #FFC956;
        }

        .item {
          height: auto;
          @extend %table-style;

          tr {
            td {
              &.title {
                text-overflow: ellipsis;
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
</style>
