<template>
  <header class="header">
    <div class="header__logo">
      <img src="../assets/logo-h60px.png" alt="Логотип" class="logo__img" />
    </div>
  </header>
</template>

<script>
import logo from '../assets/logo-h60px.png';

export default {
  name: 'AppHeader',
  data() {
    return {
      svgContent: logo.outerHTML,
    };
  },
};
</script>

<style scoped>
.header {
  margin: 5px 0;
}

.header__logo {
  height: 40px;
}

.logo__img {
  margin-left: 20px;
  height: 40px;
}
</style>
