<template>
    <div class="auth-wrapper">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'Auth',
    }
</script>
<style scoped>
.auth-wrapper{
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
