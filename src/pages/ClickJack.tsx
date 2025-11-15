import React from "react";

const ClickJack: React.FC = () => {
  //   const handleFakeClick = () => {
  //     alert("User thinks they clicked the fake button.");
  //   };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        // overflow: "hidden",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Iframe with your site */}
      <iframe
        title="chatbot-gmu-clickjack-test"
        src="https://chatbot-gmu.netlify.app"
        style={
          {
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   width: "100vw",
            //   height: "100vh",
            //   opacity: 0.1, // almost invisible
            //   pointerEvents: "auto",
            //   border: "none",
          }
        }
      />

      {/* Fake overlay UI */}
      {/* <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "1rem 2rem",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h2>Win a FREE iPhone 🎁</h2>
        <p>Click below to claim your prize.</p>
        <button
          onClick={handleFakeClick}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Claim Prize
        </button>
      </div> */}
    </div>
  );
};

export default ClickJack;
