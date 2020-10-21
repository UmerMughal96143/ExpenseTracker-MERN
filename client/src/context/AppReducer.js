export default (state, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...state,
        signUp: [...state.signUp, action.payload],
      };
    case "SIGN_IN":
      return {
        ...state,
        signIn: [...state.signIn, action.payload],
      };
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTIONS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
  
}