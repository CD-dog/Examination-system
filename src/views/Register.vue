<template>
  <div class="home">
    <div class="background">
      <h1>在线考试系统</h1>
      <div class="center">
        <div class="int">
          <div class="box1">
            <img src="@/assets/user.png" alt="" />
            <input
              type="text"
              placeholder="请设置你的账号"
              class="username"
              v-model="username"
            />
            <p class="nameText">{{ nameText1 }}</p>
          </div>
          <div class="box2">
            <img src="@/assets/password.png" alt="" />
            <input
              type="password"
              placeholder="请设置你的密码"
              class="password"
              v-model="password"
            />
            <p class="nameText2">{{ nameText2 }}</p>
          </div>
          <div class="box3">
            <img src="@/assets/password.png" alt="" />
            <input
              v-model="again"
              type="password"
              placeholder="请再输入一次密码"
            />
            <p class="nameText3">{{ again1 }}</p>
          </div>
          <button class="but" @click="btn">注册</button>
        </div>

        <div class="bottom">
          <div class="hea">
            <router-link class="register" :to="{ name: 'home' }"
              >已有账号,去登录</router-link
            >
            <router-link class="forget" :to="{ name: 'home' }"
              >忘记密码?</router-link
            >
          </div>
          <p class="titl"><span></span>其他方式注册<span></span></p>
          <div class="cen">
            <a href=""><img src="@/assets/wechat.jpg" alt="" /></a>
            <a href=""><img src="@/assets/qq.jpg" alt="" /></a>
            <a href=""><img src="@/assets/weibo.jpg" alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      again: "",
      again1: "",
      username: "",
      password: "",
      nameText: "",
      nameText1: "",
      nameText2: "",
      usernameFlag: "",
      usernameFlag1: "",
      passwordFlag: "",
      passwordFlag1: "",
      display: "",
    };
  },
  components: {},
  methods: {
    btn() {
      if (
        !(this.username.length >= 6 || this.username.length < 1) ||
        this.username.length > 8
      ) {
        this.$toast("请输入6-8位账号");
      } else if (this.username == "") {
        this.$toast("账号不能为空");
      } else if (
        !(this.password.length >= 6 || this.password.length < 1) ||
        this.password.length > 8
      ) {
        this.$toast("请输入6-8位密码");
      } else if (this.password == "") {
        this.$toast("密码不能为空");
      } else if (this.password !== this.again) {
        this.$toast("两次密码不一致");
      } else {
        this.$axios({
          method: "post",
          url: "/register",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then((response) => {
          if (response.data.static === "200") {
            localStorage.setItem("token", response.data.token);
            this.$toast(response.data.msg);
            this.$router.push("/");
          } else {
            this.$toast(response.data.msg);
            this.username = "";
            this.password = "";
            this.again = "";
          }
        });
      }
    },
  },
  watch: {
    username: function (newValue) {
      var va = newValue.length;
      if (!(va >= 6 && va <= 8)) {
        this.nameText1 = "请注册6-8位账号";
        this.usernameFlag1 = false;
      } else {
        this.nameText1 = "";
        this.usernameFlag1 = true;
      }
    },
    password: function (num1) {
      var vb = num1.length;
      if (!(vb >= 6 && vb <= 8)) {
        this.nameText2 = "请注册6-8位密码";
        this.passwordFlag1 = false;
      } else {
        this.nameText2 = "";
        this.passwordFlag1 = true;
      }
    },
    again: function () {
      if (this.password !== this.again) {
        this.again1 = "密码不一致，请重新输入";
      } else {
        this.again1 = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.background {
  background: url("../assets/bgc.jpg") no-repeat;
  width: 100%;
  height: 17rem;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 0;
  h1 {
    color: #00caa3;
    font-size: 0.9rem;
    text-align: center;
    padding-top: 1.5625rem;
  }

  .center {
    width: 7rem;
    margin: 0 auto;
    border-radius: 0.266667rem;
    background-color: #ffffff;
    margin-top: 1.6rem;
    overflow: hidden;
    box-shadow: 0.023333rem 0.013333rem 0.093333rem #969799;
    opacity: 0.9;
    .int {
      position: relative;
      width: 100%;
      padding-top: 0.866667rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .box1 {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.533333rem;
        .nameText {
          position: absolute;
          top: 0.933333rem;
          font-size: 0.32rem;
          margin: 0.053333rem 0;
          padding-right: 1.6rem;
          color: red;
        }
        img {
          position: absolute;
          top: 0.266667rem;
          left: 0.1rem;
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .box2 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.533333rem;
        .nameText2 {
          position: absolute;
          top: 1rem;
          left: 1.012rem;
          font-size: 0.32rem;
          margin: 0.053333rem 0;
          padding-right: 1.6rem;
          color: red;
        }
        img {
          position: absolute;
          top: 0.186667rem;
          left: 0.06rem;
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      input {
        box-sizing: border-box;
        width: 6rem;
        height: 1rem;
        border: none;
        font-size: 0.428rem;
        color: black;
        padding-left: 0.866667rem;
        background-color: #f5f5f5;
        border-radius: 0.2rem;
      }
      .box3 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.733333rem;
        .nameText3 {
          position: absolute;
          top: 1rem;
          left: 1.02rem;
          font-size: 0.32rem;
          margin: 0.053333rem 0;
          padding-right: 1.6rem;
          color: red;
          width: 100%;
        }
        img {
          position: absolute;
          top: 0.186667rem;
          left: 0.06rem;
          width: 0.6rem;
          height: 0.6rem;
        }
      }

      input::-webkit-input-placeholder {
        color: #dadada;
        font-size: 0.36rem;
      }
      .but {
        border-radius: 0.566667rem;
        width: 6rem;
        height: 1rem;
        background-color: #00caa4;
        font-size: 0.366667rem;
        color: #ffffff;
        align-content: center;
        line-height: 1rem;
        border: none;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      width: 100%;

      .hea {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.566667rem;
        margin-bottom: 0.5rem;
        padding: 0 0.566667rem;
        .register,
        .forget {
          color: black;
          font-size: 0.266667rem;
        }
      }
      .titl {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        width: 100%;
        margin: 0;
        text-align: center;
        font-size: 0.266667rem;
        color: #c1cbd4;
        padding: 0 0.566667rem;
        margin-bottom: 0.5rem;
        span {
          height: 0.013333rem;
          width: 1.5rem;
          background-color: #c1cbd4;
        }
      }
      .cen {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.933333rem;
        margin-bottom: 0.5rem;
        a {
          width: 0.7rem;
          height: 0.7rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
