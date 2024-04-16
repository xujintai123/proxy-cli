
import portfinder from 'portfinder';

export async function proparehost() {
    const result = await portfinder.getPortPromise({
        port: 3000,    // minimum port
        stopPort: 65535 // maximum port
    });

    return result;
}