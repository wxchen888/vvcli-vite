<script setup lang="ts">
defineProps<{ msg: string }>();

const { x, y } = useMouse();
const { count, inc, dec } = useCounter();
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <h3>Mouse: {{ x }} x {{ y }}</h3>
    <h3>
      Counter: {{ count }}
      <a @click="inc()" style="margin-right: 10px; cursor: pointer">+</a>
      <a @click="dec()" style="cursor: pointer">-</a>
    </h3>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
