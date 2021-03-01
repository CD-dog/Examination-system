<template>
  <div class="achievement">
    <div class="box">
      <div class="header">
        <img class="left" @click="Rt" src="@/assets/img/return.png" alt="" />
        <p>成绩单</p>
      </div>
      <img class="ren" src="@/assets/img/ren.png" alt="" />
      <div class="message">
        <div class="person">
          <img src="@/assets/img/toux.jpeg" alt="" />
        </div>
        <div class="text">
          <div class="name">
            <p>姓名：{{ admin.realName }}</p>
          </div>
          <div class="name">
            <p>学号：{{ admin.id_card }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box1" v-if="result.length">
      <div class="res" v-for="(item, index) in result" :key="index">
        <div class="header">
          <img src="@/assets/img/shu.png" alt="" />
          <p>{{ item.subject_name.subject_name }}成绩单</p>
        </div>
        <div class="border">
          <ul>
            <li>
              总分
              <span class="one">{{ item.score }}</span>
            </li>
            <li>
              单选分数
              <span>{{ item.single_score }}</span>
            </li>
            <li>
              多选分数
              <span>{{ item.selection_score }}</span>
            </li>
            <li>
              判断分数
              <span>{{ item.judge_score }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box3" v-else>暂无数据</div>
  </div>
</template>
<script>
export default {
  name: "achievement",
  data() {
    return {
      result: {},
    };
  },
  created() {
    this.admin = JSON.parse(localStorage.getItem("admin"));
    this.getErrtopicCollection();
  },
  methods: {
    Rt() {
      this.$router.push("/homepage");
    },
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
          this.result = response.data.data;
          // this.$store.state.result = response.data.data;
          // console.log(response);
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
  },
};
</script>
<style  scoped lang="scss">
.box {
  position: relative;
  height: 4.2667rem;
  width: 100%;
  background-image: linear-gradient(to top right, #a7d300, #fff900);
  .header {
    display: flex;
    width: 100%;
    height: 1.3333rem;
    padding-top: 0.2667rem;
    .left {
      width: 0.6667rem;
      height: 0.6667rem;
      margin-left: 0.4667rem;
      line-height: 1.3333rem;
    }
    p {
      width: 100%;
      text-align: center;
      padding-right: 0.5333rem;
    }
  }
  .ren {
    position: absolute;
    width: 3.3333rem;
    height: 5.3333rem;
    top: 0.1rem;
    right: 0px;
  }
  .message {
    display: flex;
    margin: 0 auto;
    align-items: center;
    margin-top: 0.8rem;
  }
  .person {
    width: 1.6667rem;
    height: 1.6667rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      margin-left: 0.6rem;
    }
  }
  .text {
    // width: 70%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    margin-left: 1.6rem;
    p {
      color: black;
      font-size: 0.3667rem;
      margin-bottom: 0.3333rem;
      // font-weight: 600;
    }
    .num {
      margin-left: -0.4rem;
    }
  }
}
.res {
  margin-left: 0.4267rem;
  margin-top: 0.8rem;
  width: 90%;
  height: 5.3333rem;
  border-bottom: 1px solid #ccc;
  .header {
    padding-left: 0.6rem;
    display: flex;
    img {
      width: 0.3333rem;
      height: 0.7rem;
      margin-left: -0.32rem;
      margin-right: 0.2667rem;
    }
    p {
      margin: 0;
      font-size: 0.65rem;
    }
  }
  .border {
    li {
      margin-left: 0.88rem;
      margin-top: 0.5267rem;
      font-size: 0.4267rem;

      span {
        margin-left: 5.6rem;
        color: red;
      }
      .one {
        margin-left: 6.4533rem;
      }
    }
  }
}
.box3 {
  margin-left: 0.2667rem;
  font-size: 0.6667rem;
}
/deep/ .van-nav-bar {
  height: 1.68rem;
}
</style>