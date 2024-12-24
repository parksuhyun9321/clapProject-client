import styled from "styled-components"

/** @type {number} 애니메이션박스의 가로 크기 */
const boxWidth = 50;

/** @type {number} 애니메이션박스의 세로 크기 */
const boxHeight = 50;

/** @type {number} svg x 위치 */
const cx = 25;

/** @type {number} svg y 위치 */
const cy = 25;

/** @type {number} 원의 반지름 */
const radius = 20;

/** @type {string} svg의 배경 */
const fill = "none";

/** @type {number} 애니메이션 바의 굵기 */
const animationBarWidth = 10;

/** @type {string} 애니메이션 바의 색상 (hexcode)  */
const animationBarColor = "#0b85eb";

/** @type {Element} 애니메이션 바 */
const Spinner = styled.svg`
    
    animation: rotate 1s linear infinite;

    circle {
        stroke:${animationBarColor};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: translate(-50%,-50%), rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;

const LoadingView = ({ lightBgNull }) => {
    /** 애니메이션 바 부모 요소 css */
    const parentCss = {
        position:"absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
        height:"100%",
        backgroundColor : lightBgNull ? "" : "rgba(255,255,255,0.5)",
        zIndex:1,
    }

    return (
        <div style={parentCss}>
            <Spinner style={{
                width:`${boxWidth}px`,
                height:`${boxHeight}px`
            }}>
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill={fill}
                    strokeWidth={animationBarWidth}
                />
            </Spinner>
        </div>
        
    )
}

export default LoadingView