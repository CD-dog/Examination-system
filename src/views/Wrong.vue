<template>
  <div class="wrong">
    <div class="title">
      <van-nav-bar
        title="全部错题本"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="box" v-if="wrong.length">
      <div class="content" v-for="(item, index) in wrong" :key="index">
        <div class="text">
          <div class="msg">
            <p class="t">HTML5</p>
            <p class="t">错题本</p>
          </div>
          <div class="chose">
            <div class="wrong1">
              <p>{{ JSON.parse(item.single_err).length }}</p>
              <p class="w_t">单选错题</p>
            </div>
            <div class="wrong1">
              <p>{{ JSON.parse(item.selection_err).length }}</p>
              <p class="w_t">多选错题</p>
            </div>
            <div class="wrong1">
              <p>{{ JSON.parse(item.judge_err).length }}</p>
              <p class="w_t">判断错题</p>
            </div>
          </div>
          <div class="tips">
            <div class="summary">
              <p>
                共错{{
                  JSON.parse(item.single_err).length +
                  JSON.parse(item.selection_err).length +
                  JSON.parse(item.judge_err).length
                }}道题
              </p>
            </div>
            <div class="summary">
              <p>专业:{{ admin.major }}</p>
            </div>
            <div class="summary">
              <p>科目:{{ item.subject_name.subject_name }}</p>
            </div>
          </div>
        </div>
        <div class="btm">
          <div class="btn" @click="check(item)">
            <p class="btn_t">查看错题</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box3" v-else>暂无错题数据</div>
    <Footer></Footer>
  </div>
</template>

<script>
// import { Dialog } from "vant";
import Footer from "@/components/Footer.vue";
export default {
  name: "wrong",
  data() {
    return {
      active: "home",
      wrong: {},
    };
  },
  created() {
    this.admin = JSON.parse(localStorage.getItem("admin"));
    this.getErrtopicCollection();
  },
  methods: {
    getErrtopicCollection() {
      this.$axios({
        method: "post",
        url: "/getErrtopicCollection",
        data: {
          id_card: this.admin.id_card,
        },
        //设置token
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          this.wrong = response.data.data;
          // this.$store.state.result = response.data.data;
          // console.log(response);
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
    onClickLeft() {
      // Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
    },
    check(values) {
      this.$store.state.getWrong = values;
      this.$router.push("/WrongTopic");
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
    margin-left: 0.3133rem;
    // background-color: red;
    .msg {
      display: flex;
      justify-content: center;
      align-items: center;
      .t {
        font-size: 0.38rem;
        // font-weight: ;
      }
    }
    .chose {
      display: flex;
      justify-content: start;
      align-items: center;
      p {
        color: red;
        font-size: 0.54rem;
      }
      .wrong1 {
        width: 1.4rem;
        height: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-right: 0.2rem;
        p {
          margin-top: 0.1333rem;
        }
        .w_t {
          color: #000;
          font-size: 0.24rem;
        }
      }
    }
    .tips {
      display: flex;
      justify-content: start;
      align-items: center;
      .summary {
        margin-top: 0.1333rem;
        margin-right: 0.1333rem;
        p {
          font-size: 0.24rem;
          color: #999999;
        }
      }
    }
  }
  .btm {
    width: 30%;
    height: 2.3333rem;
    // background-color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.8rem;
      height: 0.7467rem;
      background-color: #00caa3;
      border-radius: 0.6667rem;
      .btn_t {
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }
}
.box3 {
  margin-top: 0.6rem;
}
/deep/ .van-nav-bar__left {
  display: none;
}
/deep/[class*="van-hairline"]::after {
  border-bottom-width: 0;
}
</style>