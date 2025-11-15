import { jsx as _jsx } from "react/jsx-runtime";
const ClickJack = () => {
    //   const handleFakeClick = () => {
    //     alert("User thinks they clicked the fake button.");
    //   };
    return (_jsx("div", { style: {
            position: "relative",
            width: "100vw",
            height: "100vh",
            // overflow: "hidden",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }, children: _jsx("iframe", { title: "chatbot-gmu-clickjack-test", src: "https://chatbot-gmu.netlify.app", style: {
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   width: "100vw",
            //   height: "100vh",
            //   opacity: 0.1, // almost invisible
            //   pointerEvents: "auto",
            //   border: "none",
            } }) }));
};
export default ClickJack;
