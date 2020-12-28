<template>
  <div class="wrap">
    <div class="wholePost">
      <div>
        <div style="width:100%;height:30px;background-color:rgb(237, 240, 244);position:fixed;"></div>
        <div style="clear:both"></div>
      </div>
      <div class="topPost" id="topPost" ref="topPost">

        <div class="top">
          <div class="user">
            <img class="user_img" :src="user_img" />
            <div class="user_wrap">
              <span class="user_name">
                <strong>{{user_name}}</strong>
              </span>
              <span class="time">
                <small>{{time}}</small>
              </span>
            </div>
          </div>

          <div style="clear:both"></div>
        </div>

        <div class="middle">
          <div class="title">
            <h2>{{title}}</h2>
          </div>
          <div class="content text-left">
            <p v-if="(!content_status)&&(content.length>100) ">{{content.substring(0,100)}}...</p>
            <p v-else>{{content}}</p>
          </div>
          <button class="content_status_button btn btn-link" @click="content_status=!content_status" v-if="content.length>100">
            <p v-if="content_status">收起</p>
            <p v-else>展开</p>
          </button>

        </div>

        <div class="bottom">
          <div class="badges" v-for="badge in badges">
            <span class="badge badge-pill">{{badge}}</span>
          </div>
          <div class="topic" v-if="topic" @click="clickPostTopic()">
            <icon name="gem" id="top_icon"></icon>
            {{topic}}
          </div>

        </div>

        <div class="commentLabel">回复</div>
      </div>
      <!-- <div> -->
      <div class="comments" :style="{marginTop:topHeight}">
        <div class="eachComment" v-for="(comment,comment_index) in comments">

          <button class="deleteComment btn" v-if="comment.from_id==login_user_id" @click="deleteComment(comment)">删除</button>

          <div class="eachCommentContent">
            <div class="user">
              <img class="user_img" :src="comment.from_img" />
              <div class="user_wrap">
                <span class="user_name">
                  <strong>{{comment.from}}</strong>
                </span>
                <span class="time">
                  <small>{{comment.time}}</small>
                </span>
              </div>
              <div style="clear:both"></div>
            </div>

            <div class="eachCommentMessage">
              <span v-if="comment.to!=user_name" class="eachCommentLabel">
                <small>回复</small>
                <strong>{{comment.to}}</strong>
                :&nbsp;&nbsp;
              </span>

              <p v-if="(!comment.content_status)&&(comment.content.length>100)">{{comment.content.substring(0,100)}}...</p>
              <p v-else>{{comment.content}}</p>
              <button class="content_status_button btn btn-link" style="color:gray;" v-if="comment.content.length>100" @click="comment.content_status=!comment.content_status">
                <p v-if="comment.content_status">收起</p>
                <p v-else>展开</p>
              </button>
            </div>

            <div class="bottom_right">
              <div class="commentGood">
                <icon name="thumbs-up" :color="comment.good_status==1?'deepskyblue':'gray'" @click="clickCommentGood(comment,comment_index)"></icon>
                {{comment.good_count}}
                <!-- <p>点赞</p> -->
              </div>
              <div class="commentComment">
                <icon name="comment-alt" :color="comment.comment_status==1?'deepskyblue':'gray'" @click="clickEachComment(comment,comment_index)"></icon>
                {{comment.comments.length}}
              </div>
            </div>

            <!--回复的回复-->
            <div class="inner_comments" v-if="comment.comment_status==1">

              <div v-if="login_user!=''" style="margin:15px 0 20px 0;">
                <strong style="font-size:15px;">评论:</strong>
                <input v-model="comment.comment_message" class="input-material" placeholder="评论...">
                <button type="submit" class="btn btn-small btn-primary " @click="commentInnerComment(comment)">发送</button>
              </div>

              <div class="eachInnerComment" v-for="(inner_comment,inner_comment_index) in comment.comments">
                <div class="eachInnerCommentContent">
                  <button class="deleteComment btn" v-if="inner_comment.from_id==login_user_id" @click="deleteInnerComment(comment,inner_comment)">删除</button>
                  <div class="eachInnerCommentLabel">
                    <strong>{{inner_comment.from}}</strong>
                    <span v-if="inner_comment.from!=inner_comment.to">
                      <small>回复</small>
                      <strong>{{inner_comment.to}}</strong>
                    </span>
                    :&nbsp;&nbsp;
                  </div>
                  <span class="eachInnerCommentMessage">
                    <p v-if="(!inner_comment.content_status)&&(inner_comment.content.length>100)" @click="clickEachInnerComment(inner_comment,inner_comment_index,comment,comment_index)">{{inner_comment.content.substring(0,100)}}...</p>
                    <p v-else @click="clickEachInnerComment(inner_comment)">{{inner_comment.content}}</p>
                    <button class="content_status_button btn btn-link" style="color:gray;" v-if="inner_comment.content.length>100" @click="inner_comment.content_status=!inner_comment.content_status;">
                      <p v-if="inner_comment.content_status">收起</p>
                      <p v-else>展开</p>
                    </button>
                  </span>
                </div>

                <div class="innerCommentReply" v-if="inner_comment.reply_status==1">
                  <strong v-if="inner_comment.from!=login_user">&nbsp;&nbsp;</strong>
                  <strong>{{login_user}}</strong>
                  <span v-if="inner_comment.from!=login_user">
                    <small>回复</small>
                    <strong>{{inner_comment.from}}</strong>
                  </span>
                  :
                  <input v-model="inner_comment.inner_reply_message" class="input-material" placeholder="评论...">
                  <button type="submit" class="btn btn-small btn-primary " @click="replyInnerComment(comment,inner_comment)">发送</button>
                </div>
              </div>

            </div>
            <!--回复的回复-->
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>

    <div class="toolbars">
      <ul>
        <li class="good">
          <icon name="thumbs-up" :color="good_status==1?'deepskyblue':'gray'" @click="clickGood()"></icon>
          {{good_count}}

        </li>
        <li class="comment">
          <icon name="comment-alt" :color="comment_status==1?'deepskyblue':'gray'" @click="clickComment()"></icon>
          {{comments.length}}
        </li>
        <li class="star">
          <icon name="star" :color="collect_status==1?'deepskyblue':'gray'" @click="clickCollect()"></icon>
          {{collect_count}}
        </li>

      </ul>
    </div>

    <div class="reply_post" v-if="comment_status">

      <input v-model="reply_message" class="input-material" placeholder="评论..." @keyup.13="reply_post()">
      <button type="submit" class="btn btn-small btn-primary " @click="reply_post()">发送</button>
      <div style="clear:both"></div>
    </div>

    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: "WholePost",
  data() {
    return {
      // good_count: 0,
      /* */
      post_id: null,
      // reply_status: 0, //
      content_status: 0, //默认
      comment_status: 0, //默认，总帖的评论键是否点开
      reply_message: "", //默认，总贴的评论的内容
      login_user: this.$store.state.user_name, //默认
      login_user_img: this.$store.state.user_img, //默认
      login_user_id: this.$store.state.user_id,
      topHeight: "100px",

      badges: [],
      topic: "",
      topic_id: 0,

      // emptyHeight: this.topHeight,

      /*发送帖子ID，返回发帖人头像，发帖人姓名，帖子标题，帖子内容，帖子评论 */

      good_status: 0, //当前登录者是否点赞了
      collect_status: 0, //当前登陆者是否收藏了
      collect_count: 0,
      user_img: "",
      user_name: "",
      title: "",
      content:
        "",
      time: "2020年02月02日",
      good_count: 0,
      comments: [
        {
          comment_id: 1,
          from: "君莫笑",
          from_id: 0,
          from_img: "/static/images/chenqingling.png",
          content:
            "你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你",
          // reply_status: 0, //
          good_count: 0,
          good_status: 0,
          content_status: 0, //默认
          comment_status: 0, //默认，回帖的评论键是否点开
          comment_message: "", //默认
          time: "xxx年xx月xx日",
          comments: [
            {
              comment_id: 1,
              from: "一二三啊",
              from_id: 1,
              to: "二三四啊",
              to_id: 2,
              content: "我我我我我我我",
              reply_status: 0, //默认
              content_status: 0, //默认
              inner_reply_message: "" //默认
            },
            {
              comment_id: 2,
              from: "君莫笑",
              from_id: 0,
              to: "一二三啊",
              to_id: 1,
              content: "你你你你你你你",
              reply_status: 0, //默认
              content_status: 0, //默认
              inner_reply_message: "" //默认
            },
            {
              comment_id: 3,
              from: "一二三啊",
              from_id: 1,
              to: "二三四啊",
              to_id: 2,
              content: "在下一二三啊",
              reply_status: 0, //默认
              content_status: 0, //默认
              inner_reply_message: "" //默认
            },
            {
              comment_id: 4,
              from: "二三四啊",
              from_id: 2,
              to: "二三四啊",
              to_id: 2,
              content: "在下二三四啊",
              reply_status: 0, //默认
              content_status: 0, //默认
              inner_reply_message: "" //默认
            }
          ]
        }
      ]
    };
  },

  mounted() {
    this.post_id = this.$route.query.post_id;
    this.initPost();

    // function(){
    // alert(this.$refs.topPost);
    this.topHeight = this.$refs.topPost.offsetHeight + 165 + "px";
    // alert(this.topHeight)

    var $dropdownLi = $(".dropdown"); //设置hover时open
    $dropdownLi
      .mouseover(function() {
        $(this).addClass("open");
      })
      .mouseout(function() {
        $(this).removeClass("open");
      });

    // }
  },
  methods: {
    initPost: function() {
      let send = {
        login_user_id: this.$store.state.user_id,
        post_id: this.post_id
      };
      axios
        .post(
          "/api/Ripples_API/Home/WholePostServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          let post = JSON.parse(JSON.stringify(response.data)).post;
          this.collect_count = post.collect_count;
          this.user_img = post.user_img;
          this.user_name = post.user_name;
          this.title = post.title;
          this.content = post.content;
          this.time = post.time;
          this.good_count = post.good_count;
          this.comments = post.comments;
          this.badges = post.badges;
          this.topic = post.topic;
          this.topic_id = post.topic_id;
          this.good_status = post.good_status;
          this.collect_status = post.collect_status;

          this.comment_status = 0; //默认，总帖的评论键是否点开
          this.reply_message = ""; //默认，总贴的评论的内容

          for (let comment of this.comments) {
            comment.comment_status = 0;
            comment.content_status = 0;
            comment.comment_message = "";
            for (let inner_comment of comment.comments) {
              inner_comment.reply_status = 0; //默认
              inner_comment.content_status = 0; //默认
              inner_comment.inner_reply_message = ""; //默认
            }
          }
        })
        .catch(error => {
          alert(error);
        });
    }, //

    clickGood: function() {
      if (this.login_user == "") {
        // this.alertLogin();
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
              this.good_count = this.good_status
                ? this.good_count + 1
                : this.good_count - 1;
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
              this.good_count = this.good_status
                ? this.good_count + 1
                : this.good_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    clickCollect: function() {
      if (this.login_user == "") {
        // this.alertLogin();
        alert("请先登录");
        return;
      }
      if(this.user_name==this.login_user){
          alert("不能收藏自己的帖子");
          return;
          }
      let send = {
        user_id: this.$store.state.user_id,
        post_id: this.post_id
      };
      if (!collect_status)
        axios
          .post(
            "/api/Ripples_API/Operate/CollectPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              this.collect_status = this.collect_status ? 0 : 1;
              this.collect_count = this.collect_status
                ? this.collect_count + 1
                : this.collect_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
      else
        axios
          .post(
            "/api/Ripples_API/Operate/CollectPostServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              this.collect_status = this.collect_status ? 0 : 1;
              this.collect_count = this.collect_status
                ? this.collect_count + 1
                : this.collect_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    clickComment: function() {
      if (this.login_user == "") {
        alert("未登录不能回复");
        return;
      }
      this.comment_status = this.comment_status?0:1;
    },
    clickEachComment: function(comment,comment_index) {
      // alert("here")
      if (this.login_user == "") {
        alert("未登录不能回复");
        return;
      }
      
      // e.comment_status = e.comment_status?0:1;//不能是e.comment_status=!e.comment_status得到的是true false
      //vue中array[index]=new;这样的数组值的变化不会重新渲染视图
      // this.comments[comment_index].comment_status=comment.comment_status?0:1;
      comment.comment_status=comment.comment_status?0:1;
      //或Vue.set(this.objArr,index,newValue)  //(数组，索引，值)
      //  alert(comment.comment_status)
      var i;
      for (i = 0; i < comment.comments.length; i++) {
        comment.comments[i].comment_status = 0;
      }
      
      // this.comments.splice(comment_index,1,comment)
      this.$forceUpdate() //强制刷新
      // this.comment_status;
      // alert(i)
    },
    clickPostTopic: function() {
      // alert('here');
      this.$router.push({
        path: "/topic",
        query: { topic_id: this.topic_id }
      });
    },
    reply_post: function() {
      if (this.reply_message == "") return;

      let send = {
        user_id: this.$store.state.user_id,
        post_id: this.post_id,
        comment: this.reply_message
      };
      axios
        .post(
          "/api/Ripples_API/Operate/CommentPostServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          response = JSON.parse(JSON.stringify(response.data));
          var _comment = response.comment;
          _comment.content_status = 0;
          _comment.comment_status = 0;
          _comment.comment_message = "";
          _comment.comments = [];
          /*var _comment = {
            comment_id:1,
            from: this.login_user,
            from_id: this.COMMON.login_user_id,
            from_img: this.login_user_img,
            content: this.reply_message,
            good_count: 0,
            good_status: 0,
            time: "2020年4月4日",
          };*/
          this.comments.push(_comment);
          this.reply_message = "";
          this.comment_status = 0;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    clickCommentGood: function(comment) {
      if (this.login_user == "") {
        // this.alertLogin();
        alert("请先登录");
        return;
      }
      let send = {
        user_id: this.$store.state.user_id,
        comment_id: comment.comment_id
      };
      if (!comment.good_status)
        axios
          .post(
            "/api/Ripples_API/Operate/GoodCommentServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              comment.good_status = comment.good_status ? 0 : 1;
              comment.good_count = comment.good_status
                ? comment.good_count + 1
                : comment.good_count - 1;
                // this.comments

            }
          })
          .catch(error => {
            alert(error);
          });
      else
        axios
          .post(
            "/api/Ripples_API/Operate/CancelGoodCommentServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              comment.good_status = comment.good_status ? 0 : 1;
              comment.good_count = comment.good_status
                ? comment.good_count + 1
                : comment.good_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    commentInnerComment: function(comment) {
      if (comment.comment_message == "") return;
      let send = {
        from_id: this.$store.state.user_id,
        to_id: comment.from_id,
        comment: comment.comment_message,
        father_comment_id: comment.comment_id
      };
      axios
        .post(
          "/api/Ripples_API/Operate/CommentCommentServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          response = JSON.parse(JSON.stringify(response.data));
          var _comment = response.comment;
          _comment.reply_status = 0;
          _comment.content_status = 0;
          _comment.inner_reply_message = "";
          /*var _comment = {
            comment_id:1,
            from: this.login_user,
            from_id:1,
            to: comment.from,
            to_id:2,
            content: comment.comment_message,
          };*/
          comment.comments.push(_comment);
          comment.comment_message = "";
        })
        .catch(error => {
          alert(error);
        });

      // comment.comment_status = 0;
    }, //OK
    clickEachInnerComment: function(inner_comment,inner_comment_index,comment,comment_index) {
      if (this.login_user == "") {
        alert("未登录不能回复");
        return;
      }
      inner_comment.reply_status = !inner_comment.reply_status;
      this.$forceUpdate() //强制刷新
      // Vue.set(comment.comments,inner_comment_index,inner_comment)
      // comment.comments.splice(inner_comment_index,1,inner_comment);     
      // this.comments.splice(comment_index,1,comment);
    },
    replyInnerComment: function(comment, inner_comment) {
      if (comment.inner_reply_message == "") return;
      let send = {
        from_id: this.$store.state.user_id,
        to_id: inner_comment.from_id,
        comment: inner_comment.inner_reply_message,
        father_comment_id: comment.comment_id
      };
      axios
        .post(
          "/api/Ripples_API/Operate/CommentCommentServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          response = JSON.parse(JSON.stringify(response.data));
          var _comment = response.comment;
          _comment.reply_status = 0;
          _comment.content_status = 0;
          _comment.inner_reply_message = "";
          /*var _comment = {
            comment_id:1,
            from: this.login_user,
            from_id:1,
            to: comment.from,
            to_id:2,
            content: comment.comment_message,
          };*/
          comment.comments.push(_comment);
          inner_comment.inner_reply_message = "";
          inner_comment.reply_status = 0;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    deleteComment: function(comment) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "删除之后信息不会保存",
        buttons: [
          {
            title: "删除",
            handler: () => {
              let send = {
                comment_id: comment.comment_id
              };
              axios
                .post(
                  "/api/Ripples_API/Operate/DeleteCommentServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    this.comments.splice(this.comments.indexOf(comment), 1); //识别下标，删除该下标起length个元素
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
    deleteInnerComment: function(comment, inner_comment) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "删除之后信息不会保存",
        buttons: [
          {
            title: "删除",
            handler: () => {
              let send = {
                comment_id: inner_comment.comment_id
              };
              axios
                .post(
                  "/api/Ripples_API/Operate/DeleteCommentServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    comment.comments.splice(
                      comment.comments.indexOf(inner_comment),
                      1
                    ); //识别下标，删除该下标起length个元素
                    this.hideDialog();
                  }
                })
                .catch(error => {
                  alert(error);
                });

              this.hideDialog();
            }
          },
          {
            title: "保留"
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
.wrap {
  min-height: 1000px;
  width: 100%;
  /* background-color:inherit; */
  padding: 60px 15% 0 3%;
}
.wholePost {
  /* margin:80px 5% 0 5%;  */
  margin-bottom: 30px;
  /* padding: 20px; */
  /* border: 1px solid red; */
  height: 100%;
  overflow: hidden;
  /* background-color: white; */
  /* margin-top: 80px; */
  border-radius: 10px;
}
.topPost {
  /* position:fixed; */
  background-color: white;
  border-left: 5px solid rgb(198, 222, 231);
  border-top: 3px solid rgb(208, 229, 236);
  border-bottom: 2px solid rgb(216, 232, 238);
  position: fixed;
  width: 82%;
  margin-top: 20px;
  /* margin-right: 15%; */
  padding: 20px;
  border-radius: 10px;
  /* border-radius: 10px; */
  /* margin-left:-5%; */
}
/*top */
.top {
  width: 100%;
  /* border: 1px solid green; */
  margin-bottom: 10px;
}

.user {
  width: 100%;
}
.user_img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  float: left;
  object-fit: cover;
  align-self: center;
}
.user_wrap {
  float: left;
  margin-left: 10px;
  padding: 5px;
  text-align: left;
}
.user_name {
  font-size: 15px;
}
.time {
  display: block;
  font-size: 15px;
  color: gray;
  margin: 5px 0 0 0;
}
/*middle */
.middle {
  text-align: left;
  /* border: 1px solid red; */
}
.title {
  margin: 10px 0 10px 0;
  /* border: 1px solid red; */
  font-weight: bold;
}

.content {
  /* float:left; */
  color: rgb(99, 99, 99);
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
.badges {
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
.topic {
  float: right;
  color: royalblue;
  font-size: 12px;
  margin-right: 10px;
}
.topic:hover {
  cursor: pointer;
}
/*bottom */
.bottom {
  margin-bottom: 25px;
}
.bottom_right {
  float: right;
  font-size: 10px;
  margin-right: 15px;
}
/* .bottom_right_wrap{
  display: inline;
} */
/* .good {
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
} */

.commentLabel {
  float: left;
  text-align: left;
  font-size: 25px;
  color: skyblue;
  /* margin: 20px 0; */
  left: 3%;
  position: fixed;
  margin-top: 42px;
  font-weight: 550;
  margin-left: 10px;
}
#empty {
  width: 100%;
  border: 1px solid black;
  min-height: 1px;
  margin-bottom: 20px;
  margin-top: 20px;
  /* position: fixed; */
  /* float:top; */
  /* border:true; */
}
/* .commentswarp{
  position:fixed;
  width:80%;
} */
.comments {
  text-align: left;
  /* margin: 20px 0 0 0; */
  /* background-color: rgb(244, 248, 248); */
  /* padding: 10px 0 10px 15px; */
  border-radius: 5px;
  margin-left: 7%;
  margin-top: 60px;
  /* background-color: rgb(248, 251, 252); */
}
.eachComment {
  margin-bottom: 20px;
  /* position:fixed; */
  background-color: white;
  border-left: 3px solid rgb(216, 232, 238);
  border-top: 2px solid rgb(216, 232, 238);
  /* position: fixed; */
  /* margin-right: 5%; */
  padding: 20px 20px 30px 20px;
  border-radius: 10px;
}
.eachCommentMessage {
  margin-top: 10px;
}
.eachCommentMessage:hover,
.eachCommentMessage:focus {
  background-color: white;
}
.eachCommentLabel {
  float: left;
}

.eachCommentContent {
  font-size: 90%;
}
/* .eachCommentContent .user {
  border: 1px solid red;
} */
.eachCommentContent .user_img {
  width: 50px;
  height: 50px;
}
.eachCommentContent .user_wrap {
  margin-left: 3px;
}
.eachCommentContent .user_name {
  font-size: 12px;
}
.eachCommentContent .time {
  font-size: 10px;
}
.eachCommentContent .content_status_button {
  height: 20px;
  font-size: 16px;
  color: rgb(38, 109, 240);

  /* text-decoration:underline; */
  float: right;
  margin-top: -40px;
  margin-right: 16px;
}
.eachCommentContent .commentGood {
  float: left;
  margin-right: 15px;
}
.eachCommentContent .commentComment {
  float: left;
}
.eachCommentContent .bottom_right {
  margin-bottom: 10px;
  display: inline-block;
}

.inner_comments {
  text-align: left;
  margin: 20px 0 0 0;
  background-color: rgb(244, 248, 248);
  padding: 10px 0 10px 15px;
  border-radius: 5px;
}
.inner_comments .eachInnerComment {
  margin-bottom: 10px;
}
.inner_comments .eachInnerComment:hover,
.inner_comments .eachInnerComment:focus {
  background-color: white;
}
.inner_comments .eachInnerCommentLabel {
  float: left;
}

.toolbars {
  position: fixed;
  top: 100px;
  right: 15%;
  height: 50px;
  width: 20px;
  /* border:1px solid red; */
}

.toolbars ul li {
  /* float:left; */
  text-align: center;
  /* vertical-align: middle; */
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-bottom: 1px solid lightgray;
  /* position: relative; */
  padding-top: 40%;
  /* display: inline-block;
vertical-align: middle; */
  line-height: 50px;
  background-color: white;
  list-style-type: none;
  border-radius: 5px;
}
/* .toolbars ul li:last-child{
  border-bottom:0;
} */
.toolbars ul li svg {
  width: 15px;
  height: 15px;
  float: left;
  margin-left: 16px;
  margin-top: 16px;
}
/* .toolbars ul li p{
  float:right;
  margin-right:5px;
} */

.reply_post {
  position: fixed;
  bottom: 0;
  left: -3%;
  width: 105%;
  padding: 60px;
  height: 160px;
  background: rgb(255, 255, 255, 0.8);
  /* border:1px solid red; */
}
.reply_post input {
  width: 600px;
  height: 40px;
  border-radius: 10px;
  margin-left: -500px;
  border-color: skyblue;
}
.reply_post button {
  margin-left: 20px;
}

.deleteComment {
  float: right;
  color: gray;
}
.deleteComment:hover {
  color: royalblue;
}

.comment-alt:hover{
  cursor:pointer;
}
</style>
