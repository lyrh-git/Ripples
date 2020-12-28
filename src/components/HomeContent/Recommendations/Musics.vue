<template>
  <div>
    <div v-for="music in musics" class="eachMusic">

      <img :src="music.img" class="img" />
      <div>
        <div style="text-align:left;height:50px;padding-top:10px;">
          <a :href="music.href" class="name" target="_blank">{{music.name}}</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Musics",
  data() {
    return {
      musics: [
        {
          img: "/static/images_music/Beyond--真的爱你.jpg",
          name: "Beyond--真的爱你",
          href: "https://music.163.com/#/song?id=346075"
        },
        {
          img: "/static/images_music/八三夭--想见你想见你想见你.jpg",
          name: "八三夭--想见你想见你想见你",
          href: "https://music.163.com/#/song?id=1403215687"
        },
        {
          img: "/static/images_music/NIGHTS--Drowning.jpg",
          name: "NIGHTS--Drowning",
          href: "https://music.163.com/#/song?id=1360802806"
        },
        {
          img: "/static/images_music/Jason Mraz--Life Is Wonderful.jpg",
          name: "Jason Mraz--Life Is Wonderful",
          href: "https://music.163.com/#/song?id=18611546"
        },
        {
          img: "/static/images_music/张杰&张碧晨--只要平凡.jpg",
          name: "张杰&张碧晨--只要平凡",
          href: "https://music.163.com/#/song?id=574919767"
        },
        {
          img: "/static/images_music/林宥嘉--别让我走远.jpg",
          name: "林宥嘉--别让我走远",
          href: "https://music.163.com/#/song?id=1353372483"
        },
        {
          img: "/static/images_music/Blue Foundation--As I Moved On.jpg",
          name: "Blue Foundation--As I Moved On",
          href: "https://music.163.com/#/song?id=3951784"
        },
        {
          img: "/static/images_music/Alec Benjamin--Let me down slowly.jpg",
          name: "Alec Benjamin--Let me down slowly",
          href: "https://music.163.com/#/song?id=566977275"
        },
        {
          img: "/static/images_music/柏松--世间美好与你环环相扣.jpg",
          name: "柏松--世间美好与你环环相扣",
          href: "https://music.163.com/#/song?id=1363948882"
        },
        {
          img: "/static/images_music/Lorne Balfe--火箭发射.jpg",
          name: "Lorne Balfe--火箭发射",
          href: "https://music.163.com/#/song?id=1378649461"
        },
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eachMusic {
  margin-bottom: 30px;
  padding: 20px;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
.img {
  width: 50px;
  height: 50px;
  object-fit: cover; /*自适应长宽*/
  align-self: center;
  border-radius: 50%;
  float: left;
  margin-right: 20px;
}
.name {
  color: black;
  font-size: 18px;
}
.name:hover {
  cursor: pointer;
  color: royalblue;
}
</style>
