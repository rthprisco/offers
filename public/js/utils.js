export function linkCSS(path) {
    const css = document.createElement('link');

    css.rel = 'stylesheet';
    css.href = path;

    document.head.appendChild(css);
}