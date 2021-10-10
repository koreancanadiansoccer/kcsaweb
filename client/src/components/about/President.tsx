import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import PresidentPic from '../../assets/president.png';

import { VerticalDivider } from '../divider/VerticalDivider';

interface HomeProps {
  className?: string;
}

const UnstyledPresident: FunctionComponent<HomeProps> = ({ className }) => {
  return (
    <Box className={className}>
      <Container>
        <Box className="president" mt={10}>
          <Box className="president-title" mb={5}>
            President
            <Box className="title-line" mt={2.5} />
          </Box>

          <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
            <Box className="president-div" mr={10}>
              <img src={PresidentPic} alt="president-pic" className="president-pic" />제 21 - 22대 협회장 . 허 경
            </Box>

            <Box className="president-content" mb={3}>
              <Typography>
                캐나다 한인동포 여러분, 안녕하십니까. 축구라는 매개체를 통하여 우리 한인동포들은 고향의 따뜻함과때로는
                먼 타지에서의 생활로 지친 우리의 몸과 마음을 위로받아왔다고 생각합니다. 이에따라, 재캐나다 대한
                축구협회는 1973년 출범 이후, 캐나다 한인동포 여러분들과 축구인들의 크나큰 관심과 사랑으로 나날이
                성장해왔습니다. 현재 협회에서는 한인축구리그와 축구 토너먼트들을 통하여 여러분들에게 화합과 소통의 장을
                열어드리기위해 열심히 노력하고있습니다. 앞으로도 캐나다 한인동포들이 더욱 더 축구를 즐기실 수 있도록
                노력하겠습니다. 협회의 노력들이 모여 축구가 남녀노소를 불문하고 모두가 하나되어 즐길 수 있는 문화로
                자리잡기를 소망합니다. 재캐나다 대한 축구협회장이란 중책을 맡게 되어 막중한 사명감을 느낍니다. 항상
                여러분이 즐기시는 축구가 어떻게 하면 더 즐겁고 그리고 더 의미있는 시간들이 될 수 있을지 열심히
                고민하겠습니다. 겸손하고 열린 마음으로 항상 여러분의 의견에 귀를 기울이며, 여러분과 함께 건강한 캐나다
                한인축구사회를 만들겠습니다. 축구는 언제나 그래왔듯이 캐나다 한인동포사회의 화합과 행복을 가져다줄 것을
                확신합니다. 미래의 우리의 아들 딸들도 즐길 수 있는 행복한 캐나다 한인축구문화를 만들 수 있도록 여러분의
                많은 관심과 사랑 부탁드립니다. 감사합니다.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="seperate-line" mt={2.5} />
      </Container>
    </Box>
  );
};

export const President = withTheme(styled(UnstyledPresident)`
  .president-title {
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
  .president-pic {
    width: 325px;
    height: 396px;
    left: 363px;
    top: 1261px;
  }
  .president-div {
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    color: #274555;
  }
`);
