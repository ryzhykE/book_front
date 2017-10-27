<template>
    <div class="row">
        <div class="col-md-5 col-md-offset-3">
            <h4>Register user</h4>
            <div v-if="error !== ''" class="alert alert-danger">
                {{ error }}
            </div>
            <div v-if="success !== 'register success'">
                <div class="form-group">
                    <label class="control-label col-sm-2" for="first_name">Name: </label>
                    <div class="col-sm-10">
                        <input v-model="first_name" type="first_name" class="form-control" id="first_name" placeholder="Enter First name" name="first_name">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="last_name">Surname: </label>
                    <div class="col-sm-10">
                        <input v-model="last_name" type="last_name" class="form-control" id="last_name" placeholder="Enter Last name" name="last_name">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="login">Login: </label>
                    <div class="col-sm-10">
                        <input v-model="login" type="login" class="form-control" id="login" placeholder="Enter login" name="login">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="discount">Discount: </label>
                    <div class="col-sm-10">
                        <input v-model="discount" type="text" class="form-control" id="discount" placeholder="Enter discount" name="discount">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="pass">Password: </label>
                    <div class="col-sm-10">
                        <input v-model="pass" type="password" class="form-control" id="pass" placeholder="Enter password" name="pass">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="pass_confirm">Password Conferm: </label>
                    <div class="col-sm-10">
                        <input v-model="pass_confirm" type="password" class="form-control" id="pass_confirm" placeholder="Enter password" name="pass">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button v-on:click="registration()" type="submit" class="btn btn-default">Submit</button>
                    </div>
                </div>
                
            </div>
            <div v-else class="success">
                <h4>User {{login}} register !</h4>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      error: "",
      success: "",
      first_name: "",
      last_name: "",
      login: "",
      discount: "",
      pass: "",
      pass_confirm: "",
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    registration: function() {
      var self = this;
      if (
        self.first_name &&
        self.last_name &&
        self.login &&
        self.discount &&
        self.pass &&
        self.pass_confirm
      ) {
        if (self.pass.pass < 7) {
         self.error = "Password should be at least 8 characters"
        return false
        }
         if (self.login < 2) {
         self.error = "Login more 2 characters"
         return false
        }
        if (self.pass != self.pass_confirm) {
          self.error = "Password fields do not match";
        } else {
          var data = new FormData();
          data.append("first_name", self.first_name);
          data.append("last_name", self.last_name);
          data.append("login", self.login);
          data.append("discount", self.discount);
          data.append("pass", self.pass);
          axios
            .post(
              getUrl()+'User/',
              data,
              self.config
            )
            .then(function(response) {
              self.error = response.data
              self.success = "register success"
              
            })
            .catch(function(error) {
                self.error = response.data
              console.log(error);
            });
        }
      } else {
        self.error = "Enter field!";
      }
    }
  }
};
</script>

<style scoped>
.success {
  color: darkblue;
  text-align: center;
}

</style>


