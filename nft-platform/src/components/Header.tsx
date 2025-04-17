import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

    // 아래는 지갑 연결 상태 실시간으로 관리하기 위한 코드 
    // sessionStorage에 저장된 지갑 주소를 React 상태로 불러오고, 
    // 다른 탭에서 주소가 바뀌면 현재 탭에서도 자동으로 반영되게 하고 있음 
    // sessionStorage는 localStorage와는 달리 탭 닫으면 저장된게 사라짐 
    // (나중에 도전) 로그인/로그아웃 버튼 추가?? 

    // 상태 정의: isAccount는 현재 sessionStorage에 있는 지갑 주소 
    // 브라우저의 sessionStorage에서 'address'라는 키를 찾아서 상태로 저장함; 없으면 빈 문자열로 시작
    const [isAccount, setIsAccount] = useState(
        sessionStorage.getItem('address') || ''
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAccount(sessionStorage.getItem('address') || '');
        };

        // 다른 탭에서 sessionStorage가 바뀌었는지 감지 >> setIsAccount(...): 상태를 새 address로 업데이트
        window.addEventListener('storage', handleStorageChange);

        // 컴포넌트가 사라질 때 이벤트 제거 (메모리 누수 방지)
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <header>
            <nav className="nav">
                {isAccount ? (
                    <>
                        <Link className="nav-item" to="/">홈</Link>
                        <Link className="nav-item" to="/viewer">NFT</Link>
                        <Link className="nav-item" to="/mint">Mint</Link>
                    </>
                ) : (
                    <Link className="nav-item" to="/">홈</Link>
                )}
            </nav>
        </header>
    );
}

export default Header; 