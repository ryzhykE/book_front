<template>

  <div class="main container-fluid">
    
  <div class="row">
    <loginForm></loginForm>
    <div class="col-md-3 left-menu ">
    <p class="alert-danger">{{errors}}</p>
      <ul class="nav ">
        <li class="nav-header glyphicon glyphicon-list-alt"> Books</li>
          <li v-for="book in menuBooks"> <a href="#" @click=" filteredBooks(book.id)">{{book.title}}</a></li>
        <li class="nav-header glyphicon glyphicon-book"> Genre </li>
          <li v-for="genre in genres"><a href="#" @click=" filteredBooksGenre(genre.id)">{{genre.name}}</a></li>
        <li class="nav-header glyphicon glyphicon-user"> Author</li>
          <li v-for="author in authors"><a href="#" @click=" filteredBooksAuthor(author.id)">{{author.name}}</a></li> 
      </ul>
    </div>
    <div class="col-md-9">
      
     <div v-if="getGan !== 0" >
       <div  v-for="book in getGan"  class=" book-list">
        <h2><a href="#" @click=" filteredBooks(book.id)">{{book.title}}</a></h2>
        <img :src="book.img" class="img"  />
        <p><span>Author : </span> </p>
        <p v-for="author in book.authors" class="author">{{author.name}} </p>
        <p><span>Genre : </span> </p>
        <p v-for="genre in book.genres" class="genre">{{genre.name}}</p>
        <p><span>Price : </span> {{book.price}} $ </p>
        <p v-if="book.discount !== null">Discount: {{book.discount}} %</p>
      </div >
     </div>

     <div v-if="getAuth !== 0" class="">
       <div  v-for="book in getAuth"  class=" book-list">
        <h2><a href="#" @click=" filteredBooks(book.id)">{{book.title}}</a></h2>
        <img :src="book.img" class="img"  />
        <p><span>Author : </span> </p>
        <p v-for="author in book.authors" class="author">{{author.name}} </p>
        <p><span>Genre : </span> </p>
        <p v-for="genre in book.genres" class="genre">{{genre.name}}</p>
        <p><span>Price : </span> {{book.price}} $ </p>
        <p v-if="book.discount !== null">Discount: {{book.discount}} %</p>
      </div >
     </div>

     <div v-if="books !== 0" >
        <div v-for="book in books"  class="book-list">
          <h2><a href="#" @click=" filteredBooks(book.id)">{{book.title}}</a></h2>
          <img :src="book.img" class="img"  />
          <p><span>Author : </span> </p>
          <p v-for="author in book.authors" class="author">{{author.name}} </p>
          <p><span>Genre : </span> </p>
          <p v-for="genre in book.genres" class="genre">{{genre.name}}</p>
          <p><span>Price : </span> {{book.price}} $ </p>
          <p v-if="book.discount > 0 ">Discount: {{book.discount}} %</p>     
        </div>
      </div>

     <div v-if="oneBook !== 0" >
       <div  v-for="book in oneBook"  class="book-one">
        <h2>{{book.title}}</h2>
        <img :src="book.img" class="img"  />
        <p>
          <span>Description : </span>
          {{book.description}}
        </p>
        <p><span>Author : </span> </p>
        <p v-for="author in book.authors" class="author">{{author.name}} </p>
        <p><span>Genre : </span> </p>
        <p v-for="genre in book.genres" class="genre">{{genre.name}}</p>
        <p><span>Price : </span> {{book.price}} $ </p>
        <p v-if="book.discount !== null">Discount: {{book.discount}} %</p>
        <div v-if="checkUser != ''">
          <button class="btn" v-on:click="getBtnCountMinus()">-</button>
            <span class="count-book">{{ count }}</span>
          <button class="btn" v-on:click="getBtnCountPlus()">+</button>
          {{success}}
        <button  v-on:click="addToCart(book.id)" type="button" class="btn btn-success ">Add to cart</button>
        </div>
        </div >
     </div>
    </div>
    </div>  
  </div>

</template>

