<template>
  <div class="wholePost">
    <div class="top">
      <h1 @click="clickTopic()" class="title">
        <icon name="gem" id="top_icon" class="fa fa-5x"></icon>
        {{topic}}
      </h1>
      <div class="focus_wrap">
        <button v-if="!focus_status" class="addTopic btn" @click="addTopic()">
          <strong>+</strong>&nbsp; 关注</button>
        <span v-else="focus_status" class="focusStatus">√&nbsp;&nbsp;已关注</span>
      </div>
      <p class="brief">本话题主要关注国内热点娱乐八卦...</p>
    </div>
    <!-- <button @click="addPost()">addPost</button> -->
    <div v-for="post in posts">
      <each-post :user_img="post.user_img" :user_name="post.user_name" :post_content="post.post_content" :post_time="post.post_time" :post_title="post.post_title" :post_good_count="post.post_good_count" :post_comments="post.post_comments" :post_badges="post.post_badges" :post_topic="topic" :post_collect_count="post.post_collect_count" :post_id="post.post_id" :topic_id="topic_id" :collect_status="post.post_collect_status" :good_status="post.post_good_status">
      </each-post>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
import eachPost from "@/components/eachPost";
export default {
  name: "Topic2",
  data() {
    return {
      topic: "话题2",
      topic_id: 2,
      focus_status: 0,
      posts: [
        {
          post_id: 1,
          user_img: "/static/images/ermiao.jpg",
          user_name: "一二三啊",
          // user_id: "r123456",
          post_title: "哈哈哈",
          post_content:
            "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵",
          post_time: "2020年02月02日",
          post_good_count: 0,
          post_good_status: 0,
          post_collect_status: 0,
          post_collect_count: 0,
          post_comments: [
            {
              comment_id: 1,
              from: "二三四啊",
              from_id: 2,
              to: "一二三啊",
              to_id: 1,
              content: "你你你你你你你"
              // reply_status: 0
            },
            {
              comment_id: 2,
              from: "一二三啊",
              from_id: 1,
              to: "二三四啊",
              to_id: 2,
              content: "我我我我我我我"
              // reply_status: 0
            },
            {
              comment_id: 3,
              from: "一二三啊",
              from_id: 1,
              to: "一二三啊",
              to_id: 1,
              content: "在下一二三啊"
              // reply_status: 0
            }
          ],
          post_badges: ["popular", "美食"]
        }
      ]
      // login_user:"君莫笑"
    };
  },
  components: { eachPost },
  mounted() {
    this.topic_id = this.$route.query.id;
    this.initPosts();
  },
  methods: {
    initPosts: function() {
      let send = {
        topic_id: this.topic_id,
        login_user_id: this.COMMON.login_user_id
      };
      axios
        .post("http://localhost:8080/Ripples_API/Home/TopicServlet", send)
        .then(response => {
          var data = eval("(" + JSON.stringify(response) + ")").data;
          this.topic = data.topic;
          this.focus_status = data.focus_status;
          let posts = data.posts;
        })
        .catch(error => {});
    }, //OK
    clickTopic: function() {
      this.$router.push({ path: "/topic", query: this.topic_id });
    },
    addTopic: function() {
      if (this.$store.state.user == "") {
        // this.alertLogin();
        alert("请先登录");
        return;
      }
      let send = {
        user_id: this.COMMON.login_user_id,
        topic_id: this.topic_id
      };
      if (!this.focus_status)
        this.$modal.show("dialog", {
          title: "提示",
          text: "确认关注 " + this.topic,
          buttons: [
            {
              title: "确认",
              handler: () => {
                axios
                  .post(
                    "http://localhost:8080/Ripples_API/Operate/FocusTopicServlet",
                    send
                  )
                  .then(response => {
                    response = eval("(" + JSON.stringify(response) + ")");
                    if (response.result) {
                      alert("关注成功");
                      this.hideDialog();
                      this.focus_status = 1;
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
      else
        this.$modal.show("dialog", {
          title: "提示",
          text: "确认取消关注 " + this.topic,
          buttons: [
            {
              title: "确认",
              handler: () => {
                axios
                  .post(
                    "http://localhost:8080/Ripples_API/Operate/CancelFocusTopicServlet",
                    send
                  )
                  .then(response => {
                    response = eval("(" + JSON.stringify(response) + ")");
                    if (response.result) {
                      alert("已取消关注");
                      this.hideDialog();
                      this.focus_status = 0;
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
      // alert("here")
      this.$modal.hide("dialog");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  background: white;
  border-radius: 10px;
  text-align: left;
  height: 150px;
  padding: 20px;
  margin-bottom: 30px;
}
.top:hover {
  cursor: pointer;
}
.top h1 {
  color: royalblue;
  margin-bottom: 10px;
}
#top_icon {
  width: 25px;
  height: 25px;
}

.title {
  float: left;
}
.focus_wrap {
  display: inline;
}
.addTopic {
  width: 70px;
  background-color: rgb(65, 105, 225, 0.2);
  margin-left: 20px;
}
.addTopic strong {
  font-size: 15px;
}
.focusStatus {
  display: inline-block;
  width: 75px;
  height: 30px;
  text-align: center;
  margin-left: 20px;
  font-size: 10px;
  color: black;
  background-color: rgb(65, 105, 225, 0.1);
  padding: 5px;
  border-radius: 2px;
}
.focusStatus:hover {
  cursor: pointer;
}
.brief {
  margin-top: 20px;
}
</style>
