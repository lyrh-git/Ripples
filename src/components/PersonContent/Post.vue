<template>
  <div class="post">
    <div class="top">
      <p class="title">我的帖子
        <icon name="edit" class="addPost" @click="addPost()"></icon>
      </p>

      <div class="thread"></div>
    </div>
    <!-- <button @click="addPost()">addPost</button> -->
    <div class="message">
      <div v-for="post in posts" class="eachPost1">
        <div class="top">
          <span class="post_title" @click="clickPostTitle(post)">
            <!-- <router-link to="/post" :post="post"> -->
            {{post.title}}
            <!-- </router-link> -->
          </span>
          <div style="clear:both"></div>
        </div>

        <div class="middle">
          <div style="clear:both"></div>
          <div class="post_content text-left">
            <p v-if="post.content.length>60">{{post.content.substring(0,60)}}...</p>
            <p v-else>{{post.content}}</p>
          </div>
          <div>
            <div class="post_badges" v-for="badge in post.badges">
              <span class="badge badge-pill">{{badge}}</span>
            </div>
            <div class="post_topic" v-if="post.topic" @click="clickPostTopic(post)" title="进入话题">
              <icon name="gem" id="top_icon"></icon>
              {{post.topic}}
            </div>
            <div style="clear:both"></div>
          </div>

        </div>

        <div class="bottom">
          <div class="bottom_left">
            <div class="post_time">
              <small>{{post.post_time}}</small>
            </div>
            <div class="good">
              <icon name="thumbs-up" :color="post.good_status==1?'rgb(0, 191, 255,0.5)':'gray'" @click="clickGood(post)"></icon>
              {{post.good_count}}
              <!-- <p>点赞</p> -->
            </div>
            <div class="comment_icon">
              <icon name="comment-alt"></icon>
              {{post.comment_count}}
              <!-- <p>评论</p> -->
            </div>
            <div class="star_icon">
              <icon name="star">
                <!-- {{post.collect_count}} -->
              </icon>
              {{post.collect_count}}
            </div>
          </div>
          <div class="bottom_right">
            <!-- <div class="bottom_right_wrap"> -->
            <button class="btn" @click="deletePost(post)">删除</button>
            <button class="btn" @click="clickPostTitle(post)">查看</button>
            <!-- <button class="btn" @click="editPost(post)">编辑</button> -->
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
  name: "Post",
  data() {
    return {
      posts: [
        {
          post_id: 1,
          title: "哈哈哈",
          post_time: "2020年02月02日",
          good_count: 0,
          badges: ["Realtime", "美食"],
          content:
            "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵",
          comment_count: 0,
          collect_count: 0,
          topic: "",
          topic_id: 1,
          good_status: 0
        },
        {
          post_id: 2,
          title: "达拉崩吧",
          post_time: "2020年3月27日",
          good_count: 10,
          badges: ["Realtime", "周深"],
          content:
            "浩然·达拉崩吧班得贝迪卜多比鲁翁·米娅莫拉苏娜丹尼谢莉红·迪菲特·昆图库塔卡提考特苏瓦西拉松·蒙达鲁克硫斯伯古比奇巴勒城·王",
          comment_count: 1,
          collect_count: 0,
          topic: "周星星",
          topic_id: 1,
          good_status: 0
        }
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
        .post("/api/Ripples_API/Person/PostServlet", this.$qs.stringify(send))
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
    deletePost: function(e) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "删除之后信息不会保存",
        buttons: [
          {
            title: "删除",
            handler: () => {
              let send = {
                post_id: e.post_id
              };
              axios
                .post(
                  "/api/Ripples_API/Operate/DeletePostServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    this.posts.splice(this.posts.indexOf(e), 1); //识别下标，删除该下标起length个元素
                    this.hideDialog();
                  }
                })
                .catch(error => {
                  alert(error);
                });
            }
          },
          {
            title: "保留"
          }
        ]
      });
    }, //OK
    clickGood: function(post) {
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
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              post.good_status = post.good_status ? 0 : 1;
              post.good_count = post.good_status
                ? post.good_count + 1
                : post.good_count - 1;
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
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              post.good_status = post.good_status ? 0 : 1;
              post.good_count = post.good_status
                ? post.good_count + 1
                : post.good_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    editPost: function(e) {
      this.$router.push({
        path: "/person/post_editor",
        query: { post_id: e.post_id }
      }); //params:postID
    },
    hideDialog: function() {
      this.$modal.hide("dialog");
    },
    clickPostTopic: function(post) {
      this.$router.push({ path: "/topic", query: { topic_id: post.topic_id } });
    },
    addPost: function() {
      this.$router.push({
        path: "/person/post_editor"
      }); //params:postID
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  padding: 20px;
}
.top {
  width: 95%;
}
.title {
  font-size: 25px;
  font-weight: 600;
}
.addPost {
  float: right;
  color: gray;
  width: 30px;
  height: 30px;
  top: 10px;
  position: relative;
  /* font-size:20px; */
}
.addPost:hover {
  cursor: pointer;
  color: royalblue;
}

.thread {
  position: relative;
  /* left:150px; */
  border-top: 1px solid black;
  margin-top: 10px;
  /* width: 95%; */
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
  font-weight: 600;
  margin-right: 5px;
  font-size: 13px;
  height: 22px;
  padding: 0.3em 0.4em;
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

/*bottom */
.bottom {
  margin-top: 10px;
}
.post_time {
  float: left;
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
