<template>
  <div class="editor">
    <div class="edit_label">
      编辑帖子
    </div>
    <div class="edit_main">
      <div class="edit_title">
        <label>标题:</label><br>
        <input type="text" :placeholder="title" v-model="title" />
      </div>
      <div class="edit_content">
        <label>内容:</label><br>
        <textarea class="textarea" rows="10" :placeholder="content" v-model="content" />
      </div>

      <div class="topic">
        <!-- <label>话题:</label> -->
        <icon name="gem" class="topic_icon"></icon>
        <button class="btn chooseTopic" @click="topic_status=!topic_status">
          <span v-if="!topic_title" style="font-size:16px;">
            添加话题
          </span>
          <span v-else style="color:royalblue;font-size:18px;">{{topic_title}}</span>
        </button>
        <div v-if="topic_status" class="topic_table_wrap">
          <table class="topic_table">
            <tr v-for="_topics in topics">
              <td v-for="eachtopic in _topics" @click="topic_title=eachtopic.title;topic_id=eachtopic.id;topic_status=!topic_status" class="eachtopic" :title="eachtopic.brief">
                {{eachtopic.title}}
              </td>
            </tr>
          </table>
        </div>

      </div>

      <div class="edit_badge">
        <label>标签:</label>
        <div v-for="(text,index) in badges" class="badges">
          <!-- <div v-for="(text,index) in badges" :delete-badge.sync="deleteBadge"> -->
          <badge :text="text" :index="index" :badges="badges" @delete-badge="deleteBadge" class="eachbadge"></badge>
          <!--子组件用emit给父组件传值修改要放在子组件的标签内，-->
        </div>
        <div class="add_badge badge badge-pill" @click="addBadge()">
          +
        </div>
      </div>
      <div class="bottom">
        <button class="btn" @click="addPost()">保存</button>
        <button class="btn" @click="cancel()">取消</button>
      </div>

      <!-- <modal name="test">呵呵</modal> -->
      <!-- <alert :message="alertMessage"></alert> -->
      <v-dialog/>

    </div>
  </div>
</template>

