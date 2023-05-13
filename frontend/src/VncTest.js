import React, { useState } from 'react';
import axios from 'axios';

const VncButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [resultValue, setResultValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleVncConnect = () => {
        setIsLoading(true);

        axios.get('/users/openVNC')
            .then(response => {
                setIsLoading(false);
                // 새로운 탭에서 kasmVNC로 자동 접속
                setResultValue(response.data.result);
                window.open(response.data.result, '_blank');
            })
            .catch(error => {
                setIsLoading(false);
                setErrorMessage('VNC 접속 요청이 실패했습니다' + errorMessage);
                console.error('VNC 접속 요청이 실패했습니다:', error);
            });
    };

    return (
        <div>
            <button onClick={handleVncConnect} disabled={isLoading}>
                {isLoading ? 'VNC 접속 중...' : 'VNC 접속'}
            </button>
            {errorMessage && <p>{errorMessage}</p>}
            {resultValue && <p>서버의 값: {resultValue}</p>}
        </div>
    );
};

export default VncButton;