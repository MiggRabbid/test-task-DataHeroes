<template>
  <section class="rick-and-morty">
    <div class="rick-and-morty__title">
      <h1>The Rick and Morty</h1>
      <p>All characters</p>
    </div>
    <div class="rick-and-morty__filters">
      <input
        v-model="filters.name"
        placeholder="Filter by name"
        class="rick-and-morty__filter-input"
        @keydown.enter="applyFilters"
      />
      <select v-model="filters.status" class="rick-and-morty__filter-select">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button @click="applyFilters" class="rick-and-morty__filter-button">Apply</button>
    </div>
    <div class="rick-and-morty__characters">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <div class="rick-and-morty__pagination">
      <button @click="prevPage" :disabled="page === 1" class="rick-and-morty__pagination-button">
        Previous
      </button>
      <span class="rick-and-morty__pagination-page">Page {{ page }}</span>
      <button @click="nextPage" :disabled="!hasMore" class="rick-and-morty__pagination-button">
        Next
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import CharacterCard from '../components/CharacterCard.vue';

export default {
  name: 'HomePage',
  components: {
    CharacterCard,
  },
  setup() {
    const characters = ref([]);
    const page = ref(1);
    const hasMore = ref(true);
    const filters = ref({
      name: '',
      status: '',
    });

    const getCharacters = async () => {
      const response = await axios.get('https://rickandmortyapi.com/api/character', {
        params: {
          page: page.value,
          name: filters.value.name,
          status: filters.value.status,
        },
      });
      characters.value = response.data.results;
      hasMore.value = response.data.info.next !== null;
    };

    const applyFilters = () => {
      page.value = 1;
      getCharacters();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
        getCharacters();
      }
    };

    const nextPage = () => {
      if (hasMore.value) {
        page.value += 1;
        getCharacters();
      }
    };

    onMounted(getCharacters);

    return {
      characters,
      page,
      hasMore,
      filters,
      applyFilters,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style>
.rick-and-morty {
  min-height: calc(100vh - 60px - 50px);
  background-color: #23282b;
}

.rick-and-morty__title {
  padding: 30px 10px;
  font-weight: 900;
  background: #fff;
  line-height: 1.1;
}

.rick-and-morty__title > h1 {
  font-size: 100px;
}

.rick-and-morty__title > p {
  margin: 20px;
  font-size: 40px;
}

.rick-and-morty__filters {
  height: 35px;
  margin: 20px 0 10px;
}

.rick-and-morty__filter-input,
.rick-and-morty__filter-select,
.rick-and-morty__filter-button {
  height: 100%;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 18px;
}

.rick-and-morty__filter-button {
  padding: 0 20px;
  background-color: #f5f5f5;
}

.rick-and-morty__characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.rick-and-morty__pagination {
  height: 35px;
  padding: 20px 0 60px;
}

.rick-and-morty__pagination > * {
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 10px;
  text-transform: uppercase;
}

.rick-and-morty__pagination-button {
  width: 120px;
}

.rick-and-morty__pagination-page {
  color: #f5f5f5;
}

@media (max-width: 900px) {
  .rick-and-morty__title {
    padding: 15px 5px;
  }

  .rick-and-morty__title > h1 {
    font-size: 70px;
  }

  .rick-and-morty__title > p {
    margin-top: 10px;
    font-size: 30px;
  }
}

@media (max-width: 650px) {
  .rick-and-morty__title {
    padding: 15px 10px;
  }

  .rick-and-morty__title > h1 {
    font-size: 55px;
  }

  .rick-and-morty__title > p {
    margin-top: 10px;
    font-size: 20px;
  }
}
</style>
