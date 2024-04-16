
import portfinder from 'portfinder';

export async function proparehost() {
    const result = await portfinder.getPortPromise({
        startPort: 8080, // Minimum port
    });

    return result;
}