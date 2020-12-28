<template>
  <div class="personalData">
    <div class="top">
      <p class="title">个人资料</p>
      <button class="btn change" v-if="change_status" @click="change_status=!change_status">修改资料</button>
      <div class="thread"></div>
    </div>

    <div class="message" v-if="change_status">
      <table>
        <tr>
          <td class="td_label">ID:</td>
          <td class="td_in">{{ID}}</td>
          <td class="td_space"></td>
          <td class="td_label">R龄:</td>
          <td class="td_in">{{R_days}}</td>
        </tr>
        <tr>
          <td class="td_label">昵称:</td>
          <td class="td_in">{{name}}</td>
          <td class="td_space"></td>
          <td class="td_label">行业:</td>
          <td class="td_in">{{work}}</td>
        </tr>
        <tr>
          <td class="td_label">性别:</td>
          <td class="td_in">{{sex}}</td>
          <td class="td_space"></td>
          <td class="td_label">邮箱:</td>
          <td class="td_in">{{email}}</td>
        </tr>
        <tr>
          <td class="td_label">生日:</td>
          <td class="td_in">{{birthday}}</td>
          <td class="td_space"></td>
          <td class="td_label">星座:</td>
          <td class="td_in">{{constellation}}</td>
        </tr>
        <tr>
          <td class="td_label">个性签名:</td>
          <td class="td_in">{{motto}}</td>
          <td class="td_space"></td>
          <td colspan="2">
            <img :src="xingzuo_img" class="xingzuo_img" />
          </td>
        </tr>
      </table>
    </div>
    <div class="message" v-else>
      <table>
        <tr>
          <td class="td_label">ID:</td>
          <td class="td_in">{{ID}}</td>
          <td class="td_space"></td>
          <td class="td_label">R龄:</td>
          <td class="td_in">{{R_days}}</td>
        </tr>
        <tr>
          <td class="td_label">昵称:</td>
          <td class="td_in">{{name}}</td>
          <td class="td_space"></td>
          <td class="td_label">行业:</td>
          <td class="td_in">
            <input type="text" id="work" :placeholder="work" v-model="formMess.work" />
          </td>
        </tr>
        <tr>
          <td class="td_label">性别:</td>
          <td class="td_in">
            <!-- <input type="text" id="sex" :placeholder="sex" v-model="formMess.sex" /> -->
            <select class="form-control" v-model="formMess.sex" style="background:rgb(255,255,255,0.2)">
              <option></option>
              <option>男</option>
              <option>女</option>
            </select>
          </td>
          <td class="td_space"></td>
          <td class="td_label">邮箱:</td>
          <td class="td_in">{{email}}</td>
        </tr>
        <tr>
          <td class="td_label">生日:</td>
          <td class="td_in">
            <input type="text" id="birthday" :placeholder="birthday" v-model="formMess.birthday" />
          </td>

          <td class="td_space"></td>
          <td class="td_label">星座:</td>
          <td class="td_in">
            <!-- <input type="text" id="email" :placeholder="constellation" v-model="formMess.constellation" /> -->
            <select class="form-control" v-model="formMess.constellation" style="background:rgb(255,255,255,0.2)">
              <option v-for="constellation in constellations">
                {{constellation}}
              </option>
            </select>
          </td>

        </tr>
        <tr>
          <td class="td_label">个性签名:</td>
          <td class="td_in">
            <input type="text" id="motto" :placeholder="motto" v-model="formMess.motto" />
          </td>
          <td class="td_space"></td>
          <td>
            <button class="btn" @click="change()">确认修改</button>
          </td>
          <td>
            <button class="btn" @click="cancel()">取消</button>
          </td>
        </tr>
      </table>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
