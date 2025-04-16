import { ethers } from 'ethers';
import { abi, address as contractAddress } from '../abis/MintNFT.json'; // Todo: 배포먼저 실행해주세요. (npm run deploy)
import { uploadMetaData } from '../pinata/apis/upload.metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

dotenv.config({ path: '.env' });

const provider = new ethers.JsonRpcProvider(
    'http://127.0.0.1:7545'
);
const privateKey = process.env.PRIVATE_KEY || '';

export const getSigner = () => {
    // Todo: privateKey를 이용하여 Wallet 인스턴스를 리턴합니다. - new ethers.Wallet(프라이빗 키, provider)

    return new ethers.Wallet(privateKey, provider);
};

export const getContract = () => {
    // Todo: DataType Contract 인스턴스를 리턴합니다. - new ethers.Contract(컨트랙트 주소, ABI, signer)
    // 이 후에 구현하는 컨트랙트 호출은 구현한 getContract를 사용합니다.
    return new ethers.Contract(contractAddress, abi, getSigner());
};

export const mint = async () => {
    const recipient = getSigner().address;
    const tokenUri = await uploadMetaData();

    // Todo: mint 함수는 컨트랙트의 mint 함수를 이용하여 NFT를 민팅해야 합니다. (리턴할 필요는 없습니다.)
    await getContract().mint(recipient, tokenUri);
};

// 아래 코드는 지우지 않습니다.
mint();
