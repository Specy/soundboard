import { writable } from "svelte/store";
import { browser } from '$app/env'
let storage = browser ? localStorage.getItem('theme') : ""
let base = storage || 'light'
export const theme = writable(base)
theme.subscribe((value) => {
    if(browser) localStorage.setItem('theme',value)
})