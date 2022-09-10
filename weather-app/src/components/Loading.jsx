import React from 'react'
import Lottie from 'react-lottie'
import loading from "../lotties/loading.json";

function Loading() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }

  return (
    <div className="loading">
        <Lottie options={{ animationData: loading, ...defaultOptions }} width={300} height={300} style={{padding: 20}}/>
    </div>
  )
}

export default Loading