<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-stone-100 border border-gray-300 rounded-2xl">
        <CreatePost v-bind:user="null" v-bind:posts="posts" />
      </div>
      <div
        class="p-4 bg-stone-100 border border-gray-300 rounded-2xl"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <PostItem v-bind:post="post" />
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
import PostItem from "../components/PostItem.vue";
import CreatePost from "../components/CreatePost.vue";

export default {
  name: "FeedView",

  components: {
    RecommendedPeople,
    Trends,
    PostItem,
    CreatePost,
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
