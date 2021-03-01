<template>
  <div class="begin">
    <div class="title">
      <van-nav-bar
        title="考试详情"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="img">
      <img src="@/assets/img/ui.png" alt="" />
    </div>
    <div class="box">
      <div class="exam">
        <p>
          {{ $store.state.examMsg.subject }}
        </p>
        <p class="p1">在线考试</p>
      </div>
      <div class="exam">
        <p class="p1">考试专业：</p>
        <p>
          {{ $store.state.examMsg.major }}
        </p>
      </div>
      <div class="exam">
        <p class="p1">考试时间：</p>
        <p>
          {{ $store.state.examMsg.exam_time + "分钟" }}
        </p>
      </div>
      <div class="exam">
        <p class="p3">考试详情：</p>
        <p>
          {{ $store.state.examMsg.exam_details }}
        </p>
      </div>

      <div class="btn">
        <button @click="goExamDetail">开始考试</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "begin",
  data() {
    return {
      subject: "",
      exammsg: {},
    };
  },
  created() {},
  methods: {
    goExamDetail(values) {
      Dialog.confirm({
        title: "",
        message: "确定开始考试？",
      })
        .then(() => {
          this.$router.push("/Questions");
        })
        .catch(() => {
          // on cancel
        });
    },
    created() {},
    onClickLeft() {
      this.$router.push("/Homepage");
    },
    onClickRight() {
      // Toast('按钮');
    },
    // goExamDetail() {
    //   this.$router.push("/Questions");
    // },
  },
};
</script>

<style lang="scss" scoped>
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.24rem;
  img {
    width: 3.6667rem;
    height: 3.6667rem;
  }
}
.box {
  box-sizing: border-box;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 1.6667rem;
  .exam {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.8rem;
    .p1 {
      font-size: 0.4467rem;
      font-weight: 545;
      // color: #cccccc;
    }
    .p2 {
      font-size: 0.4467rem;
    }
    .p3 {
      font-size: 0.4467rem;
      font-weight: 545;
      width: 3.56rem;
    }
    p {
      font-size: 0.4467rem;
      font-weight: 545;
    }
    p:last-child {
      // flex: 1;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .btn {
    width: 100%;
    margin-top: 2.6667rem;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 6rem;
      height: 1.3333rem;
      background-color: #53d6bb;
      border: none;
      border-radius: 0.6667rem;
      font-size: 0.4rem;
      color: white;
      // margin-top: 3rem;
    }
  }
}
</style>