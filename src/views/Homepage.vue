<template>
  <div class="homepage">
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img v-lazy="item.imgPath" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="search">
      <img src="@/assets/img/search.jpg" alt="" />
      <input type="text" placeholder="搜索课程，老师，关键词" />
    </div>
    <div class="class">
      <van-cell is-link @click="showPopup">
        <div class="class_title">
          <div class="class_title_one">
            <p class="">考试课程</p>
          </div>
          <div class="class_title_two">
            <p>查看全部</p>
          </div>
        </div>
        <div class="class_vew">
          <div class="class_left">
            <div class="bgc">
              <p>Ps考试</p>
            </div>
          </div>
          <div class="class_right">
            <div class="java">
              <p>Java考试</p>
            </div>
            <div class="mysql">
              <p>Mysql考试</p>
            </div>
            <div class="yyw">
              <p>应用文考试</p>
            </div>
            <div class="jsj">
              <p>计算机考试</p>
            </div>
          </div>
        </div>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
        <div class="java">
          <p
            v-for="(item, index) in examMsg"
            :key="index"
            @click="exammsg(item)"
          >
            {{ item.subject }}
          </p>
        </div>
      </van-popup>
    </div>
    <div class="result">
      <div class="rs_title">
        <div class="re_title_left">
          <p>考试成绩</p>
        </div>
      </div>
      <div class="re_vew">
        <div class="check">
          <div class="check_left">
            <p><img src="@/assets/img/result.png" alt="" /></p>
          </div>
          <div class="check_right" @click="achievement">
            <p>全部成绩</p>
            <img src="@/assets/img/right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);

