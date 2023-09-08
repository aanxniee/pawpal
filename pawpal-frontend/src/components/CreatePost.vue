<template>
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
      <button class="inline-block py-4 px-6 bg-blue-800 text-white rounded-2xl">
        Post
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  props: {
    user: Object,
    posts: Array,
  },

  data() {
    return {
      posts: [],
      body: "",
    };
  },

  methods: {
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
