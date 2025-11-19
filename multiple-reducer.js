const redux = require('redux');
const createStore= redux.createStore  ;
const combineReducer =  redux.combineReducers;
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

const store = createStore(rootReducer) 


console.log("initialState",store.getState());   

const unsubscribe=store.subscribe(()=>console.log("upDated state",store.getState())); 

store.dispatch(orderPizza())  
store.dispatch(orderPizza())  
store.dispatch(orderPizza())
store.dispatch(orderBurger())
unsubscribe() 
store.dispatch(orderPizza()) 