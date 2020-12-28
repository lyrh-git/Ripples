<template>
  <div class="wrap">
    <div class="wholeTopic">
      <div class="cover">
        <div style="clear:both"></div>
      </div>
      <div class="top">
        <h1>
          <icon name="gem" id="top_icon" class="fa fa-5x"></icon>
          {{topic}}
          <button v-if="!focus_status" class="addTopic btn" @click="addTopic()">
            <strong>+</strong>&nbsp; 关注</button>
          <span v-else="focus_status" class="focusStatus">√&nbsp;&nbsp;已关注</span>
        </h1>
        <p class="brief">{{brief}}</p>
        
        <span class="counts">帖子量&nbsp;{{post_count}}&nbsp;&nbsp;关注量&nbsp;{{focus_count}}</span>
      </div>
      <div class="empty">
        <div style="clear:both"></div>
      </div>
      <!-- <button @click="addPost()">addPost</button> -->
      <div class="posts">
        <div v-for="post in posts" class="post">
          <each-post :post_id="post.post_id" :user_img="post.user_img" :user_name="post.user_name" :post_content="post.post_content" :post_time="post.post_time" :post_title="post.post_title" :post_good_count="post.post_good_count" :post_comments="post.post_comments" :post_badges="post.post_badges" :post_topic="topic" :post_collect_count="post.post_collect_count" :topic_id="topic_id" :collect_status="post.post_collect_status" :good_status="post.post_good_status">
          </each-post>
        </div>
      </div>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
import eachPost from "@/components/eachPost";
export default {
  name: "WholeTopic",
  data() {
    return {
      topic: "",
      topic_id: 0,
      brief:"",
      post_count:10,
      focus_count:3,
      focus_status: 0, //登录者是否关注此话题
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
          post_collect_count: 1,
          post_collect_status: 0,
          post_good_status: 0,
          //   post_topic:this.topic,
          post_comments: [
            {
              comment_id: 1,
              from: "二三四啊",
              from_id: 2,
              to: "一二三啊",
              to_id: 1,
              content: "你你你你你你你"
              // reply_status: 0
              // content_status:0,
            },
            {
              comment_id: 2,
              from: "一二三啊",
              from_id: 2,
              to: "二三四啊",
              to_id: 1,
              content: "我我我我我我我"
              // reply_status: 0
            },
            {
              comment_id: 3,
              from: "一二三啊",
              from_id: 2,
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
    this.topic_id = this.$route.query.topic_id;
    this.initPosts();
  },
  methods: {
    initPosts: function() {
      // alert(this.topic_id);
      let send = {
        topic_id: this.topic_id,
        login_user_id: this.$store.state.user_id
      };
      axios
        .post("/api/Ripples_API/Home/WholeTopicServlet", this.$qs.stringify(send))
        .then(response => {
          var data = JSON.parse(JSON.stringify(response.data)).data;
          this.topic = data.topic;
          this.brief=data.brief;
          this.post_count=data.post_count;
          this.focus_count=data.focus_count;
          this.focus_status = data.focus_status;
          this.posts = data.posts;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK

    addTopic: function() {
      if (this.$store.state.user_id==0) {
        // this.alertLogin();
        alert("请先登录");
        return;
      }

      let send = {
        user_id: this.$store.state.user_id,
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
                    "/api/Ripples_API/Operate/FocusTopicServlet",
                    this.$qs.stringify(send)
                  )
                  .then(response => {
                    response = JSON.parse(JSON.stringify(response.data));
                    if (response.result) {
                      // alert("关注成功");
                      this.hideDialog();
                      this.focus_status = 1;
                      this.focus_count+=1;
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
                    "/api/Ripples_API/Operate/CancelFocusTopicServlet",
                    this.$qs.stringify(send)
                  )
                  .then(response => {
                    response =JSON.parse(JSON.stringify(response.data));
                    if (response.result) {
                      // alert("已取消关注");
                      this.hideDialog();
                      this.focus_status = 0;
                      this.focus_count-=1;
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
.wrap {
  min-height: 1000px;
  width: 100%;
  /* background-color:inherit; */
  padding: 60px 15% 0 3%;
}
.cover {
  height: 30px;
  width: 82%;
  position: fixed;
  background-color: rgb(237, 240, 244);
}
.top {
  background: white;
  border-radius: 10px;
  text-align: left;
  padding: 20px;
  margin-bottom: 30px;
  margin-top: 20px;
  position: fixed;
  width: 82%;
  height: 150px;
  border-left: 5px solid rgb(198, 222, 231);
  border-top: 3px solid rgb(208, 229, 236);
  border-bottom: 2px solid rgb(216, 232, 238);
  z-index: 2;
}
.top h1 {
  color: royalblue;
  margin-bottom: 10px;
}
#top_icon {
  width: 25px;
  height: 25px;
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
.brief {
  margin-top: 20px;
  font-size:16px;
}
.counts {
  /* float: left; */
  font-size: 12px;
  color: gray;
  /* padding-bottom:10px; */
}


.empty {
  height: 180px;
}
.posts {
  margin-top: 20px;
}

.post {
  border-left: 3px solid rgb(216, 232, 238);
  border-top: 2px solid rgb(216, 232, 238);
  border-radius: 10px;
}
</style>
