import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { getNfts } from '../utils/web3';
import { Tnft } from '../utils/types';
import NFTCard from '../components/NFTCard';
import styles from '../components/Components.module.css';

const Viewer = () => {
  const address = sessionStorage.getItem('address') || '';

  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<Tnft[]>([]);

  useEffect(() => {
    const handleNFTs = async () => {
      setLoading(true);

      try {
        const nfts = await getNfts(address);
        setNfts(nfts);
      } catch (error) {
        console.error('NFT 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    handleNFTs();
  }, [address]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2>NFT 목록</h2>
          {nfts.length === 0 ? (
            <p>아직 보유한 NFT가 없습니다.</p>
          ) : (
            <div className={styles.nft_card_container}>
              {nfts.map((nft, index) => (
                <NFTCard key={index} nft={nft} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Viewer;