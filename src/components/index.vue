<template>
  <div>
    <img class="backgrand-img" src="../assets/bg.jpg" />
    <div class="main">
      <div class="card-top" @mousedown="touchMove">
        <div class="album cardinner">
          <img class="album-img" :src="albumDetailList[roundCountT].pic" />
          <div class="album-ar">{{ albumDetailList[roundCountT].name }}<br>{{ albumDetailList[roundCountT].ar }}</div>
        </div>
        <div class="text cardinner" @click="jump(albumIdList[roundCountT])">
          点击进入专辑
          <img class="right-icon" src="../assets/right.svg">
        </div>
      </div>
      <div class="card-middle">
        <div class="album cardinner">
          <img class="album-img" :src="albumDetailList[roundCountB].pic" />
          <div class="album-ar">{{ albumDetailList[roundCountB].name }}<br>{{ albumDetailList[roundCountB].ar }}</div>
        </div>
        <div class="text cardinner">
          点击进入专辑
          <img class="right-icon" src="../assets/right.svg">
        </div>
      </div>
      <div class="card-bottom"></div>
      <div class="card-last"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      albumIdList: [2081552, 31362, 3139519, 266099, 34809286],
      albumDetailList: [],
      roundCountT: 0,
      roundCountB: 1
    }
  },
  created () {
    this.loadPage()
    this.getAlbumList(this.albumIdList)
    this.stop()
  },
  methods: {
    loadPage(){
      if (location.href.indexOf("#reloaded") === -1) {
        location.href=location.href+"#reloaded"
        location.reload()
      }
    },
    stop () {
      var mo=function (e) {
        e.preventDefault();
      }
      document.body.style.overflow='hidden';
      document.addEventListener("touchmove",mo,false);
    }, // 禁止页面滑动
    getAlbumList (albumidlist) {
      for(var i = 0; i < albumidlist.length;){
        const res = this.$http.get(`?type=album&id=${albumidlist[i]}`)
        res.then( res => {
          // console.log(res.data)
          this.albumDetailList.push({ name: res.data.album.name,  ar: res.data.album.artists[0].name, pic: res.data.album.blurPicUrl })
        })
        i++
      }
      // console.log('请求：', this.albumDetailList);
    }, // 根据albumIdList的专辑id获取专辑名作者封面等信息
    getDistance (x1, y1, x2, y2) {
      var xDistance = Math.abs(x1 - x2)
      var yDistance = Math.abs(y1 - y2)
      return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
    }, // 利用勾股定理求出移动两点之间的距离
    getAngle (x1, y1, x2, y2) {
      var xDistance = x1 - x2
      var yDistance = y1 - y2
      return Math.atan2(yDistance, xDistance)
    }, // 利用atan2方法可以得出x移动的角度
    touchMove (e) {
      let cardObj = e.target  // 获取其中的卡片对象
      let mouseRelCardX = e.clientX - cardObj.offsetLeft  // 获取鼠标在网页的坐标 - 元素中心到父节点的偏移量(由于父节点mian和cardtop相同，故偏移量则为自身长宽的一半)
      let mouseRelCardY = e.clientY - cardObj.offsetTop
      let moveCardX
      let moveCardY
      cardObj.style.transition =  ''
      document.onmousemove = event => {
        moveCardX = event.clientX - mouseRelCardX
        moveCardY = event.clientY - mouseRelCardY
        cardObj.style.left = moveCardX + 'px'
        cardObj.style.top = moveCardY + 'px'
      }// 计算鼠标移动时的偏移量并修改cardtop的位置属性，减去鼠标相对card的偏移量是避免card重置到鼠标左上角
      document.onmouseup = () => {
        var distance = this.getDistance(e.clientX, e.clientY, event.clientX, event.clientY)
        if (distance < 160) {
          cardObj.style.left = 150 + 'px'
          cardObj.style.top = 150 + 'px'
          cardObj.style.transition =  'all .5s'
        } else {
          var angle = this.getAngle(e.clientX, e.clientY, event.clientX, event.clientY)
          if (0 <= angle && angle < 1.5) {
            cardObj.style.left = (moveCardX - 500) + 'px'
            cardObj.style.top = (moveCardY - 500) + 'px'
          } else if (1.5 < angle && angle <= 3.14) {
            cardObj.style.left = (moveCardX + 500) + 'px'
            cardObj.style.top = (moveCardY - 500) + 'px'
          } else if (0 > angle && angle > -1.5) {
            cardObj.style.left = (moveCardX - 500) + 'px'
            cardObj.style.top = (moveCardY + 500) + 'px'
          } else {
            cardObj.style.left = (moveCardX + 500) + 'px'
            cardObj.style.top = (moveCardY + 500) + 'px'
          }
          cardObj.style.transition =  'all .5s'
          var cardTwo = document.getElementsByClassName('card-middle')
          var cardBottom = document.getElementsByClassName('card-bottom')
          // 底部卡片顶上
          setTimeout(() => {
            cardTwo[0].style.width = 300 + 'px'
            cardTwo[0].style.height = 300 + 'px'
            cardTwo[0].style.transform = 'translate(-50%, -50%)'
            cardTwo[0].style.transition =  'all .5s'

            cardBottom[0].style.width = 290 + 'px'
            cardBottom[0].style.height = 290 + 'px'
            cardBottom[0].style.transform = 'translate(-50%, -45%)'
            cardBottom[0].style.transition =  'all .5s'
          },600)
          // 重置所有卡片
          setTimeout(() => {
            if ((this.roundCountB + 1) === this.albumIdList.length) {
              this.roundCountT = this.roundCountB
              this.roundCountB = 0
            } else if ((this.roundCountT + 1) === this.albumIdList.length) {
              this.roundCountT = this.roundCountB
              this.roundCountB = 1
            } else {
              this.roundCountT += 1
              this.roundCountB += 1
            }
            cardObj.style.transition = ''
            cardObj.style.left = ''
            cardObj.style.top = ''

            cardTwo[0].style.width = ''
            cardTwo[0].style.height = ''
            cardTwo[0].style.transform = ''
            cardTwo[0].style.transition =  ''
            cardBottom[0].style.width = ''
            cardBottom[0].style.height = ''
            cardBottom[0].style.transform = ''
            cardBottom[0].style.transition =  ''
          }, 1000)
        }
        document.onmousemove = null
        document.onmouseup = null
      }
      return {}
    },
    jump (id) {
      var cardInnerObj = document.getElementsByClassName('cardinner')
      var cardTopObj = document.getElementsByClassName('card-top')
      cardInnerObj[0].style.transition = 'all .8s'
      cardInnerObj[0].style.visibility = 'hidden'
      cardInnerObj[0].style.opacity = 0
      setTimeout(() => {
        cardTopObj[0].style.transition = 'all .8s'
        cardTopObj[0].style.width = 720 + 'px'
        cardTopObj[0].style.height = 500 + 'px'
        cardTopObj[0].style.opacity = 1
      }, 1000);
      setTimeout(() => {
        this.$router.push({
          path: `/detail/${id}` // 将点击进入专辑的ID作为路由传递给detail页面
        })
      }, 1800);
      return {}
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@main_size: 300px;
@card_top_size: 300px;
@card_middle_size: 290px;
@card_bottom_size: 280px;

html::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.backgrand-img {
    float: left;
    position: absolute;
    width: 100%;
    filter: blur(14px);
}

.main {
    width: @main_size;
    height: @main_size;
    // background-color: red;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.card {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 1px 1px 14px rgb(66, 66, 66);
  padding: 0 0 10 0;
  overflow: hidden;
  .cardinner {
    pointer-events: none;
  }
}

.album {
  width: @card_top_size;
  height: @card_top_size - 80px;
  border-radius: 12px 12px 0 0;
  pointer-events: none;
  overflow: hidden;
  // color: #000;
  .album-img {
    width: @card_top_size;
    height: @card_top_size;
  }
  .album-ar {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 6px #000000;
    position: relative;
    left: 15px;
    bottom: 145px;
  }
}

.text {
  height: 80px;
  text-align: center;
  font-size: 24px;
  line-height: 78px;
  .right-icon {
    width: 18px;
    height: 18px;
    position: relative;
    top: 2px;
  }
}

.card-top {
    &:extend(.card);
    width: @card_top_size;
    height: @card_top_size;
    transform: translate(-50%, -50%);
}

.card-middle {
    &:extend(.card);
    z-index: -1;
    width: @card_middle_size;
    height: @card_middle_size;
    transform: translate(-50%, -45%);
}

.card-bottom {
    &:extend(.card);
    z-index: -2;
    width: @card_bottom_size;
    height: @card_bottom_size;
    transform: translate(-50%, -40%);
}

.card-last {
    &:extend(.card);
    z-index: -3;
    width: @card_bottom_size;
    height: @card_bottom_size;
    transform: translate(-50%, -40%);
}
</style>
