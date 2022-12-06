export const getTheme = () => {
    let theme = 'light';

    if (document.getElementsByTagName('html')[0].classList.contains('dark')) {
        theme = 'dark';
    }

    return theme;
};
