<template>
  <div id="app">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {},
  created: function () {
    let routePath = this.$route.path;
    let token = localStorage.getItem("token");
    this.$axios({
      method: "get",
      url: "/getVerify",
      data: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      if (response.data.static === "200") {
        // this.$store.state.token = localStorage.getItem("token");
        this.$store.state.token = token;
        this.$store.state.admin = JSON.parse(localStorage.getItem("admin"));
        routePath !== "/Homepage" ? this.$router.push("/Homepage") : "";
      } else {
        routePath !== "/" ? this.$router.push("/") : "";
      }
    });
  },
  components: {
    Footer,
  },
};
</script>

<style>
</style>
