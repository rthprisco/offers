export const formatTime = value => value > 9 ? value : '0' + value;

export function isLogged() {
    const user = localStorage.getItem('loggedInUser');
    return !!user;
}

export function linkCSS(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Falha ao carregar o CSS: ${href}`));
        document.head.appendChild(link);
    })
}