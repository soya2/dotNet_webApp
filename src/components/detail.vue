<template>
  <div>
    <img class="backgrand-img" src="../assets/bg.jpg" />
    <div class="main-card" ref="mainCard">
      <div class="card-inner" ref="innerObj">
        <div>
          <div class="album">专辑封面</div>
          <div class="play-btn">
          <div class="play-icon-second"><img class="play-icon" src="../assets/prev.svg"></div>
          <div class="play-icon-middle"><img class="play-icon" src="../assets/pause.svg"></div>
          <div class="play-icon-second"><img class="play-icon" src="../assets/next.svg"></div>
          </div>
        </div>
        <div class="right-div">
          <ul class="sing-list">
            <li class="sing-list-style" v-for="item in lists" :key="item">
              {{ item }}
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
      lists: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  created () {
    this.loadPage()
    this.stop()
  },
  methods: {
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
    }// 返回index页面的动画
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
  margin-left: 70px;
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
