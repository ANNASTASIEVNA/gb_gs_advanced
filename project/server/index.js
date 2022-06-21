import { writeFile, readFile } from 'fs/promises'
import  express  from 'express';
import cors from 'cors';

const GOODS_PATH = './public/goods.json'
const BASKET_GOODS_PATH = './public/basket_goods.json'

function getGoods(){
   return readFile(GOODS_PATH, 'utf-8').then((file) => JSON.parse(file));
}

function getBasketGoods(){
    return readFile(BASKET_GOODS_PATH, 'utf-8').then((file) => JSON.parse(file));
}

function getReformBasket(){
   return Promise.all([
      getBasketGoods(),
      getGoods()
    ]).then(([ basketGoods, goods ]) => {
      const result = basketGoods.map((_basketGood) => {
        const _good = goods.find(({ id }) => id === _basketGood.id);
        return {
          ..._basketGood,
        ..._good
        }
      })
      return result
      // req.send(JSON.stringify(result))
    });
    
  }

app.use(cors());
app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.public('public'))



app.get('/goods', (res, req) => {
    console.log(res.body)
    getBasketGoods().then((basket)=>{
     const basketGoodsItems= basket.find(({id: _id})=>_id===res.body.id );
     if(!basketGoodsItems){
       basket.push({
         id:res.body.id,
         count: 1,
       })
     } else {
     basket = basket.map((basketGoodsItems)=>{
        if (basketGoodsItems.id===res.body.id ){
          return {
            ...basketGoodsItems,
            count: basketGoodsItems.count+1
          }
        }else{
          return basketGoodsItems
      }
      })
     }
    return writeFile(BASKET_GOODS_PATH, JSON.stringify(basket)).then(()=>{
    return getReformBasket()
    }).then((result)=>{
      req.send(result)
    })
    })
})
app.delete('/basket', (res, req) => {
  console.log(res.body);
  removeFromBasket(BASKET_GOODS_PATH, res.body.id).then((items) => {
      req.setHeader('Content-type', 'application/json');
      req.send(items);
  })
});
app.get('/basket', (res, req) => {
  getReformBasket().then((result)=>{
    req.send(JSON.stringify(result))
  })
    Promise.all([
      getBasketGoods(),
      getGoods()
    ]).then(([ basketGoods, goods ]) => {
      const result = basketGoods.map((_basketGood) => {
        const _good = goods.find(({ id }) => id === _basketGood.id);
        return {
          ..._basketGood,
          data: _good,
          total: _good.price * _basketGood.count
        }
      })
      req.send(JSON.stringify(result))
    })
    
   });
  
  app.listen('8000', () => {
  console.log('server is starting!')
})