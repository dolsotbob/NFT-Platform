import { Tnft } from '../utils/types';
import Loading from '../components/Loading';
import styles from './Components.module.css'

const NFTCard = ({ nft }: { nft: Tnft }) => {
    return (
        <div className={styles.nft_card}>
            {nft.image ? (
                <img
                    src={nft.image}
                    alt={nft.name}
                    className={styles.nft_image}
                />
            ) : (
                <Loading />
            )}
            <h3 className={styles.nft_name}>{nft.name}</h3>
            <p className={styles.metadata}>{nft.description}</p>
            <p className={styles.metadata}>Token ID: {nft.tokenId}</p>
            <p className={styles.metadata}>Owner: {nft.owner}</p>
            <p className={styles.metadata}>Contract: {nft.contract}</p>
            <p className={styles.metadata}>Network: {nft.network}</p>
            <p className={styles.metadata}>Symbol: {nft.symbol || ''}</p>
        </div>
    );
};

export default NFTCard;
