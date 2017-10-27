<template>
  <div class="book-add col-md-8 col-md-offset-2">
    <h4>Edit Book</h4>
    <div class="alert-danger">{{errors}}</div>
    
      <div class="form-group">
        <label class="control-label col-sm-2" for="title">Book title: </label>
        <div class="col-sm-10">
         <input v-model="book.title" type="text" class="form-control"  placeholder="Enter title" name="titile">
        </div>
      </div>

      
      <div class="form-group">
        <label class="control-label col-sm-2" for="title">Book Price: </label>
        <div class="col-sm-10">
         <input v-model="book.price" type="text" class="form-control"  placeholder="Enter price" name="price">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="description">Decription: </label>
        <div class="col-sm-10">
         <textarea class="form-control" v-model="book.description" name="description" >Enter description</textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="discount">Discount: </label>
        <div class="col-sm-10">
         <input v-model="book.discount" type="text" class="form-control"  placeholder="Enter discount" name="discount">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2"  for="active">Show</label>
          <div class="col-sm-10 select-inp">
            <select v-model="active">
              <option value="" class="default">Show Book</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
      </div>
      <div >
        <button @click="eddBook()" class="btn btn-primary add-btn">Eddit Book</button>
      </div>
      <div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="authors">Select Authors: </label>
          <div class="col-sm-10 select-inp">
            <select  v-model ="selAuthors" multiple size="4" >
              <option v-for="author in authors" :value="author.id">{{author.name}}</option>
            </select>
          </div>
        </div>
         <div class="form-group">
          <label class="control-label col-sm-2" for="genres">Select Genres: </label>
          <div class="col-sm-10 select-inp">
            <select v-model="selGenres" multiple size="4" name="">
              <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
            </select>
          </div>
        </div>
       
         <button @click="changeBook()" class="btn btn-primary add-btn">Edit author and ganre</button>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'EditBook',
      beforeRouteUpdate(to, from, next) {
        if(this.getBook(to.params.id)){
        this.msg = ''
        next()
        }
    },
  data () {
    return {
      authors:'',
      genres:'',
      selAuthors:[],
      selGenres:[],
      errors: '',
      book:[],
      active: '',
      bookGenres:[],          
      bookAuthors:[],        
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    }
  },
  methods:{
    getBook: function(id) {
          var self = this
          self.selAuthors = []
          axios
            .get(
              getUrl()+'AdminBook/' + id + "/",
              self.config
            )
            .then(function(response) {
              if (response.status == 200) {
                self.book = response.data[id];
                self.bookGenres = response.data[id].genres;
                self.bookGenres.forEach(function(id) {
                self.selGenres.push(id.id)
                }); 
                self.bookAuthors = response.data[id].authors;
                self.bookAuthors.forEach(function(id) {
                self.selAuthors.push(id.id)
                 
                }); 
              } else {
                self.errors = response.data;
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        eddBook: function(){
      var self = this
      var data = {}
      data.id = self.book.id
      data.title = self.book.title
      data.price = self.book.price
      data.description = self.book.description
      data.discount = self.book.discount
      data.active = self.book.active
      if(!data.title){
      self.errors = 'Check Title'
      return false; 
      }
      if(!data.price){
        self.errors = 'Check Description'
        return false; 
      }
      if (!data.description){
        self.errors = 'Check Price'
        return false; 
      }
      if(!data.discount){
        self.errors = 'Check Discount'
        return false; 
      }
      if(data.active < 1){
      self.errors = 'Chek show or not book'
      return false;
    }
      axios.put(getUrl() + 'books/', data, self.config)
          .then(function (response) {
            alert('Book Edit')
            self.error = 
            self.$parent. getAllBooks()
         
      })
      //self.error = 'Book Edit'
          .catch(function (error) {
          console.log(error)
      })
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
    },
     changeBook: function(){
      var self = this
      var data = {}
      
      self.errors = ''

      if (self.selAuthors.length == 0)
      {
        self.errors = 'Choose genre'
      }
      if (self.selAuthors.length == 0)
      {
        self.errors = 'Choose Author'
      }
  

  axios.delete(getUrl() + 'AuthorsBook/' + self.book.id + '/'  , self.config)
          .then(function (response) {

            self.selAuthors.forEach(function(idAuthor){
        var data = {}
         data.id_book = self.book.id
         data.id_author = idAuthor
         axios.put(getUrl()+'AuthorsBook/', data, self.config)
         .then(function (response) {
          if (!response.data)
          {
            self.errors = response.data
          }
          self.errors = 'Genre/Author add to book!'
          })
        .catch(function (error) {
        console.log(error)
         })
      })
     })

     axios.delete(getUrl() + 'GenreBook/' + self.book.id + '/'  , self.config)
          .then(function (response) {

            self.selGenres.forEach(function(idGenre){
        var data = {}
         data.id_book = self.book.id
         data.id_genre = idGenre
         axios.put(getUrl()+'GenreBook/', data, self.config)
         .then(function (response) {
          if (!response.data)
          {
            self.errors = response.data
          }
          self.errors = 'Genre/Author add to book!'
          })
        .catch(function (error) {
        console.log(error)
         })
      })
     })
 
      if (self.errors == '')
      {
        self.errors = 'Book add successfully!'
        self.$parent.getAllBooks()
      }
    },
  },

     
  
  created(){
    this.getAllAuthors()
    this.getAllGenres()
    this.getBook(this.$route.params.id)
  }
}
</script>

<style scoped>
  h4{
   font: 1.4em sans-serif;
   font-weight: bold;
   text-transform:uppercase;
   padding-top: 20px;
  }
  .book-add {
    padding-bottom: 30px;
    text-align: center;
  }
  .book-add p {
    font: 1.2em sans-serif;
  }
  .book-add input {
    width: 200px;
    height: 30px;
    border: 1px solid #0C5586;
    margin-left: 10px;
    margin-bottom: 15px;
  }

  .book-add textarea {
    width: 500px;
    height: 100px;
    border: 1px solid #0C5586;
    margin-left: 10px;
    margin-bottom: 15px;
  }
  select {
    width: 250px;
    text-align: center;
    padding:5px 0 10px 0 ;
    font: 1.1em sans-serif;
   font-weight: bold;
  }
  .select-inp {
    padding-top: 15px;
  }
  .add-btn {
    margin-top: 20px ;
    padding: 10px 25px 10px 25px;
  }
 
</style>