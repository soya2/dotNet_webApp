<template>
  <div>
    <img class="backgrand-img" src="../assets/bg.jpg" />
    <div class="main-card">
      <div class="card-inner" ref="innerObj">
        <div>
          <div class="album">专辑封面</div>
          <div class="play-btn">
          <div class="play-icon-second"><img class="play-icon" src="../assets/prev.svg"></div>
          <div class="play-icon-middle"><img class="play-icon" src="../assets/pause.svg"></div>
          <div class="play-icon-second"><img class="play-icon" src="../assets/next.svg"></div>
          </div>
        </div>
        <ul class="sing-list">
          <li class="sing-list-style" v-for="item in lists" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      lists: [1, 2, 3, 4]
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage(){
      if (location.href.indexOf("#reloaded") === -1) {
        location.href=location.href+"#reloaded"
        location.reload()
      }
    },
    showCardInner () {
      setTimeout(() => {
        this.$refs.innerObj.style.transition = 'all .8s'
        this.$refs.innerObj.style.visibility = 'visible'
        this.$refs.innerObj.style.opacity = 1
      }, 480);
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
  margin-left: 70px;
  margin-top: 50px;
  .play-icon-second {
    width: 54px;
    height: 54px;
    background-color: rgb(46, 103, 126);
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
    background-color: rgb(46, 103, 126);
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
  width: 300px;
  height: 400px;
  position: absolute;
  left: 380px;
  top: 40px;
  border-left: 3px solid rgb(199, 192, 192);
  .sing-list-style {
    width: 300px;
    height: 48px;
    margin-left: 10px;
    margin-top: 12px;
    // background-color: rgb(55, 117, 60);
  }
}
</style>
