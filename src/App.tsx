import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 
import { BeatLoader } from "react-spinners";
import { motion, useAnimation } from "framer-motion"; 
import Header from "./components/Header";
import TokenEx from "./components/TokenEx";
import Service from "./components/Service";
import About from "./components/About";


const headerInVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const tokenExInVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: -40, transition: { duration: 1.2, delay: 1.0 } },
};

const ServicesInVariants = {
  hidden: { 
    opacity: 0, 
    clipPath: "inset(0 50% 0 50%)", 
  },
  visible: { 
    opacity: 1, 
    clipPath: "inset(0 0% 0 0%)",
    transition: { 
      duration: 0.8, 
      delay: 0.5, 
      ease: "easeOut" 
    }
  },
};

const App = () => {
  const [init, setInit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [isRender, setIsRender] = useState(false);

  const tokenHomeRef = useRef<HTMLDivElement>(null);
  const tokenServiceRef = useRef<HTMLDivElement>(null);
  const tokenAboutRef = useRef<HTMLDivElement>(null);
  const tokenRoadmapRef = useRef<HTMLDivElement>(null);

  // 애니메이션 컨트롤을 위해 framer-motion의 useAnimation 훅을 사용합니다.
  const serviceAnimation = useAnimation();
  const aboutAnimation = useAnimation();

  // 최소 1초 동안 로딩 스피너를 보여주기 위한 타이머 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
     console.log(tokenServiceRef.current);
    console.log(tokenAboutRef.current);
  }, [isRender]) 

  // tsParticles 초기화
  useEffect(() => {
    if (showSpinner) return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [showSpinner]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  // Intersection Observer로 컴포넌트의 가시성 확인
  useEffect(() => {
    const serviceElement = tokenServiceRef.current;
    const aboutElement = tokenAboutRef.current;
  

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === serviceElement) {
            if (entry.isIntersecting) {
              serviceAnimation.start("visible"); // 서비스가 보일 때 애니메이션 트리거
            }
          } else if (entry.target === aboutElement) {
            if (entry.isIntersecting) {
              aboutAnimation.start("visible"); // 어바웃이 보일 때 애니메이션 트리거
            }
          }
        });
      },
      { threshold: 0.0 } // 요소가 10% 이상 보이면 트리거
    );
    if (serviceElement) {
    console.log("Observing Service Element");
    observer.observe(serviceElement);
    }

    if (aboutElement) {
      console.log("Observing About Element");
      observer.observe(aboutElement);
    }

    if (serviceElement) observer.observe(serviceElement);
    if (aboutElement) observer.observe(aboutElement);

    return () => {
      if (serviceElement) observer.unobserve(serviceElement);
      if (aboutElement) observer.unobserve(aboutElement);
    };
  }, [isRender]);

  // 로딩 스피너 및 tsParticles 렌더링
  if (showSpinner) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        width: "100%", 
        height: "100vh", 
        backgroundColor: "#0C0E27", 
      }}>
        <BeatLoader size={20} color={"#ffffff"} />
      </div>
    );
  }

  if (!showSpinner && init) {
    return (
      <>
      <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: { value: "#0C0E27" },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              push: { quantity: 0 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: MoveDirection.none,
              enable: true,
              outModes: { default: OutMode.out },
              speed: 6,
            },
            number: { density: { enable: true }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />
      <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerInVariants}
      >
        <Header
          tokenHomeRef={tokenHomeRef}
          tokenAboutRef={tokenAboutRef}
          tokenRoadmapRef={tokenRoadmapRef}
          tokenServiceRef={tokenServiceRef}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={tokenExInVariants}
        ref={tokenHomeRef}
      >
        <TokenEx/> 
      </motion.div>

      <motion.div
        initial="hidden"
        animate={serviceAnimation} // 애니메이션 컨트롤러 적용
        variants={ServicesInVariants}
        ref={tokenServiceRef}
      >
        <Service setIsRender={setIsRender}/>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={aboutAnimation} // 애니메이션 컨트롤러 적용
        variants={ServicesInVariants}
        ref={tokenAboutRef}
      >
        <About/>
      </motion.div>
      </>
      </div>
      </>
    );
  }

  return null;
};

export default App;

