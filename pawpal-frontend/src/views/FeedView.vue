<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-stone-100 border border-gray-200 rounded-lg">
        <p>create a posting</p>
      </div>

      <div
        class="p-4 bg-stone-100 border border-gray-200 rounded-lg"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <strong>
          <p>{{ post.created_by.name }}</p>
        </strong>
        <p class="text-gray-600">{{ post.created_at_formatted }} ago</p>
        <p>{{ post.body }}</p>
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <RecommendedPeople />
      <Trends />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RecommendedPeople from "../components/RecommendedPeople.vue";
import Trends from "../components/Trends.vue";

export default {
  name: "FeedView",

  components: {
    RecommendedPeople,
    Trends,
  },

  data() {
    return {
      posts: [],
      body: "",
    };
  },

  mounted() {
    this.getFeed();
  },

  methods: {
    getFeed() {
      axios
        .get("/api/posts/")
        .then((response) => {
          console.log("data", response.data);
          this.posts = response.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
