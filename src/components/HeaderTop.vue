<template>
  <div class="header">
    <div class="header__title">
      智能变电站可视化系统
    </div>
    <div class="header__info-wrapper">
      <div>{{dateStr}}</div>
      <div class="header__login-info">
        <div style="margin-right: 30px"><i class="el-icon-user"></i>admin</div>
        退出
        <div style="margin-left: 20px"><i class="el-icon-setting"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  let dateInterval = null;
  Date.prototype.format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  };
  export default {
    name: "HeaderTop",
    data() {
      return {
        dateStr: '',
      }
    },
    destroyed() {
      clearInterval(dateInterval);
    },
    computed:{
    },
    mounted() {
      this.getDateStr();
    },
    methods: {
      getDateStr() {
        dateInterval = setInterval(()=>{
          this.dateStr = new Date().format('yyyy-MM-dd hh:mm:ss');
        },1000);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/variable.scss";

  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100px;

    &__title {
      overflow: hidden;
      width: 100%;
      height: 100%;
      font-size: 2rem;
      font-weight: 600;
      color: $base-color;
      line-height: 100px;
      letter-spacing: 30px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: auto;
      background-position: center;
      background-image: url("/src/assets/image/header-bg.png");
    }

    &__info-wrapper {
      position: fixed;
      top: 0;
      left: 40px;
      right: 50px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      height: 90px;
      font-size: 1.2rem;
      color: $base-color;
      font-weight: 600;
    }

    &__login-info {
      display: flex;
      align-items: center;
    }
  }

</style>