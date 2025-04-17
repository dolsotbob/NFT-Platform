import React, { useState } from "react";
// @ts-ignore
import { uploadFileToIPFS } from "../api/pinata";
import { ethers } from "ethers";
// @ts-ignore
import NFTPlatform from "../artifacts/contracts/NFTPlatform.sol/NFTPlatform.json";
import { mint } from "../utils/ethers";
import "../App.css";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // 여기에 배포된 주소 입력

function Mint() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [minting, setMinting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUploadAndMint = async () => {
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);
            formData.append("network", "public");

            const ipfsUrl = await uploadFileToIPFS(formData);
            console.log("IPFS에 업로드 완료:", ipfsUrl);

            setMinting(true);
            await mint(ipfsUrl);
            alert("NFT 민팅 성공!");
        } catch (error) {
            console.error(error);
            alert("민팅 실패!");
        } finally {
            setUploading(false);
            setMinting(false);
        }
    };

    return (
        <div className="container">
            <label htmlFor="file-upload" className="btn-upload">
                파일 선택
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            <button className="btn-upload"
                onClick={handleUploadAndMint}
                disabled={uploading || minting}
            >
                {uploading ? "업로드 중..." : minting ? "민팅 중..." : "파일 업로드 및 민팅"}
            </button>

            {preview && (
                <img
                    src={preview}
                    alt="미리보기"
                    style={{ width: "200px", marginTop: "10px" }}
                />
            )}
        </div>
    );
}

export default Mint;
