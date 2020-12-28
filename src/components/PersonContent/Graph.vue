<template>
  <div class="graph">
    <div class="top">
      <p class="title">情绪曲线</p>
      <div class="thread"></div>
    </div>
    <div class="message">
      <div class="wrap">
        <div class="select">
          <div class="eachSelect">
            <select class="form-control" v-model="chooseGraph" style="background:rgb(255,255,255,0.2)">
              <option>柱状图</option>
              <option>折线图</option>
              <option>饼图</option>
            </select>
          </div>
          <div class="eachSelect">
            <select class="form-control" v-model="chooseTime" style="background:rgb(255,255,255,0.2)">
              <option>最近一周</option>
              <option>最近一月</option>
            </select>
          </div>
        </div>
      </div>
      <div id="chart" style="width:600px;height:400px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graph",
  data() {
    return {
      chart: null,
      xWeek: [],
      xMonth: [],
      dataWeek: [], //一周情绪值
      dataMonth: [], //一月情绪值

      chooseTime: "最近一周", //周 月
      chooseGraph: "柱状图", //柱状图 折线图 饼图

      weekPos: 4,
      weekNeg: 3,
      weekMean: 0,
      monthPos: 21,
      monthNeg: 9,
      monthMean: 0
    };
  },
  mounted() {
    this.initData();
    this.initChart();
  },
  computed: {
    optionWeekBar: function() {
      var option = {
        title: {
          text: "最近一周情绪值"
        },
        tooltip: {},
        /*legend: {
          orient: "vertical",
          x: "right",
          data: ["一周情绪值"]
        },*/
        xAxis: {
          data: this.xWeek
        },
        yAxis: {},
        series: [
          {
            name: "情绪值",
            type: "bar",
            itemStyle: {
              color: function(params) {
                var index_color = params.value;
                if (index_color >= 0) {
                  return "skyblue";
                } else {
                  return "rgb(200,200,200)";
                }
              }
            },
            data: this.dataWeek,
            markLine: {
              data: [
                [
                  {
                    // name: "标线1起点",
                    x: 60,
                    yAxis: this.weekMean,
                    symbol: "none"
                  },
                  {
                    name: "  " + this.weekMean,
                    x: 540,
                    yAxis: this.weekMean,
                    symbol: "none"
                  }
                ]
              ],
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: this.weekMean
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
      return option;
    },
    optionWeekLine: function() {
      var option = {
        title: {
          text: "最近一周情绪值"
        },
        tooltip: {},
        /*legend: {
          orient: "vertical",
          x: "right",
          data: ["情绪值"]
        },*/
        xAxis: {
          data: this.xWeek
        },
        yAxis: {},
        series: [
          {
            name: "情绪值",
            type: "line",
            data: this.dataWeek,
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
                    yAxis: this.weekMean,
                    symbol: "none"
                  },
                  {
                    name: "  " + this.weekMean,
                    x: 540,
                    yAxis: this.weekMean,
                    symbol: "none"
                  }
                ]
              ],
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: this.weekMean
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
      return option;
    },
    optionWeekPie: function() {
      var option = {
        title: {
          text: "最近一周情绪值"
        },
        tooltip: {
          formatter: "{c}天"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["好", "坏"]
        },
        series: [
          {
            name: "一周情绪值",
            type: "pie", // 设置图表类型为饼图
            // radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: this.weekPos, name: "好" },
              { value: this.weekNeg, name: "坏" }
            ],

            color: ["skyblue", "lightgray"],
            //center: ['40%', '45%'], //设置饼的原心坐标 不设置就会默认在中心的位置
            radius: ["50%", "65%"], //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
            itemStyle: {
              //图形样式
              normal: {
                //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label: {
                  //饼图图形上的文本标签
                  show: true, //平常不显示
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold",
                    color:
                      this.monthPos >= this.monthNeg ? "skyblue" : "lightgray"
                  },
                  formatter:
                    this.weekPos >= this.weekNeg ? "(*^▽^*)" : "o(╥﹏╥)o" // {b}:数据名； {c}：数据值； {d}：百分比
                }
              }
            }
          }
        ]
      };
      return option;
    },
    optionMonthBar: function() {
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        title: {
          text: "最近一月情绪值",
          left: "left",
          textStyle: {
            color: "black"
          }
        },
        /*legend: {
          orient: "vertical",
          x: "right",
          data: ["情绪值"]
        },*/
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            data: this.xMonth
          }
        ],
        yAxis: {},
        series: [
          {
            name: "情绪值",
            type: "bar",
            itemStyle: {
              color: function(params) {
                var index_color = params.value;
                if (index_color >= 0) {
                  return "skyblue";
                } else {
                  return "rgb(200,200,200)";
                }
              }
            },
            data: this.dataMonth,
            markLine: {
              data: [
                [
                  {
                    // name: "标线1起点",
                    x: 60,
                    yAxis: this.monthMean,
                    symbol: "none"
                  },
                  {
                    name: "  " + this.monthMean,
                    x: 540,
                    yAxis: this.monthMean,
                    symbol: "none"
                  }
                ]
              ],
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: this.monthMean
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
      return option;
    },
    optionMonthLine: function() {
      var option = {
        title: {
          text: "最近一月情绪值"
        },
        tooltip: {},
        /*legend: {
          data: ["情绪值"]
        },*/
        xAxis: {
          data: this.xMonth
        },
        yAxis: {},
        series: [
          {
            name: "情绪值",
            type: "line",
            data: this.dataMonth,
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
                    yAxis: this.monthMean,
                    symbol: "none"
                  },
                  {
                    name: "  " + this.monthMean,
                    x: 540,
                    yAxis: this.monthMean,
                    symbol: "none"
                  }
                ]
              ],
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: this.monthMean
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
      return option;
    },
    optionMonthPie: function() {
      var option = {
        title: {
          text: "最近一月情绪值"
        },
        tooltip: {
          formatter: "{c}天"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["好", "坏"]
        },
        series: [
          {
            name: "一月情绪值",
            type: "pie", // 设置图表类型为饼图
            // radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: this.monthPos, name: "好" },
              { value: this.monthNeg, name: "坏" }
            ],

            color: ["skyblue", "lightgray"],
            //center: ['40%', '45%'], //设置饼的原心坐标 不设置就会默认在中心的位置
            radius: ["50%", "65%"], //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
            itemStyle: {
              //图形样式
              normal: {
                //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label: {
                  //饼图图形上的文本标签
                  show: true, //平常不显示
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold",
                    color:
                      this.monthPos >= this.monthNeg ? "skyblue" : "lightgray"
                  },
                  formatter:
                    this.monthPos >= this.monthNeg ? "(*^▽^*)" : "o(╥﹏╥)o" // {b}:数据名； {c}：数据值； {d}：百分比
                }
              }
            }
          }
        ]
      };
      return option;
    },
    option: function() {
      if (this.chooseTime == "最近一周") {
        if (this.chooseGraph == "柱状图") return this.optionWeekBar;
        if (this.chooseGraph == "折线图") return this.optionWeekLine;
        if (this.chooseGraph == "饼图") return this.optionWeekPie;
      }
      if (this.chooseTime == "最近一月") {
        if (this.chooseGraph == "柱状图") return this.optionMonthBar;
        if (this.chooseGraph == "折线图") return this.optionMonthLine;
        if (this.chooseGraph == "饼图") return this.optionMonthPie;
      }
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val, true); //
    }
  },
  methods: {
    initData: function() {
      let send = {
        user_id: this.$store.state.user_id
      };
      axios
        .post(
          "/api/Ripples_API/Person/GraphServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          var data = JSON.parse(JSON.stringify(response.data)).data;
          var i=0;
          for (let x of data.dataWeek) {
            if (x > 99) data.dataWeek[i]=null;
            i++;
          }
          i=0;
          for (let x of data.dataMonth) {
            if (x > 99) data.dataMonth[i]=null;
            i++;
          }
          this.dataWeek = data.dataWeek;
          this.dataMonth = data.dataMonth;
          this.xWeek = data.xWeek;
          this.xMonth = data.xMonth;
          this.initExtraData();
        })
        .catch(error => {
          alert(error);
        });
    },
    initExtraData: function() {
      var n = 0;
      var a = 0;
      for (let x of this.dataWeek) {
        if (x >= 0) n += 1;
        a += x;
      }
      this.weekPos = n;
      this.weekNeg = 7 - n;
      this.weekMean = parseInt(a / 7.0 * 100) / 100.0;
      n = 0;
      a = 0;
      for (let x of this.dataMonth) {
        if (x >= 0) n += 1;
        a += x;
      }
      this.monthPos = n;
      this.monthNeg = 30 - n;
      this.monthMean = parseInt(a / 30.0 * 100) / 100.0;
    },
    initChart: function() {
      this.chart = this.$echarts.init(document.getElementById("chart"));
      this.chart.setOption(this.option, true);
    }
  }
};
</script>

<style scoped>
.graph {
  padding: 20px;
  width: 95%;
  overflow: hidden;
}

/* .top { 
  width: 95%; 
}*/
.title {
  font-size: 25px;
  font-weight: 600;
}
.thread {
  position: relative;
  /* left:150px; */
  border-top: 1px solid black;
  /* color:rgb(160, 159, 159); */
  margin-top: 10px;
}

.message {
  margin-top: 20px;
}
.wrap {
  float: right;
}
.select {
  display: inline-block;
}
.select .eachSelect {
  display: table-cell;
  margin-right: 20px;
  width: 100px;
  background-color: rgb(255, 255, 255, 0.5);
}
</style>
