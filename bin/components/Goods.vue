<!--商品详情页面-->
<template>
  <div class='good-item'>

    <div class="main">
      <div class="left">
        <button @click="testServlet()">testServlet</button>
        <image class="good-item-image" :src="item.images[0]" @click="testServlet()"></image>
      </div>
      <div class="main-content">
          <p>主角：{{item.roles}}</p>
          <p>主演：{{item.actors}}</p>
          <p>类型：{{item.type}}</p>
          <p>播出时间：{{item.date}}</p>
          <p>集数：{{item.episodes}}</p>
      </div>
      <div class="right">
      </div>
    </div>

  </div>
  
</template>

<style scoped>
.good-item {
  padding-top:70px;
  width:100%;
  height:100%;
}
.good-item-image {
  /*margin-top:100px;*/

  border: 2px solid red;

}
.left{
  float: left;
  overflow:hidden;
  width: 270px;
  height:360px;
  border: 2px solid green;
  margin:20%;

}
.main{
  border:1px solid red;
  width: 100%;
  height: 100%;
  display:table;
}
.main-content{
  display:table-cell;
  margin-left:20%;
  text-align:left;
  vertical-align:middle;
  border:1px solid black;
  width:30%;
  font-size:20px;


}
.right{
  display:table-cell;
  width:20%;
}

</style>

<script>
import goods from "@/data/goods.js";
import qs from "qs";

// import axios from "axios";

export default {
  name: "Goods",
  computed: {
    item:function() {
      console.log(this.$route.query.name);
      var item=goods.goods.find(item => item.name===this.$route.query.name);
      alert(item.images[0]);
      //获得当前item的信息
      return item; //接收首页通过router传来的具体商品信息
    }
  },
  methods:{
    testServlet:function(){
      alert("testServlet");
      // this.$axios.get('/src/servlets/LoginServlet', {
        // axios.get('/src/servlets/LoginServlet',{
        //params: {//get时参数要写在params属性下
          // user: "123456",
          // password:"123456"
        //}
      // })
      let data={
        user: "123456",
        password:"123456"
      }
      axios.post("LoginServlet")
      .then(function (response) {
        alert(response.result);
        3
        
      })
      .catch(function (error) {
        alert(error);
      })
    }
  }
};
</script>

