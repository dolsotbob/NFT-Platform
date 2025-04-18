import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateKeyToAccount } from '../utils/web3';
import styles from './Pages.module.css';

const Main = () => {
    const [inputValue, setInputValue] = useState('');  // 사용자가 입력한 개인키 값을 저장하는 상태 변수 
    const navigate = useNavigate();  // 페이지 이동을 위한 함수 

    // 사용자가 버튼을 누르면 실행됨 
    // 개인키로 계정 정보를 만들고(privateKeyToAccount) 성공하면 다음 단계로 넘어감 
    const handleSubmit = () => {
        console.log('🔑 입력된 Private Key:', inputValue);

        const accountInfo = privateKeyToAccount(inputValue);

        if (accountInfo) {
            const account = {  // 지갑 주소와 개인키를 담는 객체 
                address: accountInfo?.address,
                privateKey: inputValue,
            };

            console.log('✅ account 생성 완료:', account);

            // sessionStorage: 사용자의 지갑 정보를 저장해 페이지 이동 후에도 사용할 수 있게 함
            sessionStorage.setItem('privateKey', account.privateKey);
            sessionStorage.setItem('address', account.address);

            // 페이지에 저장값이 바뀐 걸 다른 컴포넌트가 감지할 수 있도록 알림
            window.dispatchEvent(new Event('storage'));
            console.log('📢 storage 이벤트 디스패치 완료');

            console.log('➡️ /viewer 페이지로 이동합니다.');
            // viewer 페이지로 이동하며, 계정 정보를 함께 전달함
            navigate('/viewer', { state: { account } });
        } else {
            alert('Private Key를 입력해주세요!');
            console.error('❌ account 생성 실패 - 유효하지 않은 Private Key');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <textarea className={styles.textarea}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}  // 입력이 바뀔 때마다 inputValue 값을 업데이트 
                placeholder="Private Key를 넣어주세요."   // 입력 전 표시되는 힌트 텍스트 
            />
            <button className={styles.btn_submit} onClick={handleSubmit}>
                Wallet Connect
            </button>
        </div>
    );
};

export default Main;
