<template>
  <div>
    <div v-for="game in games" class="eachGame">

      <img :src="game.img" class="img" />
      <div>
        <div style="text-align:left">
          <a :href="game.href" class="name" target="_blank">{{game.name}}</a>
        </div>
        <div class="brief">{{game.brief}}</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Games",
  data() {
    return {
      games: [
        {
          img: "/static/images_game/大富翁.png",
          name:  "大富翁",
          brief: "一款模拟经营类的益智游戏",
          href:  "http://www.4399.com/flash/207818.htm#search3"
        },
        {
          img: "/static/images_game/我的猫咪.png",
          name:  "我的猫咪",
          brief: "一款饲养猫咪的休闲模拟游戏",
          href:  "http://www.4399.com/flash/212027.htm"
        },{
          img: "/static/images_game/疯狂变形车.png",
          name:  "疯狂变形车",
          brief: "一款好玩的休闲组装游戏",
          href:  "http://www.4399.com/flash/212319.htm"
        },{
          img: "/static/images_game/一笔画图.png",
          name:  "一笔画图",
          brief: "一款挑战你脑力极限的益智游戏",
          href:  "http://www.4399.com/flash/211000.htm"
        },{
          img: "/static/images_game/装满水杯.png",
          name:  "装满水杯",
          brief: "一款好玩的益智游戏",
          href:  "http://www.4399.com/flash/207400.htm"
        },{
          img: "/static/images_game/迷宫盒子.png",
          name:  "迷宫盒子",
          brief: "一款重力小游戏",
          href:  "http://www.4399.com/flash/29280.htm"
        },{
          img: "/static/images_game/运输车司机.png",
          name:  "运输车司机",
          brief: "一款体育类小游戏",
          href:  "http://www.4399.com/flash/206072.htm"
        },{
          img: "/static/images_game/全球防卫2.png",
          name:  "全球防卫2",
          brief: "一款策略游戏，让我们一起保卫地球",
          href:  "http://www.4399.com/flash/208513.htm"
        },{
          img: "/static/images_game/日复一日.png",
          name:  "日复一日",
          brief: "一款好玩的生存策略类小游戏",
          href:  "http://www.4399.com/flash/204385.htm"
        },{
          img: "/static/images_game/悲伤兔大冒险.png",
          name:  "悲伤兔大冒险",
          brief: "一款非常好玩的冒险类小游戏，帮助出门采胡萝卜的悲伤兔克服路途险恶。",
          href:  "http://www.4399.com/flash/188229.htm"
        },
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eachGame {
  margin-bottom: 30px;
  padding: 20px;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
.img {
  width: 70px;
  height: 70px;
  object-fit: cover; /*自适应长宽*/
  align-self: center;
  border-radius: 5px;
  float:left;
  margin-right:20px;
}
.name {
  color: black;
  font-size: 18px;
}
.name:hover {
  cursor: pointer;
  color: royalblue;
}
.brief {
  color: grey;
  font-size: 16px;
  margin-top: 15px;
  text-align: left;
}
</style>

