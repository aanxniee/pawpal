<template>
  <div class="p-4 flex flex-col">
    <p>
      <strong>
        <RouterLink
          :to="{ name: 'profile', params: { id: post.created_by.id } }"
          >{{ post.created_by.name }}</RouterLink
        >
      </strong>
    </p>
    <p class="text-gray-600">{{ post.created_at_formatted }} ago</p>
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useToastStore } from "@/stores/toast";

export default {
  props: {
    post: Object,
  },

  setup() {
    const userStore = useUserStore();
    const toastStore = useToastStore();

    return {
      userStore,
      toastStore,
    };
  },

  components: { RouterLink },
};
</script>
