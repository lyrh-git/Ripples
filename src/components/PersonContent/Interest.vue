<template>
  <div class="interest">
    <div class="top">
      <p class="title">我的关注</p>
      <div class="thread"></div>
    </div>
    <div class="message">
      <div v-for="(topic,index) in topics" class="topic">
        <div class="decoration_top"></div>
        <div class="messageWrap">
          <div>
            <button class="deleteTopic btn" @click="deleteTopic(index,topic)">取消关注</button>
            <h2 class="topic_top" @click="clickTopic(topic)">
              <icon name="gem" id="top_icon" class="fa fa-5x"></icon>
              {{topic.title}}
            </h2>
          </div>
          <div class="topic_middle">
            <p>{{topic.brief}}</p>
          </div>
          <div class="topic_bottom">
            <p>帖子量{{topic.post_count}}</p>
            <p>关注量{{topic.focus_count}}</p>
          </div>
        </div>
        <div class="decoration_bottom"></div>
        <div style="clear:both"></div>
      </div>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: "Interest",
  data() {
    return {
      topics: [
        {
          topic_id: 1,
          title: "话题1",
          brief: "本话题关注娱乐八卦",
          post_count: 100,
          focus_count: 30 //关注人数,
        },
        {
          topic_id: 2,
          title: "话题2",
          brief: "本话题关注社交生活",
          post_count: 50,
          focus_count: 20 //关注人数
        },
        {
          topic_id: 3,
          title: "话题3",
          brief: "本话题关注吃喝美食",
          post_count: 500,
          focus_count: 100 //关注人数
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
        user_id: this.$store.state.user_id
      };
      axios
        .post("/api/Ripples_API/Person/InterestServlet", this.$qs.stringify(send))
        .then(response => {
          this.topics = JSON.parse(JSON.stringify(response.data)).topics;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    clickTopic: function(topic) {
      this.$router.push({
        path: "/topic",
        query: { topic_id: topic.topic_id }
      });
    },
    deleteTopic: function(index, topic) {
      this.$modal.show("dialog", {
        title: "提示",
        text: "确认取消关注 " + topic.title,
        buttons: [
          {
            title: "确认",
            handler: () => {
              let send = {
                user_id: this.$store.state.user_id,
                topic_id: topic.topic_id
              };
              axios
                .post(
                  "/api/Ripples_API/Operate/CancelFocusTopicServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    this.topics.splice(index, 1);
                    // alert("取消关注成功");
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
    },//OK
    hideDialog: function() {
      // alert("here")
      this.$modal.hide("dialog");
    }
  }
};
</script>

<style scoped>
.interest {
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

.topic {
  margin-bottom: 40px;
  padding: 10px;
}

.deleteTopic {
  float: right;
  color: grey;
  /* padding:5px; */
}
.deleteTopic:hover,
.deleteTopic:focus {
  color: royalblue;
}

.topic_top {
  color: royalblue;
  margin-bottom: 10px;
}
#top_icon {
  width: 20px;
  height: 20px;
}

.topic_top {
  margin-bottom: 15px;
}
.topic_top:hover,
.topic_top:focus {
  cursor: pointer;
  font-weight: 600;
}

.topic_middle {
  font-size: 15px;
  /* padding:5px 0; */
}

.topic_bottom {
  color: gray;
  font-size: 12px;
  display: inline-block;
}
.topic_bottom p {
  display: inline;
}

.decoration_top {
  opacity: 0.5;
  width: 20px;
  height: 20px;
  border-left: none;
  border-bottom: none;
  border-top: 2px solid silver;
  border-right: 2px solid royalblue;
  float: right;
}
.decoration_bottom {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  border-top: none;
  border-right: none;
  border-left: 2px solid royalblue;
  border-bottom: 2px solid silver;
  float: left;
  /* margin-top: -10px; */
}
.messageWrap {
  padding: 10px 15px 0px 15px;
  /* margin-left:10px; */
}
</style>
        