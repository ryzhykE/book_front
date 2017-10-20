<template>
    <div class="row">
       <div v-if=" checkUser > 0">
           autoriz user
       </div>
       <div v-else>
        <p>You no authorized user, if you admin , please check</p>
       </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "order",
  data() {
    return {
      error: "",
      checkUser: "",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
  },
  methods: {
    checkUserA: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.id = JSON.parse(localStorage["id"]);
        self.hash = JSON.parse(localStorage["hash"]);
        axios
          .get("http://bookrest/user12/rest_book/client/api/Client/" + self.id)
          .then(function(response) {
            if (response.data !== false) {
              if (self.hash === response.data.hash) {
                self.role = JSON.parse(localStorage["role"]);
                if (self.role !== "admin") {
                  checkUser = 0;
                  self.$router.push("/");
                }
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
    }
  },
  getAllGenres: function() {
    var self = this;
    axios
      .get("http://bookrest/user12/rest_book/client/api/Genre/", this.config)
      .then(function(response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.genres = response.data;
        } else {
          self.errors = response.data;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  getAllAuthors: function() {
    var self = this;
    axios
      .get("http://bookrest/user12/rest_book/client/api/Authors/", this.config)
      .then(function(response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.authors = response.data;
        } else {
          self.errors = response.data;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  created() {
    this.checkUserA();
  }
};
</script>

<style scoped>

</style>


