
const BASE_URL = 'http://localhost:8000';
const GET_GOODS_ITEMS = `${BASE_URL}goods.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}basket`

    function service(url) {
      return fetch(url)
      .then((response) => response.json())
    }

    function servicePost(url, body){
      return fetch(url, {
        method: 'POST',
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
    }
    
    const basketGoods = Vue.component('basket-goods', {
      data() {
        return {
          basketGoodsItems: []
        }
      },
  
      template: `
        <div class="fixed-area">
           <div class="basket-card">
              <div class="basket-card__header">
                 <h1 class="basket-card__header__title">basket card</h1>
                 <div class="basket-card__header__delete-icon"
                    v-on:click="$emit('closeclick')"
                 ></div>
              </div>
              <div class="basket-card__content">
                 content
              </div>
           </div>
        </div>
      `,
      mounted() {
  
      }
    })

    const goodsItem = Vue.component('goods-item', {
      props:[
        'item'
      ],
      template: `
      <div class="goods-item">
        <h3 class="goods-title">{{ item.product_name }}</h3>
        <p class="goods-price">{{ item.price }}</p>
      </div>`
    })
    const customSearch = Vue.component('custom-search', {
      template: 
      `
      <div>
        <slot></slot>
      </div>
      `
    })

    function init(){
      const app = new Vue({
        el: '#root',
        data: {
          items: [],
          filteredItems: [],
          search: '',
          isVisibleCart:false,
          plug:false,
          isVisibleError:false,
        },
        methods:{
        fetchGoods() {
              service(GET_GOODS_ITEMS).then((data)=>{
          this.items = data;
          this.filteredItems = data
      }).catch((data) => {
        console.log(data)
        this.isVisibleError = true;
      })
    },
    filterItems() {
        this.filteredItems = this.list.filter (({product_name}) =>{
          this.plug = false;
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
  });
}
window.onload = init
