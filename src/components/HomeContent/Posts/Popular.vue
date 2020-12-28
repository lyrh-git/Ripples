<template>
  <div>
    <!-- <button @click="addPost()">addPost</button> -->
    <div v-for="post in posts">
      <each-post :user_img="post.user_img" :user_name="post.user_name" :user_id="post.user_id" :post_content="post.post_content" :post_time="post.post_time" :post_title="post.post_title" 
      :post_good_count="post.post_good_count" :post_badges="post.post_badges" :post_comment_count="post.post_comment_count" :post_collect_count="post.post_collect_count"
      :post_id="post.post_id" :topic_id="post.topic_id" :post_topic="post.topic" :collect_status="post.post_collect_status" :good_status="post.post_good_status">
      </each-post>
    </div>
  </div>
</template>

<script>
import eachPost from "@/components/eachPost";
export default {
  name: "Popular",
  data() {
    return {
      posts: [
        {
          post_id:1,
          topic_id:2,
          user_img: "/static/images/ermiao.jpg",
          user_name: "一二三啊",
          user_id: "r123456",
          post_title: "哈哈哈",
          post_content:
            "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵",
          post_time: "2020年02月02日",
          post_good_count: 0,
          post_good_status:0,//若没登录即传递的user_id返回0，
          post_collect_status:0,
          post_collect_count:0,
          post_comment_count:3,
          topic:"",
          post_comments: [
            {
              comment_id:1,
              from: "君莫笑",
              from_id:0,
              to: "一二三啊",
              to_id:1,
              content: "你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你你",
              // reply_status: 0,
              // content_status: 0,
            },
            {
              comment_id:2,
              from: "一二三啊",
              from_id:1,
              to: "二三四啊",
              to_id:2,
              content: "我我我我我我我",
              // reply_status: 0,
              // content_status: 0,
            },
            {
              comment_id:3,
              from: "一二三啊",
              from_id:1,
              to: "一二三啊",
              to_id:1,
              content: "在下一二三啊",
              // reply_status: 0,
              // content_status: 0,
            }
          ],
          post_badges: ["Realtime", "美食"]
        },

      ]
    };
  },
  components: { eachPost },
  mounted(){
    this.initPosts();
  },
  methods: {
    initPosts: function() {
      let send={
        login_user_id:this.$store.state.user_id,
      }
      axios
        .post(
          "/api/Ripples_API/Home/PopularPostServlet",this.$qs.stringify(send)
        )
        .then(response => {
          this.posts= JSON.parse(JSON.stringify(response.data)).posts;
        })
        .catch(error => {
          alert(error);
        });
    }//
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
