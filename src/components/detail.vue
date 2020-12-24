<template>
  <div>
    <img class="backgrand-img" src="../assets/bg.jpg" />
    <div class="main-card" ref="mainCard">
      <div class="card-inner" ref="innerObj">
        <div>
          <img class="album" :src="lists[0].pic"/>
          <div class="play-btn">
          <div class="play-icon-second" @click="palyControl(1, nowAudio)"><img class="play-icon" src="../assets/prev.svg"></div>
          <div class="play-icon-middle" @click="palyControl(0, nowAudio)">
            <img class="play-icon" src="../assets/pause.svg" v-if="playStatus === 1" />
            <img class="play-icon" src="../assets/play.svg" v-else />
          </div>
          <div class="play-icon-second" @click="palyControl(2, nowAudio)"><img class="play-icon" src="../assets/next.svg"></div>
          </div>
        </div>
        <div class="right-div">
          <ul class="sing-list">
            <li class="sing-list-style" v-for="item in lists" :key="item.song_id">
              <div class="play-status">
                <img class="playing-icon" src="../assets/playing.svg" v-if="nowAudioId === item.id && playStatus === 1"/>
                <div class="list-text" @click="playMusic(item, nowAudio)" style="width: 200px; color: rgb(82, 153, 182)" v-if="nowAudioId === item.id">{{ item.song_name }}</div>
                <div class="list-text" @click="playMusic(item, nowAudio)" style="width: 200px" v-else>{{ item.song_name }}</div>
              </div>
              <a :href='`https://music.163.com/#/song?id=${item.song_id}`' target="view_window"><img class="link-icon" src="../assets/link.svg" /></a>
            </li>
          </ul>
          <div class="return-btn" @click="returnIndex()">
            <img class="return-icon" src="../assets/return.svg">
            返回
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      albumId: this.$route.params.id, // 利用动态路由对象获取来自的路由id，即专辑id
      lists: [],
      nowAudio: new Audio(),
      nowAudioId: null,
      playStatus: null
    }
  },
  created () {
    // this.loadPage()
    this.getAlbumDetail(this.albumId)
    this.stop()
  },
  methods: {
    getAlbumDetail (albumId) {
      const res = this.$http.get(`?type=album&id=${albumId}`)
      res.then( res => {
        for(var i = 0; i < res.data.album.size;){
          this.lists.push({ id: i, song_id: res.data.songs[i].id,  song_name: res.data.songs[i].name, pic: res.data.album.blurPicUrl })
          i++
        }
      })
    }, // 请求专辑图片及歌曲数量、名字等信息
    stop () {
      var mo=function (e) {
        e.preventDefault();
      }
      document.body.style.overflow='hidden';
      document.addEventListener("touchmove",mo,false);
    }, // 禁止页面滑动
    loadPage(){
      if (location.href.indexOf("#reloaded") === -1) {
        location.href=location.href+"#reloaded"
        location.reload()
      }
    }, // 自动刷新页面
    showCardInner () {
      setTimeout(() => {
        this.$refs.innerObj.style.transition = 'all .8s'
        this.$refs.innerObj.style.visibility = 'visible'
        this.$refs.innerObj.style.opacity = 1
      }, 480);
    }, // 展示卡片过度动画
    returnIndex () {
      this.nowAudio.pause()
      this.playStatus = null
      this.$refs.innerObj.style.visibility = 'hidden'
      this.$refs.innerObj.style.opacity = 0
      setTimeout(() => {
        this.$refs.mainCard.style.transition = 'all .8s'
        this.$refs.mainCard.style.width = '300px'
        this.$refs.mainCard.style.height = '300px'
      }, 400);
      setTimeout(() => {
        this.$router.push({
          path: '/'
        })
      }, 1800);
    }, // 返回index页面的动画
    playMusic (item, nowAudio) {
      const res = this.$http.get(`?type=song&id=${item.song_id}`)
      res.then( res => {
        nowAudio.pause()
        // console.log(res.data.data[0])
        if(res.data.data[0].url === ""){
          alert('抱歉，此歌曲暂时无法播放')
          return 0
        }
        item.song_url = res.data.data[0].url
        nowAudio.src = item.song_url
        nowAudio.play()
        this.nowAudioId = item.id
        this.playStatus = 1
      })
    }, // 播放控件
    palyControl (type, nowAudio) {
      if(this.playStatus === null) { return }
      if(type === 0 && this.playStatus === 1){
        this.playStatus = 0
        nowAudio.pause()
      } else if(type === 0 && this.playStatus === 0){
        this.playStatus = 1
        nowAudio.play()
      } else {
        nowAudio.pause()
        if(type === 1){
          this.nowAudioId = (this.nowAudioId - 1) === -1 ? this.lists.length : (this.nowAudioId - 1)
        } else if (type === 2){
          this.nowAudioId = (this.nowAudioId + 1) === this.lists.length ? 0 : (this.nowAudioId + 1)
        }
        const res = this.$http.get(`?type=song&id=${this.lists[this.nowAudioId].song_id}`)
        res.then( res => {
          if(res.data.data[0].url === ""){
            alert('抱歉，此歌曲暂时无法播放')
            return 0
          }
          nowAudio.src = res.data.data[0].url
          nowAudio.play()
        })
        this.playStatus = 1
      }
    }
  },
  mounted () {
    this.showCardInner()
  },
}
</script>

