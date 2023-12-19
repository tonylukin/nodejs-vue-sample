<script setup>
import { inject } from "vue";

// export default {
//   inject: ['weatherData'],
// }
const weatherData = inject('weatherData');
</script>

<template>
  <div class="card" v-if="weatherData !== null">
    <div class="card-body">
      <h4>{{ weatherData?.name }}</h4>
      <p>
        <span v-if="weatherData?.temperature">Temperature: {{ weatherData.temperature.temp }}</span>
        <br>
        <span v-if="weatherData?.weather">Weather: {{ weatherData.weather[0]?.main }}</span>
      </p>
      <button @click="$emit('onGetWeatherData')" class="btn btn-info">onGetWeatherData</button>
    </div>
  </div>
</template>

<style scoped>
</style>
