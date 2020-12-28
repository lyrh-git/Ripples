<template>

  <div class="eachPost">
    <div class="top">
      <span class="post_title">
        <!-- <router-link to="/post" :post="post"> -->
        <h2 @click="clickPostTitle()">{{post_title}}</h2>
        <!-- </router-link> -->
      </span>
      <div style="clear:both"></div>
    </div>

    <div class="middle">
      <div class="user">
        <img class="user_img" :src="user_img" />
        <span class="user_name">
          <strong>{{user_name}}</strong>
        </span>
      </div>
      <div style="clear:both"></div>
      <div class="post_content text-left">
        <p v-if="(!content_status)&&(post_content.length>100) ">{{post_content.substring(0,100)}}...</p>
        <p v-else>{{post_content}}</p>
      </div>
      <button class="content_status_button btn btn-link" @click="content_status=!content_status" v-if="post_content.length>100">
        <p v-if="content_status">收起</p>
        <p v-else>展开</p>
      </button>
      <div class="post_badges" v-for="badge in post_badges">
        <span class="badge badge-pill">{{badge}}</span>
      </div>
      <div class="post_topic" v-if="post_topic" @click="clickPostTopic()" title="进入话题">
        <icon name="gem" id="top_icon"></icon>
        {{post_topic}}
      </div>

    </div>

    <div class="bottom">
      <div class="post_time">
        <small>{{post_time}}</small>
      </div>
      <div class="bottom_right">
        <!-- <div class="bottom_right_wrap"> -->
        <div class="good">
          <icon name="thumbs-up" :color="good_status==1?'deepskyblue':'gray'" @click="clickGood()"></icon>
          {{post_good_count}}
          <!-- <p>点赞</p> -->
        </div>
        <div class="comment_icon">
          <!-- <icon name="comment-alt" :color="comment_status==1?'deepskyblue':'gray'" @click="clickComment()"></icon> -->
          <icon name="comment-alt" color="gray" @click="clickComment()"></icon>
          {{post_comment_count}}
          <!-- <p>评论</p> -->
        </div>
        <div class="star">
          <icon name="star" :color="collect_status==1?'deepskyblue':'gray'" @click="clickCollect()"></icon>
          {{post_collect_count}}
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <!--
    <div class="comments" v-if="comment_status==1">

      <div v-if="login_user" style="margin:15px 0 20px 0;">
        <strong style="font-size:15px;">评论:</strong>
        <input v-model="comment_message" class="input-material" placeholder="评论..." @keyup.13="comment()">
        <button type="submit" class="btn btn-small btn-primary " @click="comment()">发送</button>
      </div>

      <div class="eachComment" v-for="comment in post_comments">

        <div class="eachCommentContent">
          <button class="deleteComment btn" v-if="comment.from==login_user" @click="deleteComment(comment)">删除</button>
          <div class="eachCommentLabel">
            <strong>{{comment.from}}</strong>
            <span v-if="comment.from!=comment.to">
              <small>回复</small>
              <strong>{{comment.to}}</strong>
            </span>
            :&nbsp;&nbsp;
          </div>
          <span class="eachCommentMessage">
            <p v-if="(!comment.content_status)&&(comment.content.length>100)" @click="clickEachComment(comment)">{{comment.content.substring(0,100)}}...</p>
            <p v-else @click="clickEachComment(comment)">{{comment.content}}</p>
            <button class="content_status_button btn btn-link" style="color:gray;" v-if="comment.content.length>100" @click="comment.content_status=!comment.content_status;">
              <p v-if="comment.content_status">收起</p>
              <p v-else>展开</p>
            </button>
          </span>
        </div>

        <div class="reply" v-if="comment.reply_status==1">
          <strong v-if="comment.from!=login_user">&nbsp;&nbsp;</strong>
          <strong>{{login_user}}</strong>
          <span v-if="comment.from!=login_user">
            <small>回复</small>
            <strong>{{comment.from}}</strong>
          </span>
          :
          <input v-model="reply_message" class="input-material" placeholder="评论..." @keyup.13="reply(comment)">
          <button type="submit" class="btn btn-small btn-primary " @click="reply(comment)">发送</button>
        </div>
      </div>

    </div>-->

  </div>

