<template>
  <div class="test">
    <div class="top">
      <p class="title">测试</p>
      <div class="thread"></div>
    </div>
    <div class="message">
      <div v-for="test in tests" class="eachTest">
        <div style="text-align:left;">
          <a :href="test.href" class="test_title" target="_blank">{{test.title}}</a>
        </div>
        <div class="brief">{{test.brief}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      tests: [
        {
          title: "你的幸福颜色是什么？",
          brief: "幸福是什么颜色？不同人有不同的诠释。",
          href: " http://www.cece.la/t/xinfuyanse"
        },
        {
          title: "兰德职业心理测试",
          brief: "你儿时或现在的兴趣点到底可以做一些什么实际的职业？",
          href: " http://www.cece.la/t/xinliceshi"
        },
        {
          title: "你有双重人格吗？",
          brief: "快来测测你有没有双重人格",
          href: " http://www.cece.la/t/renge"
        },
        {
          title: "从梦境看你的脆弱指数",
          brief: "人们总只把脆弱的一面给自己看，你也是个强装坚强的脆弱的人吗？",
          href: " http://www.cece.la/t/cuiruozhishu"
        },
        {
          title: "职场你容易被看轻吗？",
          brief: "俗话说不蒸馒头争口气，想必没有人愿意让别人轻视看不起吧…",
          href: " http://www.cece.la/t/zhichangkanqing"
        },
        {
          title: "你的灵魂是什么做的？",
          brief: "身体终会走向幻灭，惟有灵魂得以永存。",
          href: " http://www.cece.la/t/linghunxingshi"
        },
        {
          title: "你属于什么气质",
          brief:
            "每个人都有属于自己的气质，一个的气质不是靠外套，而是从心里面散发出来的。",
          href: " http://www.cece.la/t/shenmeqizhi"
        },
        {
          title: "你的心”房”有多宽敞？",
          brief:
            "常言道：心有多宽，舞台就有多大。如果把你的心比作一间屋子，又有多敞亮？",
          href: " http://www.cece.la/t/xinfang"
        },
        {
          title: "吃水果，看性格",
          brief: "园艺专家往往喜欢根据一个人吃水果的口味爱好，推断此人的性格。",
          href: " http://www.cece.la/t/shuiguoxingge"
        },
        {
          title: "你是由什么物质做成的",
          brief:
            "因为每个人的组成物质大不相同，性格特质的结构也大相径庭，快测一测你是什么做成的。",
          href: "http://www.cece.la/t/wuzhi"
        }
      ]
    };
  }
};
</script>

<style scoped>
.test {
  padding: 20px;
  width: 95%;
}
.top .title {
  font-size: 25px;
  font-weight: 600;
}

.thread {
  position: relative;
  /* left:150px; */
  border-top: 1px solid black;
  margin-top: 10px;
  width: 95%;
}

.message {
  margin-top: 40px;
}
.eachTest {
  margin-bottom: 30px;
}
.test_title {
  color: black;
  font-size: 20px;
  font-weight: 600;
}
.test_title:hover {
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
