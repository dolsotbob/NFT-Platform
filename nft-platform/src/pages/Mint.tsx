// NFT를 민팅하는 전체 과정을 담당하는 React 컴포넌트 
// 1. 이미지 업로드 >> 미리보기 
// 2. 메타데이터 입력 
// 3. 메타데이터를 IPFS에 업로드 
// 4. IPFS URI를 이용해 스마트 계약으로 NFT 민팅 
// 5. 완료 시 페이지 이동
import React, { useState } from 'react';
import Upload from '../components/Upload';  // 이미지 업로드용 컴포넌트 
import { mint } from '../utils/web3';  // NFT 민팅 함수 
import { Timage, Tmetadata } from '../utils/types';
import { uploadMetaData } from '../api/pinata';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Mint = () => {
    // 상태 관리
    const [img, setImg] = useState<Timage>({ url: '', preview: '' });
    const [metadata, setMetadata] = useState<Tmetadata>({
        name: '',
        discription: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // sessionStorage에서 지갑 주소와 프라이빗 키를 가져옴 
    const account = {
        address: sessionStorage.getItem('address') || '',
        privateKey: sessionStorage.getItem('privateKey') || '',
    };

    // 입력 필드(name 또는 description)가 변경되면 metadata 상태 업데이트 
    const handleMetadata = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMetadata({
            ...metadata,
            [e.target.name]: e.target.value,
        });
    };

    // 민팅 함수 
    const handleMint = async () => {
        setLoading(true);
        try {
            // 메타데이터를 IPFS에 업로드 -> URI 반환 
            const tokenUri = await uploadMetaData(metadata);
            if (!tokenUri) {
                setLoading(false);
                return;
            }

            const mintNFT = await mint(account, tokenUri);  // NFT 민팅 

            if (mintNFT) {
                navigate('/viewer');  // 민팅 성공 -> NFT 목록 페이지로 이동 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Upload 컴포넌트에서 전달받은 이미지 정보를 img와 metadata에 반영함 
    const handleImageUpload = (img: Timage) => {
        if (img.preview) {
            setImg(img);
            setMetadata((prevMetadata) => ({
                ...prevMetadata,
                image: img.url,  // 이미지의 IPFS URL을 metadata에 설정 
            }));
        }
    };

    return (
        <div>
            {loading ? (
                <Loading />  // 업로드 중일 때 로딩 화면 
            ) : img.preview ? (
                <div>
                    <img src={img.preview} alt="Preview"></img>
                    <div>
                        {Object.keys(metadata).map(
                            (key) =>
                                key !== 'image' && (
                                    <textarea
                                        key={key}
                                        name={key}
                                        value={metadata[key as keyof typeof metadata]}
                                        onChange={handleMetadata}
                                        placeholder={`NFT ${key}`}
                                    />
                                )
                        )}
                    </div>
                    <button
                        onClick={handleMint}
                    >
                        Mint
                    </button>
                </div>
            ) : (
                <Upload handleImageUpload={handleImageUpload} />
            )}
        </div>
    );
};

export default Mint;