</template>

<script>
export default {
  name: "eachPost",
  data() {
    return {
      content_status: 0,
      // comment_status: 0,
      // comment_message: "",
      // reply_message: "",
      login_user: this.$store.state.user_name
    };
  },
  /*父级模块传进来的参数 */
  props: [
    "post_id",
    "topic_id",
    "post_title",
    "user_img",
    "user_name",
    "user_id",
    "post_content",
    "post_time",
    "post_good_count",
    "post_comment_count",
    // "post_comments",
    "post_badges",
    "post_topic",
    "post_collect_count",
    "collect_status",
    "good_status"
  ],
  mounted() {
    // this.initEachPost();
  },
  methods: {
    /*
    initEachPost: function() {
      for (let commment of this.post_comments) {
        comment.content_status = 0;
        comment.reply_status = 0;
      }
    }
    ,*/
    clickGood: function() {
      if (this.login_user == "") {
        alert("请先登录");
        return;
      }
      let send = {
        user_id: this.$store.state.user_id,
        post_id: this.post_id
      };
      if (!this.good_status)
        axios
          .post(
            "/api/Ripples_API/Operate/GoodPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              this.good_status = this.good_status ? 0 : 1;
              this.post_good_count = this.good_status
                ? this.post_good_count + 1
                : this.post_good_count - 1;
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
              this.good_status = this.good_status ? 0 : 1;
              this.post_good_count = this.good_status
                ? this.post_good_count + 1
                : this.post_good_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    clickCollect: function() {
      if (this.login_user == "") {
        alert("请先登录");
        return;
      }
      let send = {
        user_id: this.$store.state.user_id,
        post_id: this.post_id
      };
      if(this.user_id==this.$store.state.user_id){
          alert("不能收藏自己的帖子");
          return;
          }
      if (!this.collect_status&&this.user_id!=this.$store.state.user_id)
        axios
          .post(
            "/api/Ripples_API/Operate/CollectPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              this.collect_status = this.collect_status ? 0 : 1;
              this.post_collect_count = this.collect_status
                ? this.post_collect_count + 1
                : this.post_collect_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
      else
        axios
          .post(
            "/api/Ripples_API/Operate/CancelCollectPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              this.collect_status = this.collect_status ? 0 : 1;
              this.post_collect_count = this.collect_status
                ? this.post_collect_count + 1
                : this.post_collect_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    clickComment: function() {
      /*
      this.comment_status = !this.comment_status;
      var i;
      for (i = 0; i < this.post_comments.length; i++) {
        this.post_comments[i].reply_status = 0;
      }*/

      this.$router.push({ path: "/post", query: { post_id: this.post_id } });
    },
    /*
    clickEachComment: function(e) {
      if (this.login_user == "") {
        alert("未登录不能回复");
        return;
      }
      e.reply_status = !e.reply_status;
    },
    comment: function() {
      if (this.comment_message == "") return;
      let send = {
        user_id: this.COMMON.login_user_id,
        post_id: this.post_id,
        comment: this.comment_message
      };
      axios
        .post("http://localhost:8080/Ripples_API/Operate/HomeCommentPostServlet", send)
        .then(response => {
          response = eval("(" + JSON.stringify(response) + ")");
          var _comment = response.comment;
          _comment.content_status = 0;
          _comment.reply_status = 0;
          this.post_comments.push(_comment);
          this.comment_message = "";
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    reply: function(e) {
      if (this.reply_message == "") return;
      let send = {
        from_id: this.COMMON.login_user_id,
        to_id: e.from_id,
        comment: this.reply_message,
        father_comment_id: e.comment_id
      };
      axios
        .post("http://localhost:8080/Ripples_API/Operate/CommentCommentServlet", send)
        .then(response => {
          response = eval("(" + JSON.stringify(response) + ")");
          var _comment = response.comment;
          _comment.content_status = 0;
          _comment.reply_status = 0;
          this.post_comments.push(_comment);
          this.reply_message = "";
          e.reply_status = 0;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    */
    clickPostTopic: function() {
      // alert('here');
      // alert(this.topic_id)
      this.$router.push({
        path: "/topic",
        query: { topic_id: this.topic_id }
      });
    },
    clickPostTitle: function() {
      // alert('title');
      this.$router.push({ path: "/post", query: { post_id: this.post_id } }); //query针对path
      // this.$router.push({
      //   name: "WholePost",
      //   params: { post_id: this.post_id }
      // }); //params针对组件name

      // this.$router.push({ path: `/user/${userId}` }); //这种配置路由的时候要注明 path: 'user/:userId'
    },
    /*
    deleteComment: function(comment) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "删除之后信息不会保存",
        buttons: [
          {
            title: "删除",
            handler: () => {
              let send = {
                comment_Id: comment.comment_id
              };
              axios
                .post(
                  "http://localhost:8080/Ripples_API/Operate/DeleteCommentServlet",
                  send
                )
                .then(response => {
                  response = eval("(" + JSON.stringify(response) + ")");
                  if (response.result) {
                    this.post_comments.splice(
                      this.post_comments.indexOf(comment),
                      1
                    ); //识别下标，删除该下标起length个元素
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
    */
    hideDialog: function() {
      this.$modal.hide("dialog");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eachPost {
  margin-bottom: 30px;
  padding: 20px;
  /* border:1px solid red;
  height:300px; */
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
.top {
  width: 100%;
  margin-bottom: 10px;
}
.middle {
  float: left;
  width: 100%;
  margin-bottom: 10px;
}
.bottom {
  width: 100%;
}
/*top */
.post_title {
  float: left;
  /* font-size: 25px; */
  /* text-decoration:underline; */
}
.post_title:hover {
  cursor: pointer;
  color: royalblue;
}
/*middle */
.user {
  float: left;
}
.user_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* content:url('/static/images/chenqingling.png'); */
  object-fit: cover; /*自适应长宽*/
  align-self: center;
}
.user_name {
  font-size: 15px;
  /* position: relative;
  top:-10px; */
}
.post_content {
  /* float:left; */
  color: gray;
  font-size: 18px;
  margin-top: 15px;
  text-align: left;
}
.content_status_button {
  height: 20px;
  font-size: 16px;
  color: rgb(38, 109, 240);

  /* text-decoration:underline; */
  float: right;
  margin-top: -46px;
  margin-right: 16px;
}
.post_badges {
  float: left;
}
.badge {
  color: white;
  background-color: rgb(166, 237, 255);
  margin-right: 5px;
  font-size: 15px;
  height: 25px;
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
/*bottom */
.post_time {
  float: left;
  font-size: 15px;
  color: gray;
}
.bottom_right {
  float: right;
  font-size: 10px;
  margin-right: 15px;
}
/* .bottom_right_wrap{
  display: inline;
} */
.good {
  float: left;
  margin-right: 15px;
}
.comment_icon {
  float: left;
  margin-right: 10px;
}
.star {
  float: right;
  position: relative;
  top: -2px;
}
/*
.comments {
  text-align: left;
  margin: 20px 0 0 0;
  background-color: rgb(244, 248, 248);
  padding: 10px 0 10px 15px;
  border-radius: 5px;
}
.eachComment {
  margin-bottom: 10px;
}
.eachComment:hover,
.eachComment:focus {
  background-color: white;
}
.eachCommentLabel {
  float: left;
}

.deleteComment {
  float: right;
  color: gray;
}
.deleteComment:hover {
  color: royalblue;
}*/
</style>
