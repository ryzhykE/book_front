<template>
  <div class="edd-user">
      <div v-if="error !== ''" class="alert alert-danger">
        {{ error }}
      </div>
      <div class="form">
          <div class="form-group">
                <label class="control-label col-sm-2" for="first_name">Name: </label>
                <div class="col-sm-10 ">
                    <input class="form-control" v-model="userInfo.first_name" type="text" :value="userInfo.first_name" name="first_name">
                </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="last_name">Surname: </label>
            <div class="col-sm-10">
                <input v-model="userInfo.last_name"  :value="userInfo.last_name" type="last_name" class="form-control" id="last_name" name="last_name">
            </div>
          </div>
            
            <div class="form-group">
                <label class="control-label col-sm-2" for="login">Login: </label>
                <div class="col-sm-10">
                    <input v-model="userInfo.login" :value="userInfo.login" type="login" class="form-control" id="login" name="login">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="discount">Discount: </label>
                <div class="col-sm-10">
                    <input v-model="userInfo.discount" :value="userInfo.discount" type="text" class="form-control" id="discount" name="discount">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="pass">Password: </label>
                <div class="col-sm-10">
                    <input v-model="userInfo.pass" type="password" class="form-control" name="pass">
                </div>
            </div>
             <div class="form-group">
                <label class="control-label col-sm-2" for="activ">Activ: </label>
                <div class="col-sm-10">
                    <select class="form-control" v-model="userInfo.active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="role">Role: </label>
                <div class="col-sm-10">
                    <select class="form-control" v-model="userInfo.role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <button class="btn btn-success save-user" @click="saveUser()">Update User</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'EditUser',
      beforeRouteUpdate(to, from, next) {
        this.getUser(to.params.id)
        this.showOrdrers = false
        this.orderMsg = ''
        next()
    },
  data () {
    return {
      user:'',
      userInfo: [],
      error:'',
      showOrdrers: false,
      orderMsg: '',
       config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
    }
  },
  methods:{
          getOrders: function(){
        var self = this
        var xhr = new XMLHttpRequest()
        xhr.open('GET', getUrl()+'orders/'+self.userData.id, true)
          xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return
              if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText)
              } else {
                var res = JSON.parse(xhr.responseText)
                if(typeof(res) == 'string'){
                  self.msg = res
                }
                else{
                  self.userData.orders = JSON.parse(xhr.responseText)
                }
              }
        }
        xhr.send();
    },
      saveUser: function(){
        var self = this
          self.error = ''
          if (self.userInfo.first_name && self.userInfo.last_name && self.userInfo.pass)
          {
              if (self.userInfo.first_name.length <= 3)
              {
                self.error = 'First name should be at least 3 characters'
                return false
              }
               
              if (self.userInfo.last_name.length <= 2)
              {
                self.error = 'Last name should be at least 3 characters'
                return false
              }
               
              if (self.userInfo.pass.length <= 3)
              {
                self.error = 'Password should be at least 4 characters'
                return false
              }
             
              var data = {}
              data.id = self.userInfo.id
              data.first_name = self.userInfo.first_name
              data.last_name = self.userInfo.last_name
              data.login = self.userInfo.login
              data.discount = self.userInfo.discount
              data.pass = self.userInfo.pass
              data.role = self.userInfo.role
              data.active = self.userInfo.active
             //console.log(data);
                axios.put(getUrl()+'user/', data, self.config)
                    .then(function (response) {
                    self.getUser(self.$route.params.id)
                    self.error = 'User update'
                   
                })
                    .catch(function (error) {
                    console.log(error)
                })
          }
          else{
              self.errorMsg =  'Check all fields!'
          }
    },
          getUser: function(id) {
        var self = this;
        axios
          .get(getUrl()+'Client/' +id,self.config )
          .then(function(response) {
            if (response.data !== false) {
              //console.log(response.data);
              self.userInfo = response.data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
     
    }
    
  },
   created(){
    this.getUser(this.$route.params.id)
  },
  computed:{
  },
  components:{
  }
}

</script>


<style scoped>
.form {
    max-width: 600px;
}
.form-group {
    padding-top: 30px; 
}
.select-user {
    width: 200px;
}
.save-user {
    margin-top: 25px;
    width: 160px;
    height: 40px;
    font: 1.3em sans-serif;
}

</style>