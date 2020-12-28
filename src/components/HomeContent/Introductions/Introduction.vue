<template>
  <div class="introduction">
    <div class="wrap">
      <h1 style="color:lightblue;font-weight:600">你好，亲爱的陌生人^v^</h1><br>
      <h3>期待你的心灵，在Ripples漾起曼妙的涟漪。在这里，你可以说出自己的心里话，找到自己共情的话题，感知自己的情绪变化。
        <br><br>最重要的是，每天都要开心哦！毕竟，所有的今天，都是昨天的明天，它是这样不容易地来到了我们身边。
      </h3>
      <!-- <p style="margin-bottom:10px;">每个人都是这个世界的唯一，你的乐观，你的善良，你的倔强，都是自己独一无二的价值。</p>
      <p style="margin-bottom:10px;">每个人都有五彩缤纷的感情，你的开心，你的悲伤，你的忧愁，都是自己生而为人的体现。</p> -->
      <!-- <p style="margin-bottom:10px;">愿你可以在此间，诉说心情，获取纾解，搭建属于自己的一片小天地。。</p>
      <p style="margin-bottom:10px;">最重要的是，每天都要开心哦！毕竟，所有的今天，都是昨天的明天，它是这样不容易地来到了我们身边。</p> -->

    </div>
    <h1 style="color:lightblue;font-weight:600;margin:0 0 10px 20px;">帖子</h1>
    <div class="wrap">
      <h2>世界，你好！</h2>
      <p>这是我的第一篇帖子。。。</p>
    </div>
    <h1 style="color:lightblue;font-weight:600;margin:0 0 10px 20px;">话题</h1>
    <div class="wrap">
      <h2 style="color:royalblue" >
        <icon name="gem" id="top_icon" class="fa fa-5x" color="royalblue"></icon>
        生活
      </h2>
      <p>关注生活，珍惜美好，专心眼前的风景，不回头，路，就在前方。</p>
    </div>
    <h1 style="color:lightblue;font-weight:600;margin:0 0 10px 20px;">情绪曲线</h1>
    <div class="wrap">
      <div id="chart" style="width:600px;height:400px"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Introduction",
  mounted() {
    var option = {
      title: {
        text: "最近一月情绪值"
      },
      tooltip: {},
      /*legend: {
          data: ["情绪值"]
        },*/
      xAxis: {
        data: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ]
      },
      yAxis: {},
      series: [
        {
          name: "情绪值",
          type: "line",
          data: [
            10,
            -5,
            12,
            26,
            32,
            -19,
            -31,
            -2,
            5,
            10,
            18,
            29,
            40,
            50,
            -22,
            12,
            -8,
            50,
            -30,
            -64,
            12,
            22,
            23,
            44,
            77,
            32,
            16,
            8,
            -35,
            2
          ],
          itemStyle: {
            normal: {
              color: "skyblue",
              lineStyle: {
                width: 3 //设置线条粗细
              }
            }
          },
          markLine: {
            data: [
              [
                {
                  // name: "标线1起点",
                  x: 60,
                  yAxis: 10.4,
                  symbol: "none"
                },
                {
                  name: "  " + 10.4,
                  x: 540,
                  yAxis: 10.4,
                  symbol: "none"
                }
              ]
            ],
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: 10.4
              }
            },
            lineStyle: {
              normal: {
                type: "solid",
                color: "royalblue"
              }
            }
          }
        }
      ]
    };
    this.chart = this.$echarts.init(document.getElementById("chart"));
    this.chart.setOption(option, true);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.introduction {
  text-align: left;
}
.wrap {
  margin-bottom: 30px;
  padding: 20px;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
.wrap p {
  color: grey;
  font-size: 16px;
  margin-top: 15px;
  text-align: left;
}
#top_icon {
  width: 25px;
  height: 25px;
}
</style>
