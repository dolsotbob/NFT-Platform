import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { privateKeyToAccount } from '../utils/web3';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const accountInfo = privateKeyToAccount(inputValue);

        if (accountInfo) {
            const account = {
                address: accountInfo?.address,
                privateKey: inputValue,
            };

            sessionStorage.setItem('privateKey', account.privateKey);
            sessionStorage.setItem('address', account.address);

            window.dispatchEvent(new Event('storage'));

            navigate('/nfts', { state: { account } });
        } else {
            alert('Private Key를 입력해주세요!');
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
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Private Key를 넣어주세요."
                style={{
                    width: '500px',
                    height: '40px',
                    padding: '8px',
                    lineHeight: '24px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    resize: 'none',
                }}
            />
            <button
                onClick={handleSubmit}
                style={{
                    height: '40px',
                    padding: '8px 20px',
                    lineHeight: '24px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                }}
            >
                Wallet Connect
            </button>
        </div>
    );
};

export default Main;
