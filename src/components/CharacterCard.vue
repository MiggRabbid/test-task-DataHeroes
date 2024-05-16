<template>
  <article class="character-card">
    <div class="character-card__img-wrapper">
      <img :src="character.image" :alt="character.name" />
    </div>
    <div class="character-card__content-wrapper">
      <div class="character-card__section">
        <h2 class="character-card__section-title">{{ character.name }}</h2>
        <span class="character-card__status">
          <span class="character-card__status-icon"></span>
          {{ character.status }} - {{ character.species }}
        </span>
      </div>
      <div class="character-card__section">
        <span class="character-card__text-gray">Last known location: </span>
        <span>{{ character.location.name }}</span>
      </div>
      <div class="character-card__section">
        <span class="character-card__text-gray">First seen in: </span>
        <span>{{ firstEpisode.name }}</span>
      </div>
    </div>
  </article>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CharacterCard',
  props: {
    character: Object,
  },
  setup(props) {
    const firstEpisode = ref({});

    onMounted(async () => {
      const episodeUrl = props.character.episode[0];
      if (episodeUrl) {
        const response = await axios.get(episodeUrl);
        firstEpisode.value = response.data;
      }
    });

    return {
      firstEpisode,
    };
  },
};
</script>

<style>
.character-card {
  height: 220px;
  width: 600px;
  margin: 10px;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #f5f5f5;
  background-color: #3c3e44;
  overflow: hidden;
  text-align: center;
  font-size: 18px;
  line-height: 26px;
}

.character-card__img-wrapper > img {
  width: 230px;
}

.character-card__content-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 13px;
  text-align: left;
}
.character-card__section {
  display: flex;
  flex-direction: column;
}

.character-card__section-title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.character-card__status {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.character-card__status-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green; /* Change color based on status */
  margin-right: 5px;
}

.character-card__text-gray {
  color: gray;
  font-size: 16px;
}
</style>
