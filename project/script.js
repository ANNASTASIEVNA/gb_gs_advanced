
const BASE_URL = 'http://localhost:8000';
const GOODS = `${BASE_URL}goods`
const GET_GOODS_ITEMS = `${BASE_URL}goods.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}basket`
const REMOVE_GOOD_URL = "http://localhost:8000/basket";

    function service(url) {
      return fetch(url)
      .then((response) => response.json())
    }

    function serviceWithBody(url='',method="POST", body={}) {
      return fetch(
        url,
        {
          method,
          headers:{
            'Content-type':'aplication/json; charset=UTF-8',
          },
          body: JSON.stringify(body)
        }
        ).then((response) => response.json())
    }


function init(){
  const basketGoodsItems= Vue.component('basket-item',{
    props:[
      'iteam'
    ],
  })
}
    template: 
    <div class="basket-item">
      <div class="basket-item_field">
        <span class="basket-item__title">{{ item.data.product_name }}</span>
        <span class="basket-item__price">( {{ item.data.price }}р. )</span>
      </div>
       <div class="basket-item__count">
         <span>{{ item.count }}шт.</span>
         <button  v-on:click="$emit('add',item.id)">+</button>
         <button  v-on:click="$emit('delete',item.id)">-</button>
       </div>
       <div class="basket-item__total">Всего: {{ item.total }}р.</div>
    </div>

  const CustomButton=Vue.component('custom-button', {
    template: 
        <button class="search-button custom-button" type="button" v-on:click="$emit('click')">
           <slot></slot>
        </button>
      
  })
  const bascetGoods= Vue.component('basket-goods', {
    data() {
      return {
        basketGoodsItems: []
      }
    },
    
    template: 
        <div class="fixed-area">
           <div class="basket-card">
              <div class="basket-card__header">
                 <h1 class="basket-card__header__title">basket card</h1>
                 <div class="basket-card__header__delete-icon"
                    v-on:click="$emit('closeclick')"
                 ></div>
              </div>
              <div class="basket-card__content">
                 <basket-item
                  v-for="item in basketGoodsItems" 
                  :item="item"
                  @add="addGood"
                  @del="delGood"
                  ></basket-item>
              </div>
           </div>
        </div>
    
     

    mounted() {
      service(GET_BASKET_GOODS_ITEMS).then((data) => {
        this.basketGoodsItems = data
      })
    },

    methods:{
      addGood(id){
        serviceWithBody( GET_BASKET_GOODS_ITEMS, "POST",{
          id
        }).then((data) => {
          this.basketGoodsItems=data
        })
      },


  const goodsItem = Vue.component('goods-item', {
    props: [
      'item'
    ],
    template: 
        <div class="goods-item">
           <h3>{{ product_name }}</h3>
           <p>{{ price }}</p>
           <custom-button  v-on:click="addGood', item.id">добавить</custom-button>
        </div>
      

  methods: {
    addGood() {
      serviceWithBody(GOODS, "POST",{
        id: this.item.id
      })
    }
  }
}),
  deleteGood() {

  serviceWithBody('DELETE', REMOVE_GOOD_URL,{
    id
}) then.((data)=>{
  this.basketGoodsItems=data
})
  }
}
  }),

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
    }

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
