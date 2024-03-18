// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    clientId: "123",
    clientSecret: "123",
  },
  modules: ["@nuxtjs/tailwindcss"],
});
