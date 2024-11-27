export const formatTime = value => value > 9 ? value : '0' + value;

export function isLogged() {
    const user = localStorage.getItem('loggedInUser');
    return !!user;
}

export function linkCSS(path) {
    const css = document.createElement('link');

    css.rel = 'stylesheet';
    css.href = path;

    document.head.appendChild(css);
}