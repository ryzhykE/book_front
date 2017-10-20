<template>
    <div class="row">
      <div class="col-md-offset-2 col-md-8">
        <router-link to='/'><button class="btn btn-warning">Main page</button></router-link>
        <h3>Order List</h3>
        <table v-if="checkUser > 0" class="table table-bordered">
          <thead>
          <tr class="info">
            <th class="thTable">Order</th>
            <th class="thTable">Date</th>
            <th class="thTable">First Name</th>
            <th class="thTable">Last Name</th>
            <th class="thTable">Payment</th>
            <th class="thTable">Status</th>
            <th class="thTable">User Discount</th>
            <th class="thTable">Total Discount</th>
            <th class="thTable">Total Price</th>
          </tr>
          </thead>
          <tbody v-for="order in orders">
            <tr v-on:click="listFullOrder(order.id)"   class="collapsed trOrders" data-toggle="collapse" :href="'#' + order.id" aria-expanded="false" :aria-controls="order.id">
              <td>{{order.id}}</td>
              <td>{{order.date_time}}</td>
              <td>{{order.first_name}}</td>
              <td>{{order.last_name}}</td>
              <td>{{order.name}}</td>
              <td>{{order.status}}</td>
              <td>{{order.discount}}</td>
              <td>{{order.total_discount}}$</td>
              <td>{{order.total_price}}$</td>
            </tr>
            <tr class="collapse" :id="order.id"  role="tabpanel" :aria-labelledby="order.id">
              <td colspan="9">
                  <table class="table table-hover table-bordered">
                    <thead>
                      <tr class="success">
                        <th class="thTable">Title</th>
                        <th class="thTable">Count</th>
                        <th class="thTable">Price</th>
                        <th class="thTable">Discount</th>
                      </tr>
                    </thead>
                    <tbody> 
                    <tr v-for="book in ordersFull">
                      <td>{{book.title_book}}</td>
                      <td>{{book.count}}</td>
                      <td>{{book.price}}</td>
                      <td>{{book.discount_book}}</td>
                    </tr>
                    </tbody>
                  </table>
              </td>
            </tr>
          </tbody>
        </table>   
        <div v-else >
            <p class="order-login">Please, login</p>
        </div>
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
      orders: [],
      ordersFull: [],
      checkUser: 0,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    listOrder: function() {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      axios
        .get("http://bookrest/user12/rest_book/client/api/orders/" + self.id)
        .then(function(response) {
          if (Array.isArray(response.data)) {
            self.orders = response.data;
          } else {
            self.error = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listFullOrder: function(id) {
      var self = this;
      axios
        .get("http://bookrest/user12/rest_book/client/api/OrderInfo/" + id)
        .then(function(response) {
          self.ordersFull = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCheck: function() {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.checkUser = 1;
      } else {
        self.checkUser = 0;
      }
    }
  },

  created() {
    this.listOrder();
    this.getCheck();
  }
};
</script>

<style scoped>
.order-login {
color: red;
   font: 1.6em sans-serif;
   padding-top: 20px;
   padding-bottom: 20px;
   text-transform:uppercase;
}
</style>


