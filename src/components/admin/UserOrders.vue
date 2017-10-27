<template>
    <div class="row order-back">
      <div class="col-md-offset-2 col-md-8">
        <p class="alert-danger">{{error}}</p>
        <div v-if="orders.length != 0 " >
            <h3>Order List</h3>
          <table class="table table-bordered">
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
            <tbody v-for="(order, index) in orders">
              <tr v-on:click="listFullOrder(order.id)" class="collapsed trOrders tr-ord" data-toggle="collapse" :href="'#' + order.id" aria-expanded="false" :aria-controls="order.id">
                <td >{{order.id}}</td>
                <td>{{order.date_time}}</td>
                <td>{{order.first_name}}</td>
                <td>{{order.last_name}}</td>
                <td>{{order.name}}</td>
                <td>
                  <select v-model="orders[index].status" v-on:change="saveStatus(orders[index].status,orders[index].id )">
                    <option value="processed">Processed</option>   
                    <option value="sent">Sent</option>
                  </select>
                </td>
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
                          <th class="thTable">Discount Book</th>
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
      
        </div>
        <div v-else>
            <p class="no-order"> 
              You have no orders !
            </p>
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
      orderid: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
      saveStatus: function(index,id){
      var self = this
      var data = {}
      data.id = id 
      data.status = index
      axios.put(getUrl()+'orders/', data, self.config)
        .then(function (response) {
          self.listOrder()
        if (response.data == 'OK')
        {
            self.error = 'Order №' + data.id +  ' - Status changed!'
        }
        else
        {
            self.error = response.data
        }
      })
          .catch(function (error) {
          console.log(error)
      })
          
    },
    listOrder: function() {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      axios
        .get(getUrl()+'orders/')
        .then(function(response) {
          if (Array.isArray(response.data)) {
            self.orders = response.data;
             self.orderid = response.data.id;
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
        .get(getUrl()+'OrderInfo/' + id + "/")
        .then(function(response) {
          self.ordersFull = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },

  created() {
    this.listOrder();
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
.no-order {
  font: 1.6em sans-serif;
  padding-top: 20px;
  text-transform:uppercase;
  color: red;
}

.main-btn {
  margin-top: 40px;
}

.tr-ord td {
  color: #3B0C0C;
  font-size: 19px;
  font-weight: bold;
}
</style>


