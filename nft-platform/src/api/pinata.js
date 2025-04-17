export const uploadFileToIPFS = async (formData) => {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${ProcessingInstruction.env.REACT_APP_PINATA_JWT}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("IPFS 업로드 실패");
    }

    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
};
