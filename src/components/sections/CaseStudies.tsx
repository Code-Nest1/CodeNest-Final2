// src/components/sections/CaseStudies.tsx
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { COLORS } from '../../styles/global';

const Wrap = styled.div`
  .swiper-slide {
    border-radius: 8px;
    overflow: hidden;
    background: ${COLORS.grey};
    color: #fff;
  }
`;

const Card = styled.div`
  height: 220px;
  padding: 18px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  background: #2d9163;
`;

export default function CaseStudies(){
  const items = [1,2,3,4];
  return (
    <Wrap>
      <h3>Portfolio</h3>
      <Swiper spaceBetween={16} slidesPerView={'auto'}>
        {items.map((i) => (
          <SwiperSlide key={i} style={{width:300}}>
            <Card>
              <h4>Project {i}</h4>
              <p>Short note about client and result achieved</p>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrap>
  );
}
