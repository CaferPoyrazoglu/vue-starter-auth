<script setup>
import { useMessageStore } from '@/stores'

const messageStore = useMessageStore()

function closeMessage() {
    messageStore.status = false
    messageStore.message = ''
}
</script>

<template>
    <div
        v-if="messageStore.status"
        id="alert-1"
        class="flex items-center p-4 mb-4 text-main2 rounded-lg bg-main2 dark:bg-gray-800 dark:text-main2"
        role="alert">
        <svg
            aria-hidden="true"
            class="flex-shrink-0 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Bilgi</span>
        <div class="ml-3 text-sm font-medium">
            {{ messageStore.message }}
        </div>
        <button
            aria-label="Close"
            class="ml-auto -mx-1.5 -my-1.5 bg-main2 text-main2 rounded-lg focus:ring-2 focus:ring-main2 p-1.5 hover:bg-main2 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-main2 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-1"
            type="button"
            @click="closeMessage()">
            <span class="sr-only">Kapat</span>
            <svg aria-hidden="true" class="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2" />
            </svg>
        </button>
    </div>
</template>

<style scoped></style>
