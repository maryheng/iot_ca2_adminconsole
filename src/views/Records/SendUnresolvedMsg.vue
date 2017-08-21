<template>
  <div id="addcriminalContainer">
    <p class="subtitle is-4">Manage Telegram Bot</p>
    <div class="box">
      <div class="innerContainer">
        <br>
        <div class="header">
          <p class="title is-4">Description of Unresolved Case Details</p>
          <p class="subtitle is-5">Send a message to registered users of the telegram bot</p>
        </div>
        <hr>

        <!-- Form Validation -->
        <form @submit.prevent="validateBeforeSubmit">
          <!--Input field for Name-->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Message:</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <textarea class="textarea" type="text" placeholder="Description of unresolved case"
                  v-validate="'required|max:100'"
                  :class="{'input': true, 'is-danger': errors.has('volume') }"
                  name="message" v-model="message">
                  </textarea>                 
                  <span v-show="errors.has('message')" class="help is-danger">{{ errors.first('message') }}</span>
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
</template>

<script>
export default {
  data () {
    return {
      message: '',
      isDisabled: false
    }
  },
  methods: {
    // Validation on Submit
    validateBeforeSubmit () {

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

input {
  margin-top: 5%;
}
</style>
