import React, {
  FunctionComponent,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import { ACCOUNTSTATUS } from '../types/user';
import { TeamConfig } from '../components/register_team/TeamConfig';
import { PlayerConfig } from '../components/register_team/PlayerConfig';
import { ViewerContext } from '../context/homeViewer';

export const RegisterTeam: FunctionComponent = () => {
  const { viewer } = useContext(ViewerContext);
  const history = useHistory();

  //Step configurations
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Confugre Team', 'Add Players'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const getStepContent = useCallback((step) => {
    switch (step) {
      case 0:
        return <TeamConfig handleNext={handleNext} />;
      case 1:
        return <PlayerConfig handleBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  }, []);

  return (
    <Box mt={20} mb={20}>
      <Container>
        <Stepper activeStep={activeStep}>
          {steps.map((label, idx) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={`${label}-${idx}`} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box>
          {activeStep === steps.length ? (
            <Box>All completed</Box>
          ) : (
            <Box>
              <Container>{getStepContent(activeStep)}</Container>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
