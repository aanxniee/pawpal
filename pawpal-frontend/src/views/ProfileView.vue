<template>
  <div class="grid grid-cols-4 gap-4">
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
      <div
        class="bg-stone-100 border border-gray-300 rounded-2xl"
        v-if="userStore.user.id === user.id"
      >
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
import CreatePost from "../components/CreatePost.vue";
import PostItem from "../components/PostItem.vue";
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
    CreatePost,
    PostItem,
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

  watch: {
    "$route.params.id": {
      handler: function () {
        this.getFeed();
      },
      deep: true,
      immediate: true,
    },
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

    logout() {
      console.log("Log out");
      this.userStore.removeToken();
      this.$router.push("/login");
    },
  },
};
</script>
