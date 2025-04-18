import loading from '../assets/loading.gif';

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={loading} alt="loading"></img>
        </div>
    );
};

export default Loading; 
