Vue.component("pane", {
    name: "pane",
  template: `
    <div class="pane" >
    <template v-if="show">
        <slot></slot>
    </template>
    </div>
    `,
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: true,
    };
  },
  watch: {
    label() {
      this.updateNav();
    },
  },
  mounted() {
    this.updateNav();
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    },
  },
});
