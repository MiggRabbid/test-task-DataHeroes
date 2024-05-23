<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img src="../assets/logo-h60px.png" alt="Логотип" class="logo__img" />
      </div>

      <div class="header__title">
        <img src="../assets//header-bg.png" alt="Rick And Morty" class="title__img" />
        <h1 class="title__text">Character Navigator</h1>
      </div>
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
  position: relative;
  background-color: #f5f5f5;
}

.header__container {
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}

.header__logo {
  position: absolute;
  top: 5px;
  left: 20px;
  height: fit-content;
  width: fit-content;
  z-index: 30;
}

.logo__img {
  margin-left: 20px;
  height: 40px;
}

.header__title {
  height: 250px;
  max-width: 1680px;
  margin: auto;
  padding: 0 50px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.title__text {
  height: full;
  margin: auto 0;
  width: 60vw;
  min-width: 7em;
  text-align: right;
  text-transform: uppercase;
  font-size: 80px;
  font-weight: 900;
  line-height: 1;
  z-index: 20;
}

.title__img {
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 600px;
  z-index: 0;
}

@media (max-width: 1024px) {
  .header__title {
    padding: 0 40px;
  }

  .title__img {
    left: -70px;
  }

  .title__text {
    font-size: 70px;
  }
}

@media (max-width: 769px) {
  .header__title {
    padding: 0 20px;
  }

  .title__img {
    left: -90px;
  }
}

@media (max-width: 650px) {
  .header__logo {
    left: auto;
    right: 20px;
  }

  .title__text {
    margin: auto 0 0 auto;
    padding-bottom: 10px;
    font-size: 40px;
  }

  .title__img {
    left: 0;
    width: 300px;
    height: 250px;
    object-fit: cover;
    object-position: center;
  }
}
</style>
