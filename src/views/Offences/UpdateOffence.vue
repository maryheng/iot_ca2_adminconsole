<template>
  <div id="addOffenceContainer">
    <p class="subtitle is-4">Manage Offences</p>
    <div class="box">

      <!-- Back Button -->
      <div class="backToCriminals">
        <router-link to="/offences">
          <button type="button" class="button is-light">Back</button>
        </router-link>

        <div class="innerContainer">
          <br>
          <div class="header">
            <p class="title is-4">Type of Offence</p>
          </div>
          <hr>

          <!-- Form Validation -->
          <form @submit.prevent="validateBeforeSubmit">
            <!--Input field for Name-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Offence Name:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <input class="input" v-validate="'required|max:100'"
                    :class="{'input': true, 'is-danger': errors.has('offence name') }"
                    name="offence name" type="text" placeholder="E.g. Robbery" v-model="offenceName">
                    <span v-show="errors.has('offence name')" class="help is-danger">{{ errors.first('offence name') }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div id="saveOffenceBtn">
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

      <div class="deleteOffenceBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button" @click="deleteBtn" :disabled="isDisabled">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        </div>
        <!-- Simplert Notification -->
        <simplert :useRadius="true" :useIcon="true" ref="simplert">
        </simplert>     
      </div>
    </div>
  </div>
</template>

<script>
import { offencesUrl } from '../../config'
import axios from 'axios'
import router from '../../router'
import Simplert from 'vue2-simplert/src/simplert'

export default {
  components: {
    Simplert
  },
  data () {
    return {
      offenceName: '',
      isDisabled: false,
      offenceId: ''
    }
  },
  methods: {
    // Validation on Submit
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) { // no errors from fields
          this.isDisabled = true

            axios.post(offencesUrl, {
              offenceName: this.offenceName
            })
              .then((response) => {
                this.isDisabled = true
                let closeFn = () => {
                  router.push({ path: '/offences' })
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
    // Delete Offence Record
    deleteBtn () {
      let confirmFn = () => {
        this.isDisabled = true
        axios.delete(offencesUrl + this.offenceId)
        .then((response) => {
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Staff Page
            router.push({ path: '/offences' })
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
      }
      let deleteAlert = {
        title: 'Warning',
        message: 'Are you sure you want to delete type of offence record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      this.$refs.simplert.openSimplert(deleteAlert)
    }  
  },
  created () {
    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateStaff"/"{userId}"
    const segments = path.split('/')

    // Assigned criminalId
    this.offenceId = segments[2]

    // Based on the userId in the URL, get data for the user
    axios.get(offencesUrl + this.offenceId)
      .then((response) => {
        this.offenceName = response.data.offenceName
        console.log(this.offenceName)
      })
      .catch((error) => {
        console.log(error)
      })    
  }
}
</script>

<style>
#addOffenceContainer p {
  font-size: 23px;
  font-weight: 300;
}

#addOffenceContainer .box {
  padding-bottom: 31.3%;
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

#saveOffenceBtn {
  margin-left: 8.5%;
}

#imageShowDiv {
  border-radius: 100%;
  width: 200px;
  height: 200px;
  display: block;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-bottom: 10%;
}

input {
  margin-top: 5%;
}

label {
  margin-top: 2.4%;
}

.deleteOffenceBtn {
  float: left;
  margin-top: 10.5%;
}
</style>
