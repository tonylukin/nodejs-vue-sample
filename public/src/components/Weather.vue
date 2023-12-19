<script setup>
import axios from 'axios';
import {provide, reactive, readonly, ref, onMounted, computed, defineProps, toRefs} from 'vue';
import WeatherData from './WeatherData.vue';
import Alert from "./Alert.vue";
import InputWatch from "./InputWatch.vue";

const cities = ref([]);
const weatherData = ref({});
const alert = ref({});
const sortByNameAsc = ref(null);

// const props = defineProps({
//   filterByNameValue: String
// });
//
// const {filterByNameValue} = toRefs(props);

const filterByNameValue = ref('');

provide('weatherData', weatherData);
onMounted(async () => {
  const response = await axios.get('http://localhost:3001/city');
  if (response.status !== 200) {
    // error
    return;
  }
  response.data.cities.map(city => cities.value.push({
    id: city.city_id,
    name: city.city_name,
  }));
});

const getWeather = async function (e) {
  const response = await axios.post('http://localhost:3001/city', {
    city_name: e.target.value,
  });
  if (response.status !== 200) {
    // error
    return;
  }

  cities.value.push({
    id: response.data.cityId,
    name: e.target.value,
  });
};
const getWeatherData = async function (city, event) {
  event.target.disabled = true;
  try {
    const response = await axios.get(`http://localhost:3001/city/${city.id}`);
    weatherData.value = response.data;
    setAlertMessage('Success', 'success');
  } catch (error) {
    setAlertMessage(error, 'danger');
  } finally {
    event.target.disabled = false;
  }
};
const setAlertMessage = function (message, type = 'info') {
  alert.value = {message, type};
};

const sortByName = () => {
  sortByNameAsc.value = sortByNameAsc.value !== true;
};

const filteredCities = computed(() => {
  let filteredCities = cities.value;

  if (sortByNameAsc.value !== null) {
    filteredCities = filteredCities.sort((a, b) => {
      if (a.name < b.name) {
        return sortByNameAsc.value ? -1 : 1;
      }
      if (a.name > b.name) {
        return sortByNameAsc.value ? 1 : -1;
      }
      return 0;
    });
  }

  if (filterByNameValue.value) {
    filteredCities = filteredCities.filter((city) => city.name.toLowerCase().startsWith(filterByNameValue.value.toLowerCase()))
  }

  return filteredCities;
});
</script>

<template>
  <div class="weather">
    <input @keyup.enter="getWeather" type="text" class="form-control" placeholder="Find city weather">
  </div>
  <div class="row">
    <div class="col">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>ID</th>
          <th>
            <a href="#" @click.prevent="sortByName">Name {{ sortByNameAsc === null ? '' : (sortByNameAsc ? 'ASC' : 'DESC') }}</a>
            <input type="text" class="form-control" v-model="filterByNameValue">
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="city of filteredCities" :key="city.id">
          <td>{{ city.id }}</td>
          <td>{{ city.name }}</td>
          <td>
            <button @click="getWeatherData(city, $event)" class="btn btn-primary">Get weather</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col">
      <WeatherData @on-get-weather-data="setAlertMessage('WeatherData')" style="margin-bottom: 10px"/>
      <Alert v-if="alert.message" :type="alert.type">{{ alert.message }}</Alert>
      <InputWatch/>
    </div>
  </div>
</template>

<style scoped>
.weather {
  margin-bottom: 1em;
}
</style>