export default {
  name: "PersonalData",
  data() {
    return {
      //头像修改！！！！！！星座！！！！！！
      ID: this.$store.state.user_id,
      name: this.$store.state.user_name,
      sex: "",
      birthday: "",
      motto: "",
      R_days: 0, //账号年龄
      work: "",
      email: "",
      // xingzuo_img: "",
      constellation: "",
      constellation_id: 8,
      constellations: [
        "白羊座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "狮子座",
        "处女座",
        "天秤座",
        "天蝎座",
        "射手座",
        "摩羯座",
        "水瓶座",
        "双鱼座"
      ],
      /*
      constellations:[
        {
          name:"白羊座",
          date:"3.21-4.19",
        },
        {
          name:"金牛座",
          date:"4.20-5.20",
        },
        {
          name:"双子座",
          date:"5.21-6.20",
        },
        {
          name:"巨蟹座",
          date:"6.21-7.21"  
        },
        {
          name:"狮子座",
          date:"7.22-8.22"
        },
        {
          name:"处女座",
          date:"8.23-9.22"
        },
        {
          name:"天秤座",
          date:"9.23-10.22"
        },
        {
          name:"天蝎座",
          date:"10.23-11.21"
        },
        {
          name:"射手座",
          date:"11.22-12.21"
        },
        {
          name:"摩羯座",
          date:"12.22-1.19"
        },
        {
          name:"水瓶座",
          date:"1.20-2.18"
        },
        {
          name:"双鱼座",
          date:"2.19-3.20"
        }
      ],*/

      change_status: 1,
      formMess: {
        user_id: this.$store.state.user_id,
        // name: this.name,
        sex: this.sex,
        birthday: this.birthday,
        motto: this.motto,
        work: this.work,
        // email: this.email,
        constellation: this.constellation
      }
    };
  },
  computed: {
    xingzuo_img: function() {
      if (this.sex == "男")
        return (
          "/static/images_constellation/boys/" + this.constellation_id + ".png"
        );
      if (this.sex == "女")
        return (
          "/static/images_constellation/girls/" + this.constellation_id + ".png"
        );
      return "";
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData: function() {
      let send = {
        user_id: this.$store.state.user_id
      };
      axios
        .post(
          "/api/Ripples_API/Person/PersonDataServlet",
          this.$qs.stringify(send)
        )
        .then(response => {
          var data = JSON.parse(JSON.stringify(response.data)).data;
          this.sex = data.sex;
          this.birthday = data.birthday;
          this.motto = data.motto;
          this.R_days = data.R_days;
          this.work = data.work;
          this.email = data.email;
          this.xingzuo_img = data.xingzuo_img;
          this.constellation = this.constellations[data.constellation - 1];
          this.constellation_id = data.constellation;
        })
        .catch(error => {
          alert(error);
        });
    }, //OK
    hideDialog: function() {
      // alert("here")
      this.$modal.hide("dialog");
    },
    change: function() {
      // alert(this.formMess.constellation)
      this.formMess.constellation =
        this.constellations.indexOf(this.formMess.constellation) + 1;
      this.$modal.show("dialog", {
        title: "提示",
        text: "确认保存修改内容",
        buttons: [
          {
            title: "保存修改",
            handler: () => {
              let _this = this;
              axios
                .post(
                  "/api/Ripples_API/Operate/ChangePersonDataServlet",
                  this.$qs.stringify(this.formMess)
                )
                .then(response => {
                  var response = JSON.parse(JSON.stringify(response.data));
                  if (response.result) {
                    var user = this.$store.state;
                    user.user_name = this.formMess.name;
                    this.$store.commit("login", user);
                    // this.name = this.formMess.name;
                    this.sex = this.formMess.sex;
                    this.birthday = this.formMess.birthday;
                    this.motto = this.formMess.motto;
                    this.work = this.formMess.work;
                    // this.email = this.formMess.email;
                    this.constellation = this.constellations[
                      this.formMess.constellation - 1
                    ];

                    this.constellation_id = this.formMess.constellation;
                    // this.updateXingzuo();
                    this.change_status = !this.change_status;
                    _this.hideDialog();
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
    }, //OK
    cancel() {
      this.$modal.show("dialog", {
        title: "提示",
        text: "离开之后修改内容不会保存",
        buttons: [
          {
            title: "确定离开",
            handler: () => {
              this.change_status = !this.change_status;
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
    }
  }
};
</script>

<style scoped>
.personalData {
  padding: 20px;
  width: 95%;
  overflow: hidden;
}

/*.top {
   width: 95%; 
}*/
.title {
  font-size: 25px;
  font-weight: 600;
}
.change {
  float: right;
  position: relative;
  top: -40px;
  cursor: pointer;
}

.thread {
  position: relative;
  /* left:150px; */
  border-top: 1px solid black;
  margin-top: 10px;
}

.message {
  margin-top: 20px;
}
table {
  font-size: 20px;
  border-collapse: separate;
  border-spacing: 10px 25px;
  /* border:1px solid black; */
  max-width: 1500px;
  table-layout: fixed;
}
table td {
  height: 40px;
  /* border:1px solid black; */
}
table .td_label {
  font-size: 22px;

  font-weight: 550;
  width: 15%;
}
table .td_in {
  width: 30%;
}
table .td_space {
  width: 8%;
}
.xingzuo_img {
  width: 100px;
  margin-left: 50px;
}

input {
  outline-style: none;
  border-bottom: 1px solid gray;
  background: none;
  /* border-radius: 3px; */
  padding: 5px 10px;
  /* width: 400px; */
  font-size: 20px;
  color: gray;
  /* font-weight: 700; */
  /* font-family: "Microsoft soft"; */
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
}
.btn {
  color: darkslategrey;
  font-size: 20px;
}
.btn:hover,
.btn:focus {
  /* color:rgb(0, 174, 255); */
  color: royalblue;
}
</style>
