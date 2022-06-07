const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];

const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

    function service(url) {
      return fetch(url)
      .then((response) => response.json())
    }

    function init(){
      const app = new Vue({
        el: '#root',
        data: {
          items: [],
          filteredItems: [],
          search: '',
          isVisibleCart:false,
          plug:false
        },
        methods:{
        fetchGoods() {
              service(GET_GOODS_ITEMS).then((data)=>{
          this.items = data;
          this.filteredItems = data
      });
    },
    filterItems() {
        this.filteredItems = this.list.filter (({product_name}) =>{
          return product_name.match(new RegExp (this.search, 'gui'))
        }) 
      },
    },
    visibleCart(){
      this.isVisibleCart == true ? this.isVisibleCart = false : this.isVisibleCart = true;
    },
computed:{
      totalPrice() {
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      }
    },
    mounted() {
      this.fetchGoods();
    }
  })
}
window.onload = init

      
