<template>
  <div class="accouns">
    <van-nav-bar
      class="van"
      title="本次考试成绩"
      newspaper-o
      left-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="information">
      <div class="accoun">
        <div class="box">
          <!-- rate:控制大小 
              stroke-width：属性来控制进度条宽度 
              size 属性设置圆环直径-->
          <van-circle
            v-model="currentRate"
            :rate="this.$store.state.accounss.score"
            :speed="60"
            :color="gradientColor"
            :stroke-width="70"
            size="145px"
            :text="text"
          />
        </div>
      </div>

      <div class="user">
        <p>学号:{{ this.$store.state.accounss.id_cardErr }}</p>
        <p>姓名:{{ this.admin.realName }}</p>
        <p>用时：{{ this.$store.state.time }}</p>
      </div>
      <div class="see">
        <div class="mistake">
          <p>{{ this.$store.state.accounss.score }}</p>
          <p>总分</p>
        </div>
      </div>
      <div class="wrong">
        <div class="wrong1">
          <p>{{ this.$store.state.accounss.single_score }}</p>
          <p>单选分数</p>
        </div>
        <div class="wrong1">
          <p>{{ this.$store.state.accounss.selection_score }}</p>
          <p>多选分数</p>
        </div>
        <div class="wrong1">
          <p>{{ this.$store.state.accounss.judge_score }}</p>
          <p>判断分数</p>
        </div>
      </div>
      <div class="check">
        <p @click="lookReslust">查看错题</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accouns",
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
    };
  },
  created() {
    // console.log(this.$store.state.accounss);
    this.admin = JSON.parse(localStorage.getItem("admin"));
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "分";
    },
  },
  methods: {
    onClickLeft() {
      // this.$router.push("/homepage");
    },
    onClickRight() {},
    lookReslust() {
      this.$router.push("/Wrong");
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar__left {
  display: none;
}
.accouns {
  width: 100%;
  height: 100vh;
  background-color: #00caa3;
}
/deep/ .van-circle__text {
  font-size: 0.6667rem;
  color: #ffffff;
}
.information {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 0.2667rem;
  box-sizing: border-box;
  .accoun {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    // width: 100%;
    // height: 0.8667rem;
    .box {
      width: 3.8667rem;
      height: 3.8667rem;
      // background-color: #fff;
      border-radius: 50%;
    }
  }
  .exam_time {
    //   width: 100%;
    // height: 0.1733rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.25rem;
    p {
      font-size: 0.357rem;
      color: #ffffff;
    }
  }
  .user {
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.357rem;
    padding-left: 2.7933rem;
    height: 2.6667rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.7333rem;
    p {
      margin-top: 0.5333rem;
      margin-left: 0.4rem;
    }
  }
  .see {
    width: 3.6rem;

    // background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #fff;
      font-size: 0.24rem;
    }
    .right {
      width: 1.2rem;
      height: 1.3067rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 0.1333rem;
      }
    }
    .mistake {
      width: 1.9333rem;
      height: 1.6533rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 0.1333rem;
      }
    }
  }
  .wrong {
    // width: 3.6rem;
    margin-top: 0.4667rem;
    // background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #fff;
      font-size: 0.24rem;
    }
    .wrong1 {
      width: 1.9333rem;
      height: 1.6533rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 0.1333rem;
      }
    }
  }
  .check {
    width: 5.8rem;
    height: 1.367rem;
    background-color: #fff;
    border-radius: 0.6667rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    p {
      font-size: 0.4133rem;
      color: #00caa3;
    }
  }
}

.van {
  background-color: #00caa3;
}
/deep/.van-nav-bar .van-icon {
  color: white;
}
/deep/.van-nav-bar__title {
  color: white;
}
/deep/[class*="van-hairline"]::after {
  border: none;
}
</style>