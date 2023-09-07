<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <form
        v-on:submit.prevent="submitForm"
        method="post"
        class="border border-gray-300 p-6 rounded-3xl"
      >
        <textarea
          v-model="body"
          class="p-4 w-full bg-stone-100 rounded-2xl border border-gray-300"
          placeholder="What's happening?"
        ></textarea>

        <div class="py-2 border-t border-gray-100 flex justify-between">
          <button
            class="inline-block py-4 px-6 bg-blue-800 text-white rounded-2xl"
          >
            Post
          </button>
        </div>
      </form>

      <div
        class="p-4 bg-stone-100 border border-gray-300 rounded-2xl"
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
import { useUserStore } from "@/stores/user";
import { useToastStore } from "@/stores/toast";

export default {
  name: "FeedView",

  setup() {
    const userStore = useUserStore();
    const toastStore = useToastStore();

    return {
      userStore,
      toastStore,
    };
  },

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

    submitForm() {
      console.log("submitForm", this.body);

      let formData = new FormData();
      formData.append("body", this.body);

      axios
        .post("/api/posts/create/", formData, {
          body: this.body,
        })
        .then((response) => {
          console.log("data", response.data);

          this.posts.unshift(response.data);
          this.body = "";
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
