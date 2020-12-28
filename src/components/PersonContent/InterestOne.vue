<template>
  <div class="interestone">
    <div class="top">
      <p class="title">
        <icon name="gem" id="top_icon" class="fa fa-5x"></icon>
        {{topic}}</p>
      <div class="dropdown">
        <button type="button" class="btn" id="dropdownMenu1" data-toggle="dropdown">
          <p class="listicon">
            <icon name="list"></icon>
          </p>
        </button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
          <li role="presentation">
            <router-link role="menuitem" tabindex="-1" to="/person/interest">我的关注</router-link>
          </li>
          <li role="presentation" class="divider"></li>
          <li role="presentation" v-for="_topic in topics">
            <router-link role="menuitem" tabindex="-1" :to="{ name: 'InterestOne',query: { topic_id:_topic.topic_id }}">{{_topic.name}}</router-link>
          </li>
        </ul>
      </div>
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
            <p>{{post.content.substring(0,60)}}...</p>
          </div>
          <div>
            <div class="post_badges" v-for="badge in post.badges">
              <span class="badge badge-pill">{{badge}}</span>
            </div>
            <div class="post_topic" @click="clickPostTopic()" title="进入话题">
              <icon name="gem" id="top_icon"></icon>
              {{topic}}
            </div>
            <div style="clear:both"></div>
          </div>

        </div>

        <div class="bottom">
          <div class="bottom_left">
            <div class="post_time">
              <small>{{post.time}}</small>
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
            <button class="btn" @click="editPost(post)">编辑</button>
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
  name: "InterestOne",
  mounted: function() {
    var $dropdownLi = $(".dropdown"); //设置hover时open

    $dropdownLi
      .mouseover(function() {
        $(this).addClass("open");
      })
      .mouseout(function() {
        $(this).removeClass("open");
      });
  },
  data() {
    return {
      topic_id: null,
      topic: "周星星",
      posts: [
        {
          post_id: 1,
          title: "达拉崩吧",
          time: "2020年3月27日",
          good_count: 10,
          badges: ["Realtime", "周深"],
          content:
            "浩然·达拉崩吧班得贝迪卜多比鲁翁·米娅莫拉苏娜丹尼谢莉红·迪菲特·昆图库塔卡提考特苏瓦西拉松·蒙达鲁克硫斯伯古比奇巴勒城·王",
          comment_count: 1,
          collect_count: 0,
          good_status: 0
        },
        {
          post_id: 2,
          title: "啦啦啦",
          time: "2020年02月06日",
          good_count: 1,
          badges: ["Realtime", "游戏"],
          content:
            "哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
          comment_count: 0,
          collect_count: 0,
          good_status: 0
        }
      ],
      topics: [
        {
          topic_name: "话题1",
          topic_id: 1
        },
        {
          topic_name: "话题2",
          topic_id: 2
        }
      ]
    };
  },
  mounted() {
    this.topic_id = this.$route.query.topic_id;
    this.initPosts();
  },
  methods: {
    initPosts() {
      let send = {
        user_id: this.$store.state.user_id,
        topic_id: this.topic_id
      };
      axios
        .post("http://localhost:8080/Ripples_API/Person/TopicPostServlet", this.$qs.stringify(send))
        .then(response => {
          var data = JSON.parse(JSON.stringify(response.data)).data;
          this.topic = data.topic;
          this.posts = data.posts;
          this.topics = data.topics;
        })
        .catch(error => {
          alert(error);
        });
    }, //
    clickPostTitle: function(e) {
      this.$router.push({ path: "/post", query: { post_id: e.post_id } });
    },
    deletePost: function(e) {
      //删除在此话题下的发帖
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
                  "http://localhost:8080/Ripples_API/Operate/DeletePostServlet",
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
    editPost: function(e) {
      this.$router.push({
        path: "/person/post_editor",
        query: { post_id: e.post_id }
      }); //params:postID
    },
    hideDialog: function() {
      this.$modal.hide("dialog");
    },
    clickPostTopic: function() {
      this.$router.push({ path: "/topic", query: { topic_id: this.topic_id } });
    },
    clickGood: function(post) {
      let send = {
        user_id: this.$store.state.user_id,
        post_id: post.post_id
      };
      if (!this.good_status)
        axios
          .post(
            "http://localhost:8080/Ripples_API/Operate/GoodPostServlet",
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
            "http://localhost:8080/Ripples_API/Operate/CancelGoodPostServlet",
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
    } //OK
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.interestone {
  padding: 20px;
}

.title {
  font-size: 25px;
  font-weight: 600;
  color: royalblue;
}

.topic_top h1 {
  color: royalblue;
  margin-bottom: 10px;
}
.top #top_icon {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  text-align: center;
}
.dropdown {
  float: right;
  top: -50px;
  right: 30px;
}
.dropdown button {
  width: 30px;
  height: 30px;
  -webkit-tap-highlight-color: transparent;
}
.dropdown-menu {
  /* position:relative; */
  /* left:20px; */
  max-width: 200px;
  min-width: 50px;
  width: 100px;
  border-radius: 5px;
  left: 20px;
  top: 40px;
}
.dropdown-menu li {
  margin-bottom: 5px;
  text-align: center;
}
/* .dropdown button:focus{
    border:none;
} */
.listicon {
  color: gray;
  width: 30px;
  height: 30px;
  font-size: 30px;
}
.thread {
  position: relative;
  /* left:150px; */
  border-top: 1px solid black;
  margin-top: 10px;
  width: 95%;
}

/* .topic_top {
  margin: 40px 0 0 0;
}
.topic_top:hover,
.topic_top:focus {
  cursor: pointer;
  font-weight: 600;
} */

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
