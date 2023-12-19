<script>
import axios from 'axios';
import {provide, reactive, readonly, ref, computed} from 'vue';
import WeatherData from './WeatherData.vue';
import Alert from "./Alert.vue";
import InputWatch from "./InputWatch.vue";

const message = ref('');

export default {
  components: {
    Alert,
    WeatherData,
    InputWatch,
  },
  emits: ['onChangeAlert'],
  data() {
    return {
      cities: {},
      weatherData: {},
      alert: {},
    }
  },
  provide() {
    return {
      weatherData: computed(() => this.weatherData),
    }
  },
  setup(props, context) {
    const city = ref('Miami');
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })
    provide('city', city);
    provide('geolocation', geolocation);
  },
  methods: {
    getWeather: async function (e) {
      const response = await axios.post('http://localhost:3001/city', {
        city_name: e.target.value,
      });
      if (response.status !== 200) {
        // error
        return;
      }

      this.cities[response.data.cityId] = {
        id: response.data.cityId,
        name: e.target.value,
      };
    },
    getWeatherData: async function (city, event) {
      event.target.disabled = true;
      try {
        const response = await axios.get(`http://localhost:3001/city/${city.id}`);
        this.weatherData = response.data;
        this.setAlertMessage('Success', 'success');
      } catch (error) {
        this.setAlertMessage(error, 'danger');
      } finally {
        event.target.disabled = false;
      }
    },
    setAlertMessage: function (message, type) {
      this.alert = {message, type};
    },
  }
}
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
          <th>Name</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(city, id) of cities" :key="id">
          <td>{{ id }}</td>
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