<style lang="less" scoped>
html::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
ul,li{ padding:0;margin:0;list-style:none}

.backgrand-img {
    float: left;
    position: absolute;
    width: 100%;
    filter: blur(14px);
}

.main-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 1px 1px 14px rgb(66, 66, 66);
  padding: 0 0 10 0;
  overflow: hidden;
}

.card-inner {
  visibility: hidden;
  display: flex;
  opacity: 0;
  .album {
    width: 250px;
    height: 250px;
    margin: 60px 0 0 80px;
    border-radius: 12px;
    box-shadow: 1px 1px 14px rgb(66, 66, 66);
    overflow: hidden;
    background-color: rgb(190, 131, 131);
    pointer-events: none;
  }
}

.play-btn {
  display: flex;
  margin-left: 73px;
  margin-top: 50px;
  .play-icon-second {
    width: 54px;
    height: 54px;
    background-color: rgb(82, 153, 182);
    border-radius: 50%;
    box-shadow: 1px 1px 14px rgb(121, 121, 121);
    margin-left: 20px;
    margin-top: 5px;
    transition: box-shadow .6s;
    &:hover {
      box-shadow: 1px 4px 16px rgb(0, 0, 0);
    }
    .play-icon {
      width: 22px;
      height: 22px;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .play-icon-middle {
    width: 68px;
    height: 68px;
    background-color: rgb(82, 153, 182);
    border-radius: 50%;
    box-shadow: 1px 1px 14px rgb(121, 121, 121);
    margin-left: 20px;
    transition: box-shadow .6s;
    &:hover {
      box-shadow: 1px 4px 16px rgb(0, 0, 0);
    }
    .play-icon {
      width: 30px;
      height: 30px;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.sing-list {
  width: 350px;
  height: 300px;
  overflow: auto;
  position: absolute;
  left: 380px;
  top: 40px;
  border-left: 3px solid rgb(199, 192, 192);
  .sing-list-style {
    width: 300px;
    height: 58px;
    margin-left: 10px;
    margin-top: 10px;
    border-bottom: 2px solid rgb(216, 216, 216);
    box-shadow: 0 1px 1px rgb(117, 117, 117);
    border-radius: 8px;
    transition: box-shadow .6s;
    display: flex;
    justify-content: space-between;
    .play-status {
      display: flex;
      justify-content: space-between;
    }
    .playing-icon {
      width: 20px;
      height: 20px;
      padding-top: 20px;
      position: relative;
      left: -500px;
      filter: drop-shadow(rgb(82, 153, 182) 500px 0);
    }
    div {
      padding-left: 8px;
      line-height: 58px;
      font-size: 18px;
    }
    .link-icon {
      width: 20px;
      height: 20px;
      padding-top: 20px;
      padding-right: 10px;
    }
    &:hover {
      box-shadow: 0 7px 10px rgb(170, 170, 170)
    }
  }
}

.right-div {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .return-btn {
    width: 300px;
    height: 48px;
    margin-left: 62px;
    margin-bottom: 10px;
    border-radius: 12px;
    line-height: 48px;
    text-align: center;
    // pointer-events: none;
    box-shadow: 1px 1px 14px rgb(121, 121, 121);
    background-color: rgb(86, 160, 93);
    transition: box-shadow .4s;
    &:hover {
      box-shadow: 0 4px 10px rgb(49, 49, 49)
    }
    .return-icon {
      width: 30px;
      height: 30px;
      position: relative;
      top: 8px;
    }
  }
}
</style>
