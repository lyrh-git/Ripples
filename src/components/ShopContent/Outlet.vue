<template>
  <div>
    <ul class="good-list nav">
      <li class="good-item" v-for="(item,index) in goods" :key="index" >
        <a :href="item.href" target="_blank">
          <img class="good-item-image" :src="item.image" :title="item.brief" />
        </a>
        <h4>{{item.name}}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
import goods from "@/data/goods/vent"; //引入goods的数据，@等价于src目录

export default {
  name: "Outlet",

  computed: {
    goods() {
      return goods.goods; //对应上面的v-for="(item,index) in goods"的goods
      //data定义的属性不会因为它的赋值变量的变化而变化，computed定义的属性会随它的赋值变量的变化而变化
    }
  },
  methods: {
    togglePage(item) {
      this.$router.push({ path: "/goods", query: { name: item.name } }); //跳转到商品详情页（改变路由path）
      //这里不通过传数据而是通过路由，是怕强制刷新页面时数据丢失
    }
  }
};
</script>

<style scoped>
/*模块样式私有化，不污染全局布局 */
.good-item-image {
  width: 180px;
  height: 240px;
  margin: 15px 25px;
  object-fit: cover;
}
.good-list {
  list-style-type: none;
}
</style>
