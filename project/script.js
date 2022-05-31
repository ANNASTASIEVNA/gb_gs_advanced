const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];

const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

function service(url, callback) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response))
  }
}
    class GoodsItem {
      constructor({ title, price }) {
        this.title = title;
        this.price = price;
      }
      render() {
        return `
        <div class="goods-item">
          <h3>${this.title}</h3>
          <p>${this.price}</p>
        </div>
      `;
      }
    }
    class GoodsList {
      items = [];
      fetchGoods(callback) {
        service(GET_GOODS_ITEMS, (data)=>{
          this.items = data;
          callback()
      });
    }
    
      totalPrice() {
        return this.items.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      }
    
      render() {
        const goods = this.items.map(item => {
          const goodItem = new GoodsItem(item);
          return goodItem.render()
        }).join('');
      
        document.querySelector('.goods-list').innerHTML = goods;
      }
    }
    
    const goodsList = new GoodsList();
    goodsList.fetchGoods();
    goodsList.render();



    class bascetList {
      iteams = [];
      fetchGoods(callback = ()=>{}) {
          service (GET_BASKET_GOODS_ITEMS, (data)=>{
                  this.items = data;
                  callback()
              });
             }
        }
        const GoodsList = new GoodsList();
        goodsList.fetchGoods(() => {
        goodsList.render();
      });
   
        const bascetList= new bascetList();
        bascetList.fetchGoods();
