<template>
  <div class="RealtimeTopic">
    <div class="topic" v-for="topic in topics">
      <h1 @click="clickTopic(topic)" class="title">
        <icon name="gem" id="top_icon" class="fa fa-5x"></icon>
        {{topic.title}}
      </h1>
      <div class="focus_wrap">
        <button v-if="!topic.focus_status" class="addTopic btn" @click="addTopic(topic)">
          <strong>+</strong>&nbsp; 关注</button>
        <span v-else="topic.focus_status" class="focusStatus">√&nbsp;&nbsp;已关注</span>

      </div>
      <p class="brief">{{topic.brief}}</p>
      
        <span class="counts">帖子量&nbsp;{{topic.post_count}}&nbsp;&nbsp;关注量&nbsp;{{topic.focus_count}}</span>
    </div>

    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: "PopularTopic",
  data() {
    return {
      topics:[
        {
          topic_id:1,
          title:"话题1",
          brief:"本话题是个好话题",
          focus_status:0,
          post_count:10,
          focus_count:3,
        },
        {
          topic_id:2,
          title:"话题2",
          brief:"本话题也是个好话题",
          focus_status:0,
          post_count:10,
          focus_count:3,
        }
        ,
        {
          topic_id:3,
          title:"话题3",
          brief:"本话题更是个好话题",
          focus_status:0,
          post_count:10,
          focus_count:3,
        }
      ]
    };
  },
  mounted() {
    this.initTopics();
  },
  methods: {
    initTopics: function() {
      let send = {
        login_user_id: this.$store.state.user_id
      };
      axios
        .post("/api/Ripples_API/Home/PopularTopicServlet", this.$qs.stringify(send))
        .then(response => {
          this.topics = JSON.parse(JSON.stringify(response.data)).topics;
        })
        .catch(error => {
          alert(error)
        });
    }, //OK
    clickTopic: function(topic) {
      this.$router.push({ path: "/topic", query: {topic_id:topic.topic_id} });
    },
    addTopic: function(topic) {
      if (this.$store.state.user_id==0) {
        // this.alertLogin();
        alert("请先登录");
        return;
      }
      let send = {
        user_id: this.$store.state.user_id,
        topic_id: topic.topic_id
      };
      if (!topic.focus_status)
        this.$modal.show("dialog", {
          title: "提示",
          text: "确认关注 " + topic.title,
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
                      topic.focus_status = 1;
                      topic.focus_count+=1;
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
          text: "确认取消关注 " + topic.title,
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
                    response = JSON.parse(JSON.stringify(response.data));
                    if (response.result) {
                      // alert("已取消关注");
                      this.hideDialog();
                      topic.focus_status = 0;
                      topic.focus_count-=1;
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
.topic {
  background: white;
  border-radius: 10px;
  text-align: left;
  /* height: 150px; */
  padding: 20px;
  margin-bottom: 30px;
}
.topic:hover {
  cursor: pointer;
}
.topic h1 {
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
  font-size:16px;
  /* margin-bottom: 20px; */
}
.counts {
  /* float: left; */
  font-size: 12px;
  color: gray;
}
</style>
