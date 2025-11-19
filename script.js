const redux = require('redux');
const createStore= redux.createStore  
const ORDER_PIZZA='ORDER_PIZZA'
// Action
// const action={
//     type:ORDER_PIZZA,
//     shop_name:"Pizza Shop"
// }


// Action Creator
function orderPizza(){
    return {
        type:ORDER_PIZZA,
    }    
}

// state
const initialState={
    pizzaBase:100,
}
// reducer
const reducer=(state=initialState,action)=>{
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

// STORE

// 1- Store needs to hold application state.
const store = createStore(reducer) // parameter should have initialstate instead of reducer but the key is. in  reducer we  are sending are initialstate and there is method which update the state . so that why we send reducer instead of initialstate

// 2- It exposes a method called getState which gives your application access to the current state in the store.
console.log("initialState",store.getState());   // initialState { pizzaBase: 100 }

// 3- Registers listeners via subscribe(listener)
const unsubscribe=store.subscribe(()=>console.log("upDated state",store.getState()));  // to listener the change in state we use subscribe method  
// when i call dispatch and call orderpizza which is and action and gone to reduce and it function as it define there  .the state is updated and if use only getstate. i will not get the updated  state . i will  get the original state which is initialState { pizzaBase: 100 } 
// but when i use subscribe and inside it i use getstate then i will get update state like  upDated state { pizzaBase: 99 } because subscribe is use to listner the change in state and that give the change to getstate


// 4- Allows state to be updated via dispatch(action)
store.dispatch(orderPizza())  //upDated state { pizzaBase: 99 }
store.dispatch(orderPizza())  // upDated state { pizzaBase: 98 }
store.dispatch(orderPizza())  //  upDated state { pizzaBase: 97 }
unsubscribe()  // if i call the unsubscribe than below it if i called  store.dispatch(orderPizza())  it will not  work
store.dispatch(orderPizza()) 