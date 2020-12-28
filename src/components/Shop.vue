<!--主页面 首页-->
<template>
  <div id="home">
    <div class="left">
      <ul class="nav flex-column bg-white">
        <li class="nav-item introduction">
          <router-link class="nav-link" to="/shop/popularGoods">最热</router-link>
        </li>
        <li class="nav-item introduction">
          <router-link class="nav-link" to="/shop/relief">解压</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shop/outlet">发泄</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shop/quiet">静心</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main-content">
        <router-view></router-view>

      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "Shop",
  methods: {
    togglePage: function(e) {
      this.$router.push({
        path: e.target.id
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
  float: left;
  width: 15%;
  height: 500px;
  margin: 10px;
  margin-left: 2%;
  margin-top:70px;
  overflow: hidden;
  padding-top: 0px;
  position:fixed;
}
.main {
  width: 100%;
  height: 100%;
  padding-top:50px;
}
.main-content {
  height: 100%;
  margin-left: 20%;
  margin-right: 5%;
  margin-top: 20px;
  overflow: hidden;
  background-color: white;
  padding:3%;
}

.nav {
  width: 100%;
  font-size: 18px;
  color: black;
  text-align: left;
  margin-left: 1%;
}

.nav-link:focus {
  background: #84ddeb;
  color: white;
}

li ul {
  margin-top: 1px;
  padding-left: 1em;
  list-style-type: none;
  display: none;
}
/*router-link最后会生成 <a> 所以这里写的是 a */
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




