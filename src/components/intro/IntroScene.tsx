import React, { useState, useEffect } from 'react';
import { Container, Text, Button, Group } from '@mantine/core';
import { motion } from 'framer-motion'; 
import { setSetting } from '@/utils/data'; 
import { Particles } from '@tsparticles/react'; // For particle effects
import { useTranslations } from 'next-intl';
import { IconArrowRight, IconSkateboarding } from '@tabler/icons-react';

interface IntroSceneProps {
    onComplete: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
    const t = useTranslations();
    const [scene, setScene] = useState(1); 
    const [narrativeData, setNarrativeData] = useState<any[]>([]);
    const [backgroundLoaded, setBackgroundLoaded] = useState(false); // Track background transition completion

    // Fetch the narrative data on component mount
    useEffect(() => {
        const data = Array.from({ length: 5 }, (_, i) => ({
              text: t(`intro.${i + 1}`),
              image: `/images/intro/${i + 1}.png`,
            }));
        setNarrativeData(data);
    }, []);

    // Function to move to the next scene
    const nextScene = () => {
        const audio = new Audio('/sounds/next-button.mp3'); // Sound effect for "Next" button
        audio.play();
        if (scene < narrativeData.length) {
            setScene(scene + 1);
            setBackgroundLoaded(false); // Reset background loading flag for new scene
        }
    };

    // Function to handle intro completion
    const completeIntro = () => {
        setSetting('isIntroFinished', 'true'); // Mark intro as finished
        onComplete(); // Notify parent component that intro is complete
    };

    return (
        <Container
            style={{
                maxWidth: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
                background: '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Particles Background */}
            <Particles
                id="particles"
                options={{
                    particles: {
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        size: {
                            value: 2,
                        },
                        move: {
                            enable: true,
                            speed: 1.5,
                            direction: "none",
                            out_mode: "out",
                        },
                        links: {
                            enable: true,
                            distance: 150,
                            color: "#ffffff",
                            opacity: 0.5,
                            width: 1,
                        },
                        opacity: {
                            value: 0.8,
                        },
                        shape: {
                            type: "circle",
                        },
                    },
                    interactivity: {
                        detect_on: "window",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "repulse",
                            },
                            onclick: {
                                enable: true,
                                mode: "push",
                            },
                        },
                    },
                }}
            />

            {/* Static Background Based on Scene with Fade Transition */}
            {narrativeData[scene - 1] && (
                <motion.div
                    key={scene} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 1, ease: 'easeOut' }}
                    onAnimationComplete={() => setBackgroundLoaded(true)} // Set backgroundLoaded to true after transition completes
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${narrativeData[scene - 1].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(1px)', 
                    }}
                />
            )}

            {/* The text and button are now delayed based on the background transition */}
            {backgroundLoaded && (
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: '"Roboto", sans-serif',
                    lineHeight: '1.5',
                    maxWidth: '80%',
                    margin: '0 auto',
                }}>
                    {/* Display text dynamically based on current scene with motion */}
                    {scene <= narrativeData.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        >
                            <Text
                                size="xl"
                                style={{
                                    fontSize: '2rem', 
                                    fontWeight: 600,
                                    textShadow: '0 4px 6px rgba(0, 0, 0, 0.7)', 
                                    marginBottom: '40px',
                                }}
                            >
                                {narrativeData[scene - 1]?.text}
                            </Text>
                        </motion.div>
                    )}

                    {/* Next Button below the text */}
                    {scene < narrativeData.length && (
                        <motion.div
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                        >
                            <Group position="center" mt="xl">
                                <Button
                                    onClick={nextScene}
                                    size="lg"
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '1.5rem',
                                        backgroundColor: 'white', 
                                        borderRadius: '10px',
                                        color: 'black',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Shadow for the button
                                    }}
                                >
                                    <IconArrowRight />
                                </Button>
                            </Group>
                        </motion.div>
                    )}

                    {/* Final Button after the last scene */}
                    {scene === narrativeData.length && (
                        <motion.div
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                        >
                            <Group position="center" mt="xl">
                                <Button
                                    onClick={completeIntro}
                                    size="lg"
                                    style={{
                                        padding: '10px 30px',
                                        fontSize: '1.5rem',
                                        backgroundColor: 'white', 
                                        borderRadius: '10px',
                                        color: 'black',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Shadow for the button
                                    }}
                                >
                                    <IconSkateboarding />
                                </Button>
                            </Group>
                        </motion.div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default IntroScene;
