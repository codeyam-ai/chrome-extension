import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 50,
    elementCount: 150,
    dragFriction: 0.12,
    duration: 7000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const ConfettiPop = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            // react-dom-confetti only pops when active changes from falsy to truthy
            setActive(true);
        }, 1);
    }, []);

    return <Confetti active={active} config={config} />;
};

export default ConfettiPop;
