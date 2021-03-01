<template>
  <div class="change">
    <div class="header">
      <img @click="Rt" src="@/assets/img/return.png" alt="" />
    </div>
    <div class="center">
      <div class="int">
        <div class="change">
          <div class="text"><p>修改密码</p></div>
        </div>
        <div class="box1">
          <p>您的账号</p>
          <input
            class="username"
            type="username"
            v-model="username"
            placeholder="请输入您的账号"
          />
          <p class="nameText1">{{ nameText1 }}</p>
        </div>
        <div class="box2">
          <p>旧密码</p>
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
        <div class="box3">
          <p>新密码</p>
          <input
            class="npassword"
            type="password"
            v-model="newPassword"
            placeholder="请输入您的新密码"
          />

          <p class="nameText3">{{ nameText3 }}</p>
        </div>
        <div class="box4">
          <p>确认密码</p>
          <input
            class="gpassword"
            type="password"
            v-model="gpassword"
            placeholder="再次输入您的新密码"
          />

          <p class="nameText4">{{ nameText4 }}</p>
        </div>
        <p class="judge">长度6-8位,字母+数字，含大小写字母</p>
      </div>

      <div class="bottom">
        <button class="but" @click="btn">提交</button>
        <!-- <div class="hea">
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
              ><img src="@/assets/img/wechat.jpg" alt=""
            /></a>
            <a a hfer="tencent://message/?uin=12345&Site=&Menu-=yes"
              ><img src="@/assets/img/qq.jpg" alt=""
            /></a>
            <a href=""><img src="@/assets/img/weibo.jpg" alt="" /></a>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change",
  data() {
    return {
      onClickRight: "",
      onClickLeft: "",
      username: "",
      password: "",
      newPassword: "",
      gpassword: "",
      nameText: "",
      nameText1: "",
      nameText2: "",
      nameText3: "",
      nameText4: "",
      usernameFlag: "",
      usernameFlag1: "",
      passwordFlag: "",
      passwordFlag1: "",
      npasswordFlag: "",
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

    Rt() {
      this.$router.push("/Personal");
    },
    btn() {
      let token = localStorage.getItem("token");
      if (this.username == "" && this.password == "") {
        this.$toast("账号密码错误");
        return;
      }
      if (this.password === this.newPassword) {
        this.$toast("新密码与旧密码相同");
        this.newPassword = "";
        return;
      }
      if (this.newPassword === "") {
        this.$toast("密码不能为空");
        return;
      }
      if (
        !(this.newPassword.length >= 6 || this.newPassword.length < 1) ||
        this.newPassword.length > 8
      ) {
        this.$toast("请输入6-8位密码");
        this.newPassword = "";
        return;
      }
      if (!(this.gpassword === this.newPassword)) {
        this.$toast("两次输入密码不一致");
        this.gpassword = "";
        return;
      }
      if (this.gpassword)
        this.$axios({
          method: "post",
          url: "/changepassword",
          data: {
            username: this.username,
            password: this.password,
            newPassword: this.newPassword,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          if (response.data.static === "200") {
            this.$toast(response.data.msg);
            localStorage.removeItem("token");
            location.reload();
            console.log(this.username, this.newPassword);
            this.$toast("密码修改成功");
          } else {
            this.$toast(response.data.msg);
            this.username = "";
            this.newPassword = "";
            this.password = "";
          }
        });
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
    newPassword: function () {
      if (!(this.password !== this.newPassword)) {
        this.nameText3 = "请勿输入相同密码";
      } else {
        this.nameText3 = "";
      }
    },
    gpassword: function () {
      if (this.gpassword !== this.newPassword) {
        this.nameText4 = "两次密码不一致";
      } else {
        this.nameText4 = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.router-link-active {
  text-decoration: none;
}
.a {
  text-decoration: none;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.3333rem;
  border-bottom: 1px solid #cccccc;
  img {
    width: 0.6667rem;
    height: 0.6667rem;
    margin-left: 0.4667rem;
  }
}
.center {
  // width: 7rem;
  margin: 0 auto;
  // border-radius: 0.266667rem;
  background-color: #ffffff;
  // margin-top: 1.6rem;
  overflow: hidden;
  // box-shadow: 0.023333rem 0.013333rem 0.093333rem #969799;
  .int {
    position: relative;
    width: 100%;
    padding-top: 0.866667rem;
    display: flex;
    flex-direction: column;
    //   align-items: center;
    .change {
      margin-top: -0.70667rem;
      margin-bottom: 0.133333rem;
      p {
        font-size: 0.8rem;
        font-weight: 500;
        padding-left: 0.4267rem;
        margin: 0.5333rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .box1 {
      position: relative;
      margin-bottom: 0.533333rem;
      border-bottom: 1px solid #c1cbd4;
      width: 90%;
      margin: 0.5667rem;

      p {
        font-size: 0.4533rem;
      }
      .nameText1 {
        position: absolute;
        top: 0.8rem;
        left: 4.88rem;
        font-size: 0.32rem;
        margin: 0.053333rem 0;
        padding-right: 1.3rem;
        color: red;
      }
    }
    .box2 {
      position: relative;
      margin-bottom: 0.533333rem;
      border-bottom: 1px solid #c1cbd4;
      width: 90%;
      margin: 0.5667rem;

      p {
        font-size: 0.4533rem;
      }
      .nameText2 {
        position: absolute;
        top: 0.8rem;
        left: 4.88rem;
        font-size: 0.32rem;
        margin: 0.053333rem 0;
        padding-right: 1.6rem;
        color: red;
      }
      .icon-click {
        position: absolute;
        right: 0.3rem;
        top: 0.6333rem;
        width: 0.6667rem;
        height: 0.6667rem;
      }
    }
    .box3 {
      position: relative;
      margin-bottom: 0.533333rem;
      border-bottom: 1px solid #c1cbd4;
      width: 90%;
      margin: 0.5667rem;
      p {
        font-size: 0.4533rem;
      }
      .nameText3 {
        position: absolute;
        top: 0.8rem;
        left: 4.88rem;
        font-size: 0.32rem;
        margin: 0.053333rem 0;
        padding-right: 1.5rem;
        color: red;
      }
      .icon-click {
        position: absolute;
        right: 0.3rem;
        top: 0.6333rem;
        width: 0.6667rem;
        height: 0.6667rem;
      }
    }
    .box4 {
      position: relative;
      margin-bottom: 0.533333rem;
      border-bottom: 1px solid #c1cbd4;
      width: 90%;
      margin: 0.5667rem;
      p {
        font-size: 0.4533rem;
      }
      .nameText4 {
        position: absolute;
        top: 0.8rem;
        left: 4.88rem;
        font-size: 0.32rem;
        margin: 0.053333rem 0;
        padding-right: 1.6rem;
        color: red;
      }
      .icon-click {
        position: absolute;
        right: 0.3rem;
        top: 0.6333rem;
        width: 0.6667rem;
        height: 0.6667rem;
      }
    }
    input::-webkit-input-placeholder {
      color: #dadada;
      font-size: 0.36rem;
    }
    input {
      box-sizing: border-box;
      height: 1rem;
      border: none;
      font-size: 0.428rem;
      color: #c1cbd4;
      outline: none;
    }

    .judge {
      margin-left: 0.5667rem;
      margin-bottom: 0.5333rem;
      font-size: 0.428rem;
      color: #c1cbd4;
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    outline: none;
    .but {
      display: flex;
      justify-content: center;
      border-radius: 0.166667rem;
      width: 9rem;
      height: 1.2rem;
      background-color: #00caa4;
      font-size: 0.366667rem;
      color: #ffffff;
      align-content: center;
      line-height: 1.2rem;
      border: none;
      margin-top: 0.06667rem;
    }
    .hea {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.66667rem;
      margin-bottom: 0.5rem;
      padding: 0 0.566667rem;

      .register,
      .forget {
        color: black;
        font-size: 0.266667rem;
      }
    }
    .button:focus {
      border: 0 none;
      outline: none;
    }

    // .back{

    // }
  }
}
</style>