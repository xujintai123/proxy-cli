class ProxyDataManager {

    id = Date.now();

    target = 'http://127.0.0.1:3001';

    changeTarget(nv: string) {
        this.target = nv;
    }
}


const proxyDataManager = new ProxyDataManager();

export { proxyDataManager };