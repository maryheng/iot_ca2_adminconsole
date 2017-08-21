<template>
  <div id="addcriminalContainer">
    <p class="subtitle is-4">Manage Criminals</p>
    <div class="box">

      <!-- Back Button -->
      <div class="backToCriminals">
        <router-link to="/criminals">
          <button type="button" class="button is-light">Back</button>
        </router-link>

        <div class="innerContainer">
          <br>
          <div class="header">
            <p class="title is-4">Criminal Details</p>
          </div>
          <hr>

          <!-- Form Validation -->
          <form @submit.prevent="validateBeforeSubmit">
            <!-- Upload Image -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Upload Image:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <div id="chooseFileDiv">
                    <p class="control">
                      <div id="imageShowDiv" v-show="this.checked === true"
                      v-bind:style="{ 'backgroundImage': 'url(' + this.image + ')' }"></div>
                      <input type="file" accept="image/*" v-validate="'mimes:image/*|size:4000'" :class="{'input': true, 'is-danger': errors.has('image') }" @change="onFileChange" class="input" ref="image" name="image" id="image">
                      <span v-show="errors.has('image')" class="help is-danger">{{ errors.first('image') }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!--Input field for Name-->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Full Name:</label>
              </div>
              <div class="field-body">
                <div class="field is-grouped">
                  <p class="control">
                    <input class="input" v-validate="'required|max:100'"
                    :class="{'input': true, 'is-danger': errors.has('name') }"
                    name="name" type="text" placeholder="Name" v-model="name">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                  </p>
                </div>
              </div>
            </div>

          <!--Input field for Description-->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Description:</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <textarea class="textarea" type="text" placeholder="Description"
                  v-validate="'required|max:100'"
                  :class="{'input': true, 'is-danger': errors.has('volume') }"
                  name="description" v-model="description">
                  </textarea>                 
                  <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
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

      <div class="deleteCriminalBtn">
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
import { criminalsUrl } from '../../config'
import axios from 'axios'
import router from '../../router'
import Simplert from 'vue2-simplert/src/simplert'

export default {
  components: {
    Simplert
  },
  data () {
    return {
      name: '',
      description: '',
      image: '',
      checked: true,
      isDisabled: false,
      criminalId: '',
      imageName: ''
    }
  },
  methods: {
    // Validation on Submit
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) { // no errors from fields
          this.isDisabled = true
          this.imageName = this.$refs.image.files[0]

          let formData = new FormData()

          formData.append('criminalImage', this.imageName)
          formData.append('name', this.name)
          formData.append('description', this.description)

          axios.put(criminalsUrl + this.criminalId, formData)
            .then((response) => {
              this.isDisabled = true
              let closeFn = () => {
                router.push({ path: '/criminals' })
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
    // Delete Staff Record
    deleteBtn () {
      let confirmFn = () => {
        this.isDisabled = true
        axios.delete(criminalsUrl + this.criminalId)
        .then((response) => {
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Staff Page
            router.push({ path: '/criminals' })
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
        message: 'Are you sure you want to delete criminal record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      this.$refs.simplert.openSimplert(deleteAlert)
    },
    onFileChange (e) {
      this.checked = true
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        this.image = null
        this.checked = false
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    }    
  },
  created () {
    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateStaff"/"{userId}"
    const segments = path.split('/')

    // Assigned criminalId
    this.criminalId = segments[2]

    // Based on the userId in the URL, get data for the user
    axios.get(criminalsUrl + this.criminalId)
      .then((response) => {
        this.name = response.data.name
        this.description = response.data.description
        this.image = 'https://iotca2blob.blob.core.windows.net/criminalimages/' + response.data.imageName
        this.imageName = 'https://iotca2blob.blob.core.windows.net/criminalimages/' + response.data.imageName
        console.log(this.image)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>
#addcriminalContainer p {
  font-size: 23px;
  font-weight: 300;
}

#addcriminalContainer .box {
  padding-bottom: 11%;
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

.deleteCriminalBtn {
  float: left;
  margin-top: 2.3%;
}
</style>
