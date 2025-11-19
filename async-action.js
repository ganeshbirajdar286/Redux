const redux=require("redux");
const createStore = redux.createStore;
const applyMiddleware=redux.applyMiddleware;
const axios=require("axios");
const thunk = require("redux-thunk").thunk;
const FETCH_REQUEST='FETCH_REQUEST';
const FETCH_SUCCESS='FETCH_SUCCESS';
const FETCH_ERROR='FETCH_ERROR';

// state
const initialState={
    loading:false,
    product:[],
    error:false,
}
// action
function fetchRequest(){
    return {
        type:FETCH_REQUEST
    }
}
function fetchSuccess(product){
    return {
        type:FETCH_SUCCESS,
        payload:product,
    }
}
function fetchError(){
    return {
        type:FETCH_ERROR
    }
}

// Reducers
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading:false,
                products:action.payload

            }
        case FETCH_ERROR:
            return {
                ...state,
                loading:false,
                error:true
            }
        default:
            return state;
    }
}


// Thunk Action creator and  return a function not and action
const fetchProducts=()=>{  
    return function(dispatch){
        dispatch(fetchRequest())
        axios.get('https://fakestoreapi.com/products')
        .then(res=>{
            // res.data
            const products=res.data.map((product)=>product.title);
           dispatch(fetchSuccess(products))
            
           
            
        }).catch(error=>{
            dispatch(fetchError())
        })
    }
}
const store = createStore(reducer,
    applyMiddleware(thunk)
);

store.subscribe(()=>console.log(store.getState()));
store.dispatch(fetchProducts())