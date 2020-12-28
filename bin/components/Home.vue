<template>
  <div id="home">
    <div class="top container-fluid">
      <img class="top-image" src="@/assets/images/blue2.jpg"></img>
    </div>
    </img>

    <div class="left">
      <ul class="nav flex-column bg-white nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/">简介</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"  @click="clickList($event)">帖子</a>
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
              <router-link class="nav-link" to="/topics/topic1">话题1</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/topics/topic2">话题2</router-link>
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
  name: "Home",
  methods: {
    togglePage:function(e) {
      this.$router.push({
        path:e.target.id
      });
    },
    clickList:function(e){
        let hd=e.target.nextElementSibling;//e.target获得事件的触发结点
        
	      if(hd.style.display=="block")hd.style.display="none";
	      else hd.style.display="block";
    }
  }
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
  height: 500px;
  margin: 10px;
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
  margin-left: 20%;
  margin-right: 5%;
  margin-top: 10px;
  overflow: hidden;
  background-color: white;
}

.nav {
  width: 100%;
  font-size: 18px;
  color: black;
  text-align: left;
  margin-left: 1%;
}

/*
.nav-link{
  color:black;
}
.nav-link:hover{
  color:#115ab9;
}*/
.nav-link:focus{
  background:#84ddeb;
  color:white;
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
  display:none;
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
