<template>
  <div class="max-w-2xl mx-auto">
    <div
      class="p-7 bg-stone-100 border border-gray-300 rounded-3xl flex flex-col justify-center items-center"
    >
      <img
        src="/logo2_pawpal.svg"
        class="object-scale-down justify-center h-32 w-32"
      />

      <h1 class="mb-6 text-center text-2xl">Sign up</h1>
      <p class="font-bold">Already have an account? Login</p>

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
            class="my-3 py-4 w-full px-6 bg-blue-900 text-white rounded-2xl"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
