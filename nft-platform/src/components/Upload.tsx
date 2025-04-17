import React, { useState } from 'react';
import { uploadFileToIPFS } from '../api/pinata';   // IPFS 업로드 함수 
import { Timage } from '../utils/types';  // 이미지 타입 정의 

interface UploadProps {
    handleImageUpload: (img: Timage) => void;
}

// Upload 컴포넌트는 부모로부터 handleImageUpload라는 함수를 props로 전달받음.
// 업로드 완료 후, 이 함수를 통해 업로드된 이미지 정보를 부모에게 전달함.
const Upload: React.FC<UploadProps> = ({ handleImageUpload }) => {
    const [file, setFile] = useState<File | null>(null);  // 사용자가 선택한 파일 
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);  // 업로드 중 상태 표시용 

    // 파일 선택 시 실행됨 
    // 이미지 파일이면 미리보기를 생성해 preview에 저장 
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);

            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(selectedFile);
            }
        }
    };

    // 업로드 처리 함수 
    const handleUpload = async () => {
        if (!file) {
            alert('파일을 선택하세요.');
            return;
        }

        setUploading(true);

        // FormData를 사용해 IPFS에 보낼 준비 
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('network', 'public');

        // 실제 업로드를 시도하고 성공하면 부모 컴포넌트로 이미지 정보 전달; 실패하면 에러 표시 
        try {
            const result = await uploadFileToIPFS(formData);
            handleImageUpload({
                url: result,
                preview: preview,
            });
        } catch (error) {
            console.error('파일 업로드 실패:', error);
            alert('파일 업로드 실패!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div>
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ width: '300px', height: 'auto', borderRadius: '5px' }}
                    />
                ) : (
                    <input type="file" onChange={handleFileChange} />
                )}

                <button
                    onClick={handleUpload}
                    disabled={uploading}
                >
                    {uploading ? '업로드 중...' : '파일 업로드'}
                </button>
            </div>
        </div>
    );
};

export default Upload;