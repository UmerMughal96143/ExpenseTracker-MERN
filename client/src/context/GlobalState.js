import React, {useState ,  createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  signUp : [] ,
  signIn : [],
  token : '',
};


// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [newToken, setToken] = useState("");

  async function signUpApi(signupData) {
    const config = {
      headers: {
        "Contectent-type": "application/json",
      },
    };
    try {
      await axios.post("/api/v1/users/signup", signupData, config);

      dispatch({
        type: "SIGN_UP",
        payload: signupData,
      });
      console.log(signupData);
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.error,
      });
    }
    // dispatch({
    //   type: "SIGN_UP",
    //   payload: signupData,
    // });
  }
async function signInApi(signInData) {

  
  const config = {
    headers: {
      "Contectent-type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/v1/users/signin", signInData, config);
    
    
     
    

    dispatch({
      type: "SIGN_IN",
      payload: [

        signInData,
        res.data.data.token,
      
    ]
    });
    console.log(signInData);
  } catch (err) {
    dispatch({
      type: "TRANSACTIONS_ERROR",
      payload: err,
    });
  }
 
}

  async function getTransactions() {
    
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaUBnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZjRmOTBmMTkyMTQ1NzFhZGNjY2IyZjUiLCJpYXQiOjE1OTkwNTI4NjQsImV4cCI6MTU5OTEzOTI2NH0.a4Uk2ZhgIfFnAKUJzwoKpyT8i1WEA3TPdIqurNrTxKQ";
      
        axios.interceptors.request.use(config => {
          config.headers.authorization = `Bearer ${token}`;
          return config ;
        },
        error => {
          return Promise.reject(error);
        }
        )
        const res = await axios.get("/api/v1/transactions" );
        console.log(res);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  // Actions
  async function deleteTransaction(id) {
    try {
      await axios.delete(
        `/api/v1/transactions/${id}`
      );
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Contectent-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/v1/transactions",
        transaction,
        config
      );

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
         dispatch({
           type: "TRANSACTIONS_ERROR",
           payload: err.response.data.error,
         });

    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        signUp: state.signUp,
        signIn : state.signIn,
        loading: state.loading,
        signUpApi,
        signInApi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
