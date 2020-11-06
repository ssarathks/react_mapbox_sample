import * as actionTypes from '../Actions/actionTypes'
const initialState = {
    isAuthenticated : false,
    userId : null,
    userEmail : null,
    loading : false,
    authError : null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
          return({
            ...state,
            loading : true
          })

        case actionTypes.SET_AUTH:
          if (action.user) {
            return({
              ...state,
              isAuthenticated : true,
              userId : action.user.uid,
              userEmail : action.user.email
            })
          }
          else{
            return({
              ...state,
              isAuthenticated : false,
              userId : null,
              userEmail : null
            })
          }
        
        case actionTypes.AUTH_FINISH:
          return({
            ...state,
            loading : false,
            authError : null
          })
        case actionTypes.AUTH_FAIL:
          return({
            ...state,
            loading : false,
            authError : action.error.message
          })
          
        default:
            return state
    }
}

export default authReducer