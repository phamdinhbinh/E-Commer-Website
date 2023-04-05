import {  signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signOut } from 'firebase/auth';
import { setDoc,doc,getDoc  } from 'firebase/firestore';
import {useSelector, useDispatch} from "react-redux";
import {Navigate } from "react-router-dom";
import { db, auth } from '../../firebase/firebase';
import 'firebase/firestore';
import { updateToCart,getStatusLogin } from '../../store/cartSlice1';
import './loginfb.css'

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const dispatch = useDispatch();
  const statusLogin = useSelector(getStatusLogin);
  const handleLogin = async (provider) => {
    const { user } = await signInWithPopup(auth, provider);
    const userRef = doc(db, 'users', user.uid); 
    const userDoc = await getDoc(userRef); 
  
    if (userDoc.exists()) {
      console.log('tài khoản đã tồn tại')
      dispatch(updateToCart());
    
    } else {
      await setDoc(userRef,{ 
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    }
  
  };
 
  return (
    statusLogin ? (<Navigate to ='/' />) : (
    <div className='container d-flex justify-content-center mt-5 pt-5'>
      <div className='login d-flex w-50 rounded-5 shadow-2-strong align-items-center justify-content-center ' >
          <button className='button-login rounded-3 ' onClick={() => handleLogin(fbProvider)}>
             Đăng nhập bằng Facebook 
          </button>
      </div>
    </div>)
  );
}
