<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>

let echart = require('echarts')
export default {
  data() {
    return {};
  },
  mounted() {
    //初始化
    let myChar = echart.init(document.getElementById("container"));
    //初始化配置项
    let options = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
    };
    //给图表设置配置项
    myChar.setOption(options);
  },
};
</script>

<style lang="" scoped>
#container {
  width: 600px;
  height: 500px;
}
</style>
