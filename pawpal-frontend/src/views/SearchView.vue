<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-3 space-y-4">
      <div class="bg-stone-100 border border-gray-300 rounded-3xl">
        <form class="p-4 flex space-x-4">
          <input
            type="search"
            class="p-4 w-full border border-gray-300 bg-stone-100 rounded-2xl"
            placeholder="Search..."
          />

          <button
            class="inline-block py-4 px-6 bg-blue-900 text-white rounded-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      <div
        class="p-4 bg-stone-100 border border-gray-300 rounded-3xl grid grid-cols-4 gap-4"
      >
        <div class="p-4 text-center border border-gray-300 rounded-2xl">
          <img src="" class="mb-6 rounded-full" />

          <p>
            <strong>
              <p>friend card</p>
            </strong>
          </p>
        </div>
      </div>

      <div class="p-4 bg-stone-100 border border-gray-300 rounded-3xl">
        <p>all posts</p>
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <p>side bar with people and trends</p>
    </div>
  </div>
</template>
