<template>
  <div class="hello">
    <div class="footer">
      <van-tabbar v-model="active" v-if="this.$route.meta.showTab">
        <van-tabbar-item name="home1" icon="home-o" to="/Homepage"
          >首页</van-tabbar-item
        >
        <van-tabbar-item name="search" icon="search" to="/Result"
          >成绩</van-tabbar-item
        >
        <van-tabbar-item name="setting" icon="setting-o" to="/Wrong"
          >错题</van-tabbar-item
        >
        <van-tabbar-item name="friends" icon="friends-o" to="/Personal"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
  props: {
    msg: String,
  },
};
</script>


<style scoped lang="scss">
</style>
