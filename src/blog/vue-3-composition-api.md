---
title: "Vue 3 Composition API: Basics and Patterns"
description: "A practical guide to the Vue 3 Composition API covering reactive state, composables, script setup, TypeScript integration, and patterns from building production apps with Vue for 6+ years."
date: 2023-06-15
dateModified: 2026-04-23
category: "Vue.js"
featured: true
keywords:
  [
    "Vue 3",
    "Composition API",
    "composables",
    "script setup",
    "TypeScript",
    "reactive",
    "ref",
    "Vue patterns",
    "Vue best practices",
  ]
postTags: ["vue", "typescript", "frontend"]
originalUrl: "https://medium.com/arcana-network-blog/vue-3-composition-api-basics-and-patterns-44813f2c785d"
image: "/images/vue-3-composition-api.jpg"
---

> Originally published on the [Arcana Network Blog](https://medium.com/arcana-network-blog/vue-3-composition-api-basics-and-patterns-44813f2c785d) in April 2022. Updated in April 2026 with modern patterns, `<script setup>` as the default syntax, and insights from 5 years of production Vue development.

The Composition API is how you write Vue in 2026. It is not an alternative to learn alongside another approach, it is the standard. Every major Vue ecosystem tool (Nuxt 3, VueUse, Pinia, Vuetify 3) is built on it, and every new Vue project should use it by default.

I have been using Vue professionally for over 5 years, building a [Chrome Extension wallet](https://shrinath.me/work/#wallet), a [developer dashboard](https://shrinath.me/work/#dashboard), a [cross-chain transfer app](https://shrinath.me/work/#sendit), and several other production applications. The Composition API fundamentally changed how I organize frontend code, and this guide covers the patterns I actually use every day.

## Why the Composition API works

The core idea is simple: **group code by what it does, not where Vue's structure says it should go.**

In a complex component say, an authentication configuration panel where a developer selects social login providers, sets redirect URLs, and previews the login flow, the logic for each of these features naturally involves some reactive state, a few methods, maybe a watcher, and a lifecycle hook. The Composition API lets you keep all of that together as a single logical block, or extract it into a reusable function called a composable.

The practical benefits after years of using it in production:

- **Readable components:** When you revisit a 300-line component after 6 months, you can immediately find the search logic, the pagination logic, and the filter logic because each is a self-contained block, not scattered across different sections of the file.
- **Reusable logic:** Composables let you extract and share stateful logic across components without the problems that mixins had (name conflicts, unclear data origins, no parameterization).
- **TypeScript integration:** Vue 3 is written in TypeScript, and the Composition API was designed for full type inference. Your editor knows the types of your refs, computed properties, and composable return values without manual annotation.
- **Smaller bundles:** Better tree-shaking support means unused APIs are not included in your production build.

## The standard syntax: `<script setup>`

The `<script setup>` attribute is the recommended way to write Composition API components. It eliminates boilerplate, no `setup()` function, no `return` statement, no `export default`. Everything declared at the top level is automatically available in the template.

**CounterExample.vue**

```vue
<script setup>
import { ref, onMounted } from "vue";

// Reactive state
const count = ref(0);

// Methods
const increment = () => {
  count.value++;
};

// Lifecycle hooks
onMounted(() => {
  console.log("Component is ready!");
});
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Clean and minimal. The template has access to `count` and `increment` without you explicitly returning them. This is how you can write a new component.

## Composables: reusable stateful logic

Composables are functions that encapsulate reactive state and logic. They are the replacement for mixins, and they solve every problem mixins had. By convention, composable names start with `use`.

Here is a basic example of a reusable counter:

**useCounter.js**

```ts
import { ref, computed } from "vue";

export function useCounter(initialValue = 0) {
  // Types are automatically inferred
  const count = ref(initialValue);
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = initialValue;
  }

  return { count, doubleCount, increment, decrement, reset };
}
```

Using it in a component:

**CounterExample.vue**

```vue
<script setup>
import { useCounter } from "./useCounter";

const { count, doubleCount, increment } = useCounter(10);
</script>

<template>
  <p>Value: {{ count }} (Double: {{ doubleCount }})</p>
  <button @click="increment">+1</button>
</template>
```

This pattern solves three real problems:

**No name conflicts:** Since you destructure what you need from the composable, there is no ambiguity about where a variable comes from. You can even use the same composable multiple times:

**MultipleCounterExample.vue**

```vue
<script setup>
import { useCounter } from "./useCounter";

const { count: likes, increment: addLike } = useCounter(0);
const { count: views, increment: addView } = useCounter(0);
</script>
```

Each instance maintains its own independent state. Something which mixins could not achieve.

**Clear data origins:** When a component uses three composables, every variable is explicitly imported and destructured. Six months later, you know exactly where `isLoading` comes from, it is not magically merged from some mixin buried in a different folder.

**Parameterization:** Composables accept arguments. You can pass initial values, configuration objects, API endpoints, or callback functions. Mixins could not do this, they were rigid, static blocks of logic.

## What the Composition API exposes

The API surface is small and focused. Here is what you will use daily:

### Reactivity

**`ref()`** creates a reactive reference for any value. Access and mutate via `.value` in JavaScript; the template unwraps it automatically.

**UserProfile.vue**

```ts
const name = ref("Shrinath");
console.log(name.value); // 'Shrinath'
name.value = "Updated";
```

**`reactive()`** creates a reactive object without the `.value` wrapper. Useful for complex state objects, but I recommend sticking to `ref()` for consistency. After 5+ years of using Vue, I use `ref()` for everything including objects. The mental model of "always use `.value`" is simpler than remembering which variables need it and which do not.

**UserProfile.vue**

```ts
// I prefer this:
const user = ref({ name: "Shrinath", role: "engineer" });
user.value.name = "Updated";

// Over this:
const user = reactive({ name: "Shrinath", role: "engineer" });
user.name = "Updated";
```

**`computed()`** derives reactive state that updates automatically when its dependencies change. Computed values are cached, they only get recalculated when dependencies change.

**FullName.vue**

```ts
const firstName = ref("Shrinath");
const lastName = ref("Prabhu");
const fullName = computed(() => `${firstName.value} ${lastName.value}`);
```

### Watchers

**`watch()`** runs a callback when specific reactive sources change. Use it for side effects like API calls, localStorage updates, or analytics tracking.

**SearchInput.vue**

```ts
const searchQuery = ref("");

watch(searchQuery, async (newQuery, oldQuery) => {
  if (newQuery.length > 2) {
    const results = await fetchResults(newQuery);
    searchResults.value = results;
  }
});
```

**`watchEffect()`** automatically tracks every reactive dependency used inside its body. It runs immediately on setup and re-runs whenever any dependency changes. More concise than `watch()` when you do not need the old value.

**SearchInput.vue**

```ts
watchEffect(() => {
  console.log(`Search query is: ${searchQuery.value}`);
  // Automatically re-runs when searchQuery changes
});
```

One gotcha from production experience: be careful with `watchEffect()` and reactive dependencies that you also modify inside the callback. If the watcher reads and writes the same ref, you get an infinite loop. Use `watch()` with explicit sources when the callback needs to mutate watched state.

### Lifecycle hooks

The Composition API lifecycle hooks mirror the component lifecycle but are called inside `<script setup>`:

**AppLifecycle.vue**

```ts
import { onMounted, onUnmounted, onUpdated } from "vue";

onMounted(() => {
  // DOM is ready, fetch data, set up event listeners
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  // Clean up event listeners, cancel timers, close connections
  window.removeEventListener("resize", handleResize);
});
```

### Dependency injection

**`provide()`** and **`inject()`** enable deep component tree communication without prop drilling. This is how you pass theme configuration, authentication state, or API clients through your component tree.

```ts
// Parent component
import { provide, ref } from "vue";

const theme = ref<"light" | "dark">("dark");
provide("theme", theme);

// Any descendant component, no matter how deep
import { inject } from "vue";

const theme = inject("theme");
```

This is cleaner than passing props through 5 levels of intermediate components that do not use the data themselves. However in my experience I haven't had many cases where I had to use these DI patterns.

## TypeScript integration

Vue 3 was built with TypeScript, and the Composition API makes type safety straightforward. Props and emits use type-only declarations:

```vue
<script setup lang="ts">
interface Props {
  title: string;
  isActive?: boolean;
  tags?: string[];
}

// Props are fully typed — your editor autocompletes prop names
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  tags: () => [],
});

