<template>
  <div class="cart row"> 
      <p class="alert-danger">{{error}}</p>
      <div v-if="showCart">
          <div class="col-md-offset-2 col-md-8">
            <h4>Hello {{ login }} !</h4>
            <div v-if="cart.length != 0">
                <table  class="table table-bordered">
                <thead>
                    <tr>
                    <th>№</th>
                    <th>Title</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total with discount</th>
                    <th>Total with out discont</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cart" class="item">
                    <td>
                        <label>
                            <input type="checkbox" id="checkbox" v-model="cart[index].checked">
                        </label>
                    </td>
                    <td>{{item.title}}</td>
                    <td>
                        <button v-on:click="getCount('-', index)" type="submit" class="btn btn-default">-</button>
                            <input class="inputCount" type="text" v-model=" cart[index].count" />
                        <button v-on:click="getCount('+', index)" type="submit" class="btn btn-default">+</button> 
                    </td>
                    <td>{{item.price}}</td>
                    <td>{{item.discount}}</td>
                    <td>{{totalPrice(index)}}$</td>
                    <td>{{totalDisc(index)}}$</td>
                    </tr>
                </tbody>
            </table> 
                <button class="btn btn-info" v-on:click="updateCart()">Update cart </button>
                <button v-on:click="goCheckOut()" class="btn btn-success">To Checkout</button>
                <router-link to='/'><button class="btn btn-warning">Back to main</button></router-link>
            </div>
            <div v-else>
                <p class="empty-cart">Empty cart !</p>
                <router-link to='/'><button class="btn btn-warning">Main page</button></router-link>
            </div>
             <div class="total-sum">
                <p><span>Total price: </span>{{getTotalPrice}} $</p>
                <p><span>Client Discount: </span>{{clientDiscount}} %</p>
                <p><span>Total discount: </span>{{totalDiscount}} $</p>
            </div>
        </div>   
    </div>
    <div  v-if="showCheckOut" class="checkout">
     <h4>CheckOut</h4>
     <p>
        Payment cart
     </p>
     <div v-for="(payMeth, index) in payment" :key="payMeth.id">
        <input v-model="checkedPayment" name="id_payment" :value="payMeth.id" type="radio">
            <p class="radio-pay">{{payMeth.name}}</p>
        </input>
     </div>
     <button v-on:click="goCart()" class="btn btn-info">Back to Cart</button>
     <button v-on:click="addOrder()" class="btn btn-danger">Add Order</button>
    </div>
    <div  v-if="showSuccess">
          <p class="and-order">
           Thanks for your order !
          </p>
          <router-link class="link" to='/'><button class="btn btn-info">Back to main</button></router-link>
    </div>


    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cart",
  data() {
    return {
      error: "",
      cart: [],
      books: [],
      id: "",
      login: '',
      checkedPayment: "",
      clientDiscount: "",
      clientId: "",
      payment: "",
      showCheckOut: 0,
      showCart: 1,
      showSuccess: 0
    };
  },
  methods: {
    addOrder: function() {
      var self = this;
      self.error = "";
      if (!self.checkedPayment) {
        return (self.error = "Select a Payment Method!");
      }
      var data = new FormData();
      data.append("id_client", JSON.parse(localStorage["id"]));
      data.append("id_payment", self.checkedPayment);
      data.append("total_discount", self.totalDiscount);
      data.append("total_price", self.getTotalPrice);
      axios
        .post(
          "http://bookrest/user12/rest_book/client/api/orders/",
          data,
          self.config
        )
        .then(function(response) {
          self.addFullOrder(response.data.id_order);
          self.clearCart();
          self.goPaym();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clearCart: function() {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      axios
        .delete(
          "http://bookrest/user12/rest_book/client/api/orders/" + self.id,
          self.config
        )
        .then(function(response) {})
        .catch(function(error) {
          console.log(error);
        });
    },

    addFullOrder: function(order) {
      var self = this;
      self.cart.forEach(function(book) {
        var data = new FormData();
        data.append("id_order", order);
        data.append("id_book", book.id);
        data.append("title_book", book.title);
        data.append("count", book.count);
        data.append("price", book.price);
        data.append("discount_book", book.discount);
        axios
          .post(
            "http://bookrest/user12/rest_book/client/api/OrderInfo/",
            data,
            self.config
          )
          .then(function(response) {
            if (response.data !== 1) {
              self.error = response.data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },

    goPaym: function() {
      var self = this;
      self.showCart = 0;
      self.showCheckOut = 0;
      self.showSuccess = 1;
    },

    goCheckOut: function() {
      var self = this;
      self.showCart = 0;
      self.showCheckOut = 1;
      self.getPayment();
    },
    goCart: function() {
      var self = this;
      self.showCart = 1;
      self.showCheckOut = 0;
    },

    getPayment: function() {
      var self = this;
      var books = self.cart;
      axios
        .get(
          "http://bookrest/user12/rest_book/client/api/payment/",
          self.config
        )
        .then(function(response) {
          //console.log(response.data)
          self.payment = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateCart: function() {
      var self = this;
      var books = self.cart;
      axios
        .put(
          "http://bookrest/user12/rest_book/client/api/cart/",
          books,
          self.config
        )
        .then(function(response) {
          console.log(response.data);
          self.CartList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getClientDiscount: function() {
      var self = this;
      if (localStorage["id"]) {
        self.id = JSON.parse(localStorage["id"]);
        axios
          .get("http://bookrest/user12/rest_book/client/api/Client/" + self.id)
          .then(function(response) {
            if (response.data !== false) {
              self.clientDiscount = response.data.discount;
              self.clientId = response.data.id;
              return true;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        return false;
      }
    },

    totalPrice: function(index) {
      var self = this;
      var discount = +self.cart[index].price * +self.cart[index].discount / 100;
      self.cart[index].sum =
        (+self.cart[index].price - discount) * +self.cart[index].count;
      return self.cart[index].sum.toFixed(2);
    },
    totalDisc: function(index) {
      var self = this;
      var discount = +self.cart[index].price * +self.cart[index].discount / 100;
      self.cart[index].sum = +self.cart[index].price * +self.cart[index].count;
      return self.cart[index].sum.toFixed(2);
    },

    getCount: function(sym, index) {
      var self = this;
      if (sym == "+") {
        self.cart[index].count = +self.cart[index].count + 1;
      } else if (sym == "-") {
        self.cart[index].count -= 1;
        if (self.cart[index].count < 1) {
          self.cart[index].count = 1;
        }
      }
    },

    CartList: function() {
      var self = this;
      if (localStorage["id"]) {
        self.id = JSON.parse(localStorage["id"]);
        axios
          .get("http://bookrest/user12/rest_book/client/api/cart/" + self.id)
          .then(function(response) {
            if (response.data !== false) {
              self.cart = response.data;
              self.login = JSON.parse(localStorage["login"]);
              response.data.forEach(function(cart) {
                cart.checked = false;
              });
              return true;
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
  created() {
    this.CartList();
    this.getClientDiscount();
  },
  computed: {
    getTotalPrice() {
      var self = this;
      var total = 0;
      self.cart.forEach(function(book) {
        var discount = +book.price * +book.discount / 100;
        total += +(+book.price - discount) * +book.count;
      });
      var cliDisc = +total * +self.clientDiscount / 100;
      total = +total - cliDisc;
      total = total.toFixed(2);
      return total;
    },
    totalDiscount() {
      var self = this;
      var total = self.getTotalPrice;
      var totalWithout = 0;
      self.cart.forEach(function(book) {
        totalWithout += +book.price * +book.count;
      });
      var discount = +totalWithout - +total;
      return discount.toFixed(2);
    }
  }
};
</script>

<style scoped>
    h4 {
        color: #A0A0A0;
        font-size: 20px;
    }
    .cart {
  background-image: url(/static/img/cart.jpg);
  margin-top: -60px;
}
.inputCount{
    width: 45px;
    height: 30px;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
}
.total-sum {
    margin-top: 20px;
}
.total-sum p {
    font: 1.4em sans-serif;
}
.total-sum p span {
    color: #691F29;
}
.checkout {
    padding-top: 30px;
}
.checkout p {
    font: 1.6em sans-serif;
    
}
.radio-pay {
   color: green;
   font: 1.2em sans-serif; 
}
.and-order {
   color: red;
   font: 1.6em sans-serif; 
}
.empty-cart {
    color: red;
   font: 1.6em sans-serif;
   padding-top: 20px;
   padding-bottom: 20px;
   text-transform:uppercase;
}

</style>