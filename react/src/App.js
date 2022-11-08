import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';

//커뮤니티
import List from './community/List';
import Create from './community/Create';
import Detail from './community/Detail';

import GlobalStyle from './GlobalStyle';
import Edit from './community/Edit';

//회원가입
import Join from './user/Join';
import Login from './user/Login';
import { loginUser, logoutUser } from './redux/userSlice';

import firebase from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';




function App() {
	const dispatch = useDispatch();
	useEffect(()=>{
		//firebase로 현재 auth상태변화를 감지해서 파라미터 해당 상태값을 전달 ,userslice의 객체 받음
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log('userInfo', userInfo);
			if(userInfo === null) dispatch(logoutUser);
			else dispatch(loginUser(userInfo.multiFactor.user)) 
		})
	},[]);

	
	//  useEffect(() => {
	// //	//firebase의 로그인된 유저정보를 제거해서 강제 로그아웃처리 (테스트용도)
	// // 	firebase.auth().signOut();
	//  },[]);

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				{/* 라우터에 params설정 */}
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit/:num' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
