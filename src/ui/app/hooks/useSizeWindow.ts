import { useCallback, useEffect } from "react";

const useSizeWindow = () => {
  const sizeWindow = useCallback(() => {
    return;
    // const { body, documentElement } = document;
    // const height = Math.max(
    //     body.scrollHeight,
    //     body.offsetHeight,
    //     documentElement.clientHeight,
    //     documentElement.scrollHeight,
    //     documentElement.offsetHeight
    // );
    // // const width = Math.max(
    // //     body.scrollWidth,
    // //     body.offsetWidth,
    // //     documentElement.clientWidth,
    // //     documentElement.scrollWidth,
    // //     documentElement.offsetWidth
    // // );

    // window.resizeTo(documentElement.clientWidth, height);
  }, []);

  useEffect(() => {
    window.onload = sizeWindow;
  });

  return sizeWindow;
};

export default useSizeWindow;
