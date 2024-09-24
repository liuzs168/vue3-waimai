<template>
<div v-for="(item,index) in navList" :key="index">
    <NavListItem :itemContent="item" />
</div>
</template>
<script setup>
import NavListItem from './NavListItem.vue';

const props = defineProps(['navList'])
</script>