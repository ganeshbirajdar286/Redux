const redux = require('redux');
const createStore= redux.createStore  ;
const reduxLogger=require("redux-logger")
const combineReducer =  redux.combineReducers;
const logger = reduxLogger.createLogger()
const applyMiddlware=redux.applyMiddleware;

const ORDER_PIZZA='ORDER_PIZZA'
const ORDER_BURGER='ORDER_BURGER';


function orderPizza(){
    return {
        type:ORDER_PIZZA,
    }    
}

function orderBurger(){
    return {
        type: ORDER_BURGER
    }
}

const initialState={
    pizzaBase:100,
}

const initialStateForBurger={
    burgerBuns:200
}

const  reducerPizza=(state=initialState,action)=>{
    switch(action.type){
        case ORDER_PIZZA:
            return{
                ...state,
                pizzaBase:state.pizzaBase-1
            }
        default:
            return state;
    }
}

const reducerBurger=(state=initialStateForBurger,action)=>{
    switch(action.type){
        case ORDER_BURGER:
            return{
                ...state,
                burgerBuns:state.burgerBuns-1
            }
       
        default:
            return state;
    }
}

const rootReducer=combineReducer({
    pizza:reducerPizza,
    burger:reducerBurger
});

const store = createStore(rootReducer
    ,applyMiddlware(logger)
) 


console.log("initialState",store.getState());   

const unsubscribe=store.subscribe(()=>{}); // there is no value in subscribe  because we are using logger  

store.dispatch(orderPizza())  
// store.dispatch(orderPizza())  
// store.dispatch(orderPizza())
 store.dispatch(orderBurger())
// unsubscribe() 
// store.dispatch(orderPizza()) 


// OUTPUT 
// initialState { pizza: { pizzaBase: 100 }, burger: { burgerBuns: 200 } }
//  action ORDER_PIZZA @ 16:27:26.465
//    prev state { pizza: { pizzaBase: 100 }, burger: { burgerBuns: 200 } }
//    action     { type: 'ORDER_PIZZA' }
//    next state { pizza: { pizzaBase: 99 }, burger: { burgerBuns: 200 } }