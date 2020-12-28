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
    <div class="user" id="user">
      <router-link class="login" to="/login">登录</router-link>
    </div>
    <div class="user">
      <router-link class="register" to="/register">注册</router-link>
    </div>

  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    togglePage(e) {
      var item = e.target;
      this.$router.push({ path: item.id });

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
    },/*
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
  height: 50px;
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

.user {
  width: 50px;
  margin-right: 10px;

}
.login {
  font-size: 15px;
  float: right;
}
.login:focus {
  color: gray;
}
.register {
  font-size: 15px;
  float: right;
}
.register:focus {
  color: gray;
}
</style>
