<template>
  <div id="addOffenceContainer">
    <p class="subtitle is-4">Manage Records of Cases</p>
    <div class="box">

      <!-- Back Button -->
      <div class="backToCriminals">
        <router-link to="/records/newcases">
          <button type="button" class="button is-light">Back</button>
        </router-link>

        <div class="innerContainer">
          <br>
          <div class="header">
            <p class="title is-4">Details of New Case</p>
          </div>
          <hr>

          <!-- Form Validation -->
          <form @submit.prevent="validateBeforeSubmit">

            <!-- Upload Image -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Image:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <div id="chooseFileDiv">
                    <p class="control">
                      <div id="imageShowDiv" v-bind:style="{ 'backgroundImage': 'url(' + this.image + ')' }"></div>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!--Input field for Name-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Suspected Person:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <div id="nameOfPerson">
                      <p>{{ name }}</p>
                    </div>                    
                  </p>
                </div>
              </div>
            </div>

            <!--Input field for Name-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Suspect's Bio:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <div id="nameOfPerson">
                      <p>{{ description }}</p>
                    </div>                    
                  </p>
                </div>
              </div>
            </div>

            <!--Input field for Location-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Location:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <div id="nameOfPerson">
                      <p>{{ location }}</p>
                    </div>                    
                  </p>
                </div>
              </div>
            </div>

            <!--Input field for Sound-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Triggered Sound Value:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <div id="nameOfPerson">
                      <p>{{ triggeredSoundValue }}</p>
                    </div>                    
                  </p>
                </div>
              </div>
            </div>

          <br>
          <div class="header">
            <p class="title is-4">Action-To-Take</p>
          </div>
          <hr>
          <div id="actionToTakeHelp">
          <p class="subtitle is-5">
            Is this case going to be broadcasted to the registered
            users of Telegram or is it a false alarm? Click one of the button below.
          </p>
          </div>

          <div id="buttonGroup">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-success" @click="showTelegramDiv">
                  Respond using Telegram
                </a>
              </p>
              <p class="control">
                <a class="button is-danger" @click="falseAlarmBtn">
                  False Alarm
                </a>
              </p>
            </div>     
          </div>    

          <div id="telegramMsgDiv" v-show="this.checked === true">
            <!--Input field for Description-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Telegram Message to be Sent:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <textarea class="textarea" type="text" placeholder="E.g. Appears 30 years old, wearing a red shirt and white pants."
                    v-validate="'required|max:100'"
                    :class="{'input': true, 'is-danger': errors.has('telegram message') }"
                    name="telegram message" v-model="telegramMessage">
                    </textarea>                 
                    <span v-show="errors.has('telegram message')" class="help is-danger">{{ errors.first('telegram message') }}</span>
                  </p>
                </div>
              </div>
            </div>    

      <!--Input field for Type of Offence-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Type of Offence:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div id="multiselectForVisitors">
            <p class="control">
                <multiselect
                v-model="selectedOffence"
                v-validate data-vv-rules="required"
                data-vv-name="visit purpose"  
                :options="offencesOptions"
                :searchable="false"
                :allow-empty="true"
                label="offenceName"
                track-by="offenceName"
                open-direction="bottom"
                >
                </multiselect>
                <span v-show="errors.has('visit purpose')" class="help is-danger">{{ errors.first('visit purpose') }}</span>                
            </p>
            </div>
          </div>
        </div>
      </div>

                        <!-- Save Button -->
            <div id="saveTeleBtn">
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

          </div> 

          </form>
        </div>
        <!-- Simplert Notification -->
        <simplert :useRadius="true" :useIcon="true" ref="simplert">
        </simplert>     
      </div>
    </div>
  </div>
</template>

<script>
import { offencesUrl, offencesOptionsUrl, casesUrl, falseAlarm, respondCase } from '../../../../config'
import axios from 'axios'
import router from '../../../../router'
import Simplert from 'vue2-simplert/src/simplert'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Simplert,
    Multiselect
  },
  data () {
    return {
      suspectedPerson: '',
      name: '',
      description: '',
      location: '',
      triggeredSoundValue: '',
      image: '',
      telegramMessage: '',
      isDisabled: false,
      checked: false,
      selectedOffence: [],
      offencesOptions: [],
      caseId: ''
    }
  },
  methods: {
    // Validation on Submit
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) { // no errors from fields
          this.isDisabled = true

            axios.put(casesUrl + this.caseId + respondCase, {
              telegramMessage: this.telegramMessage,
              offenceType: this.selectedOffence.offenceName
            })
              .then((response) => {
                this.isDisabled = true
                let closeFn = () => {
                  router.push({ path: '/records/newcases' })
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
        } // If fields still have errors
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        this.$refs.simplert.openSimplert(errorAlert)
      })
    },
    falseAlarmBtn () {
      axios.put(casesUrl + this.caseId + falseAlarm)
        .then((response) => {
          this.isDisabled = true
          let closeFn = () => {
            router.push({ path: '/records/newcases' })
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
    },
    showTelegramDiv () {
      this.checked = true
    }  
  },
  created () {
    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateStaff"/"{userId}"
    const segments = path.split('/')

    // Assigned caseId
    this.caseId = segments[2]

    // Get case record by ID
    axios.get(casesUrl + this.caseId)
      .then((response) => {
        console.log(response)
        this.location = response.data.location
        this.triggeredSoundValue = response.data.triggeredSoundValue
        this.image = 'https://iotca2blob.blob.core.windows.net/caseimages/' + response.data.imageName

        if (!(response.data.suspectPersonId)) { // if there is no suspected person
          this.name = 'NIL'
          this.description = 'NIL'
        } else { // if there is a suspected person
          this.name = response.data.suspectPersonId.name
          this.description = response.data.suspectPersonId.description
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // Get Type of Offences for dropdown
    axios.get(offencesOptionsUrl)
      .then((response) => {
        this.offencesOptions = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
#addOffenceContainer > p {
  font-size: 23px;
  font-weight: 300;
}

.header > p {
  font-size: 23px;
  font-weight: 300;  
}

#addOffenceContainer .box {
  padding-bottom: 10%;
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

#telegramMsgDiv .input {
  width: 450px;
}

.header {
  margin-left: 7%;
}

#saveTeleBtn {
  margin-left: 14%;
  margin-top: 2%;
}

input {
  margin-top: 5%;
}

label {
  margin-top: 2.4%;
}

#imageShowDiv {
  width: 600px;
  height: 350px;
  display: block;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-bottom: 10%;
}

#nameOfPerson {
  margin-top: 0.75%;
  width: 450px;
}

#nameOfPerson > p {
  word-wrap: break-word;
}

#buttonGroup {
  margin-left: 15%;
  padding-bottom: 2%;
}

#actionToTakeHelp {
  margin-left: 8%;
  padding-bottom: 1%;
  width: 780px;
}

#actionToTakeHelp p {
  font-size: 17px;
  word-wrap: break-word;
  text-align: center;
}

.multiselect {
  width: 300px;
  margin-top: 3.5%;
}
</style>
