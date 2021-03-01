<template>
  <div class="questions">
    <van-nav-bar
      title="考试中"
      newspaper-o
      right-text="交卷"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight()"
    />
    <!-- 定时器 -->
    <div class="countDown">
      <van-count-down :time="examMsg.exam_time * 60000" @finish="countFun" />
    </div>

    <div class="Answer-sheet" @click="examineFun">查看题目</div>
    <!-- 答题卡 -->
    <van-action-sheet v-model="examShow" title="答题卡">
      <div class="exam-content">
        <!-- 单选 -->
        <div
          class="radio-box"
          v-for="(item, index) in singleLen"
          :key="index"
          :class="[
            examQuestion.singleArr[index].select_answer ? 'active-box' : '',
          ]"
          @click="goTopic(item - 1)"
        >
          {{ item }}
        </div>
        <!-- 多选 -->
        <div
          class="radio-box"
          v-for="(item, index) in selectionLen"
          :key="index + 1000"
          :class="[
            examQuestion.selectionArr[index].select_answer.length > 0
              ? 'active-box'
              : '',
          ]"
          @click="goTopic(item + singleLen - 1)"
        >
          {{ item + singleLen }}
        </div>

        <!-- 判断 -->
        <div
          class="radio-box"
          v-for="(item, index) in judgeLen"
          :key="index + 10000"
          :class="[
            examQuestion.judgeArr[index].select_answer ? 'active-box' : '',
          ]"
          @click="goTopic(item + singleLen + selectionLen - 1)"
        >
          {{ item + singleLen + selectionLen }}
        </div>
      </div>
    </van-action-sheet>

    <van-swipe
      class="my-swipe"
      :loop="false"
      :show-indicators="false"
      indicator-color="white"
      ref="swipe"
    >
      <!-- 单选题目 -->
      <van-swipe-item
        v-for="(item, index) in examQuestion.singleArr"
        :key="index"
      >
        <div class="single-item">
          <p class="title">
            <span class="title-type"> (单选题) </span>
          </p>

          <p class="title-subject">{{ index + 1 }}:{{ item.selection_name }}</p>
          <van-radio-group v-model="item.select_answer">
            <van-radio name="A">
              {{ item.A }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[0].activeIcon
                      : selectImg[0].inactiveIcon
                  "
                />
              </template>
            </van-radio>

            <van-radio name="B">
              {{ item.B }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[1].activeIcon
                      : selectImg[1].inactiveIcon
                  "
                />
              </template>
            </van-radio>
            <van-radio name="C">
              {{ item.C }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[2].activeIcon
                      : selectImg[2].inactiveIcon
                  "
                />
              </template>
            </van-radio>
            <van-radio name="D">
              {{ item.D }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[3].activeIcon
                      : selectImg[3].inactiveIcon
                  "
                />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
      </van-swipe-item>

      <!-- 多选题目 -->
      <van-swipe-item
        v-for="(item, index) in examQuestion.selectionArr"
        :key="index + 1000"
      >
        <div class="single-item">
          <p class="title">
            <span class="title-type"> (多选题) </span>
          </p>
          <p class="title-subject">
            {{ index + 1 }}: {{ item.selection_name }}
          </p>
          <van-checkbox-group v-model="item.select_answer">
            <van-checkbox name="A">
              {{ item.A }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[0].activeIcon
                      : selectImg[0].inactiveIcon
                  "
                />
              </template>
            </van-checkbox>
            <van-checkbox name="B">
              {{ item.B }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[1].activeIcon
                      : selectImg[1].inactiveIcon
                  "
                />
              </template>
            </van-checkbox>
            <van-checkbox name="C">
              {{ item.C }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[2].activeIcon
                      : selectImg[2].inactiveIcon
                  "
                />
              </template>
            </van-checkbox>
            <van-checkbox name="D">
              {{ item.D }}
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked
                      ? selectImg[3].activeIcon
                      : selectImg[3].inactiveIcon
                  "
                />
              </template>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </van-swipe-item>

      <!-- 判断题 -->
      <van-swipe-item
        v-for="(item, index) in examQuestion.judgeArr"
        :key="index + 10000"
      >
        <div class="single-item">
          <p class="title">
            <span class="title-type"> (判断题) </span>
          </p>

          <p class="title-subject">{{ index + 1 }}:{{ item.judge_name }}</p>
          <van-radio-group v-model="item.select_answer">
            <van-radio name="1"> 正确 </van-radio>

            <van-radio name="0"> 错误 </van-radio>
          </van-radio-group>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "questions",
  data() {
    return {
      radio: "1",
      checked: true,
      examMsg: {},
      examQuestion: {},
      admin: {},
      examShow: false,
      singleLen: 0,
      selectionLen: 0,
      judgeLen: 0,
      singleFlag: "",
      judegFlag: "",
      accouns: [],
      oldTimestamp: "",
      use_time: 0,
      selectImg: [
        {
          activeIcon: require("@/assets/img/A.png"),
          inactiveIcon: require("@/assets/img/A1.png"),
        },
        {
          activeIcon: require("@/assets/img/B.png"),
          inactiveIcon: require("@/assets/img/B1.png"),
        },
        {
          activeIcon: require("@/assets/img/C.png"),
          inactiveIcon: require("@/assets/img/C1.png"),
        },
        {
          activeIcon: require("@/assets/img/D.png"),
          inactiveIcon: require("@/assets/img/D1.png"),
        },
      ],
    };
  },
  created: function () {
    // 获取当前时间
    this.oldTimestamp = Date.parse(new Date());
    // console.log(this.$store.state.examMsg);
    this.examMsg = this.$store.state.examMsg;
    this.admin = JSON.parse(localStorage.getItem("admin"));
    // console.log(this.examMsg);
    this.getExamQuetion();
  },
  methods: {
    getExamQuetion() {
      this.$axios({
        method: "post",
        url: "/getExamQuestion",
        data: this.examMsg,
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          // console.log(response);
          this.examQuestion = response.data;

          //获取题目长度
          this.singleLen = this.examQuestion.singleArr.length;
          this.selectionLen = this.examQuestion.selectionArr.length;
          this.judgeLen = this.examQuestion.judgeArr.length;

          for (let i = 0; i < this.examQuestion.selectionArr.length; i++) {
            const elemet = this.examQuestion.selectionArr[i];
            elemet.select_answer = [];
          }
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
    //提交考试接口
    handOverExamApi() {
      // 考试用时
      let newTimestamp = Date.parse(new Date());
      let newTime = newTimestamp - this.oldTimestamp;
      let hours = Math.floor(newTime / (1000 * 60 * 60));
      let minutes = Math.ceil((newTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = (newTime % (1000 * 60)) / 1000;
      this.use_time = `${hours}小时${minutes}分${seconds}秒`;

      this.$axios({
        method: "post",
        url: "/handExaminationPaper",
        data: {
          single: JSON.stringify(this.examQuestion.singleArr),
          selection: JSON.stringify(this.examQuestion.selectionArr),
          judge: JSON.stringify(this.examQuestion.judgeArr),
          id_card: this.admin.id_card,
          username: this.admin.username,
          major_id: this.$store.state.examMsg.major_id,
          subject_id: this.$store.state.examMsg.subject_id,
          use_time: this.use_time,
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          // this.$toast(response.data.msg);
          this.$store.state.accounss = response.data;
          this.$store.state.time = this.use_time;
          // console.log(this.$store.state.time);
          // console.log(response);
          this.$router.push("/accouns");
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
    //跳转到指题目
    goTopic(index) {
      this.examShow = false;
      this.$refs.swipe.swipeTo(index);
    },
    //答题卡
    examineFun() {
      this.examShow = true;
    },
    handOverExam() {},
    countFun() {},
    onClickLeft() {
      this.$router.push("/homepage");
    },
    onClickRight() {
      //单选
      let singleFlag = this.examQuestion.singleArr.every((item) => {
        return item.select_answer;
      });
      //多选
      let selectionFlag = this.examQuestion.selectionArr.every((item) => {
        return item.select_answer.length > 0;
      });
      //判断
      let judegFlag = this.examQuestion.judgeArr.every((item) => {
        return item.select_answer;
      });
      if (!(singleFlag && selectionFlag && judegFlag)) {
        this.$toast("请做完题目交卷");
        return;
      }
      Dialog.confirm({
        message: "确定交卷？",
      })
        .then(() => {
          this.handOverExamApi();
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Answer-sheet {
  font-size: 0.52rem;
  margin-left: 0.5333rem;
}
.van-count-down {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6667rem;
  margin-bottom: 0.6667rem;
}
.exam-content {
  display: flex;
  flex-wrap: wrap;

  .radio-box {
    font-size: 0.48rem;
    width: 1.7333rem;
    height: 1.7333rem;
    margin-right: 0.2667rem;
    margin-bottom: 1rem;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    text-align: center;
    line-height: 1.7333rem;
    border-radius: 50%;
  }
  .active-box {
    font-size: 0.48rem;
    width: 1.7333rem;
    height: 1.7333rem;
    margin-right: 0.2667rem;
    background-color: #33d5b5;
    text-align: center;
    line-height: 1.7333rem;
    border-radius: 50%;
  }
}

.single-item {
  background-color: #ffffff;
  width: 100%;

  .title[data-v-10089a03] {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 0.7rem;
    align-items: center;
    height: 2rem;
  }

  .title-subject {
    margin-left: 0.267rem;
    font-size: 0.4533rem;
  }
  /deep/ .van-radio__icon {
    width: 0.7rem;
    height: 0.7rem;
  }
  /deep/ .van-radio {
    margin-left: 0.567rem;
    margin-top: 0.8rem;

    /deep/.van-radio__label {
      color: #0066cc;
      font-size: 0.3333rem;
      // line-height: 1.3333rem;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-wrap: wrap;
    }
  }
  /deep/ .van-checkbox {
    margin-left: 0.567rem;
    margin-top: 0.8rem;
    /deep/ .van-checkbox__icon {
      width: 0.7rem;
      height: 0.7rem;
    }
    /deep/ .van-checkbox__label {
      color: #0066cc;
      font-size: 0.3333rem;
      /* line-height: 1.3333rem;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-wrap: wrap; */
    }
  }
}
</style>