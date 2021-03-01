<template>
  <div class="Result">
    <div class="title">
      <van-nav-bar
        title="成绩排行"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div
      class="content"
      v-for="(item, index) in subjects"
      :key="index"
      @click="check(item)"
    >
      <div class="text">
        <img src="@/assets/img/kemu.png" alt="" />
        <div class="msg">
          <p>科目:{{ item.subject_name }}</p>
        </div>
      </div>
      <div class="btm">
        <div class="btn">
          <p class="btn_t">查看排行</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "result",
  data() {
    return {
      active: "home",
      subjects: {},
      admin: {},
    };
  },
  created() {
    this.getsubjectFun();
    this.admin = JSON.parse(localStorage.getItem("admin"));
  },
  methods: {
    getsubjectFun() {
      this.$axios({
        method: "get",
        url: "/getsubject",
        data: {},
        //设置token
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          this.subjects = response.data.data;
          // this.$store.state.getSubjects = response.data.data;
          // console.log(this.$store.state.getSubjects);
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
    check(valus) {
      this.$store.state.getSubjects = valus;
      this.$router.replace("/Rank");
    },
    onClickLeft() {
      // Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
    },
  },
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  height: 1.68rem;
  border-bottom: 1px solid #cccccc;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.366667rem;
  height: 2.6667rem;
  background-color: white;
  border-radius: 0.433333rem;
  border: 0.0267rem solid #ebedf0;
  align-items: center;
  box-shadow: 0.1067rem 0.1067rem 0.1867rem #cccccc;

  .text {
    width: 70%;
    height: 2.3333rem;
    // margin-left: 0.3133rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .msg {
      width: 8rem;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
      margin-left: 0.2rem;
      //   flex-direction: column;
      p {
        font-size: 0.44rem;
        margin-top: 0.1rem;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .one {
        width: 100%;
        font-size: 0.44rem;
        color: #999999;
      }
    }
    img {
      margin-left: 0.2rem;
      width: 1.6333rem;
      height: 1.3333rem;
    }
  }
  .btm {
    width: 30%;
    height: 2.3333rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.8rem;
      height: 0.9467rem;
      border: 0.0267rem solid #ccc;
      background-color: #00caa3;
      border-radius: 0.6667rem;
      .btn_t {
        color: #fff;
        font-size: 0.2rem;
      }
    }
  }
}
/deep/ .van-nav-bar__left {
  display: none;
}
/deep/[class*="van-hairline"]::after {
  border-bottom-width: 0;
}
</style>