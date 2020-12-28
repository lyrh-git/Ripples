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
        <div id="second" action="#">
          <div>
            <h1 id="three">注册</h1>
          </div>
          <!-- 用户名 -->
          <p>
            <input v-model="register_username" id="register-username" class="input-material" type="text"  placeholder="请输入用户名/姓名">
            <icon name="eye" style="visibility:hidden"></icon>
          </p>
          <!-- 邮箱 -->
          <p>
            <input v-model="email" id="email" class="input-material" type="text" pattern="/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/" placeholder="请输入邮箱">
            <icon name="eye" style="visibility:hidden"></icon>
            <p v-if="emailFormat&&(email!='')" class="remind">请输入正确的邮箱格式</p>
          </p>
          <!-- 第一次密码 -->
          <p v-if="passwordStatus1">
            <input id="password" class="input-material" type="text" v-model="pwd1"  placeholder="请输入密码">
            <icon name="eye" @click="passwordStatus1=!passwordStatus1"></icon>
          </p>
          <p v-if="!passwordStatus1">
            <input id="password" class="input-material" type="password" v-model="pwd1"  placeholder="请输入密码">
            <icon name="eye-slash" @click="passwordStatus1=!passwordStatus1"></icon>
          </p>
          <div v-if="pwd1!=''&&pwd2==''">
            <div id="pwdPower">
              <span :style="{'background':(pwdPower>0?'lightblue':'lightgray')}"></span>
              <span :style="{'background':(pwdPower>1?'#6bd2f4':'lightgray')}"></span>
              <span :style="{'background':(pwdPower>2?'deepskyblue':'lightgray')}"></span>
              <!-- class的正则换成中括号，里面不需要小括号 -->
            </div>
            <div id="pwdPowerText">
              <span :style="{'color':(pwdPower>0?'lightblue':'lightgray')}">弱</span>
              <span :style="{'color':(pwdPower>1?'#6bd2f4':'lightgray')}">中</span>
              <span :style="{'color':(pwdPower>2?'deepskyblue':'lightgray')}">强</span>
            </div>
          </div>
          <!-- 第二次密码 -->
          <p>
            <p v-if="pwd1!=pwd2&&(pwd2!='')" class="remind">两次密码不一致</p>
            <p v-if="!passwordStatus2">
              <input id="password-again" class="input-material" type="password" v-model="pwd2" placeholder="请再次输入密码">
              <icon name="eye-slash" @click="passwordStatus2=!passwordStatus2"></icon>
            </p>
            <p v-if="passwordStatus2">
              <input id="password-again" class="input-material" type="text" v-model="pwd2"  placeholder="请再次输入密码">
              <icon name="eye" @click="passwordStatus2=!passwordStatus2"></icon>
            </p>
          </p>
          <!-- <p v-if="!passwordStatus2">
                        <input id="password-again" class="input-material" type="password" v-model="pwd2" name="registerUsername" placeholder="请再次输入密码">
                        <icon name="eye-slash" @click="passwordStatus2=!passwordStatus2"></icon>
                        <p v-if="pwd1!=pwd2&&(pwd2!='')" class="remind">两次密码不一致</p> -->
          <!-- </p> -->
          <!-- 提交注册 -->
          <button id="login" type="submit" class="btn" @click="register()">注册</button>
          <br />
          <br />
          <div id="six">
            <router-link class="login" to="/login">&nbsp;回到登录页面</router-link>
          </div>
        </div>

      </div>
    </div>
    <v-dialog/>
  </div>
</template>
    
    <script>
export default {
  name: "Register",
  data() {
    return {
      register_username:"",
      passwordStatus1: 0,
      passwordStatus2: 0,
      //   emailFormat:1,
      email: "",
      pwd1: "",
      pwd2: ""
    };
  },
  computed: {
    emailFormat: function() {
      var regEmail =
        "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$";
      //   if(!regEmail.test(this.email))return 0;
      if (!this.email.search(regEmail)) return 0;
      else return 1;
    },
    pwdPower: function() {
      var power = 1;
      if (this.pwd1.search("[0-9]") > -1) power = 1;
      if (
        this.pwd1.search("[0-9]") > -1 &&
        this.pwd1.search("[A-Z|a-z]") > -1 &&
        this.pwd1.length > 6
      )
        power = 2;
      if (
        this.pwd1.search("[0-9]") > -1 &&
        this.pwd1.search("[A-Z|a-z]") > -1 &&
        this.pwd1.search(
          "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
        ) > -1 &&
        this.pwd1.length > 6
      )
        power = 3;
      // console.log(this.pwd1.search("W"));
      return power;
    }
  },
  //   watch:{
  //       pwdPower(newValue, oldValue){
  //           alert(newValue);
  //           switch(newValue){

  //               case 1:{$("pwdPower1").css("background","lightskyblue");
  //                     $("pwdPowerText1").css("color","lightskyblue");
  //                     break;
  //                     }
  //           }
  //       }
  //   },
  methods: {
    register: function() {
      let send={
        register_username:this.register_username,
        email:this.email,
        password:this.pwd1,
      }
      axios
        .post(
          "/api/Ripples_API/Ripple/RegisterServlet",this.$qs.stringify(send)
          /*注册时用js验证密码强度、邮箱格式等安全吗？还是长时间与servlet连接判断?
          注册：传送注册名、邮箱、密码，返回-1注册名已存在,1注册成功 
          （data:{result:1,description:"注册成功"}）
          （data:{result:0,description:"此邮箱已被注册"}）
          （data:{result:-1,description:"用户名已存在，请更改用户名"}）*/
        )
        .then(response => {
          // alert(response.result);
          // alert(JSON.stringify(response.data));
          var data=JSON.parse(JSON.stringify(response.data)).data;
          if(data.result==1) {
            this.Alert(this.$modal,data.description)
            this.$router.push({ path: "/login" });
            }
          if(data.result==0){
            this.Alert(this.$modal,data.description)
            this.email="";
          }
          if(data.result==-1){
            this.Alert(this.$modal,data.description)
            this.register_username="";
          }
          
        })
        .catch(error => {
          // this.Alert(this.$modal,"注册成功")
          // this.$router.push({ path: "/login" });
        });
    }//OK
  }
};
</script>
    
    <style scoped>
#six {
  float: left;
  font-family: "Microsoft soft";
  color: gray;
  font-weight: 700;
}
.login {
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

#pwdPower {
  text-align: left;
  margin-left: 10px;
  height: 10px;
}
#pwdPower span {
  display: inline-block;
  width: 100px;
  height: 5px;
  background: lightgray;
  line-height: 5px;
}
#pwdPowerText {
  text-align: left;
  margin: 5px 0 0 10px;
}
#pwdPowerText span {
  width: 100px;
  height: 20px;
  display: inline-block;
  text-align: center;
  color: lightgray;
  /* border:1px solid red; */
}
</style>
    
    
    
    