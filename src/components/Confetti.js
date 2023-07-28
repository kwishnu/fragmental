import * as React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const parameters = {
  force: 0.7,
  duration: 2500,
  particleCount: 170,
  width: 1200,
  colors: ['#9A0023', '#FF003C', '#AF739B', '#FAC7F3', '#F7DBF4'],
};

function Confetti() {
    return <>
    <ConfettiExplosion {...parameters} />
    </>;
}

export default Confetti;