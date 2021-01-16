<template>
    <div>
      <!-- Main Navbar -->
      <navbar />

      <!-- Content -->
      <slot />
    </div>
</template>

<script>

    // Main layout components
    import Navbar from '@/components/Navbar.vue';

    export default {
        name: 'Main',

        components: {
          Navbar,
        },
    };
</script>

