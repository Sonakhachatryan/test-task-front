<template>
  <div id="app">
    <component v-if="layout" :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

import layouts from "@/layouts";

export default {

  data: () => ({
    layout: null,
    defaultLayout: 'main'
  }),

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }
      this.layout = layouts[layout]
    }
  },

}
</script>