<script>
import Alert from "@/components/Tips/Alert";
export default {
  name: "PostEditor",
  data() {
    return {
      post_id: null,
      badges: [],
      title: "",
      content: "",
      topic_status: 0,
      topic_title: "",
      topic_id: 0,
      alertMessage: "确定要修改吗",
      topics: [
        [
          {
            id: 1,
            title: "生活",
            breif: "关注生活，珍惜美好，专心眼前的风景，不回头，路，就在前方。"
          },
          {
            id: 2,
            title: "音乐",
            breif: "聆听声音，倾听心灵，旋律伴人起舞，节奏随心飞扬。"
          },
          {
            id: 3,
            title: "运动",
            breif:
              "挥洒汗水，舞动青春，心潮澎湃下，是更强健的体魄，更坚强的心灵。"
          },
          {
            id: 4,
            title: "旅行",
            breif: "用脚步丈量山河海川，用恒心体味人生百态。"
          }
        ],
        [
          {
            id: 5,
            title: "美食",
            breif:
              "品尝生活，享受对味蕾的兴奋刺激，感受美好，沉浸对心灵的温暖熨贴。"
          },
          {
            id: 6,
            title: "工作",
            breif:
              "千里之行，始于足下。每天累积一点点，每天进步一点点，每天收获一点点。"
          },
          {
            id: 7,
            title: "成就",
            breif: "欣喜自己的小成就，雀跃自己的小作品，不自菲薄，你应得。"
          },
          {
            id: 8,
            title: "文艺",
            breif: "点滴生活，咀嚼文字，推敲语句，精致记录自己的文艺。"
          }
        ],
        [
          {
            id: 9,
            title: "爱情",
            breif: "诗与远方，不及身边的你。"
          },
          {
            id: 10,
            title: "友情",
            breif:
              "这一生，最幸运的莫不过拥有这样一个人，无论什么时候，都会第一时间站出来，站在你身边，支持你。"
          },
          {
            id: 11,
            title: "烦恼",
            breif: "小朋友你是否有很多问号？小小的脑袋大大的烦恼。"
          },
          {
            id: 12,
            title: "感动",
            breif: "泪眼模糊不是脆弱，而是心的跳动，终遇到了一个共同的频率。"
          }
        ]
      ]

      //{{{三个大括号调用成html格式}}}
    };
  },
  mounted() {
    // this.post_id = this.$route.query.post_id;
    // this.initPostData();
  },
  methods: {
    /*
    initPostData: function() {
      let send = {
        post_id: this.post_id
      };
      axios
        .post("http://localhost:8080/Ripples_API/Person/PostEditorServlet", send)
        .then(response => {
          this.post = eval("(" + JSON.stringify(response) + ")").post;
          this.badges = post.badges;
          this.title = post.title;
          this.content = post.content;
          this.topic = post.topic;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    */
    deleteBadge(index) {
      this.badges.splice(index, 1); //识别下标，删除该下标起length个元素
    },
    addBadge() {
      this.badges.push("标签" + (this.badges.length + 1));
    },
    addPost() {
      this.$modal.show("dialog", {
        title: "提示",
        text: "确认发布",
        buttons: [
          {
            title: "确定",
            handler: () => {
              let send = {
                badges: JSON.stringify(this.badges),
                title: this.title,
                content: this.content,
                topic_id: this.topic_id,
                user_id: this.$store.state.user_id
              };
              axios
                .post(
                  "/api/Ripples_API/Person/AddPostServlet",
                  this.$qs.stringify(send)
                )
                .then(response => {
                  var response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    this.$router.push({ path: "/person/post" });
                    this.hideDialog();
                  }
                })
                .catch(error => {
                  alert(error);
                });
            }
          },
          {
            title: "继续编辑"
          }
        ]
      });
      // let _this=this;//这里要用一个变量，this在setTimeout内部不能被直接访问到,或者用箭头函数
      // setTimeout(()=> {
      //   this.$modal.hide("dialog");
      //   this.$router.push({ path: "/person/post" });
      // }, 1000);
    }, //OK
    cancel() {
      this.$modal.show("dialog", {
        title: "提示",
        text: "离开之后内容不会保存",
        buttons: [
          {
            title: "确定离开",
            handler: () => {
              this.$router.push({ path: "/person/post" });
              this.hideDialog();
            }
          },
          // {
          //   title: "", // Button title enter
          //   default: true, // Will be triggered by default if 'Enter' pressed.
          //   handler: () => {} // Button click handler
          // },
          {
            title: "继续编辑"
          }
        ]
      });
    },
    hideDialog: function() {
      this.$modal.hide("dialog");
    }
  },

  components: {
    // Alert: Alert,
    Badge: {
      template:
        //   `<span v-if="text">{{text}}</span>`,""为false,,这里的class定义在组件组件最外层<badge>内
        `<span class="badge badge-pill">
            <p class="buttonStyle" @click="delete_thisBadge()">
            ×
            </p> 
            <p v-if="!edit_status" @dblclick="edit_status=!edit_status" title="双击修改">{{text}}</p>            
            <input type="text" v-model="badges[index]" :placeholder="placeholder" title="双击保存"
                v-if="edit_status" @dblclick="edit_status=!edit_status" class="inputStyle"
                @keyup.13="changeBadge()"/>           
        </span>`, //换行使用`
      props: ["text", "index", "badges"],
      data() {
        return {
          edit_status: 0
        };
      },
      computed: {
        placeholder() {
          return "标签" + this.index;
        }
      },
      methods: {
        delete_thisBadge: function() {
          this.$emit("delete-badge", this.index); //对应父组件中的@delete-badge触发事件
          // this.$emit('update:delete-badge',this.index);
        },
        changeBadge: function() {
          if (this.edit_status) this.edit_status = 0;
        }
      }
    }
  }
};
</script>

