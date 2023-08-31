<template>
  <div class="w-full mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-stone-100 border border-gray-300 rounded-3xl">
        <div class="space-y-4">
          <p>all conversations</p>
        </div>
      </div>
    </div>

    <div class="main-center col-span-3 space-y-4">
      <div class="bg-stone-100 border border-gray-300 rounded-3xl">
        <div class="flex flex-col flex-grow p-4">
          <p>current conversation</p>
        </div>
      </div>

      <div class="bg-stone-100 border border-gray-300 rounded-3xl">
        <form>
          <div class="p-4">
            <textarea
              class="p-4 w-full bg-gray-100 border border-gray-300 rounded-2xl"
              placeholder="Message..."
            ></textarea>
          </div>

          <div class="p-4 pt-0 flex justify-between">
            <button
              class="inline-block py-4 px-6 bg-blue-900 hover:bg-blue-950 text-white rounded-3xl"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
