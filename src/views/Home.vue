<template>
  <section class="rick-and-morty">
    <div class="rick-and-morty__filters">
      <div class="rick-and-morty__input-group">
        <label for="filterByName" class="input-group__label">Filter by name:</label>
        <input
          id="filterByName"
          v-model="filters.name"
          type="text"
          placeholder="Enter name"
          class="rick-and-morty__filter-input"
          aria-label="Filter by name"
        />
      </div>

      <div class="rick-and-morty__select-group">
        <label for="filterByStatus" class="select-group__label">Status:</label>
        <select
          id="filterByStatus"
          v-model="filters.status"
          class="rick-and-morty__filter-select"
          aria-label="Filter by status"
        >
          <option value="">Any</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

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
import { ref, onMounted } from 'vue';
import CharacterCard from '../components/CharacterCard.vue';
import getCharacters from '../api';

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

    const fetchCharacters = async () => {
      try {
        const data = await getCharacters(page.value, filters.value.name, filters.value.status);
        characters.value = data.results;
        hasMore.value = data.info.next !== null;
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      }
    };

    const applyFilters = () => {
      page.value = 1;
      fetchCharacters();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
        fetchCharacters();
      }
    };

    const nextPage = () => {
      if (hasMore.value) {
        page.value += 1;
        fetchCharacters();
      }
    };

    onMounted(fetchCharacters);

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
  max-width: 1920px;
  margin: 0 auto;
}

.rick-and-morty__filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  height: fit-content;
  margin-bottom: 10px;
  padding-top: 20px;
}

.rick-and-morty__input-group,
.rick-and-morty__select-group {
  position: relative;
}

.input-group__label {
  position: absolute;
  top: 0;
  visibility: hidden;
}

.select-group__label {
  margin-right: 5px;
  font-size: 18px;
  color: #f5f5f5;
}

.rick-and-morty__filter-input,
.rick-and-morty__filter-select,
.rick-and-morty__filter-button {
  height: 35px;
  padding: 5px 10px;
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
  margin: 0 auto;
  height: 35px;
  width: fit-content;
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

  .rick-and-morty__filters {
    flex-wrap: wrap;
    justify-content: center;
  }
  .rick-and-morty__input-group {
    width: 50%;
    min-width: 200px;
  }

  .rick-and-morty__filter-input {
    width: 100%;
  }
}
</style>
