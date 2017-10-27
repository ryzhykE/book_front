<template>
  <div id="login">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Book Shop</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <div v-if="checkUser == ''">
               <div class="navbar-form navbar-right">
            <div class="form-group">
              <input v-model="login" type="text" name="login" placeholder="login" class="form-control">
            </div>
            <div class="form-group">
              <input v-model="pass" type="password" name="pass" placeholder="Password" class="form-control">
            </div>
            <button type="submit" v-on:click="loginUser()" class="btn btn-success">Sign in</button>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><router-link :to="'/register/'">Sign up</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="err-pass">{{error}}</li>
            </ul>
          </div>
        
          <ul v-else class="nav navbar-nav navbar-right">
              <li><a href="#" v-on:click="logoutUser()" ><span class="glyphicon glyphicon-log-out"></span> Log out </a></li>
              <li><router-link :to="'/cart/'"><span class="glyphicon glyphicon-shopping-cart">Cart</span></router-link>  </li>
              <li><router-link :to="'/order/'"><span class="glyphicon glyphicon-pencil">Order</span></router-link>  </li>
          </ul>
        </div><!--/.navbar-collapse -->
      </div>
       
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "loginForm",
  data() {
    return {
      login: "",
      pass: "",
      id: "",
      hash: "",
      error: "",
      checkUser: "",
      role: "",
    };
  },
  methods: {
    loginUser: function() {
      var self = this;
      self.error = "";

      axios
        .put(
          getUrl()+'Client/',
          {
            login: self.login,
            pass: self.pass
          },
          this.config
        )
        .then(function(response) {
          if (response.data.id && response.data.hash) {
            self.id = response.data.id;
            self.hash = response.data.hash;
            self.role = response.data.role;
            localStorage["id"] = JSON.stringify(self.id);
            localStorage["hash"] = JSON.stringify(self.hash);
            localStorage["login"] = JSON.stringify(self.login);
            localStorage["role"] = JSON.stringify(self.role);
            self.checkUserA();
            self.$parent.getCheck();
            if (response.data.role == "admin") {
                  self.$router.push("/admin");
                }

            return true;
          } else {
            self.error = response.data;
            
          }
        })
        .catch(function(error) {
          console.log(error);
          self.error = "password or login wrong"
        });
    },
    checkUserA: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.id = JSON.parse(localStorage["id"]);
        self.hash = JSON.parse(localStorage["hash"]);
        self.role = JSON.stringify(localStorage["role"]);
        axios
          .get(getUrl()+'Client/' + self.id)
          .then(function(response) {
            if (response.data !== false) {
              //console.log(response.data.role);
              if (self.hash === response.data.hash) {
                
                self.checkUser = 1;
                return true;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        return false;
      }
    },
    logoutUser: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        delete localStorage["id"];
        delete localStorage["hash"];
        delete localStorage["login"];
        delete localStorage["role"];
        self.checkUser = "";
        self.role = "",
        self.$parent.getCheck();
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.checkUserA();
  }
};
</script>

<style scope>
.err-pass {
  font: 14px;
  color: red;
}

</style>
