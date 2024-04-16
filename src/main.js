import { request } from './requset/index.js';

async function  updateView() {
    // 如果xhr的接口是路径（比如'/api/text'），那么浏览器默认会加上当前的域名前缀
    const result = await request({ method: 'GET', url: '/api/text' });
    const container = document.getElementById('container');
    container.innerText = JSON.parse(result).msg;
}

updateView();