export default {
  name: "homepage",
  data() {
    return {
      active: "home",
      images: [],
      show: false,
      subject: "",
      examMsg: [],
      result: {},
    };
  },
  created() {
    this.$store.state.token = localStorage.getItem("token");
    this.$store.state.admin = JSON.parse(localStorage.getItem("admin"));
    // console.log(this.$store.state.result);
    this.getswipers();
    this.getExamMsg();
  },
  methods: {
    btn() {},
    showPopup() {
      this.show = true;
    },
    exammsg(vus) {
      this.$store.state.examMsg = vus;
      this.$router.replace("/Begin");
    },
    achievement() {
      this.$router.push("/achievement");
    },
    //获取考试信息
    getExamMsg() {
      this.$axios({
        method: "get",
        url: "/getExamMsg",
        data: {},
        //设置token
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        // console.log(response);
        if (response.data.static === "200") {
          this.examMsg = response.data.data;
        } else {
          this.$toast(response.data.msg);
        }
      });
    },

    getswipers() {
      this.$axios({
        method: "get",
        url: "/getswipers",
        data: {},
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.status == "200") {
          this.images = response.data.data;
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
  },
  components: {
    Footer,
  },
};
</script>

<style  scoped lang="scss">
.banner {
  width: 100%;
  margin: 0;
  height: 4.56rem;
  margin-bottom: 0.5867rem;

  img {
    height: 4.56rem;
  }
}
.search {
  position: relative;
  margin-right: 0.5333rem;
  margin-left: 0.5333rem;
  input {
    width: 100%;
    height: 1rem;
    padding-left: 1.2333rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    background-color: white;
    border-radius: 0.533333rem;
    border: 0.032rem solid #ebedf0;
    align-items: center;
    font-size: 0.46rem;
    line-height: 1.3rem;
  }
  img {
    position: absolute;
    height: 0.5rem;
    width: 0.5rem;
    left: 0.4rem;
    top: 0.35rem;
  }
}
.class {
  width: 100%;
  margin-top: 0.4rem;
}
/deep/ .van-cell {
  padding: 0;
}
/deep/ .van-cell__right-icon {
  margin-top: 0.16rem;
}
/deep/ .van-popup {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6.2133rem;
    height: 1.5467rem;
    color: white;
    border-radius: 25px;
    font-size: 0.35rem;
    padding-top: 0.08rem;
    margin-right: 0.0667rem;
    background: url("../assets/img/Java .jpg") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.4rem;
  }
  p:nth-child(2n) {
    background: url("../assets/img/Mysql.jpg") no-repeat;
    background-size: 100% 100%;
  }
  p:nth-child(3n) {
    background: url("../assets/img/yyw.jpg") no-repeat;
    background-size: 100% 100%;
  }
  p:nth-child(4n) {
    background: url("../assets/img/cpt.jpg") no-repeat;
    background-size: 100% 100%;
  }
  p:nth-child(5n) {
    background: url("../assets/img/Ps.jpg") no-repeat;
    background-size: 100% 100%;
  }
}
.class_title {
  width: 100%;
  height: 1rem;
  // padding-left: 0.5333rem;
  // padding-right: 0.5333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  .class_title_one {
    font-size: 0.7333rem;
    font-weight: 800;
    padding-left: 0.5333rem;
  }
  .class_title_two {
    font-size: 0.3333rem;
    padding-right: 0.5333rem;
    color: #6c6c6c;
  }
}
.class_vew {
  width: 100%;
  display: flex;
  // justify-content: center;
  // align-items: center;

  .class_left {
    display: flex;
    justify-content: center;
    align-items: center;
    .bgc {
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("../assets/img/Ps.jpg") no-repeat;
      background-size: 100% 100%;
      width: 4rem;
      height: 3.3867rem;
      p {
        font-size: 0.35rem;
        color: white;
      }
    }
    width: 4rem;
    height: 3.3867rem;
    margin-left: 0.5333rem;
    margin-right: 0.1733rem;
  }
  .class_right {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 4.72rem;
    margin-left: 0.1733rem;

    .java {
      width: 2.2133rem;
      height: 1.5467rem;
      margin-right: 0.0667rem;
      line-height: 1.5467rem;
      background: url("../assets/img/Java .jpg") no-repeat;
      background-size: 100% 100%;

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 0.35rem;
        padding-top: 0.08rem;
      }
    }
    .mysql {
      width: 2.2133rem;
      height: 1.5467rem;
      line-height: 1.5467rem;
      background: url("../assets/img/Mysql.jpg") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.0667rem;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 0.35rem;
        padding-top: 0.08rem;
      }
    }
    .yyw {
      width: 2.2133rem;
      height: 1.5467rem;
      line-height: 1.5467rem;
      background: url("../assets/img/yyw.jpg") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.0667rem;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 0.35rem;
        padding-top: 0.08rem;
      }
    }
    .jsj {
      width: 2.2133rem;
      height: 1.5467rem;
      line-height: 1.5467rem;
      background: url("../assets/img/cpt.jpg") no-repeat;
      background-size: 100% 100%;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 0.35rem;
        padding-top: 0.08rem;
      }
    }
  }
}
.result {
  width: 100%;
  margin-top: 0.4rem;
}
.rs_title {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  // margin-left: 0.5333rem;
  // margin-right: 0.5333rem;
  .re_title_left {
    font-size: 0.7333rem;
    font-weight: 800;
    margin-left: 0.5333rem;
  }
}
.re_vew {
  width: 100%;
  margin-top: 0.2667rem;
  .check {
    width: 9.0133rem;
    height: 2.2667rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.5333rem;
    margin-right: 0.5333rem;
    background: url("../assets/img/cj.jpg");
    background-size: 100% 100%;
    .check_left {
      padding-left: 0.9333rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    .check_right {
      display: flex;
      justify-content: space-between;
      font-size: 0.5rem;
      color: #daebf8;
      text-shadow: black 0.1em 0.1em 0.2em;
      padding-right: 0.9333rem;
      img {
        margin-right: -0.4rem;
        width: 0.5333rem;
        height: 0.5333rem;
        margin-left: 0.8rem;
      }
    }
  }
}
</style>