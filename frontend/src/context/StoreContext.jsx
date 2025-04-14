import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const url= "http://localhost:5000/"
    const [token,setToken]=useState("");
    const [cartItem,setCartItem]=useState({});
    const [foodlist,setFoodlist]=useState([]);

    const addToCart=async (itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart= async (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const deleteCartItem= async (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:0}))
        if(token){
            await axios.post(url+"api/cart/delete",{itemId},{headers:{token}})
        }
    }

    const loadCartData= async (token)=>{
        const response =await axios.post(url+"api/cart/get",{},{headers:{token}});
        setCartItem(response.data.cartData);
    }
    const fetchFoodList= async ()=>{
        const response = await axios.get(url+"api/food/list");
        setFoodlist(response.data.data);
    }
    useEffect(()=>{
        console.log(cartItem)
    },[cartItem])

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue={
        url,
        token,
        setToken,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        deleteCartItem,
        foodlist
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;