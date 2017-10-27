<template>
<div class="container-fluid">
    <div class="row admin-main">
            <div class="col-lg-4 manu-left">
            <router-link to="/"><button class="btn btn-warning main-btn">Main page</button></router-link>
                <div class="authors">
                    <h6>Authors:</h6>
                    <div class="new-author">
                        <div class="alert-danger">
                            <p>{{autherr}}</p>
                        </div>
                        Author name:
                        <input type="text" v-model="newAuthor">
                        <button v-on:click="addAuthor()" class="btn btn-success">Add</button>
                    </div>
                    
                    <div class="edit">
                        <div class="new-author">
                            Chenge or delete author:
                            <select v-model="editAuthor">
                            <option value="" class="default">Select Author</option>
                            <option v-for="author in authors" :value="author.id">{{author.name}}</option>
                            </select>
                        </div>
                        <div class="new-author">
                            <div v-if="editAuthor">
                            New name:<input type="text" v-model="editAuthorName" >
                            <button @click="renameAuthor()" class="btn btn-warning">Rename</button>
                            <button @click="deleteAuthor()" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="authors">
                    <h6>Genre:</h6>
                    <div class="new-author">
                        <div class="alert-danger">
                           <p>{{genreerr}}</p> 
                        </div>
                        Genre name:
                        <input type="text" v-model="newGenre">
                        <button v-on:click="addGenre()" class="btn btn-success">Add</button>
                    </div>
                    <div class="edit">
                        <div class="new-author">
                            Chenge or delete genre:
                            <select v-model="editGenre">
                            <option value="" class="default">Select Genre</option>
                            <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
                            </select>
                        </div>
                        <div class="new-author">
                            <div v-if="editGenre">
                            New name:<input type="text" v-model="editGenreName" >
                            <button @click="renameGenre()" class="btn btn-warning">Rename</button>
                            <button @click="deleteGenre()" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="books">
                    <h6>Books:</h6>
                    <div class="alert-danger">
                        <p>{{bookerr}}</p>
                    </div>
                    <router-link to="/admin/addbook/">
                        <button class="btn btn-success">Add Book</button>
                    </router-link>
                    <select v-model="editBook" class="books-edit">
                        <option value="" class="default">Select Book</option>
                        <option v-for="book in books" :value="book.id">{{book.title}}</option>
                    </select> 
                    <button class="btn btn-warning" @click="showEditBook()">Edit book</button>   
                </div>

                <div class="books">
                    <h6>Users:</h6>
                    <div class="alert-danger">
                        <p>{{usererr}}</p>
                    </div>
                    <router-link to="/admin/adduser/">
                      <button class="btn btn-success">Add user</button>
                    </router-link>
                    <select v-model="editUser" name="" id="" class="books-edit">
                        <option value="" class="default">Select user login</option>
                        <option v-for="user in users" :value="user.id" >{{user.login}}</option>
                    </select>
                    <button class="btn btn-warning" @click="eddUser()">Edit user</button>
                </div>

                <router-link to="/admin/orderuser/">
                  <button class="btn btn-success">Order user</button>
                </router-link>

            </div>
            <div class="col-md-8">
                <h4>Admin panel</h4>
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import AddBook from './admin/AddBook'
import EditUser from './admin/EditUser'
import UserOrders from './admin/UserOrders'
import EditBook from './admin/EditBook'
export default {
  name: "order",
  data() {
    return {
      error: "",
      authors: [],
      genres: [],
      newAuthor: '',
      autherr: '',
      editAuthor: '',
      editAuthorName: '',
      genreerr: '',
      editGenre: '',
      editGenreName: '',
      newGenre: '',
      bookerr:'',
      books:'',
      editBook:'',
      editUser:'',
      users:'',
      userId:'',
      usererr: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
     showEditBook: function(){
      var self = this
      if(self.editBook){
        self.$router.push({ path: '/admin/editbook/'+self.editBook})
      }
      else{
        self.bookerr = 'Select book';
      }  
    },
       eddUser: function(){
      var self = this
      if(self.editUser){
        self.$router.push({ path: '/admin/edituser/'+self.editUser})
      }
      else{
        self.usererr = 'Select user';
      }  
    },
      getUser: function() {
      var self = this;
        axios
          .get(getUrl()+'user/', self.config)
          .then(function(response) {
            if (response.data !== false) {
              self.users = response.data;
              self.userId = response.data.id;
              self.getUser()
              return true;
            }
          })
          .catch(function(error) {
            console.log(error);
          }); 
    },
       getAllBooks: function() {
      var self = this
      self.bookerr = ''
      axios
        .get(getUrl()+'AdminBook/', self.config)
        .then(function(response) {
          //console.log(response.data)
          if (response.status == 200) {
            self.books = response.data;
          } else {
            self.errors = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
      deleteGenre: function(){
      var self = this
      self.genreerr = ''
      if(self.editGenre){
      axios
        .delete(
          getUrl()+'genre/' + self.editGenre,
          self.config
        )
        .then(function(response) {
            self.genreerr = 'genre delete'
            self.getAllGenres()
            self.editGenre = ''
            self.editGenreName = ''
        })
        .catch(function(error) {
          console.log(error);
        });
        }
        else{
            self.authMsg = 'Select a genre'      
        }
    },
      renameGenre: function(){
      var self = this
      self.genreerr = ''
      if(self.editGenreName && self.editGenre){
        axios
        .put(
          getUrl()+'genre/',
          {
            id: self.editGenre,
            name: self.editGenreName
          },
          self.config
        )
        .then(function(response) {
            self.genreerr = 'update genre'
            self.editGenre = response.data.id;
            self.editGenreName = response.data.name;
            self.getAllGenres()
            self.editGenre = ''
            self.editGenreName = ''

            return true
        })
        .catch(function(error) {
          console.log(error);
        });
    } 
      else{
        self.autherr = 'Check new name in field'
      }
    },
      addGenre: function() {
      var self = this;
      self.genreerr = ''
      if (self.newGenre) {
          var data = new FormData();
          data.append("name", self.newGenre);
          axios
            .post(
              getUrl()+'genre/',
              data,
              self.config
            )
            .then(function(response) {
                self.genreerr = 'add genre'
                self.getAllGenres()
                self.newGenre = ''
            })
            .catch(function(error) {
              console.log(error);
            });
       
      } else {
        self.autherr = "Enter genre field!";
      }
    },
      deleteAuthor: function(){
      var self = this
      self.autherr = ''
      if(self.editAuthor){
      axios
        .delete(
          getUrl()+'authors/' + self.editAuthor,
          self.config
        )
        .then(function(response) {
          self.autherr = 'delete author'
          alert('delete author')
            self.getAllAuthors()
            self.editAuthor = ''
            self.editAuthorName = ''
        })
        .catch(function(error) {
          console.log(error);
        });
        }
        else{
            self.authMsg = 'Select an Author'      
        }
    },
      renameAuthor: function(){
      var self = this
      self.autherr = ''
      if(self.editAuthorName && self.editAuthor){
        axios
        .put(
          getUrl()+'authors/',
          {
            id: self.editAuthor,
            name: self.editAuthorName
          },
          self.config
        )
        .then(function(response) {
          alert('rename author')
          self.autherr = 'rename author'
            self.editAuthor = response.data.id;
            self.editAuthorName = response.data.name;
            self.getAllAuthors()
            self.editAuthor = ''
            self.editAuthorName = ''
            return true;
        })
        .catch(function(error) {
          console.log(error);
        });
    } 
      else{
        self.autherr = 'Check new name in field'
      }
    },
    addAuthor: function() {
      var self = this;
      self.autherr = ''
      if (self.newAuthor) {
          var data = new FormData();
          data.append("name", self.newAuthor);
          axios
            .post(
              getUrl()+'authors/',
              data,
              self.config
            )
            .then(function(response) {
              alert('add author')
                self.autherr = 'add author'
                self.getAllAuthors()
                self.newAuthor = ''
            })
            .catch(function(error) {
              console.log(error);
            });
       
      } else {
        self.autherr = "Enter author field!";
      }
    },
    checkAdmin: function() {
      var self = this;
      if (localStorage["hash"]) {
        self.user = JSON.parse(localStorage["hash"]);
        self.id = JSON.parse(localStorage["id"]);
        axios
          .get(getUrl()+'Client/' + self.id)
          .then(function(response) {
            //console.log(response.data.role);
            if (self.user === response.data.hash) {
              if (response.data.role == "admin") {
                self.role = response.data.role;
              } else {
                self.$router.push("/");
              }
            } else {
              self.$router.push("/");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.$router.push("/");
      }
    },
    getAllGenres: function() {
      var self = this;
      axios
        .get(getUrl()+'Genre/', self.config)
        .then(function(response) {
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
      var self = this
      self.autherr = ''
      axios
        .get(
          getUrl()+'authors/',
          self.config
        )
        .then(function(response) {
          if (response.status == 200) {
            self.authors = response.data;
          } else {
            self.errors = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  created() {
    this.checkAdmin()
    this.getAllAuthors()
    this.getAllGenres()
    this.getAllBooks()
    this.getUser()
  }
};
</script>

<style scoped>
.admin-main{
   background-image: url(/static/img/admin.jpg);
   margin-top: -60px;
   min-height: 350px;
}
.manu-left {
    background-image: url(/static/img/admin-left.jpg);
   
}
.main-btn {
  margin-top: 20px;
  margin-bottom: 20px;
}

h6 {
  font: 1.3em sans-serif;
  text-transform:uppercase;
  font-weight: bold;
  color: #49060E;
}
.new-author {
    font: 1.3em sans-serif;
    margin-top: 20px;
    margin-bottom: 20px;
}

.new-author input {
    width: 190px;
    border: 1px solid #0C5586;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 15px;
}
h4 {
   font: 1.6em sans-serif;
   text-transform:uppercase;
   padding-top: 20px;
}
.books-edit {
    width: 250px;
    height: 30px;
    border: 1px solid #0C5586;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 15px;
    font: 1.3em sans-serif;
}
.alert-danger p {
    font: 1.5em sans-serif;
}
.order-user {
  margin: 20px 0 20px 0;
}

</style>


