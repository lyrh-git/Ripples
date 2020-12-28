<template>
  <div class="comment">
    <div class="top">
      <p class="title">我的评论</p>
      <div class="thread"></div>
    </div>
    <!-- <button @click="addPost()">addPost</button> -->
    <div class="message">
      <div v-for="(each,index) in comments" class="eachPost">
        <div class="wrap">
          <div class="content">
            <button class="btn deleteComment" @click="deleteComment(index)">删除</button>
            {{each.comment.content}}
          </div>

          <div class="post_content text-left">

            <strong>回复&nbsp;//{{each.post.user_name}}:</strong>
            {{each.post.content.substring(0,60)}}...
            <span class="post_title" @click="clickPostTitle(each)">
              【{{each.post.title}}】
            </span>

          </div>

          <div class="bottom">
            <div class="bottom_left">
              <small class="post_time">{{each.comment.time}}</small>
              <div class="good">
                <icon name="thumbs-up" :color="each.comment.good_status==1?'rgb(0, 191, 255,0.5)':'gray'" @click="clickGood(each)"></icon>
                {{each.comment.good_count}}
                <!-- <p>点赞</p> -->
              </div>
              <div class="comment_icon">
                <icon name="comment-alt"></icon>
                {{each.comment.comment_count}}
                <!-- <p>评论</p> -->
              </div>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>

        <div class="decoration_bottom"></div>

      </div>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      comments: [
        {
          post: {
            post_id: 1,
            user_img: "/static/images/ermiao.jpg",
            user_name: "一二三啊",
            title: "哈哈哈",
            time: "2020年02月02日",
            content:
              "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵"
          },
          comment: {
            comment_id: 1,
            content: "好的呢",
            time: "2020年04月04日",
            good_count: 1,
            comment_count: 0,
            good_status: 0
          }
        },
        {
          post: {
            post_id: 2,
            user_img: "/static/images/ermiao.jpg",
            user_name: "一二三啊",
            title: "达拉崩吧",
            time: "2020年3月27日",
            content:
              "浩然·达拉崩吧班得贝迪卜多比鲁翁·米娅莫拉苏娜丹尼谢莉红·迪菲特·昆图库塔卡提考特苏瓦西拉松·蒙达鲁克硫斯伯古比奇巴勒城·王"
          },
          comment: {
            comment_id: 2,
            content: "冲鸭",
            time: "2020年04月04日",
            good_count: 1,
            comment_count: 0,
            good_status: 0
          }
        }
      ]
    };
  },
  mounted() {
    this.initComments();
  },
  methods: {
    initComments: function() {
      let send = {
        user_id: this.$store.state.user_id
      };
      axios
        .post(
          "/api/Ripples_API/Person/CommentServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          this.comments = JSON.parse(JSON.stringify(response.data)).comments;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    clickPostTitle: function(e) {
      // alert('title');
      this.$router.push({ path: "/post", query: { post_id: e.post.post_id } });
    },
    clickGood: function(each) {
      let send = {
        user_id: this.$store.state.user_id,
        comment_id: each.comment.comment_id
      };
      if (!each.comment.good_status)
        axios
          .post(
            "/api/Ripples_API/Operate/GoodCommentServlet",
            this.$qs.stringify(send)
          )
          .then(response => {
            response = JSON.parse(JSON.stringify(response.data));
            if (response.result) {
              each.comment.good_status = each.comment.good_status ? 0 : 1;
              each.comment.good_count = each.comment.good_status
                ? each.comment.good_count + 1
                : each.comment.good_count - 1;
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
              each.comment.good_status = each.comment.good_status ? 0 : 1;
              each.comment.good_count = each.comment.good_status
                ? each.comment.good_count + 1
                : each.comment.good_count - 1;
            }
          })
          .catch(error => {
            alert(error);
          });
    }, //OK
    deleteComment(index) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "删除之后信息不会保存",
        buttons: [
          {
            title: "删除",
            handler: () => {
              let send = {
                comment_id: this.comments[index].comment.comment_id
              };
              axios
                .post(
                  "/api/Ripples_API/Operate/DeleteCommentServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    this.comments.splice(index, 1); //识别下标，删除该下标起length个元素
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
    },//OK
    hideDialog: function() {
      this.$modal.hide("dialog");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment {
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
  width: 95%;
}
.eachPost {
  margin-bottom: 40px;
}

.content {
  font-size: 20px;
  font-weight: 550;
  color: black;
}
.deleteComment {
  float: right;
  color: gray;
}
.deleteComment:hover {
  color: royalblue;
}
.post_content {
  /* float:left; */
  color: darkgray;
  font-size: 16px;
  margin-top: 15px;
  text-align: left;
}
.post_title {
  float: right;
}
.post_title:hover {
  cursor: pointer;
}
.post_title:hover,
.post_title:focus {
  color: royalblue;
}
/*bottom */
.bottom {
  margin-top: 10px;
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

.decoration_bottom {
  width: 20px;
  height: 20px;
  border-top: none;
  border-right: none;
  border-left: 2px solid silver;
  border-bottom: 2px solid silver;
  float: left;
  margin-top: -10px;
}

.wrap {
  padding: 10px 15px 0px 15px;
  /* margin-left:10px; */
}
</style>
