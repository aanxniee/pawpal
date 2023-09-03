<template>
  <div class="w-1/2 mx-auto">
    <div
      class="p-7 bg-stone-100 border border-gray-300 rounded-3xl flex flex-col justify-center items-center"
    >
      <img
        src="/logo2_pawpal.svg"
        class="object-scale-down justify-center h-32 w-32"
      />

      <h1 class="mb-6 text-center text-2xl">Sign up</h1>
      <p class="font-bold">
        Already have an account?<span class="text-blue-900 underline">
          <RouterLink to="/login"> Log in</RouterLink></span
        >
      </p>

      <form class="py-5 w-4/5 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full name"
            class="w-full bg-stone-100 mt-2 py-4 px-6 border border-gray-300 rounded-2xl"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            class="w-full bg-stone-100 mt-2 py-4 px-6 border border-gray-300 rounded-2xl"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            class="w-full bg-stone-100 mt-2 py-4 px-6 border border-gray-300 rounded-2xl"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm password"
            class="w-full bg-stone-100 mt-2 py-4 px-6 border border-gray-300 rounded-2xl"
          />
        </div>

        <template>
          <div class="bg-red-300 text-white rounded-2xl p-6">
            <p></p>
          </div>
        </template>

        <div>
          <button
            class="my-3 py-4 w-full px-6 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToastStore } from "@/stores/toast";

export default {
  setup() {
    const toastStore = userToastStore();
    return {
      toastStore,
    };
  },

  data() {
    return {
      form: {
        email: "",
        name: "",
        password1: "",
        password2: "",
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

      if (this.form.name === "") {
        this.errors.push("Invalid name!");
      }

      if (this.form.password1 === "") {
        this.errors.push("Invalid password!");
      }

      if (this.form.password1 !== this.form.password2) {
        this.errors.push("Passwords do not match!");
      }

      if (this.errors.length === 0) {
        axios
          .post("/api/signup/", this.form)
          .then((response) => {
            if (response.data.message === "success") {
              this.toastStore.showToast(
                5000,
                "You have been successfully registered. Please check your email for activation.",
                "bg-emerald-500"
              );

              this.form.email = "";
              this.form.name = "";
              this.form.password1 = "";
              this.form.password2 = "";
            } else {
              const data = JSON.parse(response.data.message);
              for (const key in data) {
                this.errors.push(data[key][0].message);
              }

              this.toastStore.showToast(
                5000,
                "Something went wrong. Please try again",
                "bg-red-300"
              );
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
};
</script>
