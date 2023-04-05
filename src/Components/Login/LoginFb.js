import {  signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signOut } from 'firebase/auth';
import { setDoc,doc,getDoc  } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import 'firebase/firestore';
import { updateToCart } from '../../store/cartSlice1';
import { useDispatch } from 'react-redux';
import './loginfb.css'

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const dispatch = useDispatch();

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
 
 

// function handleLogout
const handleLogout = async () => {
  await signOut(auth)
  .then(() => {
    // Đăng xuất thành công
    console.log("Đăng xuất thành công");
    console.log( auth.currentUser);
    dispatch(updateToCart());
  })
  .catch((error) => {
    console.log("Đăng xuất thất bại", error);
  });
};
 

  return (
    <div className='container d-flex justify-content-center mt-5 pt-5'>
      <div className='login d-flex w-50 shadow-2-strong ' >

      </div>
    </div>
  );
}
