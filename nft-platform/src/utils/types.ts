// NFT 플랫폼에서 다루는 주요 데이터 타입 정의한 파일로서 
// 이 파일은 프론트와 백을 안정적으로 연결하고 타입 오류를 방지하려는 목적이 있음 

export interface Timage {
    url: string;
    preview: string | null;
}

export interface Tmetadata {
    name: string;
    discription: string;
    image: string;
}

export interface Taccount {
    address: string;
    privateKey: string;
}

export interface Tnft {
    tokenId: number;
    owner: string;
    contract: string;
    tokenURI: string;
    network: string;
    name: any;
    image: any;
    discription: any;
    symbol: void | [] | (unknown[] & []);
}
