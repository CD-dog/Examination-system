<template>
  <div class="Exam">
    <div class="title">
      <van-nav-bar
        title="全部错题"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="choose">
      <van-tabs @click="onClick">
        <!-- 单选错题 -->
        <van-tab title="单选题">
          <van-swipe
            class="my-swipe"
            :loop="false"
            :show-indicators="false"
            indicator-color="white"
            ref="swipe"
          >
            <van-swipe-item
              v-for="(item, index) in examQuestion.single_err_details"
              :key="index"
            >
              <div class="single-item">
                <p class="title-subject">
                  {{ index + 1 }}:{{ item.single_name }}
                </p>
                <van-radio-group v-model="item.select_answer" disabled>
                  <van-radio name="A">
                    : {{ item.A }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer == 'A' &&
                          !(item.right_key == item.select_answer)
                            ? selectImg[4].errIcon
                            : props.checked
                            ? selectImg[0].activeIcon
                            : selectImg[0].inactiveIcon
                        "
                      />
                    </template>
                  </van-radio>

                  <van-radio name="B">
                    : {{ item.B }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer == 'B' &&
                          !(item.right_key == item.select_answer)
                            ? selectImg[4].errIcon
                            : props.checked
                            ? selectImg[1].activeIcon
                            : selectImg[1].inactiveIcon
                        "
                      />
                    </template>
                  </van-radio>
                  <van-radio name="C">
                    : {{ item.C }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer == 'C' &&
                          !(item.right_key == item.select_answer)
                            ? selectImg[4].errIcon
                            : props.checked
                            ? selectImg[2].activeIcon
                            : selectImg[2].inactiveIcon
                        "
                      />
                    </template>
                  </van-radio>
                  <van-radio name="D">
                    : {{ item.D }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer == 'D' &&
                          !(item.right_key == item.select_answer)
                            ? selectImg[4].errIcon
                            : props.checked
                            ? selectImg[3].activeIcon
                            : selectImg[3].inactiveIcon
                        "
                      />
                    </template>
                  </van-radio>
                </van-radio-group>
                <p class="correct">正确答案：{{ item.right_key }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>
        </van-tab>

        <!-- 多选错题 -->
        <van-tab title="多选题">
          <van-swipe
            class="my-swipe"
            :loop="false"
            :show-indicators="false"
            indicator-color="white"
            ref="swipe"
          >
            <van-swipe-item
              v-for="(item, index) in examQuestion.selection_err_details"
              :key="index + 1000"
            >
              <div class="single-item">
                <p class="title-subject">
                  {{ index + 1 }}: {{ item.selection_name }}
                </p>
                <van-checkbox-group v-model="item.select_answer" disabled>
                  <van-checkbox name="A">
                    : {{ item.A }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer.indexOf('A') == -1
                            ? selectImg[0].inactiveIcon
                            : item.is_right == false
                            ? selectImg[4].errIcon
                            : selectImg[0].activeIcon
                        "
                      />
                    </template>
                  </van-checkbox>
                  <van-checkbox name="B">
                    : {{ item.B }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer.indexOf('B') == -1
                            ? selectImg[1].inactiveIcon
                            : item.is_right == false
                            ? selectImg[4].errIcon
                            : selectImg[1].activeIcon
                        "
                      />
                    </template>
                  </van-checkbox>
                  <van-checkbox name="C">
                    : {{ item.C }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer.indexOf('C') == -1
                            ? selectImg[2].inactiveIcon
                            : item.is_right == false
                            ? selectImg[4].errIcon
                            : selectImg[2].activeIcon
                        "
                      />
                    </template>
                  </van-checkbox>
                  <van-checkbox name="D">
                    : {{ item.D }}
                    <template #icon="props">
                      <img
                        class="img-icon"
                        :src="
                          item.select_answer.indexOf('D') == -1
                            ? selectImg[3].inactiveIcon
                            : item.is_right == false
                            ? selectImg[4].errIcon
                            : selectImg[3].activeIcon
                        "
                      />
                    </template>
                  </van-checkbox>
                </van-checkbox-group>
                <p class="correct">正确答案：{{ item.right_answer }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>
        </van-tab>

        <!-- 判断题 -->
        <van-tab title="是非题">
          <van-swipe
            class="my-swipe"
            :loop="false"
            :show-indicators="false"
            indicator-color="white"
            ref="swipe"
          >
            <van-swipe-item
              v-for="(item, index) in examQuestion.judge_err_details"
              :key="index + 10000"
            >
              <div class="single-item">
                <p class="title-subject">
                  {{ index + 1 }}:{{ item.judge_name }}
                </p>
                <van-radio-group v-model="item.select_answer" disabled>
                  <van-radio name="1"> 正确 </van-radio>

                  <van-radio name="0"> 错误 </van-radio>
                </van-radio-group>
              </div>
              <p class="correct">
                正确答案：{{ item.right_key == 1 ? "正确" : "错误" }}
              </p>
            </van-swipe-item>
          </van-swipe>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "wrongTopic",
  data() {
    return {
      activeNames: "",
      examQuestion: "",
      single_err_details: "",
      selection_err_details: "",
      result: "",
      select_answer: "",
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
        {
          errIcon: require("@/assets/img/cuowu.png"),
        },
      ],
    };
  },
  created() {
    this.admin = JSON.parse(localStorage.getItem("admin"));
    this.getErrTopic();
    // console.log(this.$store.state.getWrong);
  },
  methods: {
    // 判断回答是否正确
    isErr(right, answer) {
      var _isErr = false;
      var right_num = right.length;
      answer.forEach((aitem, aindex) => {
        right.forEach((ritem, rindex) => {
          if (aitem == ritem) {
            right_num = right_num - 1;
          }
        });
      });
      if (right_num == 0) {
        _isErr = true;
      }
      return _isErr;
    },

    getErrTopic() {
      this.$axios({
        method: "post",
        url: "/getErrTopic",
        data: {
          id: this.$store.state.getWrong.id,
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          this.examQuestion = response.data;

          for (
            let i = 0;
            i < this.examQuestion.selection_err_details.length;
            i++
          ) {
            var element = this.examQuestion.selection_err_details[i];
            element.right_key = element.right_key.split("");
            element.is_right = this.isErr(
              element.right_key,
              element.select_answer
            );
            element.right_answer = element.right_key.join("、");
            // element.select_answer = element.select_answer.join(" ");
          }
          // for (let a = 0; a < this.examQuestion.judge_err_details.length; a++) {
          //   var result = "";
          //   var ment = this.examQuestion.judge_err_details[a];
          //   if (ment.right_key == 1) {
          //     result = "正确";
          //   } else {
          //     result = "错误";
          //   }
          //   console.log(result);
          // }
          // console.log(result);
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
    onClickLeft() {
      //Toast("返回");
      this.$router.push("/Wrong");
    },
    onClickRight() {
      //Toast("按钮");
    },
    onClick(name, title) {
      //Toast(title);
    },
  },
};
</script>

<style lang="scss" scoped>
.Exam {
  width: 100%;
  height: 100hv;
}
.content {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  width: 9.2rem;
  height: 4.2667rem;
  border: 0.0533rem solid #f6f6f6;
  border-radius: 0.5rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 0.8rem;
  .upper {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 8.4rem;
    height: 1.0933rem;
    border-bottom: 1px solid #f2f2f2;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    .upper_q {
      margin-left: 0.1333rem;
    }
    p {
      font-size: 0.4267rem;
    }
  }
  .exam {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrong {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      width: 2.8rem;
      height: 2rem;
      .big {
        font-size: 0.8rem;
        text-align: center;
      }
      p {
        font-size: 0.32rem;
        text-align: center;
      }
    }
  }
  .low {
    width: 8.4rem;
  }
}

.correct {
  font-size: 0.5667rem;
  margin: 0.8rem 0 0 0.5rem;
}
.single-item {
  background-color: #ffffff;
  width: 100%;

  .title[data-v-10089a03] {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 0.8rem;
    align-items: center;
    height: 2rem;
  }

  .title-subject {
    margin-top: 0.6667rem;
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
      font-size: 0.4333rem;
      // line-height: 1.3333rem;
      font-weight: 600;
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
      font-size: 0.4333rem;
      font-weight: 600;
      /* line-height: 1.3333rem;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-wrap: wrap; */
    }
  }
}
</style>