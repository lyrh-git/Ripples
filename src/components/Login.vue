<template>
  <div id="first" style="backgroundImage:url('/static/images_background/blue4.jpg')">
    <div id="two" style="display: flex; align-items:center; vertical-align: middle;">
      <div class="col-lg-6" id="one">
        <div class="info d-flex align-items-center; " id="five">
          <div>
            <h1>Welcome&nbsp;to</h1>
            <h1>RIPPLES!</h1>
          </div>
        </div>
      </div>

      <div class="col-lg-6 bg-white container" id="forth">
        <!--不能再重复用form提交了，用form的话，要在form标签里加action，提交后会直接访问form定义的行为，不会再找login()方法了-->
        <div id="second">
          <div>
            <h1 id="three">登录</h1>
          </div>
          <p>
            <input v-model="username" id="username" class="input-material" type="text" placeholder="请输入用户名/姓名/邮箱">
            <icon name="eye" style="visibility:hidden"></icon>
            <p v-if="result==2" class="remind">该用户不存在</p>
          </p>
          <p v-if="passwordStatus">
            <input v-model="password" id="password" class="input-material" type="text" placeholder="请输入密码">
            <icon name="eye" @click="passwordStatus=!passwordStatus"></icon>
            <p v-if="result==3" class="remind">用户密码错误</p>
          </p>
          <p v-if="!passwordStatus">
            <input v-model="password" id="password" class="input-material" style="" type="password" placeholder="请输入密码">
            <icon name="eye-slash" @click="passwordStatus=!passwordStatus"></icon>
            <p v-if="result==3" class="remind">用户密码错误</p>
          </p>

          <button id="login" class="btn" @click="login()" @keyup.13="login()">登录</button>
          <div class="custom-control custom-checkbox " style="float: right;">
            <input type="checkbox" class="custom-control-input" id="check2" v-model="autoLogin">
            <label class="custom-control-label" for="check2">自动登录</label>
          </div>
          <div class="custom-control custom-checkbox " style="float: right;">
            <input type="checkbox" class="custom-control-input" id="check1" v-model="rmbPwd">
            <label class="custom-control-label" for="check1">记住密码&nbsp;&nbsp;</label>
          </div>
          <br />
          <br />
          <div id="six">
            <small>没有账号or忘记密码</small>
            <router-link class="register" to="/register">&nbsp;注册</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      passwordStatus: 0,
      result: 0,
      username: "",
      password: "",

      autoLogin: true,
      rmbPwd: true
    };
  },
  // mounted() {
  //   this.tryAutoLogin();
  // },
  watch: {
    rmbPwd(val) {
      if (!val) this.autoLogin = false;
    }
  },
  methods: {
    login: function() {
      // this.$router.push({ path: "/person" });
      // axios.post("http://localhost:8080/Ripples_API/LoginServlet",$('#username,#password').serialize())
      let send = {
        email: this.username,
        password: this.password
      };
      axios
        .post(
          "/api/Ripples_API/Ripple/LoginServlet",
          this.$qs.stringify(send)
          /*传送用户名密码，返回
          （data:{result:1,user_id:123,user_name:"",user_img:"",description:"登录成功"}） 
          （0，null,null,null,description:"用户名不存在" ） 
          （-1，null,null,null,description:"用户密码错误"） */
        )
        .then(response => {
          // var data = eval("(" + JSON.stringify(response) + ")").data;
          var data = JSON.parse(JSON.stringify(response.data)).data;

          if (data.result == 1) {
            this.Alert(this.$modal, data.description);
            var user = {
              user_name: data.user_name,
              user_id: data.user_id,
              user_img: data.user_img
            };
            this.$store.commit("login", user);
            this.$router.push({ path: "/personal" });
            this.auto(); //保存密码
          }
          if (data.result == 0) {
            this.Alert(this.$modal, data.description);
            return;
          }
          if (data.result == -1) {
            this.Alert(this.$modal, data.description);
          }
          //   this.$router.push({ path: "/person" });
        })
        .catch(error => {
          // alert(error);
          // this.COMMON.login_user="君莫笑";
          // this.COMMON.login_user="君莫笑";
          // alert(this.COMMON.login_user);
          /*this.$store.commit("login", "君莫笑");
          this.COMMON.login_user_id=1;
          alert(this.$store.state.user);
          this.$router.push({ path: "/personal" });*/
          // alert("登录失败");
        });
    }, //OK
    auto: function() {
      /*if (this.rmbPwd) {
        $.cookie("rmbPwd", "true", { expires: 30 }); //存储一个带7天期限的cookie
        $.cookie("username", "this.username", { expires: 30 });
        $.cookie("password", this.password, { expires: 30 });
      } else {
        $.cookie("rmbUser", "false", { expire: -1 });
        $.cookie("username", "", { expires: -1 });
        $.cookie("password", "", { expires: -1 });
      }*/
      if (this.autoLogin) {
        var user = {
          auto_user_name: this.$store.state.user_name,
          auto_user_id: this.$store.state.user_id,
          auto_user_img: this.$store.state.user_img
        };
        this.$store.commit("setAuto", user);
      } else {
        var user = {
          auto_user_name: "",
          auto_user_id: 0,
          auto_user_img: ""
        };
        this.$store.commit("setAuto", user);
      }
    }
  }

  /*mounted() {
    if ($.cookie("rmbPwd") == "true") {
      this.username = $.cookie("username");
      this.password = $.cookie("password");
    }
    if ($.cookie("autoLogin") == "true") this.login();
  }*/
};
</script>

<style scoped>
#six {
  float: left;
  font-family: "Microsoft soft";
  color: grey;
  font-weight: 700;
}
.register {
  color: rgb(84, 181, 211);
}
input {
  outline-style: none;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
  padding: 13px 14px;
  width: 400px;
  font-size: 14px;
  font-weight: 700;
  font-family: "Microsoft soft";
  border-top-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;
}
#three {
  font-family: "Microsoft soft";
  font-weight: 700;
  color: rgb(84, 181, 211);
}
#one {
  border-radius: 10px 0 0 10px;
  background-color: rgba(125, 210, 238, 0.527);
  display: flex;
  align-items: center;
  vertical-align: middle;
  width: 450px;
  height: 400px;
  color: white;
  font-family: "Economica" ， "Microsoft Yahei";
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  font-size: 3.5vw;
}
#first {
  height: 600px;
  margin: 6px;
  /* background: url('../assets/images/blue4.jpg'); */
  
  background: no-repeat center/cover;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  box-shadow: 10px 10px 10px white inset, 10px -10px 10px white inset,
    -10px 10px 10px white inset, -10px -10px 10px white inset;
}
#second {
  margin: 0px auto;
}

#forth {
  border-radius: 0 10px 10px 0;
  background-color: white;
  display: flex;
  align-items: center;
  vertical-align: middle;
  width: 450px;
  height: 400px;
  text-transform: uppercase;
}
#five {
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin: 0px auto;
}
button {
  background-color: lightskyblue;
  color: white;
  float: left;
}

.remind {
  color: lightblue;
  float: left;
  margin-left: 10px;
}
</style>

