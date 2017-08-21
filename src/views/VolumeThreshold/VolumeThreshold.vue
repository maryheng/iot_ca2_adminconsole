<template>
  <div id="volumeThresholdContainer">
    <p class="subtitle is-4">Manage Sound Threshold</p>
    <div class="box">
      <div class="innerContainer">
        <br>
        <div class="header">
          <p class="title is-4">Sound Threshold Details</p>
        </div>
        <hr>

          <!--Input field for Name-->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Current Sound Threshold (%):</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <div id="currentSoundThreshold">
                    <p>{{ currentSoundThreshold }}</p>
                  </div>
                </p>
              </div>
            </div>
          </div>


        <!-- Form Validation -->
        <form @submit.prevent="validateBeforeSubmit">
          <!--Input field for Name-->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Sound Threshold (%):</label>
              <p class="help">*Increase/Decrease the sound threshold using %.</p>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input class="input" v-validate="'required|numeric|min_value:1|max_value:100'"
                  :class="{'input': true, 'is-danger': errors.has('sound threshold') }"
                  name="sound threshold" type="text" placeholder="E.g. 10" v-model="soundThreshold">
                  <span v-show="errors.has('sound threshold')" class="help is-danger">{{ errors.first('sound threshold') }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div id="saveCriminalBtn">
            <div class="field is-horizontal">
              <div class="field-label">
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button class="button is-primary" :disabled="isDisabled">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- Simplert Notification -->
        <simplert :useRadius="true" :useIcon="true" ref="simplert">
        </simplert>        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { preferencesUrl } from '../../config'
import Simplert from 'vue2-simplert/src/simplert'

export default {
  components: {
    Simplert
  },
  data () {
    return {
      currentSoundThreshold: '',
      soundThreshold: '',
      isDisabled: false
    }
  },
  methods: {
    // Validation on Submit
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) { // no errors from fields
          axios.put(preferencesUrl, {
            soundThreshold: this.soundThreshold
          })
            .then((response) => {
              this.isDisabled = true
              let closeFn = () => {
                location.reload()
              }
              let successAlert = {
                title: 'Success',
                message: response.data.message,
                type: 'success',
                onClose: closeFn
              }
              this.$refs.simplert.openSimplert(successAlert)
            })
            .catch((error) => {
              this.isDisabled = false
              let errorAlert = {
                title: 'Error',
                message: error.response.data.message,
                type: 'error'
              }
              this.$refs.simplert.openSimplert(errorAlert)         
            })
          return
        } // if fields still have errors
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        this.$refs.simplert.openSimplert(errorAlert)        
      })
    } 
  },
  created () {
    // GET all data from soundThreshold url
    axios.get(preferencesUrl)
      .then((response) => {
        console.log(response)
        this.currentSoundThreshold = response.data.soundThreshold
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>
#volumeThresholdContainer > p {
  font-size: 23px;
  font-weight: 300;
}

.header >  p {
  font-size: 10px;
  font-weight: 300;
}

#volumeThresholdContainer .box {
  padding-bottom: 29%;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -150%;
}

hr {
  width: 35%;
  margin-left: 2.3%;
}

.field {
  margin: 0 auto;
}

.input {
  width: 300px;
}

.header {
  margin-left: 7%;
}

#saveCriminalBtn {
  margin-left: 8.5%;
}

input {
  margin-top: 5%;
}

label {
  margin-top: 2.4%;
}

#currentSoundThreshold {
  margin-top: 0.7%;
}
</style>
