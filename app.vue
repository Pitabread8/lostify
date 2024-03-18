<script setup>
// import { Buffer } from "buffer";
const config = useRuntimeConfig();
// const basic = Buffer.from(`${config.clientID}:${config.clientSecret}`).toString("base64");
const album = ref();

const { data: token } = await useFetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  }),
});

watch(
  token,
  (newToken) => {
    if (newToken.access_token) {
      useFetch("https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newToken.access_token}`,
        },
      }).then((a) => {
        album.value = a.data;
      });
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<script>
export default {
  methods: {
    embedSrc(a) {
      const num = Math.floor(Math.random() * a.value["albums"]["items"].length);
      return `https://open.spotify.com/embed/album/${a.value["albums"]["items"][num]["external_urls"]["spotify"].substring(31)}`;
    },
  },
};
</script>

<template>
  <iframe class="p-4 w-screen" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" :src="embedSrc(album)"></iframe>
</template>
