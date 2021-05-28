<template>
  <div ref="editorRef"></div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editorRef: null,
      editor: null,
    };
  },
  props: {
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear();
      }
    },
  },
  methods: {
    clear() {
      this.editor.txt.html("");
    },
  },
  emits: ["change"],
  mounted() {
    this.editor = new E(this.$refs.editorRef);
    this.editor.config.menus = [
      "bold",
      "head",
      "link",
      "italic",
      "underline",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
    ];
    this.editor.create();
    this.editor.config.onchange = (html) => {
      this.content = html;
      this.$emit("change", html);
    };
  },
};
</script>