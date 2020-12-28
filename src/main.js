// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';//import Vue from "../node_modules/vue/dist/vue.js";
import App from './App'
import router from './router/router'

import '../jquery-3.5.0.min.js'
import '../jquery.cookie.js'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/echarts-wordcloud/dist/echarts-wordcloud.js';
import '../node_modules/echarts-wordcloud/dist/echarts-wordcloud.min.js';


import '../node_modules/vue-awesome/icons'
import Icon from '../node_modules/vue-awesome/components/Icon'
import VModal from '../node_modules/vue-js-modal'

Vue.component('icon', Icon)
// Vue.component('modal', Modal)
Vue.use(VModal,{dialog:true})

Vue.config.productionTip = false

import axios from 'axios';//import axios from '..\node_modules\axios\dist\axios.js';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//   var newData = encodeURI(data);
//   return newData
// }]

import COMMON from '@/data/common'
Vue.prototype.COMMON = COMMON;

import Store from "@/data/store"
Vue.prototype.$store=Store.store;
// alert(this.$store.state.user);

import echarts from '../node_modules/echarts'
Vue.prototype.$echarts=echarts;

Vue.prototype.Alert=function(modal,message) {
  modal.show("dialog", {
        title: "提示",
        text: message,
  });
  setTimeout(() => {
        modal.hide("dialog")
  }, 1500);
}



//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]


// axios.defaults.withCredentials=true;
 global.axios=axios;  //设置一个全局axios便于调用
// // axios.defaults.headers.common['Content-Type']='application/x-www-form-urlencoded';
// // axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';//get
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.baseURL='http://localhost:8080/';  //设置一个类似base_url的请求路径

/*
application/x-www-form-urlencoded： 窗体数据被编码为名称/值对。这是标准的编码格式。 
multipart/form-data： 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。 
text/plain： 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。

当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…）,然后把这个字串append到url后面，用?分割，加载这个新的url。 
当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 
如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 
但是如果有type=file的话，就要用到multipart/form-data了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary).

content-type:application/json,这个时候前端提交的数据是 json格式的字符串（name1=value1&name2=value2…），后端要用@requestbody注解来接收

axios默认使用的是application/json格式
*/

 
 
// axios.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证


//设置原型链
// Vue.prototype.$axios=axios;
// Vue.prototype.$http=axios;
// Vue.prototype.$ajax=axios;

import qs from "qs";
Vue.prototype.$qs = qs;

console.log("here");

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return{
      // login_user:null,
    }
  },
  // watch: {
  //   login_user: function (newValue,oldValue) {
  //                       this.$nextTick(()=>{
                    
  //                   // this.reFresh = true
  //               })
  //   },

  // },
})

console.log("there");
/*
$(this).ready(function () {
  $(".navbar-nav").find("li").each(function () {//this.$refs获得dom结点
    var a = this.find("a")[0];

    if (a.id === location.pathname) {
      alert('here');
      this.addClass("active");
    } else {
      this.removeClass("active");
    }
  })
}
);*/

