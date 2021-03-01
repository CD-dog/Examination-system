<template>
  <div class="home">
    <div class="message" @click="centre">
      <div class="title">个人中心</div>

      <div class="box">
        <div class="person">
          <img src="@/assets/img/toux.jpeg" alt="" />
        </div>
        <div class="text">
          <div class="num">
            <!-- <p>用户名:{{ admin.username }}</p> -->
            <p>{{ admin.username }}</p>
          </div>
          <!-- <div class="name">
          <p>姓名:{{ admin.realName }}</p>
        </div> -->
          <div class="name">
            <p>学号:{{ admin.id_card }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="list_box">
      <div class="list_one1" @click="btn">
        <div class="list_left">
          <img src="@/assets/img/Cpassword.jpg" @click="btn" alt="" />
        </div>
        <div class="list_text">
          <p>修改密码</p>
        </div>
        <div class="list_right">
          <img src="@/assets/img/back.jpg" alt="" />
        </div>
      </div>
      <div class="list_one2">
        <div class="list_left">
          <img src="@/assets/img/service.jpg" alt="" />
        </div>
        <div class="list_text">
          <p>联系客服</p>
        </div>
        <div class="list_right">
          <img src="@/assets/img/back.jpg" alt="" />
        </div>
      </div>
      <div class="list_one3">
        <div class="list_left">
          <img src="@/assets/img/About us.jpg" alt="" />
        </div>
        <div class="list_text">
          <p>关于我们</p>
        </div>
        <div class="list_right">
          <img src="@/assets/img/back.jpg" alt="" />
        </div>
      </div>
      <div class="list_one4" @click="btn4">
        <div class="list_left">
          <img src="@/assets/img/Exit.jpg" alt="" />
        </div>
        <div class="list_text">
          <p>退出登录</p>
        </div>
        <div class="list_right">
          <img src="@/assets/img/back.jpg" alt="" />
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { Dialog } from "vant";
import Footer from "@/components/Footer.vue";
export default {
  name: "Home",
  data() {
    return {
      active: "home",
      admin: "",
    };
  },
  methods: {
    centre() {
      this.$router.replace("/centre");
    },
    btn() {
      this.$router.replace("/change");
    },
    btn4() {
      // let ren = confirm("您确定要退出吗");
      // if (ren == true) {
      //   //删除tokeng
      //   localStorage.removeItem("token");
      //   //页面刷新
      //   location.reload();
      // } else {
      //   return;
      // }
      Dialog.confirm({
        title: "",
        message: "您确定要退出吗",
      })
        .then(() => {
          //删除tokeng
          localStorage.removeItem("token");
          //页面刷新
          location.reload();
        })
        .catch(() => {
          return;
        });
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
  created: function () {
    this.token = localStorage.getItem("token");
    this.admin = JSON.parse(localStorage.getItem("admin"));
    /* this.getMajorFun(); */
  },
};
</script>

<style scoped lang="scss">
/deep/ .van-nav-bar__left {
  display: none;
}
// /deep/ .van-nav-bar{
//   background-color: #00CAA4;
// }
.home {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}

.message {
  display: flex;
  margin: 0 auto;
  // margin: 0 0.366667rem 0 0.366667rem;
  flex-direction: column;
  height: 6.7rem;
  padding: 0.2667rem 0.4rem;
  // background-color: white;
  overflow: hidden;
  box-shadow: 5px 0.0533rem 0.0867rem #ccc;
  background: url("../assets/img/yun.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  // background-color: #142678;
  .title {
    width: 100%;
    text-align: center;
  }
}
.box {
  display: flex;
  margin: 0 auto;
  // margin: 0 0.366667rem 0 0.366667rem;
  align-items: center;
  height: 6.7rem;
  padding: 0.2667rem 0.4rem;
  // background-color: white;
  overflow: hidden;
  box-sizing: border-box;
  // background-color: #142678;
}
.person {
  width: 2.6667rem;
  height: 2.6667rem;
  margin-left: 1.125rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.text {
  width: 50%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .num {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 0.5667rem;
    // color:white;
    margin-bottom: 0.3333rem;
    font-weight: 600;
    width: 100%;
    margin-left: 1.95rem;
  }
  .name {
    font-size: 0.3533rem;
    margin-bottom: 0.3333rem;
    // color: white;
  }
}

.list_box {
  margin-top: -1.0375rem;
}
[class^="list_one"] {
  display: flex;
  margin: 0.366667rem;
  margin-top: 0.6667rem;
  height: 1.6667rem;
  background-color: white;
  border-radius: 1.433333rem;
  /* border: 0.0267rem solid #ebedf0; */
  align-items: center;
  box-shadow: 2px 0.0353rem 0.0967rem #ccc;
}
.list_left {
  display: flex;
  justify-content: center;
  width: 20%;
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.65rem;
    height: 0.65rem;
  }
}
.list_text {
  display: flex;
  justify-content: start;
  align-items: flex-start;
  width: 60%;
  p {
    font-size: 0.3533rem;
  }
}
.list_right {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 20%;
  img {
    width: 0.65rem;
    height: 0.65rem;
  }
}
</style>