<template>
  <div id="dashboardContainer">
    <p class="subtitle is-4">Dashboard</p>
    <div class="columns">
      <div class="column">
        <div class="box">
          <p><strong>Number of times triggered today:</strong></p>
          <p>{{ countTriggeredValue }}</p>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <p><strong>Number of false alarms today:</strong></p>
          <p>{{ falseAlarmsValue }}</p>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <p><strong>Current Sound Threshold (%):</strong></p>
          <p>{{ soundThresholdValue }}</p>
        </div>
      </div>
    </div>

    <!-- <p>Graph</p>
    <div class="box">
    </div> -->
  </div>
</template>

<script>
import { preferencesUrl, countFalseAlarms, countTriggered } from '../../config'
import axios from 'axios'

export default {
  data () {
    return {
      soundThresholdValue: '',
      falseAlarmsValue: '',
      countTriggeredValue: ''
    }
  },
  created () {
    // Get Count Triggered Value
    axios.get(countTriggered)
      .then((response) => {
        this.countTriggeredValue = response.data.count
      })
      .catch((error) => {
        console.log(error)
      })

    // Get Count False Alarms Value
    axios.get(countFalseAlarms)
      .then((response) => {
        this.falseAlarmsValue = response.data.count
      })
      .catch((error) => {
        console.log(error)
      })

    // Get Sound Threshold Value
    axios.get(preferencesUrl)
      .then((response) => {
        this.soundThresholdValue = response.data.soundThreshold
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>
#dashboardContainer > p {
  font-size: 23px;
  font-weight: 300;
}

#dashboardContainer .columns .column .box p {
  font-size: 24px;
}
</style>
