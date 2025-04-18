import Web3 from 'web3';
import MyNFT from './MyNFT.json';
import { Taccount } from './types';
import axios from 'axios';

const web3 = new Web3('https://public-en-kairos.node.kaia.io');

export const contract = new web3.eth.Contract(MyNFT.abi, MyNFT.address);

// 개인키로부터 계정 주소, 공개키, 서명 기능이 포함됨 Account 객체를 생성해줌 
export const privateKeyToAccount = (privateKey: string) => {
    try {
        const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
        console.log('✅ account:', account);
        return account;
    } catch (error) {
        console.error('❌ privateKeyToAccount', error);
        return null;
    }
};

export const mint = async (account: Taccount, tokenURI: string) => {
    try {
        const gas = await contract.methods
            .mint(account.address, tokenURI)
            .estimateGas({ from: account.address });
        console.log('✅gas estimate 완료:', gas);

        const gasPrice = await web3.eth.getGasPrice();
        console.log('✅gasPrice 가져옴:', gasPrice);

        const nonce = await web3.eth.getTransactionCount(account.address, 'latest');
        console.log('✅nonce 가져옴:', nonce);

        const tx = {
            from: account.address,
            to: contract.options.address,
            gas: web3.utils.toHex(gas),
            gasPrice: web3.utils.toHex(gasPrice),
            nonce: web3.utils.toHex(nonce),
            data: contract.methods.mint(account.address, tokenURI).encodeABI(),
        };
        console.log('✅ 트랜젝션 데이터 준비 완료:', tx);

        const signedTx = await web3.eth.accounts.signTransaction(
            tx,
            account.privateKey
        );
        console.log('✅ 서명된 트랜잭션:', signedTx);

        const receipt = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction as string
        );
        console.log('✅ 트랜잭션 성공! receipt:', receipt);

        return receipt;
    } catch (error) {
        console.error('❌ 트랜잭션 실패:', error);
    }
};

const getMetadata = async (tokenURI: string) => {
    try {
        console.log('📦 Fetching metadata from:', tokenURI);
        const response = await axios.get(tokenURI);
        console.log('✅ Metadata received:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Failed to fetch metadata:', error);
    }
};

export const getNfts = async (address: string) => {
    const nfts = [];

    try {
        const totalSupply = Number(await contract.methods.totalSupply().call());
        console.log('🔢 Total Supply:', totalSupply);

        for (let i = 0; i <= totalSupply; i++) {
            try {
                const owner: string | null | undefined = await contract.methods
                    .ownerOf(i)
                    .call();
                console.log(`🎯 Token ID ${i}: - Owner:`, owner);

                if (
                    owner &&
                    typeof owner === 'string' &&
                    owner.toLowerCase() === address.toLowerCase()
                ) {
                    console.log(`🧩 NFT owned by user: ${address}, tokenId: ${i}`);

                    const tokenURI: string =
                        (await contract.methods.tokenURI(i).call()) || '';
                    console.log(`🌐 tokenURI for tokenId ${i}:`, tokenURI);

                    const metadata = await getMetadata(tokenURI);
                    console.log(`🖼 Metadata for tokenId ${i}:`, metadata);

                    const nft = {
                        tokenId: i,
                        owner,
                        contract: MyNFT.address,
                        tokenURI,
                        network: 'kaia',
                        name: metadata.name,
                        image: metadata.image,
                        description: metadata.description,
                        symbol: await contract.methods.symbol().call(),
                    };

                    nfts.push(nft);
                }
            } catch (error) {
                console.error(`❌ Error while processing tokenId ${i}:`, error);
                continue;
            }
        }

        console.log('📦 All owned NFTs:', nfts);
        return nfts;
    } catch (error) {
        console.error('❌ Error in getNfts:', error);
        return [];
    }
};
