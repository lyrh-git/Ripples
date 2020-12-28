<template>
  <div class="whole">
    <div class="bg" :style="{backgroundImage:'url(' + background_img + ')'}">
      <!-- <div class="bg"> -->
    </div>
              
        
    <!-- <div class="text"> -->
    <div class="wrap">
<img class="user_img" :src="user_img" alt="头像" />
        
      
    <div class="content">

          <router-view></router-view>

    </div>

    </div>

    <div style="clear:both"></div>
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      background_img:this.COMMON.background_img,
      user_img: this.$store.state.user_img,
      // bg_img:
    };
  },
};
</script>

<style scoped>
.bg{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 800px;
    background: no-repeat center/cover;
    -webkit-filter:blur(100px) brightness(1.5) saturate(150%) opacity(50%);
    filter: blur(100px) brightness(1.5) saturate(150%) opacity(50%);/*毛玻璃*/
}

.wrap{
  margin-top:120px;
    margin-left:10%;
    position: relative;
    background-color:rgb(255,255,255,0.6);
    z-index: 1;
    width: 80%;
    min-height: 500px;
    border-radius:20px;
}
.content{
  text-align:left;
  font-family:'SimSun';
  color:black;
    /* position: relative; */
    margin-left:70px;
    z-index: 2;
    /* overflow: hidden; */
    /* border:2px solif green; */
    /* width:90%; */
}

.user_img {
  border-radius: 50%;
  width: 140px;
  height: 140px;
  object-fit: cover;
  align-self: center;
  float:left;
  /* position:absolute; */
  margin-left:-50px;
  margin-top:-50px;
}




</style>
