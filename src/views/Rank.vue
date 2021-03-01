<template>
  <div class="rank">
    <div class="title">
      <van-nav-bar
        title="排行榜"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="img">
      <img src="@/assets/img/jiangbei.png" alt="" />
    </div>
    <div class="tRank">
      <!-- style="border-collapse: collapse; border: 0" -->
      <table border="0" v-if="rankingArr.length">
        <tr>
          <!-- <td style="width: 15%"></td> -->
          <td style="width: 15%">排名</td>
          <td style="width: 20%">用户名</td>
          <td style="width: 25%">考试用时</td>
          <td style="width: 24%">成绩</td>
        </tr>

        <tr v-for="(item, index) in rankingArr" :key="index">
          <!-- <td class="one"><img src="@/assets/img/gjun.png" alt="" /></td> -->
          <td>{{ index + 1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.use_time }}</td>
          <td>{{ item.score }}</td>
        </tr>
      </table>
      <div class="box" v-else>暂无排行信息</div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "rank",
  data() {
    return {
      active: "home",
      subjects: "",
      rankingArr: "",
      subject_id: "",
    };
  },
  methods: {
    getranking() {
      this.$axios({
        method: "post",
        url: "/getranking",
        data: {
          subject_id: this.$store.state.getSubjects.id,
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          this.rankingArr = response.data.data;
        } else {
          this.$toast(response.data.msg);
        }
      });
    },

    onClickLeft() {
      this.$router.push("/result");
    },
  },
  created() {
    // this.getsubjectFun();
    this.admin = JSON.parse(localStorage.getItem("admin"));
    this.getranking();
  },
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.rank {
  width: 100%;
  height: 100vh;
  background-color: #00caa3;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.2267rem;
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.6rem;
    height: 4.32rem;
  }
}
.tRank {
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 65vh;
  border-radius: 0.4667rem;
  td {
    text-align: center;
    color: #333333;
    font-size: 0.3867rem;
    word-spacing: 0.7733rem;
    padding-top: 0.2667rem;
    img {
      display: flex;
      flex-direction: column-reverse;
      width: 0.8467rem;
      height: 0.6667rem;
      margin-left: 0.5333rem;
    }
  }
  // table{
  //   // border-collapse: collapse;
  // }
}
.box {
  margin-top: 0.5333rem;
}
/deep/.van-nav-bar {
  background-color: #00caa3;
}
/deep/.van-icon-arrow-left::before {
  color: black;
}
</style>