// Emits are typed — calling emit('update') without the id argument is a compile error
const emit = defineEmits<{
  update: [id: number];
  delete: [id: number, reason: string];
}>();
</script>
```

`withDefaults()` provides default values for optional props while preserving type inference. The `defineEmits` syntax with tuple types (introduced in Vue 3.3) is cleaner than the older function signature style.

Refs are automatically typed from their initial value, but you can explicitly type them when needed:

```ts
const count = ref(0); // type: Ref<number>
const user = ref<User | null>(null); // explicit type for nullable refs

const items = ref<string[]>([]); // typed array
```

## Composable patterns from production

Beyond the basic counter example, here are patterns I use in real applications.

### Async data fetching

```ts
import { ref, watchEffect } from "vue";

export function useFetch<T>(url: () => string) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  watchEffect(async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(url());
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
```

Usage:

```vue
<script setup>
import { useFetch } from "./useFetch";

const { data: users, loading, error } = useFetch(() => "/api/users");
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

### Debounced search

```ts
import { ref, watch } from "vue";

export function useDebouncedRef<T>(initialValue: T, delay = 300) {
  const value = ref(initialValue) as Ref<T>;
  const debouncedValue = ref(initialValue) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newVal) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newVal;
    }, delay);
  });

  return { value, debouncedValue };
}
```

### Local storage persistence

```ts
import { ref, watch } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key);
  const value = ref<T>(stored ? JSON.parse(stored) : defaultValue);

  watch(
    value,
    (newVal) => {
      localStorage.setItem(key, JSON.stringify(newVal));
    },
    { deep: true },
  );

  return value;
}
```

Usage:

```vue
<script setup>
const theme = useLocalStorage("theme", "light");
// Automatically persists to localStorage on every change
</script>
```

## Quick reference

| API                    | When to use                                     |
| ---------------------- | ----------------------------------------------- |
| `ref()`                | Any reactive value, primitives and objects      |
| `reactive()`           | Use instead of ref() for objects only           |
| `computed()`           | Derived state that should cache and auto-update |
| `watch()`              | Side effects when you need old + new values     |
| `watchEffect()`        | Side effects that autotrack dependencies        |
| `onMounted()`          | DOM access, data fetching, event listeners      |
| `onUnmounted()`        | Cleanup, remove listeners, cancel timers        |
| `provide() / inject()` | Deep component tree data passing                |

## Summary

The Composition API is about organizing code by logical concern rather than by framework convention. Start with `<script setup>` for every new component. Extract repeated patterns into composables. Use `ref()` for everything (yes, even objects). Type your props and emits. And when a component starts feeling too long, that is your signal to extract a composable, not to add more sections to a growing file.

For detailed case studies of applications I have built with Vue 3, including a [Chrome Extension wallet supporting 13 blockchains](https://shrinath.me/work/#wallet) and a [SendIt](https://shrinath.me/work/#sendit), visit [shrinath.me/work](https://shrinath.me/work/).

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. I build products from zero to launch with Vue, React, and TypeScript. Currently leading frontend architecture at [Avail Project](https://availproject.org)._
