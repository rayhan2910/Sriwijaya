<!-- eslint-disable vue/multi-word-component-names -->
  <template>
    <button @click="onClick" :class="btnClass">
      <slot></slot>
    </button>
  </template>


   

  <script>
  export default {
    props: {
      label: String,
      btnClass: String
    },
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  };
  </script>
  
  <style scoped>
 button {
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
}

button:disabled {
  background-color: #dddddd;
  color: #666666;
  cursor: not-allowed;
}
  </style>
  