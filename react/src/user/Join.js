import Layout from '../common/Layout'
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import { logoutUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const BtnSet = styled.div`
    margin-top:20px;
`

function Join() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Email, setEmail] =useState('');
    const [Pwd1, setPwd1] = useState('');
    const [Pwd2, setPwd2] = useState('');
    const [Name, setName] = useState('');

    const handleJoin = async () =>{
        if( !(Name && Email && Pwd1 && Pwd2)) return alert('모든 양식을 입력하세요.');
        if(Pwd1 !== Pwd2) return alert('비밀번호 두개를 동일하게 입력하세요.');
        if(Pwd1.length < 6) return alert('비밀번호는 최소 6글자 이상 입력하세요.')

        //위의 조건을 통과해서 회원가입을 하기위한 정보값을 변수에 할당
        //이때 await문으로 firebase를 통해서 인증완료 이후에 동기적으로 다음코드 처리
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);

        //반환된 use정보값에 displayName이라는 키값으로 닉네임 추가등록
        await createdUser.user.updateProfile({displayName : Name})

        //firebase로 부터 인증정보값이 넘어보면 해당정보값을 다시 객체에 옮겨 담음
        const item = {
            email : createdUser.user.multiFactor.user.email,
            displayName : createdUser.user.multiFactor.user.displayName,
            uid : createdUser.user.multiFactor.user.uid
        }

        //회원가입요청시 로그아웃되는 시점을 좀더 빨리 처리 
        firebase.auth().signOut();
        dispatch(logoutUser());

        //서버쪽에 post요청 보내기
        axios.post('/api/user/join', item).then(res => {            
            if (res.data.success) {
                //회원가입에 성공하면 다시 전역 store의 로그인정보값을 변경해서 화면 재랜더링
                //로그인시 header에 사용자 이름이 출력되지 않던 문제점 해결
               // dispatch(loginUser(createdUser.user))  //바로로그인처리
                //navigate('/login');
                
                alert('회원가입이 완료되었습니다.');
                navigate('/login');
              }
            else return alert('회원가입에 실패했습니다.');
        })
       // console.log(createdUser.user);        
    }

  return (
    <Layout name={'Join'}>
        <input type="email" value={Email} placeholder='이메일 주소를 입력하세요.' onChange={e=> setEmail(e.target.value)}/> 
        <input type="password" value={Pwd1} placeholder='비밀번호를 입력하세요.' onChange={e=> setPwd1(e.target.value)} />  
        <input type="password" value={Pwd2} placeholder='비밀번호를 재 입력하세요.' onChange={e=> setPwd2(e.target.value)} /> 
        <input type="text" value={Name} placeholder='사용자 명을 입력하세요.' onChange={e=> setName(e.target.value)} /> 

        <BtnSet>
            <button onClick={()=>navigate(-1)} >가입취소</button>
            <button onClick={handleJoin}>회원가입</button>
        </BtnSet>
    </Layout>
  );
}

export default Join;



