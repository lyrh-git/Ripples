<template>
  <div class="whole">
    <div class="bg" :style="{backgroundImage:'url(' + background_img + ')'}">
    <!-- <div class="bg" style="backgroundImage:'url('/static/images_background/1.jpg')'"> -->
      <!-- <div class="bg"> -->
    </div>

    <!-- <div class="text"> -->
    <div class="wrap">
      <div class="content">
        <div>
          <img class="user_img" :src="user_img" alt="头像" />
          <div class="info">
            <p class="name">{{user}}</p>
            <p class="motto">{{motto}}</p>
            <div class="thread"></div>
          </div>

          <div style="clear:both"></div>
        </div>

        <div class="tablewrap">
          <table class="table">
            <tr>
              <td>
                <icon name="user" class="icon"></icon>
                <router-link class="nav-link" id="data" to="/person">个人资料</router-link>
              </td>
              <td>
                <icon name="chart-line" class="icon"></icon>
                <router-link class="nav-link" id="graph" to="/person/graph">情绪曲线</router-link>
              </td>
              <td>
                <icon name="question" class="icon"></icon>
                <router-link class="nav-link" to="/person/test">测试</router-link>
              </td>
            </tr>
            <tr>
              <td>
                <icon name="file" class="icon"></icon>
                <router-link class="nav-link" id="post" to="/person/post">我的帖子</router-link>
              </td>
              <td>
                <icon name="comments" class="icon"></icon>
                <router-link class="nav-link" to="/person/comment">我的评论</router-link>
              </td>
              <td>
                <icon name="cloud" class="icon"></icon>
                <router-link class="nav-link" to="/person/cloud">词云</router-link>
              </td>
            </tr>
            <tr>
              <td>
                <icon name="gem" class="icon"></icon>
                <router-link class="nav-link" to="/person/interest">我的关注</router-link>
              </td>
              <td>
                <icon name="star" class="icon"></icon>
                <router-link class="nav-link" to="/person/collect">我的收藏</router-link>
              </td>
              <td>
                <icon name="gifts" class="icon"></icon>
                <router-link class="nav-link" to="/recommendations/articles">推荐</router-link>
              </td>
              <td>

              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>

    <div style="clear:both"></div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      background_img:this.COMMON.background_img,
      user_img: this.$store.state.user_img,
      // login_user: this.$store.state.user
      user: this.$store.state.user_name,
      motto: ""
    };
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      let send = {
        user_id: this.$store.state.user_id
      };
      axios
        .post(
          "/api/Ripples_API/Person/PersonDataServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          var data = JSON.parse(JSON.stringify(response.data)).data;
          this.motto = data.motto;
        })
        .catch(error => {
          alert(error);
        });
    } //OK
  }
};
</script>

<style scoped>
.bg {
  /* background-image: url('/static/images_headshot/headshot.png'); */
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 800px;
  background: no-repeat center/cover;
  -webkit-filter: blur(100px) brightness(1.5) saturate(150%) opacity(50%);
  filter: blur(100px) brightness(1.5) saturate(150%) opacity(50%); /*毛玻璃*/
}

.wrap {
  margin-top: 100px;
  margin-left: 10%;
  position: relative;
  background-color: rgb(255, 255, 255, 0.6);
  z-index: 1;
  width: 80%;
  height: 500px;
  border-radius: 20px;
}
.content {
  text-align: left;
  font-family: "SimSun";
  color: black;
  position: relative;
  z-index: 2;
  padding: 40px;
  overflow: hidden;
}

.user_img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  align-self: center;
  float: left;
}

.info {
  text-align: left;
  height: auto;
  position: relative;
  left: 30px;
  top: 20px;
}
.name {
  font-size: 30px;
  font-weight: 700;
}
.motto {
  font-size: 18px;
}
.thread {
  position: relative;
  left: 150px;
  border-top: 1px solid black;
  width: 70%;
  margin-top: 15px;
}

.tablewrap {
  color: black;
  margin: 20px 0 0 160px;
}
.table {
  font-size: 25px;
  font-weight: 500;
}
.nav-link {
  color: black;
}
.table tr {
  margin-bottom: 40px;
  border: 0;
}
.table tr td {
  border: 0;
}
.table .icon {
  float: left;
  margin: 15px 10px 0 0;
  width: 20px;
  height: 20px;
  color: rgba(143, 177, 209, 0.8);
}
.nav-link:focus,
.nav-link:hover {
  color: rgb(121, 150, 177);
}
</style>
