<template>
  <div class="home">
    <header-top/>
    <div class="left-module">
      <slider-left/>
    </div>
    <!--地图展示-->
    <div class="map-wrapper">
      <div class="data-list-wrapper" style="">
        <div class="list-item">在线设备  <span class="number" style="color: orange">98<span class="number-tip">个</span></span></div>
        <div class="list-item">总设备 <span class="number">100<span class="number-tip">个</span></span></div>
        <div class="list-item">异常设备 <span class="number" style="color:red">2<span class="number-tip">个</span></span></div>
      </div>
      <map-module/>
    </div>
    <div class="right-module">
      <slider-right/>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HeaderTop from '@/components/HeaderTop'
  import SliderRight from "@/components/SliderRight";
  import MapModule from "@/components/MapModule";
  import SliderLeft from "@/components/SliderLeft"

  export default {
    name: 'HomeView',
    components: {
      HeaderTop,
      SliderRight,
      MapModule,
      SliderLeft
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variable.scss";

  .map-wrapper {
    position: fixed;
    top: 100px;
    left: 25%;
    right: 25%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;

    .data-list-wrapper {
      display: flex;
      align-items: center;
      height: 60px;

      .list-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(0 194 229);
        font-size: 1rem;
        padding: 10px;
        margin: 0 10px 0 0;
        box-shadow: 0 4px 8px rgba(255, 165, 0, 0.8);
        border-radius: 10px;

        .number {
          font-size: 1.2rem;
          font-weight: 600;
          color: $base-color;
          margin-left: 6px;
        }
        .number-tip{
          font-size: 1rem;
        }
      }
    }
  }

  .right-module, .left-module {
    position: fixed;
    top: 150px;
    bottom: 0;
    height: calc(100% - 100px);
    z-index: 999;
    width: 20%;
    /*border: 1px solid red;*/
  }

  .left-module {
    left: 20px;
  }

  .right-module {
    right: 20px;
  }
</style>
