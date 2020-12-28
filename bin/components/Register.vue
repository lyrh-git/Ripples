<template>
        <div id="first">
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
                    <form id="second">
                        <div><h1 id="three">注册</h1></div>
                    <p>
                    <input id="register-username" class="input-material" type="text" name="registerUsername" placeholder="请输入用户名/姓名">
                    </p>
                    <p>
                    <input id="email" class="input-material" type="text" name="registerUsername" placeholder="请输入邮箱"></p>
                    <p>
                    <input id="password" class="input-material" type="text" name="registerUsername" placeholder="请输入密码">
                    </p>
                    <p>
                    <input id="password_again" class="input-material" type="text" name="registerUsername" placeholder="请再次输入密码">
                    </p>
                    <button id="login" type="submit" class="btn">注册</button>
                        <br />
                        <br />
                        <div id="six"><router-link class="login" to="/login">&nbsp;回到登录页面</router-link></div>
                    </form>
    
                </div>
            </div>
        </div>
</template>
    
    <script>
    export default{
        name:'Register'
    }
    </script>
    
    <style scoped>
    #six{
        float:left;
        font-family:"Microsoft soft";
        color:grey;
        font-weight: 700;
        }
    .login{
        color:rgb(84, 181, 211);  
    }
    input{
        outline-style: none ;
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
    #three{
        font-family: "Microsoft soft";
        font-weight: 700;
        color:rgb(84, 181, 211);
    }
    #one{
        border-radius: 10px 0 0 10px;
        background-color: rgba(125, 210, 238, 0.527);
        display: flex;
        align-items:center;
        vertical-align: middle;
        width: 450px;
        height: 400px; 
        color: white;
        font-family: 'Economica'，'Microsoft Yahei';
        text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
        font-size: 3.5vw;
    }
    #first{
        height:600px; 
        margin:6px;
        background:url(blue4.jpg);
        justify-content:center;
        align-items:center;
        display:-webkit-flex;
        box-shadow:10px 10px 10px white inset,10px -10px 10px white inset,-10px 10px 10px white inset,-10px -10px 10px white inset;
    
    }
    #second {
        margin:0px auto;
    }
    
    #forth{
        border-radius: 0 10px 10px 0;
        background-color: white;
        display: flex;
        align-items:center;
        vertical-align: middle;
        width: 450px;
        height: 400px;
        text-transform: uppercase;
    }
    #five{
        display: flex;
        align-items:center;
        vertical-align: middle;
        margin:0px auto;
    }
    button{
        background-color: lightskyblue;
        color:white;
        float:left;
    }
    </style>
    
    
    
    