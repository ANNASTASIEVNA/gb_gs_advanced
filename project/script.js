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

    class GoodsItem {
      constructor({ product_name = "не найдено", price = "укажите цену"}= {}) {
        this.product_name = product_name;
        this.price = price;
      }
      
      render() {
        return `
        <div class="goods-item">
          <h3>${this.product_name}</h3>
          <p>${this.price}</p>
        </div>
      `;
      }
    }
    class GoodsList {
      items = [];
      filteredItems = []

      fetchGoods(callback) {
        service(GET_GOODS_ITEMS, (data)=>{
          this.items = data;
          this.filteredItems = data
          callback()
      });
    }

    filterItems(value) {
      return new Promise ((res) =>
      resolve(
        this.filteredItems = this.list.filter (({product_name}) =>{
          return product_name.match(new RegExp ( value, 'gui'))
        })
      )
      )
      .then(this.render)
    }

      totalPrice() {
        return this.items.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      }
    
      render(filterItems) {
        const goods = this.filterItems.map(item => {
          const goodItem = new GoodsItem(item);
          return goodItem.render()
        }).join('');
      
        document.querySelector('.goods-list').innerHTML = goods;
      }
    }
    
    const goodsList = new GoodsList();
    goodsList.fetchGoods()
    



    class bascetList {
      items = [];
      fetchGoods(callback = ()=>{}) {
          service (GET_BASKET_GOODS_ITEMS, (data)=>{
                  this.items = data;
                  callback();
              });
             }
        }
   
        const bascetList= new bascetList();
        bascetList.fetchGoods();

        document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
        const value = document.getElementsByClassName('goods-search')[0].value;
        goodsList.filterItems(value);
        goodsList.render();
        })