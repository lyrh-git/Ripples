import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//Vuex的作用类似全局对象，Vuex 使用单一状态树，用一个对象State包含了整个应用层级的所有状态，你可以理解为这些状态就是一堆全局变量和数据。

 //创建一个 store
 const store = new Vuex.Store({
  //state存储应用层的状态
  state:{
      user_id:window.sessionStorage.getItem('user_id')?window.sessionStorage.getItem('user_id'):0,  
      user_name:window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):"",
      user_img:window.sessionStorage.getItem('user_img')?window.sessionStorage.getItem('user_img'):"",
      count:0,
      auto_user_id:window.localStorage.getItem('user_id'),
      auto_user_name:window.localStorage.getItem('user_name'),
      auto_user_img:window.localStorage.getItem('user_img'),
      },
  //Vuex给我们提供修改仓库 store中的状态的唯一办法就是通过提交mutation,通过this.$store.commit("increment", value);调用
  mutations:{
    login(state,value){
        state.user_id = value.user_id;
        state.user_name=value.user_name;
        state.user_img=value.user_img;
        window.sessionStorage.setItem('user_id',value.user_id);
        window.sessionStorage.setItem('user_name',value.user_name);
        window.sessionStorage.setItem('user_img',value.user_img);
    },
    setAuto(state,value){
        state.auto_user_id=value.auto_user_id;
        state.auto_user_name=value.auto_user_name;
        state.auto_user_img=value.auto_user_img;
        window.localStorage.setItem('user_id',value.auto_user_id);
        window.localStorage.setItem('user_name',value.auto_user_name);
        window.localStorage.setItem('user_img',value.auto_user_img);
    },
    increment(state,value){
      state.count+=value;
    },
    exit(state){
        state.user_id=0;
        state.user_name="";
        state.user_img="";
    }
}
});
// alert(store.state.user)
export default{
    store
}