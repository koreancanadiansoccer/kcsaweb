import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { VerticalDivider } from '../divider/VerticalDivider';
import ContactCardLogo from '../../assets/Contact_card_logo.png';

interface ContactProps {
  className?: string;
}

const UnstyledContact: FunctionComponent<ContactProps> = ({ className }) => {
  return (
    <Box className={className}>
      <Container>
        <Box className="contact" mt={10}>
          <Box className="contact-title" mb={5}>
            Contact us
            <Box className="title-line" mt={2.5} />
          </Box>

          <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
            <Box className="contact-form" mr={10}>
              <form>
                <Box className="firstname-form" mb={10}>
                  <div>First name</div>
                  <div>
                    <br />
                  </div>
                  <input type="text" className="form-control" id="firstname" placeholder="John Doe"></input>
                </Box>

                <Box className="email-form" mb={10}>
                  <div>E-mail</div>
                  <div>
                    <br />
                  </div>
                  <input type="text" className="form-control" id="Email" placeholder="JohnDoe@KCSA.com"></input>
                </Box>
                <Box className="email-form" mb={10}>
                  <div>Comments</div>
                  <div>
                    <br />
                  </div>
                  <input type="text" className="form-comments" id="comment" placeholder="Comment"></input>
                </Box>
                <Box className="button-form" mb={10}>
                  <button type="submit" className="form-summit">
                    submit
                  </button>
                </Box>
              </form>
            </Box>
            <Box className="contact-card" mb={3}>
              <Typography>contact</Typography>
              <img src={ContactCardLogo} alt="contact-card-pic" className="contact-card-pic" />
            </Box>
          </Box>
          <Box className="seperate-line" mt={2.5} />
        </Box>
      </Container>
    </Box>
  );
};

export const Contact = withTheme(styled(UnstyledContact)`
  .contact-title {
    font-weight: bold;
    font-size: 40px;
    line-height: 47px;

    color: #000000;
  }
  .title-line {
    background-color: #f17f42;
    width: 95px;
    height: 4px;
    left: 361px;
    top: 546px;
    text-align: left;
  }

  .contact-form {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #274555;
  }

  .contact-card {
    width: 336px;
    height: 408px;
    left: 1149px;
    top: 2196px;

    background: rgba(214, 214, 214, 0.38);
    border-radius: 5px;
  }
  .form-control {
    width: 684px;
    height: 56px;
    left: 361px;
    top: 2084px;

    background: #ffffff;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 4px 5px 4px rgba(114, 114, 114, 0.25);
    border-radius: 8px;
  }

  .form-comments {
    width: 684px;
    height: 296px;
    left: 361px;
    top: 2308px;

    background: #ffffff;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 4px 5px 4px rgba(114, 114, 114, 0.25);
    border-radius: 8px;
  }
  .form-summit {
    width: 174px;
    height: 54px;
    left: 873px;
    top: 2628px;

    background: #f17f42;
    box-shadow: 4px 5px 4px rgba(114, 114, 114, 0.25);
    border-radius: 8px;

    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    text-align: center;

    color: #ffffff;
  }
`);
