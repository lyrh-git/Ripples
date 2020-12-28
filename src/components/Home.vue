<template>
  <div id="home">
    <div class="top container-fluid">
      <img class="top-image" src="@/assets/images/blue2.jpg"></img>
    </div>
    <!-- </img> -->

    <div class="left">
      <ul class="nav flex-column bg-white nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/">简介</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="clickList($event)">帖子</a>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="/posts/realtime">实时</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/posts/popular">热帖</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="clickList($event)">话题</a>
          <ul class="nav flex-column bg-gray">
            <li class="nav-item">
              <router-link class="nav-link" to="/topics/realtime">实时</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/topics/popular">热门</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="clickList($event)">推荐</a>
          <ul class="nav flex-column bg-gray">
            <li class="nav-item">
              <router-link class="nav-link" to="/recommendations/articles">文章</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recommendations/musics">音乐</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recommendations/games">游戏</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <div style="height:200px;width:20px;">
        <div style="clear:both">
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <router-view></router-view>

      </div>
    </div>
    <!-- <eyes>this is eyesmove</eyes> -->
    <!-- <kid>this live2d kid</kid> -->

  </div>

</template>

<script>
// import eyes from '@/components/eyes'
// import kid from '@/components/kid'

export default {
  name: "Home",
  data() {
    return {
    };
  },
  mounted() {
    //initTopics();
  },
  methods: {
    /*
    initTopics:function(){
      axios
        .post(
          "http://localhost:8080/Ripples_API/Home/HotTopicsServlet",
        )
        .then(response => {
          this.topics= eval("(" + JSON.stringify(response) + ")").topics;
          })
        .catch(error => {

        });
    },*/
    togglePage: function(e) {
      this.$router.push({
        path: e.target.id
      });
    },
    clickList: function(e) {
      let hd = e.target.nextElementSibling; //e.target获得事件的触发结点

      if (hd.style.display == "block") hd.style.display = "none";
      else hd.style.display = "block";
    }
  }
  // components:{eyes,kid},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-image {
  object-fit: cover; /*自适应长宽*/
  align-self: center;
  width: 100%;
  height: 300px;
}
.left {
  float: left;
  width: 10%;
  /* height: 500px; */
  margin: 20px;
  margin-left: 2%;
  overflow: hidden;
  padding-top: 0px;
}
.main {
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;
  margin-left: 15%;
  margin-right: 5%;
  margin-top: 20px;
  overflow: hidden;
  /* background-color: white; */
}

.nav {
  width: 100%;
  font-size: 18px;
  color: black;
  text-align: left;
  margin-left: 1%;
  border-radius: 10px;
}

/*
.nav-link{
  color:black;
}
.nav-link:hover{
  color:#115ab9;
}*/
.nav-link:focus {
  background: #84ddeb;
  color: white;
}

/*
.nav li:first-child a:link{
    background:#84ddeb;
    color:white;
}*/

/*
.left a{
  color:black;
}*/

li ul {
  margin-top: 1px;
  padding-left: 1em;
  list-style-type: none;
  display: none;
}
li ul a {
  /*display: block;*/
  font-size: 16px;
  text-decoration: none;
  background-color: #fdffff;
  border-top: 1px #dcf5fd solid;
  border-bottom: 1px #dcf5fd solid;
  padding: 0.3em 1em;
}
li ul li:last-child a {
  border-bottom: 0;
}
li ul a:focus {
  opacity: 0.9;
}
</style>
<!--<script >

    ! function () {
        function o(w, v, i) {
            return w.getAttribute(v) || i
        }
        function j(i) {
            return document.getElementsByTagName(i)
        }
        function l() {
            var i = j("script"),
                w = i.length,
                v = i[w - 1];
            return {
                l: w,
                z: o(v, "zIndex", -1),
                o: o(v, "opacity", 0.5),
                c: o(v, "color", "0,0,0"),
                n: o(v, "count", 99)
            }
        }
        function k() {
            r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
        function b() {
            e.clearRect(0, 0, r, n);
            var w = [f].concat(t);
            var x, v, A, B, z, y;
            t.forEach(function (i) {
                i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i.y < 0 ? -1 : 1, e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
                for (v = 0; v < w.length; v++) {
                    x = w[v];
                    if (i !== x && null !== x.x && null !== x.y) {
                        B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
                        y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
                    }
                }
                w.splice(w.indexOf(i), 1)
            }), m(b)
        }
        var u = document.createElement("canvas"),
            s = l(),
            c = "c_n" + s.l,
            e = u.getContext("2d"),
            r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
                window.setTimeout(i, 1000 / 45)
            },
            a = Math.random,
            f = {
                x: null,
                y: null,
                max: 20000
            };
        u.id = c;
        u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
        j("body")[0].appendChild(u);
        k(), window.onresize = k;
        window.onmousemove = function (i) {
            i = i || window.event, f.x = i.clientX, f.y = i.clientY
        }, window.onmouseout = function () {
            f.x = null, f.y = null
        };
        for (var t = [], p = 0; s.n > p; p++) {
            var h = a() * r,
                g = a() * n,
                q = 2 * a() - 1,
                d = 2 * a() - 1;
            t.push({
                x: h,
                y: g,
                xa: q,
                ya: d,
                max: 6000
            })
        }
        setTimeout(function () {
            b()
        }, 100)
    }();
    
</script>-->