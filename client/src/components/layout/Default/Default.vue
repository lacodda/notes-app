<template>
  <div class="layout-default">
    <header class="layout-default__header">
      <AppNavbar/>
    </header>
    <main class="layout-default__content">
      <slot/>
    </main>
    <footer class="layout-default__footer">
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
};
</script>

<style lang="scss" scoped>
</style>
