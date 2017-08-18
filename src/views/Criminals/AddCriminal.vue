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
                      <div id="imageShowDiv" v-show="this.checked === true" v-bind:style="{ 'backgroundImage': 'url(' + this.image + ')' }"></div>
                      <input type="file" accept="image/*" v-validate="'required|mimes:image/*|size:4000'" :class="{'input': true, 'is-danger': errors.has('image') }" @change="onFileChange" class="input" ref="image" name="image" id="image">
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
                    <input class="input" v-validate="'required|max:100'" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name" v-model="name">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      image: '',
      checked: false,
      isDisabled: false
    }
  },
  methods: {
    // Validation on Submit
    validateBeforeSubmit () {

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
</style>
