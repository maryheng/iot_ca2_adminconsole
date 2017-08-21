<template>
  <div id="addOffenceContainer">
    <p class="subtitle is-4">Manage Records of Cases</p>
    <div class="box">

      <!-- Back Button -->
      <div class="backToCriminals">
        <router-link to="/records/casearchive">
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

            <!--Input field for Offence Type-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Offence Type:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <div id="nameOfPerson">
                      <p>{{ offenceType }}</p>
                    </div>                    
                  </p>
                </div>
              </div>
            </div>

            <!--Input field for Sound-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Telegram Message:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <div id="nameOfPerson">
                      <p>{{ telegramMessage }}</p>
                    </div>                    
                  </p>
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
import { offencesUrl, offencesOptionsUrl, casesUrl, resolveCase } from '../../../../config'
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
      selectedOffence: [],
      offencesOptions: [],
      caseId: ''
    }
  },
  methods: {
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
        this.telegramMessage = response.data.telegramMessage
        this.offenceType = response.data.offenceType

        if (!(response.data.suspectPersonId)) { // if there is no suspected person
          this.name = 'NIL'
          this.description = 'NIL'
        } else { // if there is a suspected person
          this.name = response.data.suspectPersonId.name
          this.description = response.data.suspectPersonId.description
        }
      
        // // if threat is false
        if (response.data.isLegitimate === false) {
          this.offenceType = 'NIL'
          this.telegramMessage = 'NIL'
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

#resolveBtn {
  margin-left: 18%;
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
