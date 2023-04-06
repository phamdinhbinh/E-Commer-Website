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
    <div className='container-fluid'>
      <div className='row justify-content-center mt-5 pt-5'>
        <div className='col-sm-12 col-md-8 col-lg-6'>
          <div className='card shadow-sm rounded'>
            <div className='card-body'>
              <h5 className='card-title mb-4'>Đăng nhập</h5>
              <button className='btn btn-outline-primary btn-lg mb-3 w-100' onClick={() => handleLogin(googleProvider)}>
                Đăng nhập bằng Google
              </button>
              <button className='btn btn-outline-primary btn-lg w-100' onClick={() => handleLogin(fbProvider)}>
                Đăng nhập bằng Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}
