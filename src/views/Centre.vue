<template>
  <div class="centre">
    <div class="title">
      <van-nav-bar
        title="个人资料"
        left-text=""
        right-text="保存"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="content_one">
      <!-- 头像 -->
      <div class="msg">
        <div class="head_left">
          <van-uploader :after-read="afterRead" />
        </div>
        <div class="head_right">
          <p>头像</p>
        </div>
      </div>
    </div>
    <div class="content_two">
      <!-- 用户名 -->
      <div class="msg_w">
        <div class="admin_left">
          <p>用户名</p>
        </div>
        <div class="admin_right">
          <input
            type="text"
            v-model="admin.username"
            placeholder="请输入用户名"
            disabled
          />
        </div>
      </div>
      <!-- 真实姓名 -->
      <div class="msg_w">
        <div class="admin_left">
          <p>真实姓名</p>
        </div>
        <div class="admin_right">
          <input
            type="text"
            v-model="admin.realName"
            placeholder="请输入真实姓名"
          />
        </div>
      </div>
      <!-- 性别 -->
      <div class="msg_e">
        <van-field
          class="sex_left"
          readonly
          clickable
          name="sex"
          :value="admin.sex"
          label="性别"
          placeholder="点击选择性别"
          @click="showPicker = true"
        />
        <van-popup class="sex_right" v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
      <!-- 身份证 -->
      <div class="msg">
        <div class="Id_left">
          <p>学号</p>
        </div>
        <div class="Id_right">
          <input type="text" v-model="admin.id_card" placeholder="请输入学号" />
        </div>
      </div>
      <!-- 电话 -->
      <div class="msg">
        <div class="tel_left">
          <p>电话</p>
        </div>
        <div class="tel_right">
          <input
            type="text"
            v-model="admin.tel"
            placeholder="请输入您的电话号码"
          />
        </div>
      </div>
    </div>
    <div class="content_three">
      <!-- 专业 -->
      <div class="msg">
        <van-field
          readonly
          clickable
          name="major"
          :value="admin.major"
          label="专业"
          placeholder="点击选择专业"
          @click="showPickers = true"
        />
        <van-popup v-model="showPickers" position="bottom">
          <van-picker
            show-toolbar
            :columns="majors"
            @confirm="onConfirms"
            @cancel="showPickers = false"
          />
        </van-popup>
      </div>
      <!-- 班级 -->
      <!-- 班级 -->
      <div class="msg">
        <div class="admin_left">
          <p>班级</p>
        </div>
        <div class="admin_right">
          <input
            type="text"
            v-model="admin.class_name"
            placeholder="请输入班级"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "centre",
  data() {
    return {
      value: "",
      box: "",
      columns: ["男", "女", "秘密"],
      boxs: ["", "", "", "", "", "", ""],
      showPicker: false,
      showPickers: false,
      showPicke: false,
      id_card: "",
      major: "",
      sex: "",
      class_name: "",
      studentNum: "",
      realName: "",
      tel: "",
      username: "",
      majors: [],
      admin: {},
    };
  },
  created() {
    this.admin = JSON.parse(localStorage.getItem("admin"));
    this.getMajors();
  },
  methods: {
    getMajors() {
      this.$axios({
        method: "get",
        url: "getMajor",
        data: {
          // boxs: this.major_name,
        },

        //设置token
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          this.majors = response.data.data;
        } else {
          this.$toast("专业获取失败");
        }
      });
    },

    onClickLeft() {
      this.$router.replace("/Personal");
    },
    onClickRight() {
      this.$axios({
        method: "post",
        url: "/updatePersonalDetails",
        data: {
          username: this.admin.username,
          realName: this.admin.realName,
          sex: this.admin.sex,
          id_card: this.admin.id_card,
          tel: this.admin.tel,
          major: this.admin.major,
          class_name: this.admin.class_name,
        },
        //设置token
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.static === "200") {
          //更新本地存储中的数据
          localStorage.setItem("admin", JSON.stringify(this.admin));
          //console.log(response);
          this.$toast(response.data.msg);
        } else {
          this.$toast("更新失败");
        }
      });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onConfirm(value) {
      this.admin.sex = value;
      this.showPicker = false;
    },
    onConfirms(value) {
      this.admin.major = value;
      this.showPickers = false;
    },
    onConfirmker(cl) {
      this.cl = cl;
      this.showPicke = false;
    },
  },
};
</script>



