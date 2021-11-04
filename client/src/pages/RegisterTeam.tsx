import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { map } from 'lodash';

import { ACCOUNTSTATUS } from '../types/user';
import { TeamConfig } from '../components/register_team/TeamConfig';
import { PlayerConfig } from '../components/register_team/PlayerConfig';
import { ViewerContext } from '../context/homeViewer';

export const RegisterTeam: FunctionComponent = () => {
  const { viewer } = useContext(ViewerContext);
  const history = useHistory();
  const [direction, setDirection] = useState('right');

  const handleNext = () => {
    setDirection('right');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDirection('left');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //Step configurations
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { label: 'Configure Team', comp: <TeamConfig handleNext={handleNext} /> },
    { label: 'Add Players', comp: <PlayerConfig handleBack={handleBack} /> },
  ];

  useEffect(() => {
    if (!viewer.user || !viewer.user.id) {
      history.replace({ pathname: '/login' });
      return;
    }
    if (viewer.user.status === ACCOUNTSTATUS.INVITED) {
      history.replace({ pathname: '/' });
      return;
    }
  }, [viewer]);

  const variants = {
    initial:
      direction === 'right'
        ? { opacity: 0, x: 500, y: 0 }
        : { opacity: 0, x: -500, y: 0 },
    animate:
      direction === 'right'
        ? { opacity: 1, x: 0, y: 0 }
        : { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0 },
    // exit:
    //   direction === 'right'
    //     ? { opacity: 0, x: -500, y: 0 }
    //     : { opacity: 0, x: 1000, y: 0 },
  };

  return (
    <Box mt={20} mb={20}>
      <Container>
        <Stepper activeStep={activeStep}>
          {steps.map((step, idx) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={`${step.label}-${idx}`} {...stepProps}>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box>
          {activeStep === steps.length ? (
            <Box>All completed</Box>
          ) : (
            <Box>
              <Container>
                <AnimatePresence exitBeforeEnter>
                  {map(
                    steps,
                    (step, idx) =>
                      activeStep === idx && (
                        <motion.div
                          key={`step-content-${idx}`}
                          variants={variants}
                          initial="initial"
                          exit="exit"
                          animate={activeStep === idx ? 'animate' : 'initial'}
                          transition={{ delay: 0.3 }}
                        >
                          {step.comp}
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </Container>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
