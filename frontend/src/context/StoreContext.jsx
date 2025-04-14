import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const url= "http://localhost:5000/"
    const [token,setToken]=useState("");
    const [cartItem,setCartItem]=useState({});
    const [foodlist,setFoodlist]=useState([]);
    const [addressesList,setAddressesList]=useState([]);

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
        const response =await axios.get(url+"api/cart/list",{headers:{token}});
        // console.log(response.data);
        setCartItem(response.data.cartData);
    }


    const fetchFoodList= async ()=>{
        const response = await axios.get(url+"api/food/list");
        setFoodlist(response.data.data);
    }

    const saveAddress= async (newAddress)=>{
        if(token){
            await axios.post(url+"api/user/saveaddress",{newAddress},{headers:{token}})
        }
    }
    
    const placeOrder= async(data)=>{
        try{
            const response=await axios.post(url+"api/order/place",{...data},{headers:{token}});
            console.log("order placed")
            return response.data.success;
        }catch(e){
            console.log(e);
            return false;
        }
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

    useEffect(()=>{
        async function loadAddress(){
            if(token){
                const response = await axios.get(url+"api/user/addresslist",{headers:{token}});
                setAddressesList(response.data.addresses);
            }
        }
        loadAddress();
    },[token])

    const contextValue={
        url,
        token,
        setToken,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        deleteCartItem,
        foodlist,
        addressesList,
        saveAddress,
        placeOrder
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;