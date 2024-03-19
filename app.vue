<script setup>
const config = useRuntimeConfig();
const albums = ref();

const { data: res } = await useFetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  }),
});

watch(
  res,
  (newRes) => {
    if (newRes.access_token) {
      useFetch("https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newRes.access_token}`,
        },
      }).then((a) => {
        albums.value = a.data;
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
  data() {
    return {
      num: null,
    };
  },
  methods: {
    getAlbums(albums) {
      this.num = Math.floor(Math.random() * albums.value["albums"]["items"].length);
    },
    embedSrc(albums) {
      if (this.num != null) {
        return `https://open.spotify.com/embed/album/${albums.value["albums"]["items"][this.num]["external_urls"]["spotify"].substring(31)}`;
      }
    },
  },
};
</script>

<template>
  <button @click="getAlbums(albums)">test</button>
  <iframe v-if="albums != null" class="w-screen p-4" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" :src="embedSrc(albums)"></iframe>
</template>