<script>
import axios from "axios";
import Login from "./Login";
export default {
  name: "Main",
  data() {
    return {
      books: "0",
      menuBooks: [],
      authors: [],
      genres: "0",
      errors: "",
      getGan: [],
      getAuth: [],
      oneBook: [],
      checkUser: "",
      count: 1,
      add: "",
      success: "",
      role: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
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
              //console.log(response.data.hash);
              if (self.hash === response.data.hash) {
                self.checkUser = 1;
                if (self.role == "admin") {
                  self.$router.push("/admin");
                }
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

    addToCart: function(id) {
      var self = this;
      self.success = ''
      self.add = 1;
      var data = new FormData();
      data.append("id_book", id);
      data.append("id_client", localStorage["id"]);
      data.append("count", self.count);
      axios
        .post(
          getUrl()+'cart/',
          data,
          self.config
        )
        .then(function(response) {
          if (response.data) {
            
            self.success = "book add to cart";
          } else {
            self.errors = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getBtnCountPlus: function() {
      var self = this;
      self.success = ''
      self.count += 1;
      return self.count;
    },
    getBtnCountMinus: function() {
      var self = this;
      self.success = ''
      if (self.count < 2) {
        self.count = 1;
      } else {
        self.count -= 1;
        return self.count;
      }
    },
    getCheck: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.checkUser = 1;
      } else {
        self.checkUser = "";
      }
    },
    getAllBooks: function() {
      var self = this;
      axios
        .get(getUrl()+'Books/', this.config)
        .then(function(response) {
          //console.log(response.data)
          if (response.status == 200) {
            self.books = response.data;
            self.menuBooks = response.data;
          } else {
            self.errors = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllGenres: function() {
      var self = this;
      axios
        .get(getUrl()+'Genre/', this.config)
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
        .get(
          getUrl()+'Authors/',
          this.config
        )
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
    filteredBooks: function(id) {
      var self = this
      self.success = ''
      axios
        .get(
          getUrl()+'Books/' + id + "/",
          this.config
        )
        .then(function(response) {
          //console.log(response.data)
          if (response.status == 200) {
            self.oneBook = response.data;
            self.books = 0;
            self.getAuth = 0;
            self.getGan = 0;
            self.count = 1;
          } else {
            self.errors = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filteredBooksGenre: function(id) {
      var self = this;
      self.success = ''
      axios
        .get(
          getUrl()+'GenreBook/' + id + "/",
          this.config
        )
        .then(function(response) {
          //console.log(response.data)
          if (response.status == 200) {
            self.getGan = response.data;
            self.books = 0;
            self.getAuth = 0;
            self.oneBook = 0;
          } else {
            self.errors = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filteredBooksAuthor: function(id) {
      var self = this;
      axios
        .get(
          getUrl()+'AuthorsBook/' + id + "/",
          this.config
        )
        .then(function(response) {
          //console.log(response.data)
          if (response.status == 200) {
            self.getAuth = response.data;
            self.books = 0;
            self.getGan = 0;
            self.oneBook = 0;
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
    this.getAllBooks() 
    this.getAllGenres() 
    this.getAllAuthors()
    this.checkUserA()
  },
  computed: {},
  components: {
    loginForm: Login
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background-image: url(/static/img/main.jpg);

}
.left-menu {
  padding-top: 20px;
  background-color: #F0F0F0;
}
.left-menu li {
  color: Black;
  font-size: 22px;
  padding-bottom: 5px;
}
.left-menu li a {
  font-size: 16px;
}
.book-list  {
  width: 370px;
  float: left;
}
.book-list img {
  padding-top: 10px;
  padding-bottom: 20px;
  width: 250px;
  height: 350px;
}
.book-list p span {
  font-weight: bold;
  font-size: 19px;
}
.book-list p {
  color: #535353;
  font-size: 16px;
}
.book-list a { 
  color: #131313;
  text-decoration: none;
}
.book-one {
  width: 90%;
  padding-left: 30px;
}
.book-one img {
  padding-top: 10px;
  padding-bottom: 20px;
  width: 350px;
  height: 450px;
}

.book-one p {
  color: #535353;
  font-size: 16px;
}

.book-one p span {
  font-weight: bold;
  font-size: 19px;
}
.count-book {
  font-weight: bold;
  font-size: 17px;
  margin-left: 10px;
  margin-right: 10px;
}



</style>
