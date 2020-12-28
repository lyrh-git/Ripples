<template>
  <div>
    <div v-for="article in articles" class="eachArticle">
      <div style="text-align:left;">
        <a :href="article.href" class="title" target="_blank">{{article.title}}</a>
      </div>
      <div class="brief" :title="article.sentence">{{article.brief}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      articles: [
        {
          title: "你是人间四月天",
          brief: "讲述了民国才女林徽因的传奇故事。",
          href: "https://www.jianshu.com/p/cfaf3b7fb268",
          sentence:"初次知道林徽因是在初中时候学了徐志摩的《再别康桥》，这首诗写的实在是太美了，是什么样的人能写出这么美的句子？"
        },
        {
          title: "今年必看第一国剧：平庸，才是每个人最终的归宿",
          brief: "《长安十二时辰》——一个人的脑洞，一座城的时空。",
          href: "https://www.jianshu.com/p/861c3eb73f1d",
          sentence:"刺客出现在唐代长安，在月圆下的大雁塔跃下，追捕红灯笼从朱雀大街延伸到曲江池，惊起乐游原上无数宿鸟……"
        },{
          title: "选择站在人民一边",
          brief: "中国政法大学丛日云教授在2013年毕业典礼上的演讲，寄予了他对学生们最恳切的嘱托和最真挚的祝福。",
          href: "http://jiaren.org/2013/07/13/yanjiang-4/",
          sentence:"人们感叹，一片漂零的树叶，无法阻挡汹涌而来的大潮。但即使是一片树叶，你是否有过挣扎？你向哪个方向挣扎？我希望，你们在大潮袭来时，选择站在理性一边，文明一边，选择站在人民一边。"
        },{
          title: "“我妈昨晚走了，到死也没见过大海”",
          brief: "树欲静而风不止，子欲养而亲不待。",
          href: "https://www.jianshu.com/p/bc4998834b67",
          sentence:"父母离世，悲伤在所难免。但比这悲伤更揪心、更让人无法释怀的，是那些永远弥补不了的遗憾；是我们该回报的，还没回报；是他们该得到的，还没得到；是这生养之恩，我们此生再也没机会报答。"
        },{
          title: "人间有味是清欢",
          brief: "讲述了文学大家苏轼豁达乐观的人生态度。",
          href: "https://www.duanwenxue.com/article/4957417.html",
          sentence:"无论是处庙堂之高，还是江湖之远，都是“也无风雨也无晴”的际遇，在他的胸襟里，早已孕育了一份“人间有味是清欢”的豁达。"
        },{
          title: "《让岁月变成诗》名人语录",
          brief: "收集了多位名家对生活和生命的态度。",
          href: "https://www.jianshu.com/p/34fe5233424e",
          sentence:"一个笑就击败了一辈子，一滴泪就还清了一个人。一人花开，一人花落，这些年从头到尾，无人问询。"
        },{
          title: "心若向阳，必生温暖",
          brief: "纵然繁华三千，看淡即是云烟，任凭烦恼无数，想开便是晴天。",
          href: "http://www.360doc.com/content/17/0831/11/21700688_683516649.shtml",
          sentence:"携一缕温婉，美丽人生；掮一份真诚，纯善于心。心若向阳，必生温暖；心若哀凄，必生悲凉。"
        },{
          title: "遇见",
          brief: "最美的遇见，不过初见；最暖的遇见，不过偶遇。",
          href: "https://www.duanwenxue.com/article/4740978.html",
          sentence:"总想在一场如酥如丝的春雨中，撑着油纸伞穿梭于江南。可能没有布满青苔的大石板，没有杨柳拂堤的断桥，没有一个且行且谈笑的好友。就一个人，静静的起行。在那里，我可以遇到破土而出、正展现着它勃勃生机的小草，遇到拂身而来、吹面不寒的二月春风，遇到一个促膝而谈、志同道合的友人。"
        },{
          title: "一九二七年春，帕斯捷尔纳克致茨维塔耶娃",
          brief: "诗人廖伟棠在阅读《三十人书简》后写下的书评。",
          href: "https://www.douban.com/note/625249575/",
          sentence:"今夜，我的嗓音是一列被截停的火车，你的名字是俄罗斯漫长的国境线。"
        },{
          title: "成长，注定是一件很孤独的事。",
          brief: "成长注定是一件很孤独的事。这种孤独有时伴随着难以忍受的寂寞与无助，再多的热闹都是别人的。",
          href: "https://www.jianshu.com/p/3aa1923ac691",
          sentence:"每天早上五点就会从床上爬起来，然后蹑手蹑脚地走到洗漱台，用冷水洗一下脸。为了不影响舍友休息，将书桌上的台灯调至昏黄，一页页轻轻地翻看着。已经有一个星期，我将起床铃声调至提前一个小时，每天利用这一个小时看一些专业外的拓展书籍。"
        },
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eachArticle {
  margin-bottom: 30px;
  padding: 20px;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
.title {
  color: black;
  font-size: 20px;
}
.title:hover {
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
