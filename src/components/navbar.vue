<template>
  <nav class="navbar navbar-expand bg-white navbar-light fixed-top">
    <!--图标-->
    <img class="navbar-brand" src="@/assets/images/logo3.png"></img>
    <!--搜索框-->
    <form action='#'>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control border border-right-0" placeholder="search something" id="search_content" name="search_content" />
        <div class="input-group-append">
          <button class="btn btn-white border border-left-0" type="submit">
            <icon name="search" color="gray"></icon>
          </button>
        </div>
      </div>
    </form>
    <!--导航条-->
    <ul class="navbar-nav">
      <!--ref="nav"-->
      <li class="nav-item">
        <router-link class="nav-link clicked" to="/">首页</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/shop/popularGoods">商城</router-link>
      </li>
    </ul>
    <!-- <li class="dropdown"> -->
    <div class="user dropdown" v-if="login_user!=0">
      <router-link to="/personal" data-toggle="dropdown">
        <img class="login_user_img" :src="login_user_img" />
      </router-link>

      <ul class="dropdown-menu">
        <li>
          <router-link to="/personal">用户中心</router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/person">个人资料</router-link>
        </li>
        <li>
          <router-link to="/person/graph">情绪曲线</router-link>
        </li>
        <li>
          <router-link to="/person/post">我的帖子</router-link>
        </li>
        <li>
          <router-link to="/person/interest">我的关注</router-link>
        </li>
        <li>
          <router-link to="/person/collect">我的收藏</router-link>
        </li>
        <li>
          <router-link to="/person/comment">我的评论</router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link to="/person/cloud">词云</router-link>
        </li>
        <li>
          <router-link to="/recommendations/articles">推荐</router-link>
        </li>
        <li>
          <router-link to="/person/test">测试</router-link>
        </li>
        <li class="divider"></li>
        <li>
          <a class="exit" @click="exit()">退出登录</a>
        </li>
      </ul>
    </div>

    <div v-else class="loginOrRegister">
      <!-- <div class="user" id="user"> -->
      <router-link class="login" to="/login">登录</router-link>
      <!-- </div> -->
      <!-- <div class="user"> -->
      <router-link class="register" to="/register">注册</router-link>
      <!-- </div> -->
    </div>
    <!-- </li> -->
    <!-- </ul> -->
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      // login_user: this.$store.state.user_id,
      // login_user_img: this.$store.state.user_img
    };
  },
  computed:{
    login_user:function(){
      return this.$store.state.user_id
    },
    login_user_img:function(){
      return this.$store.state.user_img
    }
  },
  mounted: function() {
    var $dropdownLi = $(".dropdown"); //设置hover时open

    $dropdownLi
      .mouseover(function() {
        $(this).addClass("open");
      })
      .mouseout(function() {
        $(this).removeClass("open");
      });
    // $(".dropdown-menu")
    //   .mouseover(function() {
    //     $(this).addClass("open");
    //   })
    //   .mouseout(function() {
    //     $(this).removeClass("open");
    //   })
    //   .click(function() {
    //     // location.reload();
    //     this.$router.push({ path: "/person" });
    //   });
  },
  //   watch: {
  //     user: function (newValue,oldValue) {
  //                         this.$nextTick(()=>{

  //                     // this.reFresh = true
  //                 })
  //     },

  //   },
  //   computed:{
  //     login_user:{
  //       get:function(){
  //         return this.user;
  //       }
  //     }
  //   },
  methods: {
    exit: function() {
      // alert("exit");
      this.$store.commit("exit");
      this.$router.push({ path: "/" });
    }
    // togglePage(e) {
    //   var item = e.target;
    // this.$router.push({ path: item.id });
    /*
         var nav=this.$refs.nav;
         
      
      nav.find("li").each(function () {//this.$refs获得dom结点
            var a = this.find("a")[0];
            
            if (a.id === item.id) {
                alert('here');
                this.addClass("active");
            } else {
                this.removeClass("active");
            }
        });
        this.$router.push({ path: item.id});
        */
    // },
    /*
    IsPC: function() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    href() {
      if (!this.$emit.IsPC()) {
        window.location.href = "http://www.。。。。。。";
      } else {
      }
    }*/
  }
};
</script>

<style scoped>
.navbar {
  padding: 0px 10px;
  height: 60px;
  width: 100%;
}
.navbar-brand {
  width: 100px;
  margin-left: 10px;
}

.input-group {
  width: 200px;
  margin-top: 20px;
  margin-left: 30px;
}
.navbar-nav {
  margin-top: 5px;
  width: 90%;
}
.nav-item {
  width: 100px;
  font-size: 18px;
  text-align: center;
}

/*登录后*/
.user {
  margin-right: 10px;
}
.login_user_img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover; /*自适应长宽*/
  align-self: center;
  /* position: fixed; */
}
/*登录前*/
.loginOrRegister {
  width: 100px;
  margin-right: 10px;
  float: right;
}
.login {
  font-size: 15px;
  margin: 5px;
  /* float: left; */
}
.login:focus {
  color: gray;
}
.register {
  font-size: 15px;
  /* float: right; */
}
.register:focus {
  color: gray;
}

/* .dropdown {
  border: 1px solid green;
} */
/*下拉菜单*/
.dropdown-menu {
  /*这里是absolute状态,相对上面的头像的位置 */
  max-width: 200px;
  min-width: 50px;
  width: 100px;
  color: gray;
  /* display: block; */
  /* border:1px solid red; */
  left: -80px;
  /* top:-10px; */
  /* padding:0; */
  text-align: center;
  box-shadow: 0;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 0 0 0;
}
.dropdown-menu li {
  /* border:1px solid red; */
  /* width:100px; */
  /* padding:0; */
  /* margin:5px; */
  margin-bottom: 5px;
  text-align: center;
}

.dropdown-menu li a {
  /* border:1px solid red; */
  /* width:50px; */
  padding: 0;
  color: lightslategray;
  /* margin-right: 0; */
}
.divider {
  margin: 0;
}
.exit {
  cursor: pointer;
}
</style>
