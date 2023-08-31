<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-stone-100 border border-gray-200 rounded-lg">
        <p>create a posting</p>
      </div>

      <div class="p-4 bg-stone-100 border border-gray-200 rounded-lg">
        <p>a post</p>
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <RecommendedPeople />
      <Trends />
    </div>
  </div>
</template>

<script>
import RecommendedPeople from "../components/RecommendedPeople.vue";
import Trends from "../components/Trends.vue";

export default {
  name: "FeedView",

  components: {
    RecommendedPeople,
    Trends,
  },
};
</script>
