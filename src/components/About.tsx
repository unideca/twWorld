import { Button, Flex, Grid, Img, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion"; 

interface AboutProps {
    isRender : boolean;
    tokenExInVariants : Variants;
    language : string;
}

const About : FC<AboutProps> = ({isRender, tokenExInVariants, language}) => {

    const aboutMidAnimation = useAnimation();

    useEffect(() => {
        const targetElement = document.querySelector('#aboutMid');
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if(entry.target === targetElement) {
                    if(entry.isIntersecting) {
                        aboutMidAnimation.start("visible");
                    }
                }
            },
            {threshold: 0.0}
        )
        if(!targetElement) return;
        observer.observe(targetElement);

        return () => {
            observer.unobserve(targetElement);
        }
    },[isRender])

    return (
        <>
        {language === "EN" ? <Flex
            w="100%"
            minH="70vh"
            color="white"
            pt={32}
            zIndex={2}
            flexDir="column"
            alignItems="center"
        >
            <Text fontSize="26px" mb={20}>
                About The Theme Healing World
            </Text>
            <motion.div
            initial="hidden"
            animate={aboutMidAnimation}
            variants={tokenExInVariants}
            >
                <Grid templateColumns={['repeat(1,1fr)','repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)']} w={["330px","330px","780px","1000px","1000px","1000px","1000px"]} mx="auto" id="aboutMid">
                    <Flex justifyContent="center">
                        <Img src="images/about.png"/>
                    </Flex>
                    <Flex flexDir="column" justifyContent="center" alignItems="center">
                        <Text>Theme Healing World is one of the most transformative technologies since the invention of the Internet. 
                            Theme Healing World stands firmly in support of financial freedom and the liberty that THW provides 
                            globally for anyone to voluntarily participate in a permissionless and decentralized network.<br></br><br></br>
                            which empowers people to not be marginalized by governments and financial institutions. THW is freedom.
                        </Text>
                        <Button
                            w={["140px","140px","140px","140px","140px","220px","220px"]}
                            h={["36px","36px","36px","36px","36px","52px","52px"]}
                            fontSize={["16px","16px","16px","16px","16px","22px","22px"]} 
                            mt={8}
                            bgGradient="linear(to-r, #ff3b8f, #ff9a3b)" 
                            color="white"
                            borderRadius="24px"
                            overflow="hidden"
                            _hover= {{
                                backgroundColor : "#0C0E27",
                                _before : {
                                    transform : "translateX(100%)",
                                },
                            }}
                            _before={{
                                content : "''",
                                position : "absolute",
                                top : "0",
                                left : "0",
                                width : "100%",
                                height : "100%",
                                background : "rgba(255, 255, 255, 0.3)",
                                transition : "transform 0.5s ease",
                                transform : "translateX(0%)",
                            }}
                            >Let's Start</Button>
                    </Flex>
                </Grid>
            </motion.div>
        </Flex>
        
        : 
        
        <Flex
            w="100%"
            minH="70vh"
            color="white"
            pt={32}
            zIndex={2}
            flexDir="column"
            alignItems="center"
        >
            <Text fontSize="26px" mb={20}>
                테마 힐링 월드
            </Text>
            <motion.div
            initial="hidden"
            animate={aboutMidAnimation}
            variants={tokenExInVariants}
            >
                <Grid templateColumns={['repeat(1,1fr)','repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)']} w={["330px","330px","780px","1000px","1000px","1000px","1000px"]} mx="auto" id="aboutMid">
                    <Flex justifyContent="center">
                        <Img src="images/about.png"/>
                    </Flex>
                    <Flex flexDir="column" justifyContent="center" alignItems="center">
                        <Text>테마 힐링 월드는 인터넷이 발명된 이후 가장 혁신적인 기술 중 하나입니다. 테마 힐링 월드는 THW가 세계적으로 제공하는 재정적 자유와 누구나 허가 없이 분산된 네트워크에 자발적으로 참여할 수 있는 자유를 확고히 지지합니다.<br></br><br></br>
                        이는 사람들이 정부와 금융 기관에 의해 소외되지 않도록 힘을 실어줍니다. THW는 자유입니다.
                        </Text>
                        <Button
                            w={["140px","140px","140px","140px","140px","220px","220px"]}
                            h={["36px","36px","36px","36px","36px","52px","52px"]}
                            fontSize={["16px","16px","16px","16px","16px","22px","22px"]} 
                            mt={8}
                            bgGradient="linear(to-r, #ff3b8f, #ff9a3b)" 
                            color="white"
                            borderRadius="24px"
                            overflow="hidden"
                            _hover= {{
                                backgroundColor : "#0C0E27",
                                _before : {
                                    transform : "translateX(100%)",
                                },
                            }}
                            _before={{
                                content : "''",
                                position : "absolute",
                                top : "0",
                                left : "0",
                                width : "100%",
                                height : "100%",
                                background : "rgba(255, 255, 255, 0.3)",
                                transition : "transform 0.5s ease",
                                transform : "translateX(0%)",
                            }}
                            >Let's Start</Button>
                    </Flex>
                </Grid>
            </motion.div>
        </Flex>}
        </>
        
    )
}

export default About;