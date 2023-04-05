const resizeWindow = () => {
    window.resizeTo(
        window.outerWidth,
        Math.min(
            document.body.offsetHeight + 39,
            window.screen.availHeight - 60
        )
    );
};

export default resizeWindow;
