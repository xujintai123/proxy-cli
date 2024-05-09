import { request } from './requset/index.js';

const btnRef = document.getElementById('btn');

async function updateView() {
    const containerRef = document.getElementById('container');

    // 如果xhr的接口是路径（比如'/api/text'），那么浏览器默认会加上当前的域名前缀
    const result = await request({
        method: 'GET',
        url: '/api/text',
    });
    containerRef.innerText = JSON.parse(result).msg;
}

async function changeProxyTarget() {
    const inputRef = document.getElementById('input');

    // 请求切换代理的服务，将最新的代理值更新
    const data = await request({
        method: 'GET',
        url: `http://localhost:${process.env.CONNECTION_PORT}/change/proxy?target=${inputRef.value}`,
    });
    const result = JSON.parse(data);

    if (result.code === 200) {
        updateView();
    }

    alert(result.msg);
}

btnRef.addEventListener('click', changeProxyTarget);

updateView();
