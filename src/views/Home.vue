<template>
  <div class="home">
    <div class="background">
      <h1>在线考试系统</h1>
      <div class="center">
        <div class="int">
          <div class="box1">
            <img src="@/assets/user.png" alt="" />
            <input
              class="username"
              v-model="username"
              type="text"
              placeholder="请输入您的账号"
            />
            <p class="nameText">{{ nameText1 }}</p>
          </div>
          <div class="box2">
            <img src="@/assets/password.png" alt="" />
            <input
              class="password"
              :type="ispassword"
              v-model="password"
              placeholder="请输入您的密码"
            />
            <p class="icon-click" @click="showpwd">
              <img src="@/assets/icon1.png" alt="" v-if="isnewPwd" />
              <img src="@/assets/icon2.png" alt="" v-else />
            </p>
            <p class="nameText2">{{ nameText2 }}</p>
          </div>
          <button class="but" @click="btn">登录</button>
        </div>

        <div class="bottom">
          <div class="hea">
            <router-link class="register" :to="{ name: 'register' }"
              >注册账号</router-link
            >
            <router-link class="forget" :to="{ name: 'home' }"
              >忘记密码？</router-link
            >
          </div>
          <p class="titl"><span></span>社交软件登录<span></span></p>
          <div class="cen">
            <a href="weixin://" onclick="PIWI_SUBMIT.Weixin_Open()"
              ><img src="@/assets/wechat.jpg" alt=""
            /></a>
            <a a hfer=""><img src="@/assets/qq.jpg" alt="" /></a>
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
      username: "",
      password: "",
      nameText: "",
      nameText1: "",
      nameText2: "",
      usernameFlag: "",
      usernameFlag1: "",
      passwordFlag: "",
      passwordFlag1: "",
      ispassword: "password",
      isnewPwd: false,
    };
  },
  components: {},
  methods: {
    showpwd() {
      if (this.isnewPwd) {
        this.ispassword = "text";
        this.isnewPwd = false;
      } else {
        this.ispassword = "password";
        this.isnewPwd = true;
      }
    },
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
      } else {
        this.$axios({
          method: "post",
          url: "/login",
          data: {
            //获取用户输入的用户名跟密码
            username: this.username,
            password: this.password,
          },
        }).then((response) => {
          if (response.data.static === "200") {
            //本地存储
            localStorage.setItem("token", response.data.token);
            this.$store.state.token = response.data.token;
            //本地存储个人用户数据
            localStorage.setItem("admin", JSON.stringify(response.data.data));
            this.$store.state.admin = response.data.data;
            //路由跳转
            this.$toast("登录成功");
            this.$router.push("/Homepage");
          } else {
            //提示信息
            this.$toast(response.data.msg);
            //用户名或密码错误，清空数据
            this.username = "";
            this.password = "";
          }
        });
      }
    },
  },
  watch: {
    username: function (newValue) {
      var va = newValue.length;
      if (!(va >= 6 && va <= 8)) {
        this.nameText1 = "请输入6-8位用户名";
        this.usernameFlag1 = false;
      } else {
        this.nameText1 = "";
        this.usernameFlag1 = true;
      }
    },
    password: function (num1) {
      var vb = num1.length;
      if (!(vb >= 6 && vb <= 8)) {
        this.nameText2 = "请输入6-8位密码";
        this.passwordFlag1 = false;
      } else {
        this.nameText2 = "";
        this.passwordFlag1 = true;
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
    opacity: 0.9;
    margin-top: 1.6rem;
    overflow: hidden;
    box-shadow: 0.023333rem 0.013333rem 0.093333rem #969799;
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
        .icon-click {
          position: absolute;
          right: 0.3rem;
          top: -0.00000000009rem;
          width: 0.6667rem;
          height: 0.6667rem;
        }
        .nameText2 {
          position: absolute;
          top: 1rem;
          left: 0.88rem;
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
      input::-webkit-input-placeholder {
        color: #dadada;
        font-size: 0.36rem;
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
        outline: none;
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
        margin-top: 0.566667rem;
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
