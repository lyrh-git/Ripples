<template>
  <div id="app">
    <navbar :key="this.$store.state.user_id">this is navbar</navbar>
    <!--:key绑定可以监督属性值的变化来强制重新渲染组件，只能用在组件，不能用在组件里面的代码的某一部分，即在navbar.vue里面的某一个div设置key是没用的-->
    <router-view/>
    <v-dialog/>
    <!-- <div id="left-bottom" style="width:100px;height:150px;position:absolute;bottom:50px;left:30px;">
      <div style="clear:both"></div>
    </div> -->
  </div>

</template>

<script>
import navbar from "@/components/navbar";
import sentences from "@/data/sentences";
// import axios from 'axios';

export default {
  name: "App",
  components: { navbar },
  data() {
    return {
      text: ""
    };
  },
  mounted() {
    this.tryAutoLogin();
  },
  methods: {
    tryAutoLogin: function() {
      if (this.$store.state.user_id) return;
      var auto_user_id = window.localStorage.getItem("user_id");
      if (auto_user_id) {
        var user = {
          user_id: auto_user_id,
          user_name: window.localStorage.getItem("user_name"),
          user_img: window.localStorage.getItem("user_img")
        };
        this.$store.commit("login", user);
        this.$router.push({ path: "/personal" });
      }
    }
  },

  // data(){
  //   return{
  //     login_user:this.$store.state.user
  //   }
  // },
  //   computed:{
  //     login_user(){
  //         return this.$store.state.user;
  //     }
  // },
  created() {
    var a = $("<div></div>");
    a.css({
      width: "120px",
      height: "150px",
      position: "fixed",
      bottom: "50px",
      left: "0px"
    });
    $("body").append(a);
    var a_idx = 0;
    a.click(function(e) {
      var a = sentences.sentences;
      var $i = $("<span></span>").text(a[a_idx]);
      a_idx = (a_idx + 1) % a.length;
      // var x = e.pageX,
      var x = 150,
        y = e.pageY;
      $i.css({
        "z-index": 999,
        top: y - 20,
        left: x,
        position: "absolute",
        "font-weight": "bold",
        fontSize: "18px",
        color:
          "rgb(" +
          Math.floor(Math.random() * 200) + //0~200
          "," +
          (Math.floor(Math.random() * 130) + 70) + //70~200
          ",255,0.8)"
      });
      $("body").append($i);
      $i.animate(
        {
          top: y - 180,
          opacity: 0
        },
        3000,
        function() {
          $i.remove();
        }
      );
    });

    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: "static/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-tororo/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            "/static/live2dw/live2d-widget-model-tororo/assets/tororo.model.json"
        },
        display: { position: "left", width: 150, height: 300 }, //大小位置
        mobile: { show: true }, //跟着鼠标动
        log: false
      });
    }, 1000);
  },
  /* mounted() {
    var a_idx = 0;
    $("#left-bottom").click(function(e) {
      var a = sentences.sentences;
      var $i = $("<span></span>").text(a[a_idx]);
      a_idx = (a_idx + 1) % a.length;
      // var x = e.pageX,
      var x=150,
        y = e.pageY;
      $i.css({
        "z-index": 999,
        top: y - 20,
        left: x,
        position: "absolute",
        "font-weight": "bold",
        fontSize:"18px",
        color:
          "rgb(" +
          Math.floor(Math.random() * 200) +//0~200
          "," +
          (Math.floor(Math.random() * 130)+70) +//70~200
          ",255,0.8)"
      });
      $("body").append($i);
      $i.animate(
        {
          top: y - 180,
          opacity: 0
        },
        3000,
        function() {
          $i.remove();
        }
      );
    });

  },*/
  computed: {
    sentences() {
      return sentences.sentences;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #edf0f4; /*#e8e2e2*/
}
</style>



