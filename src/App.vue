<template>
  <div id="app" class="theme-bg-color">
    <div class="left-menu">
      <h-menu
        class="f-tl"
        ref="menu"
        id="menu"
        @on-select="selectMenu"
        :activeName="activeName"
      >
        <h-menu-item
          :name="item.url"
          v-for="(item, index) in menus"
          :key="index"
        >
          {{ item.name }}
        </h-menu-item>
        <h-menu-item name="mindmap"> mindmap </h-menu-item>
      </h-menu>
      <a @click="changeTheme">换肤</a>
    </div>
    <div class="content-wrapper f-tl theme-text-content">
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
      activeName: this.$route.name,
      theme: localStorage.theme ?? 'lightblue'
    };
  },
  methods: {
    selectMenu(url) {
      this.$router.push({
        name: url
      });
    },
    changeTheme() {
      localStorage.theme = { lightblue: 'black', black: 'lightblue' }[
        this.theme
      ];
      location.reload();
    }
  },
  mounted() {
    if (this.theme === 'lightblue') {
      document.body.classList.add('lightblue', 'classic-blue');
    } else {
      document.body.classList.add('black', 'night-black');
    }
  }
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

<style scoped>
.left-menu {
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#menu {
  flex: 1;
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
