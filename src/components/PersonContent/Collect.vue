<template>
  <div class="collect">
    <div class="top">
      <p class="title">我的收藏</p>
      <div class="thread"></div>
    </div>
    <!-- <button @click="addPost()">addPost</button> -->
    <div class="message">
      <div v-for="(post,index) in posts" class="eachPost1">
        <div class="top">
          <span class="post_title" @click="clickPostTitle(post)">
            <!-- <router-link to="/post" :post="post"> -->
            {{post.title}}
            <!-- </router-link> -->
          </span>
          <!-- <div class="user">
            <img class="user_img" :src="post.user_img" />
            <span class="user_name">
              <strong>{{post.user_name}}</strong>
            </span>
          </div> -->
          <div style="clear:both"></div>
        </div>

        <div class="middle">
          <div style="clear:both"></div>
          <div class="post_content text-left">
            <p>{{post.content.substring(0,60)}}...</p>
          </div>
          <div>
            <div class="post_badges" v-for="badge in post.badges">
              <span class="badge badge-pill">{{badge}}</span>
            </div>
            <div class="post_topic" v-if="post.topic" @click="clickPostTopic(post)">
              <icon name="gem" id="top_icon"></icon>
              {{post.topic}}
            </div>
            <div style="clear:both"></div>
          </div>

        </div>

        <div class="bottom">
          <div class="bottom_left">
            <img :src="post.user_img" class="post_user_img"></img>
            <div class="img_right">
              <small class="post_time">{{post.time}}</small>
              <div class="good">
                <icon name="thumbs-up" :color="post.good_status==1?'rgb(0, 191, 255,0.5)':'gray'" @click="clickGood(post,index)"></icon>
                {{post.good_count}}
                <!-- <p>点赞</p> -->
              </div>
              <div class="comment_icon">
                <icon name="comment-alt"></icon>
                {{post.comment_count}}
                <!-- <p>评论</p> -->
              </div>
              <div class="star_icon">
                <icon name="star" color="rgb(0, 191, 255,0.5)" @click="cancelStar(index)">
                  <!-- {{post.collect_count}} -->
                </icon>
                {{post.collect_count}}
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>

      </div>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: "Collect",
  data() {
    return {
      posts: [/*
        {
          post_id: 1,
          user_img: "/static/images/ermiao.jpg",
          user_name: "一二三啊",
          title: "哈哈哈",
          time: "2020年02月02日",
          good_count: 0,
          badges: ["Realtime", "美食"],
          content:
            "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵",
          comment_count: 0,
          collect_count: 1,
          topic: "",
          topic_id: 1,
          good_status: 0
        },
        {
          post_id: 2,
          user_img: "/static/images/ermiao.jpg",
          user_name: "一二三啊",
          title: "达拉崩吧",
          time: "2020年3月27日",
          good_count: 10,
          badges: ["Realtime", "周深"],
          content:
            "浩然·达拉崩吧班得贝迪卜多比鲁翁·米娅莫拉苏娜丹尼谢莉红·迪菲特·昆图库塔卡提考特苏瓦西拉松·蒙达鲁克硫斯伯古比奇巴勒城·王",
          comment_count: 1,
          collect_count: 1,
          topic_id: 2,
          topic: "周星星",
          good_status: 0
        }*/
      ]
    };
  },
  mounted() {
    this.initPosts();
  },
  methods: {
    initPosts: function() {
      let send = {
        user_id: this.$store.state.user_id
      };
      axios
        .post(
          "/api/Ripples_API/Person/CollectServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          this.posts = JSON.parse(JSON.stringify(response.data)).posts;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    clickPostTitle: function(e) {
      this.$router.push({
        path: "/post",
        query: { post_id: e.post_id }
      });
    },
    clickPostTopic: function(post) {
      this.$router.push({ path: "/topic", query: { topic_id: post.topic_id } });
    },
    clickGood: function(post, index) {
      let send = {
        user_id: this.$store.state.user_id,
        post_id: post.post_id
      };
      if (!post.good_status)
        axios
          .post(
            "/api/Ripples_API/Operate/GoodPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(SON.stringify(response.data));
            if (response.result) {
              post.good_status = post.good_status ? 0 : 1;
              post.good_count = post.good_status
                ? post.good_count + 1
                : post.good_count - 1;

              this.posts.splice(index, 1, post);
            }
          })
          .catch(error => {
            alert(error);
          });
      else
        axios
          .post(
            "/api/Ripples_API/Operate/CancelGoodPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(SON.stringify(response.data));
            if (response.result) {
              post.good_status = post.good_status ? 0 : 1;
              post.good_count = post.good_status
                ? post.good_count + 1
                : post.good_count - 1;

              this.posts.splice(index, 1, post);
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    cancelStar: function(index) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "确定取消收藏",
        buttons: [
          {
            title: "确定",
            handler: () => {
              let send = {
                user_id: this.$store.state.user_id,
                post_id: this.posts[index].post_id
              };
              axios
                .post(
                  "/api/Ripples_API/Operate/CancelCollectPostServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    this.posts.splice(index, 1); //识别下标，删除该下标起length个元素
                    this.hideDialog();
                  }
                })
                .catch(error => {
                  alert(error);
                });
            }
          },
          {
            title: "取消"
          }
        ]
      });
    }, //OK
    hideDialog: function() {
      this.$modal.hide("dialog");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.collect {
  padding: 20px;
}

.title {
  font-size: 25px;
  font-weight: 600;
}

.thread {
  position: relative;
  /* left:150px; */
  border-top: 1px solid black;
  margin-top: 10px;
  width: 95%;
}

.message {
  margin-top: 40px;
}

.eachPost1 {
  margin-bottom: 40px;
  width: 95%;
}

.post_title {
  color: black;
  font-size: 23px;
  font-weight: 600;
  /* text-decoration-line: underline; */
}
.post_title:hover {
  cursor: pointer;
  color: royalblue;
}
.post_content {
  /* float:left; */
  color: gray;
  font-size: 16px;
  margin-top: 15px;
  text-align: left;
}

.post_badges {
  float: left;
}
.badge {
  color: white;
  background-color: rgb(166, 237, 255, 0.6);
  font-weight: 500;
  margin-right: 5px;
}
.post_topic {
  float: right;
  color: royalblue;
  font-size: 12px;
  margin-right: 10px;
}
.post_topic:hover,
.post_topic:focus {
  cursor: pointer;
  font-weight: 600;
}
.post_topic #top_icon {
  width: 15px;
  height: 15px;
}

/* .user {
  float: left;
}
.user_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  align-self: center;
}
.user_name {
  font-size: 15px;
} */

/*bottom */
.bottom {
  margin-top: 10px;
}
.post_user_img {
  width: 25px;
  height: 25px;
  float: left;
  object-fit: cover;
  align-self: center;
  border-radius: 50%;
  margin-right: 10px;
}
.img_right {
  margin-top: 3px;
  display: inline-block;
}
.post_time {
  float: left;
  position: relative;
  /* top:10px; */
  /* font-size: 15px; */
  color: gray;
  margin-right: 20px;
}
.bottom_left {
  float: left;
  font-size: 12px;
  color: gray;
}
.good {
  float: left;
  margin-right: 15px;
}
.comment_icon {
  float: left;
  margin-right: 10px;
}
.star_icon {
  float: left;
  position: relative;
  top: -2px;
  /* border:1px solid red; */
}
.bottom_right {
  float: right;
}
.bottom_right button {
  float: right;
  color: darkslategrey;
  /* font-weight:600; */
}
.bottom_right button:hover,
.bottom_right button:focus {
  color: royalblue;
}
</style>
