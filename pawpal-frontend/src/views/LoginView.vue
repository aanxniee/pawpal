<template>
  <div class="w-1/2 mx-auto">
    <div
      class="p-7 bg-stone-100 border border-gray-300 rounded-3xl flex flex-col justify-center items-center"
    >
      <img
        src="/logo2_pawpal.svg"
        class="object-scale-down justify-center h-32 w-32"
      />

      <h1 class="mb-6 text-center text-2xl">Log in</h1>
      <p class="font-bold">
        Don't have an account?
        <span class="text-blue-900 underline">
          <RouterLink to="/signup"> Sign up</RouterLink>
        </span>
      </p>

      <form class="py-5 w-4/5 space-y-4" v-on:submit.prevent="submitForm">
        <div>
          <input
            type="email"
            v-model="form.email"
            placeholder="Email address"
            class="w-full bg-stone-100 mt-2 py-4 px-6 border border-gray-300 rounded-2xl"
          />
        </div>

        <div>
          <input
            type="password"
            v-model="form.password"
            placeholder="Password"
            class="w-full bg-stone-100 mt-2 py-4 px-6 border border-gray-300 rounded-2xl"
          />
        </div>

        <template v-if="errors.length > 0">
          <div class="text-red-800">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </template>

        <div>
          <button
            class="my-3 py-4 w-full px-6 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useToastStore } from "@/stores/toast";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },

  methods: {
    submitForm() {
      this.errors = [];

      if (this.form.email === "") {
        this.errors.push("Invalid email!");
      }

      if (this.form.password === "") {
        this.errors.push("Invalid password!");
      }

      if (this.errors.length === 0) {
        axios
          .post("/api/login/", this.form)
          .then((response) => {
            this.store.setToken(response.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
};
</script>
