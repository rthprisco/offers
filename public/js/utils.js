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