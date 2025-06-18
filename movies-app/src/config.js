export async function loadConfig() {
    const response = await fetch('/config.json');
    if (!response.ok) {
        throw new Error('Error fetching config');
    }
    return await response.json();
}