<style lang="scss" scoped>
.centre {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}
.content_one {
  width: 100%;
  background-color: #fff;
  .msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2.1333rem;
    border-bottom: 1.2px solid #ebedf0;
    .head_right {
      margin-right: 0.4667rem;
      p {
        font-size: 0.1867rem;
        color: #999999;
        font-size: 0.4rem;
      }
    }
    .head_left {
      margin-left: 0.4667rem;
      border-radius: 50%;
    }

    .admin_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #646566;
        font-size: 0.4rem;
      }
    }
    .admin_right {
      margin-right: 0.4rem;
      //   p {
      //     font-size: 0.1867rem;
      //     color: #646566;
      //     font-size: 0.4rem;
      //   }
      input {
        box-sizing: border-box;
        // height: 1rem;
        border: none;
        font-size: 0.3733rem;
        color: #323233;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #c8c9cc;
      }
    }
    .Id_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #646566;
        font-size: 0.4rem;
      }
    }
    .Id_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        // height: 1rem;
        border: none;
        font-size: 0.3733rem;
        color: #323233;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #c8c9cc;
      }
    }
    .tel_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #646566;
        font-size: 0.4rem;
      }
    }
    .tel_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        // height: 1rem;
        border: none;
        font-size: 0.3733rem;
        color: #323233;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #c8c9cc;
      }
    }
    .teacher_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #646566;
        font-size: 0.4rem;
      }
    }
    .teacher_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        // height: 1rem;
        border: none;
        font-size: 0.3733rem;
        color: #323233;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #c8c9cc;
      }
    }
  }
}
.content_two {
  width: 100%;
  background-color: #fff;
  height: 9rem;
  margin-top: 0.2rem;
  padding-top: 0.6667rem;
  .msg_q {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.6rem;
    .ID_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #282828;
        font-size: 0.4rem;
      }
    }
    .ID_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        border: none;
        font-size: 0.3733rem;
        color: #282828;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #999999;
      }
    }
  }
  .msg_w {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.6rem;
    .admin_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #282828;
        font-size: 0.4rem;
      }
    }
    .admin_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        border: none;
        font-size: 0.3733rem;
        color: #282828;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #999999;
      }
    }
  }
  .msg_e {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.6rem;
    /deep/ input::placeholder {
      color: #999999;
    }
  }
  .msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.6rem;
    .Id_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #282828;
        font-size: 0.4rem;
      }
    }
    .Id_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        border: none;
        font-size: 0.3733rem;
        color: #282828;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #999999;
      }
    }
    .tel_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #282828;
        font-size: 0.4rem;
      }
    }
    .tel_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        border: none;
        font-size: 0.3733rem;
        color: #282828;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #999999;
      }
    }
  }
}
.content_three {
  width: 100%;
  background-color: #fff;
  height: 3.2rem;
  margin-top: 0.2rem;
  .msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.6rem;
    /deep/ input::placeholder {
      color: #999999;
    }
    .admin_left {
      margin-left: 0.4rem;
      p {
        font-size: 0.1867rem;
        color: #282828;
        font-size: 0.4rem;
      }
    }
    .admin_right {
      margin-right: 0.4rem;
      input {
        box-sizing: border-box;
        border: none;
        font-size: 0.3733rem;
        color: #282828;
        outline: none;
        text-align: right;
      }
      input::placeholder {
        color: #999999;
      }
    }
  }
}
/deep/ .van-field__control {
  text-align: right;
}
/deep/ .van-uploader__upload {
  border-radius: 50%;
  margin-top: 0.2067rem;
  width: 1.7333rem;
  height: 1.7333rem;
}
/deep/ .van-nav-bar__title {
  color: #333333;
}
</style>