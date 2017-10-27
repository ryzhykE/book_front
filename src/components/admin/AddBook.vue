<template>
  <div class="book-add col-md-8 col-md-offset-2">
    <h4>Add Book</h4>
    <div class="alert-danger">{{errors}}</div>
    
      <div class="form-group">
        <label class="control-label col-sm-2" for="title">Book title: </label>
        <div class="col-sm-10">
         <input v-model="title" type="text" class="form-control"  placeholder="Enter title" name="titile">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="title">Book Price: </label>
        <div class="col-sm-10">
         <input v-model="price" type="text" class="form-control"  placeholder="Enter price" name="price">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="description">Decription: </label>
        <div class="col-sm-10">
         <textarea class="form-control" v-model="description" name="description" >Enter description</textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="discount">Discount: </label>
        <div class="col-sm-10">
         <input v-model="discount" type="text" class="form-control"  placeholder="Enter discount" name="discount">
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
      <div v-if= "bookId.length == 0" >
        <button @click="addBook()" class="btn btn-primary add-btn">Add Book</button>
      </div>
      <div v-if="bookId" >
        <div class="form-group">
          <label class="control-label col-sm-2" for="authors">Select Authors: </label>
          <div class="col-sm-10 select-inp">
            <select v-model="selectedAuthors" multiple size="4" >
              <option v-for="author in authors" :value="author.id">{{author.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="genres">Select Genres: </label>
          <div class="col-sm-10 select-inp">
            <select v-model="selectedGenres" multiple size="4" name="">
              <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
            </select>
          </div>
        </div>
         <button @click="saveBook()" class="btn btn-primary add-btn">Save Book</button>
      </div>
     
      
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Book',
  data () {
    return {
      authors:'',
      genres:'',
      selectedAuthors:[],
      selectedGenres:[],
      strAuthors:'',
      strGenres:'',
      title:'',
      description:'',
      price:'',
      discount:'',
      active: '',
      errors: '',
      bookId: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    }
  },
  methods:{
    saveBook: function(){
      var self = this
      self.errors = ''
      self.strAuthors = ''
      self.strGenres = ''
      if (self.selectedGenres.length == 0)
      {
        self.errorMsg = 'Choose genre'
      }
      if (self.selectedAuthors.length == 0)
      {
        self.errorMsg = 'Choose Author'
      }
      
      self.selectedAuthors.forEach(function(idAuthor){
        var data = new FormData()
         data.append('id_book', self.bookId)
         data.append('id_author', idAuthor)
         axios.post(getUrl()+'AuthorsBook/', data, self.config)
         .then(function (response) {
          if (!response.data)
          {
            self.errors = response.data
          }
          })
        .catch(function (error) {
        console.log(error)
         })
         self.authors.forEach(function(author){
         if (author.id == idAuthor)
          {
             self.strAuthors += author.name + ' '
           }
         })
      })
      self.selectedGenres.forEach(function(idGenre){
        var data = new FormData()
        data.append('id_book', self.bookId)
        data.append('id_genre', idGenre)
        axios.post(getUrl()+'GenreBook/', data, self.config)
          .then(function (response) {
            if (!response.data)
            {
              self.errors = response.data
            }
          })
        .catch(function (error) {
        console.log(error)
        })
        self.genres.forEach(function(genre){
          if (genre.id == idGenre)
          {
            self.strGenres += genre.name + ' '
          }
        })
      })
        
      if (self.errors == '')
      {
        self.errors = 'Book add successfully!'
        self.historyBook()
        self.$parent.getAllBooks()
      }
      
    },
    historyBook: function(){
      var self = this
      var data = new FormData()
      data.append('title', self.title)
      data.append('genre', self.strGenres)
      data.append('author', self.strAuthors)
      data.append('price', self.price)
      axios.post(getUrl()+'HistoryBook/', data, self.config)
          .then(function (response) {
            if (! response.data)
            {
                self.errors = response.data
            }
          })
        .catch(function (error) {
        console.log(error)
        })
    },
    addBook: function(){
      var self = this
      self.errors = ''
      var data = new FormData()
      data.append('title', self.title)
      data.append('price', self.price)
      data.append('description', self.description)
      data.append('discount', self.discount)
      data.append('active', self.active)
      if(!self.title){
      self.errors = 'Check Title'
      return false; 
      }
      if(!self.description){
        self.errors = 'Check Description'
        return false; 
      }
      if (!self.price){
        self.errors = 'Check Price'
        return false; 
      }
      if(!self.discount){
        self.errors = 'Check Discount'
        return false; 
      }
      if(self.active < 1){
      self.errors = 'Chek show or not book'
      return false;
    }
      axios.post(getUrl()+'books/', data, self.config)
          .then(function (response) {
            if (response.data.id_book)
        {
          self.bookId = response.data.id_book
          self.errors = 'Book created, add author and genre!'
        }
        else
        {
          self.errors = response.data
        }
          //console.log(response.data);
      
        })
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
    }
  },
  created(){
    this.getAllAuthors()
    this.getAllGenres()
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