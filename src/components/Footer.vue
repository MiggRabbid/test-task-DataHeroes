<template>
  <footer class="footer">
    <div class="footer__title">
      <p>Created by MiggRabbid for DataHero</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #202329;
}

.footer__title {
  color: #f5f5f5;
}
</style>
