import React, { FunctionComponent, useRef, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useLocation } from 'react-router';

import AboutBanner from '../assets/about.png';
import ColorLogo from '../assets/logo_color.svg';
import PresidentPic from '../assets/president.png';
import ContactCardLogo from '../assets/Contact_card_logo.png';

interface AboutProps {
  className?: string;
  firstname: string;
  email: string;
  comment: string;
}

/* 특정버튼 클릭시 스크롤  */
/**
 * About Page.
 */
const UnstyledAbout: FunctionComponent<AboutProps> = ({ className }) => {
  const aboutScrollRef = useRef<HTMLDivElement>(null);
  const presidentScrollRef = useRef<HTMLDivElement>(null);
  const contactScrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  //useEffect function -> after render calling
  //useEffect return (event) -> befroe render calling
  useEffect(() => {
    switch (pathname) {
      case '/overview':
        if (aboutScrollRef.current) {
          aboutScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      case '/president':
        if (presidentScrollRef.current) {
          presidentScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      case '/contact':
        if (contactScrollRef.current) {
          contactScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }, [pathname]);

  // eslint-disable-next-line
  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const firstName = data.get('first_name');
    const email = 'koreancanadiansoccer@gmail.com';
    const comments = data.get('comments');

    window.location.href = `mailto:${email}?subject="${firstName}:Inquiry"&body=${comments}`;
  };

  return (
    <>
      {/* About Banner Section */}
      <Box className={className}>
        <Box
          className="about-banner-container"
          display="flex"
          alignItems="center"
        >
          <Container>
            <Box
              className="about-text"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              color="white"
              flexDirection="column"
            >
              About KCSA
            </Box>
            {/* <Box className="about-text" display="flex" justifyContent="center" alignItems="center"> */}

            {/* </Box> */}
          </Container>
        </Box>

        {/* About Section */}
        <Container ref={aboutScrollRef}>
          <Box className="about" mt={10}>
            <Box className="content-title" mb={5}>
              About KCSA
              <Box className="title-line" mt={2.5} />
            </Box>

            <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
              <Box className="color-logo" mr={10}>
                <img
                  src={ColorLogo}
                  alt="color-logo-pic"
                  className="color-logo-pic"
                />
              </Box>

              <Box className="about-subtitle" mb={3}>
                We are KCSA
                <Typography>
                  Welcome to the official website of the Korean Canadian Soccer
                  Association (KCSA). KCSA is a football organization based in
                  the GTA area. Our purpose is to operate football competitions
                  across multiple age categories with the goal of promoting
                  collaboration and solidarity within the Korean and
                  multicultural football communities. Our hope is that football
                  assists with the difficulties of recent immigrants by
                  promoting a healthy and active lifestyle. Our league and
                  tournaments range from youth to senior age divisions. We
                  strive to be the most open and welcoming community for every
                  footballer from our diverse communities within the GTA area.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="seperate-line" mt={6} />
        </Container>

        {/* President Section */}
        <Container ref={presidentScrollRef}>
          <Box className="president" mt={10}>
            <Box className="content-title" mb={5}>
              President
              <Box className="title-line" mt={2.5} />
            </Box>

            <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
              <Box className="president-div" mr={10}>
                <img
                  src={PresidentPic}
                  alt="president-pic"
                  className="president-pic"
                />
                <Box textAlign="center">제 21 - 22대 협회장. 허 경</Box>
              </Box>

              <Box className="president-content" mb={3}>
                <Typography>
                  캐나다 한인동포 여러분, 안녕하십니까. 축구라는 매개체를 통하여
                  우리 한인동포들은 고향의 따뜻함과때로는 먼 타지에서의 생활로
                  지친 우리의 몸과 마음을 위로받아왔다고 생각합니다. 이에따라,
                  재캐나다 대한 축구협회는 1973년 출범 이후, 캐나다 한인동포
                  여러분들과 축구인들의 크나큰 관심과 사랑으로 나날이
                  성장해왔습니다. 현재 협회에서는 한인축구리그와 축구
                  토너먼트들을 통하여 여러분들에게 화합과 소통의 장을
                  열어드리기위해 열심히 노력하고있습니다. 앞으로도 캐나다
                  한인동포들이 더욱 더 축구를 즐기실 수 있도록 노력하겠습니다.
                  협회의 노력들이 모여 축구가 남녀노소를 불문하고 모두가
                  하나되어 즐길 수 있는 문화로 자리잡기를 소망합니다. 재캐나다
                  대한 축구협회장이란 중책을 맡게 되어 막중한 사명감을 느낍니다.
                  항상 여러분이 즐기시는 축구가 어떻게 하면 더 즐겁고 그리고 더
                  의미있는 시간들이 될 수 있을지 열심히 고민하겠습니다. 겸손하고
                  열린 마음으로 항상 여러분의 의견에 귀를 기울이며, 여러분과
                  함께 건강한 캐나다 한인축구사회를 만들겠습니다. 축구는 언제나
                  그래왔듯이 캐나다 한인동포사회의 화합과 행복을 가져다줄 것을
                  확신합니다. 미래의 우리의 아들 딸들도 즐길 수 있는 행복한
                  캐나다 한인축구문화를 만들 수 있도록 여러분의 많은 관심과 사랑
                  부탁드립니다. 감사합니다.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="seperate-line" mt={6} />
        </Container>

        {/* Contact Section */}
        <Container ref={contactScrollRef}>
          <Box className="contact" mt={10}>
            <Box className="contact-title" mb={5}>
              Contact us
              <Box className="title-line" mt={2.5} />
            </Box>

            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Box className="contact-form" mr={10}>
                <form onSubmit={onSubmit}>
                  <Box className="firstname-form" mb={10}>
                    <div>First name</div>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      id="firstname"
                      placeholder="John Doe"
                    ></input>
                  </Box>

                  <Box className="email-form" mb={10}>
                    <div>E-mail</div>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="Email"
                      placeholder="JohnDoe@KCSA.com"
                    ></input>
                  </Box>
                  <Box className="email-form" mb={10}>
                    <div>Comments</div>
                    <input
                      type="text"
                      name="comments"
                      className="form-comments"
                      id="comment"
                      placeholder="Comment"
                    ></input>
                  </Box>
                  <Box className="button-form" mb={10}>
                    <button type="submit" className="form-summit">
                      submit
                    </button>
                  </Box>
                </form>
              </Box>
              <Box className="contact-card" mb={3}>
                <Box my={5} mx={3}>
                  <Typography>Contact</Typography>
                </Box>
                <Box my={5} mx={3}>
                  <img
                    src={ContactCardLogo}
                    alt="contact-card-pic"
                    className="contact-card-pic"
                  />
                </Box>
                <Box my={5} mx={3}>
                  <Typography>Phone</Typography>
                  <Typography>647-542-7942</Typography>
                </Box>
                <Box my={5} mx={3}>
                  <Typography>E-mail</Typography>
                  <Typography>CanadaKCSA@hotmail.com</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const About = withTheme(styled(UnstyledAbout)`
  .about-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    height: 490px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .about-text {
    color: white;
    font-weight: 700;
    font-size: 2.5rem;
  }

  .content-title {
    font-weight: bold;
    font-size: 2.5rem;
    line-height: 2.938rem;
    color: #000000;
  }
  .president-title {
    font-weight: bold;
    font-size: 2.5rem;
    line-height: 2.938rem;
    color: #000000;
  }

  .title-line {
    background-color: #f17f42;
    width: 95px;
    height: 4px;
  }

  .seperate-line {
    height: 0px;
    border: 1px solid #c4c4c4;
  }

  .color-logo-pic {
    width: 341px;
    height: 341px;
  }

  .about-subtitle {
    font-style: normal;
    font-weight: bold;
    font-size: 1.75rem;
    line-height: 2.063rem;
    color: #274555;
  }

  .about-contents {
    font-size: 1rem;
    line-height: 1.5rem;
    color: #000000;
  }

  .president-pic {
    width: 325px;
    height: 396px;
    left: 363px;
    top: 1261px;
    border-radius: 3rem;
  }

  .president-div {
    font-weight: bold;
    font-size: 1.75rem;
    line-height: 2.063rem;
    color: #274555;
  }

  .contact-title {
    font-weight: bold;
    font-size: 2.5rem;
    line-height: 2.938rem;
    color: #000000;
  }

  .contact-form {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.313rem;
    color: #274555;
  }

  .contact-card {
    width: 336px;
    height: 408px;

    background: rgba(214, 214, 214, 0.38);
    border-radius: 5px;

    font-style: normal;
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.313rem;

    color: #274555;
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

    box-shadow: 4px 5px 4px;
    border-radius: 8px;

    font-style: normal;
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.313rem;
    text-align: center;

    color: #ffffff;
  }
`);
