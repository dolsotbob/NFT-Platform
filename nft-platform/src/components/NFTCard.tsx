import { Tnft } from '../utils/types';
import Loading from '../components/Loading';

const NFTCard = ({ nft }: { nft: Tnft }) => {
    return (
        <div>
            {nft.image ? (
                <img
                    src={nft.image}
                    alt={nft.name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
            ) : (
                <Loading />
            )}
            <h3>{nft.name}</h3>
            <p>{nft.discription}</p>
            <p>
                Token ID: {nft.tokenId}
            </p>
            <p>
                Owner: {nft.owner}
            </p>
            <p>
                Contract: {nft.contract}
            </p>
            <p>Network: {nft.network}</p>
            <p>
                Symbol: {nft.symbol || ''}
            </p>
        </div>
    );
};

export default NFTCard;
