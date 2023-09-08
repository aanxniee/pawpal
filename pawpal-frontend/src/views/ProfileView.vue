<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div
        class="p-4 bg-stone-100 border border-gray-300 text-center rounded-2xl"
      >
        <img src="logo_pawpal.svg" class="mb-6 rounded-full" />

        <p>
          <strong>{{ user.name }}</strong>
        </p>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-4">
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

    <button
      class="inline-block py-4 px-3 bg-red-800 text-xs text-white rounded-2xl"
      @click="logout"
      v-if="userStore.user.id === user.id"
    >
      Log out
    </button>
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
      user: {
        id: "",
      },
    };
  },

  mounted() {
    this.getFeed();
  },

  methods: {
    getFeed() {
      axios
        .get(`/api/posts/profile/${this.$route.params.id}/`)
        .then((response) => {
          console.log("data", response.data);
          this.posts = response.data.posts;
          this.user = response.data.user;
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

    logout() {
      console.log("Log out");
      this.userStore.removeToken();
      this.$router.push("/login");
    },
  },
};
</script>
