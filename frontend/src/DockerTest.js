import React, {useEffect, useState} from 'react';
import KasmVNC from 'kasmvnc';

const DockerContainer = () => {
    const [dockerHost, setDockerHost] = useState('localhost');
    const [dockerPort, setDockerPort] = useState('8685');
    const [dockerImage, setDockerImage] = useState('alpine:latest');
    const [dockerContainerName, setDockerContainerName] = useState('my-container');
    const [terminal, setTerminal] = useState(null);

    useEffect(() => {
        initKasmVNC();
        createTerminal();
    }, []);

    // kasmVNC 초기화 및 연결 설정
    const initKasmVNC = () => {
        const kasmVNCClient = new KasmVNC.Client();
        kasmVNCClient.setHost('localhost');
        kasmVNCClient.setPort('8685');
        kasmVNCClient.setShared(true);
        kasmVNCClient.setCredentials('vncuser', 'vncpassword');
        kasmVNCClient.setPath('websockify');
        kasmVNCClient.connect();
    };

    // 도커 컨테이너 생성
    const createContainer = async () => {
        try {
            const response = await fetch(`http://${dockerHost}:${dockerPort}/containers/create?name=${dockerContainerName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Image: dockerImage
                })
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    // 도커 컨테이너 시작
    const startContainer = async () => {
        try {
            const response = await fetch(`http://${dockerHost}:${dockerPort}/containers/${dockerContainerName}/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('도커 컨테이너를 성공적으로 시작했습니다.');
            } else {
                console.error('도커 컨테이너 시작에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 새로운 터미널 생성
    const createTerminal = async () => {
        const socket = new WebSocket(`ws://${dockerHost}:${dockerPort}/containers/${dockerContainerName}/attach/ws?stream=1&stdin=1&stdout=1&stderr=1`);

        socket.addEventListener('open', () => {
            const term = new window.Terminal({
                cursorBlink: true
            });
            term.open(document.getElementById('terminal'));
            term.onData((data) => {
                socket.send(data);
            });
            socket.addEventListener('message', (event) => {
                term.write(event.data);
            });
            setTerminal(term);
        });
    };

    return (
        <div>
            <h1>Docker 실행 환경</h1>
            <div>
                <label>
                    호스트:
                    <input type="text" value={dockerHost} onChange={(event) => setDockerHost(event.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    포트:
                    <input type="text" value={dockerPort} onChange={(event) => setDockerPort(event.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    이미지:
                    <input type="text" value={dockerImage} onChange={(event) => setDockerImage(event.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    컨테이너 이름:
                    <input type="text" value={dockerContainerName} onChange={(event) => setDockerContainerName(event.target.value)} />
                </label>
            </div>
            <div>
                <button onClick={createContainer}>컨테이너 생성</button>
                <button onClick={startContainer}>컨테이너 시작</button>
            </div>
            <div id="terminal"></div>
        </div>
    );
};

export default DockerContainer;
