<template>
  <div id="app">
    <h-menu
      ref="menu"
      id="menu"
      @on-select="selectMenu"
      :activeName="activeName"
    >
      <h-menu-item :name="item.url" v-for="(item, index) in menus" :key="index">
        {{ item.name }}
      </h-menu-item>
    </h-menu>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import docs from './docs/index.js';
export default {
  name: 'App',
  data() {
    return {
      menus: docs,
      activeName: this.$route.name
    };
  },
  methods: {
    selectMenu(url) {
      this.$router.push({
        name: url
      });
    }
  },
  mounted() {}
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>

<style  scoped>
#menu {
  height: 100%;
}
.content-wrapper {
  position: absolute;
  overflow: auto;
  left: 240px;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>