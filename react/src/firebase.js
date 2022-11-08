//firebase추가
import firebase from 'firebase/compat/app';
//firebase auth 추가
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEugGut828OBdTOGcuSSw38fu9hezFaYA",
  authDomain: "node-11-e.firebaseapp.com",
  projectId: "node-11-e",
  storageBucket: "node-11-e.appspot.com",
  messagingSenderId: "460762873299",
  appId: "1:460762873299:web:c85996557696e763724326"
};

//firebase 초기화 구문으로 수정
firebase.initializeApp(firebaseConfig);

//firebase 내보내기
export default firebase;