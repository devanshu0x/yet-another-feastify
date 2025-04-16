import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [foodlist,setFoodlist]=useState([]);

  const url="http://localhost:5000/";

  const fetchFoodList= async ()=>{
    const response = await axios.get(url+"api/food/list");
    setFoodlist(response.data.data);
}
  
  useEffect(() => {
    async function loadData() {
     
        await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      if (localStorage.getItem("admin")) {
        setAdmin(localStorage.getItem("admin")==="true");
      }
    }
    loadData();
  }, []);

  

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
    foodlist,

  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
