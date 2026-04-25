---
title: "Vue 3 Composition API: Basics and Patterns"
description: "A deep-dive tutorial covering the fundamentals and practical patterns of the Vue 3 Composition API. Covers reactive state, computed properties, watchers, lifecycle hooks, and reusable composables with real-world examples."
date: 2023-06-15
category: "Vue.js"
readingTime: "15 min"
featured: true
keywords: ["Vue 3", "Composition API", "composables", "reactive state", "computed properties"]
originalUrl: "https://medium.com/arcana-network-blog/vue-3-composition-api-basics-and-patterns-44813f2c785d"
---

> This article was originally published on [Medium](https://medium.com/arcana-network-blog/vue-3-composition-api-basics-and-patterns-44813f2c785d), where it ranks on the first page of Google for various Vue 3 Composition API searches.

## Introduction

The Composition API is Vue 3's answer to a fundamental problem: as components grow in complexity, the Options API's organization-by-option-type makes it increasingly difficult to reason about related logic scattered across `data`, `computed`, `methods`, and lifecycle hooks.

The Composition API lets you organize code by logical concern instead.

## Reactive State with `ref` and `reactive`

The two primitives for reactive state in the Composition API are `ref` and `reactive`.

```js
import { ref, reactive } from 'vue';

// ref: for primitive values
const count = ref(0);
console.log(count.value); // 0

// reactive: for objects
const state = reactive({
  name: 'Shrinath',
  role: 'Frontend Engineer'
});
console.log(state.name); // 'Shrinath'
```

Use `ref` for primitive values (strings, numbers, booleans) and `reactive` for objects. In templates, `ref` values are automatically unwrapped — you don't need `.value`.

## Computed Properties

Computed properties work the same as in the Options API, but declared as functions:

```js
import { ref, computed } from 'vue';

const firstName = ref('Shrinath');
const lastName = ref('Prabhu');

const fullName = computed(() => `${firstName.value} ${lastName.value}`);
```

## Watchers

`watch` and `watchEffect` let you run side effects when reactive values change:

```js
import { ref, watch, watchEffect } from 'vue';

const query = ref('');

// Explicit: watch a specific source
watch(query, (newVal, oldVal) => {
  console.log(`Query changed from ${oldVal} to ${newVal}`);
});

// Automatic: tracks all reactive dependencies used inside
watchEffect(() => {
  console.log(`Current query: ${query.value}`);
});
```

## Composables: Reusable Logic

The real power of the Composition API is composables — functions that encapsulate and reuse stateful logic:

```js
// useCounter.js
import { ref } from 'vue';

export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initial;

  return { count, increment, decrement, reset };
}
```

```vue
<script setup>
import { useCounter } from './useCounter';

const { count, increment, decrement, reset } = useCounter(10);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

## Lifecycle Hooks

Lifecycle hooks in the Composition API are prefixed with `on`:

```js
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Component mounted');
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
```

## Conclusion

The Composition API isn't a replacement for the Options API — it's an alternative that scales better for complex components. Start with `ref`, `computed`, and composables. You'll find that organizing code by concern instead of by option type makes your components significantly easier to maintain.
