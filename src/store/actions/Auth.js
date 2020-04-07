import * as actionTypes from './actions'
import axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START

    }
}

export const authSuccess = (token ,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId

    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error

    }
}
export const logout = () => {
    localStorage.removeItem('token' );
    localStorage.removeItem('expirationDate'); localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT, 
        
      

    }
}

export const checkAUthTimeout=(expirationTime)=>{
    return dispatch=>{
  setTimeout(()=>{
      dispatch(logout());

  },expirationTime*1000)
    }
} 

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const AuthData = {
            email: email,
            password: password,
            returnSecureToken:true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC5dn9QUHIWJb4YIwvvajWiFKlpXyZqdPo';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC5dn9QUHIWJb4YIwvvajWiFKlpXyZqdPo'
        }

        axios.post(url,AuthData)
        .then(response=>{
            console.log(response);
            const expirationDate =new Date( new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAUthTimeout(response.data.expiresIn))
       
        })
        .catch(err=>{
            dispatch(authFail(err));
        });
 
    };

}

export const setAuthRedirect =(path)=>{
    return{
           type:actionTypes.SET_AUTH_REDIRECT_PATH,
           path:path
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token= localStorage.getItem('token');
        
        if(!token){
            dispatch(logout());
        }else{
           
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate>new Date()){
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAUthTimeout((expirationDate.getTime()-new Date().getTime())/1000))
            }else{
                dispatch(logout())
            }
            
        }
        
    }
}