<style scoped>
.editor {
  padding: 20px;
  overflow: visible;
}
.edit_label {
  width: 50px;
  padding: 10px;
  height: 400px;
  border-right: 1px solid black;
  font-size: 25px;
  font-weight: 600;
  position: absolute;
  left: 25px;
  top: 90px;
}
.edit_main {
  padding: 50px 5%;
}
/* .edit_main div{
  margin-bottom: 20px;
} */
.edit_main input {
  color: rgb(50, 50, 50);
  outline-style: none;
  border-bottom: 1px solid gray;
  background: none;
  /* border-radius: 3px; */
  padding: 5px 10px;
  /* width: 400px; */
  font-size: 20px;
  /* color:gray; */
  /* font-weight: 700; */
  /* font-family: "Microsoft soft"; */
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
}
.edit_main label {
  font-size: 20px;
  color: black;
  margin-right: 20px;
}

.edit_title {
  margin-bottom: 20px;
}
.edit_title input {
  width: 90%;
}
.edit_content {
  margin-bottom: 20px;
}
.textarea {
  /* height:100px; */
  width: 90%;
  border: 1px solid black;
  color: rgb(50, 50, 50);
  font-size: 18px;
  background: none;
  border: 1px solid gray;
  margin-top: 10px;
  padding: 10px;
}

.edit_badge {
  /* margin:20px 0 -40px 40px; */
  margin-bottom: 20px;
}
.badges {
  display: inline-block;
}
.eachbadge {
  width: 70px;
  height: 30px;
  font-size: 10px;
  display: inline-block;
  padding-top: 7px;
  /* font-weight: 500; */
  /* background:none;
  border:1px solid lightblue; */
  /* color:black;
  background-color: white; */
  color: white;
  background-color: rgb(166, 237, 255, 0.6);
  margin-right: 10px;
  /* border-radius: 15px; */
  /* text-align: center; */
}
.add_badge {
  width: 20px;
  padding-left: 5px;
  position: relative;
  top: 1px;
  border-radius: 10px;
  margin-left: -10px;
  /* border: 1px solid lightskyblue;
  background:lightblue; */
  background: none;
  /* border:1px solid lightblue; */
  text-align: center;
  cursor: pointer;
  color: white;
  background-color: rgb(166, 237, 255, 0.6);
  /* color:black;
  background-color: white; */
}
/* .eachbadge /deep/ p{
} */
.eachbadge /deep/ .buttonStyle {
  /*这样子来定义内部样式，表示该选择器影响更深 */
  cursor: pointer;
  font-weight: 600;
  float: right;
  margin-right: 2px;

  /* background-color:rgb(255,255,255,0.6); */
  /* width:20px;
  height:20px;
  border-radius:10px; */
  /* border:1px solid red; */
}
.eachbadge >>> .inputStyle {
  outline-style: none;
  border-bottom: 1px solid white;
  background: none;
  padding-top: -7px;
  width: 50px;
  font-size: 8px;
  /* color:lightgray; */
  /* font-weight: 700; */
  /* font-family: "Microsoft soft"; */
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
}

.topic {
  color: royalblue;
  float: right;
  margin-right: 100px;
}
.topic_icon {
  width: 20px;
  height: 20px;
}
/*
.edit_topic input {
  width: 100px;
}*/

.addTopic {
  width: 70px;
  margin-left: 20px;
}
.addTopic strong {
  font-size: 15px;
}
.eachtopic {
  margin: 20px;
  color: slategray;
}
.eachtopic:hover {
  cursor: pointer;
  color: royal;
}
.topic_table_wrap {
  background: rgb(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
  position: relative;
  top: 10px;
  left: 20px;
}
.topic_table {
  position: relative;
  border-spacing: 20px 10px; /*单元格间距 */
  /* border:1px solid black; */
  font-size: 16px;
  width: 160px;
  height: 120px;
}

.bottom {
  margin-top: 20px;
}
.bottom .btn {
  color: rgb(34, 34, 34);
  /* color:grey; */
  /* font-weight:600; */
  font-size: 18px;
  padding: 0px;
  margin-right: 50px;
}
.bottom .btn:hover,
.bottom .btn:focus {
  /* color:rgb(0, 174, 255); */
  color: royalblue;
}
</style>
