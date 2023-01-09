import getRecentImgs from '@/apis/getRecentImgs';
import { convertLength } from '@mui/material/styles/cssUtils';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Transform } from 'stream';
import tryNow from '../../assets/tryNow.png';
import doh from '../../assets/doh.png';
import { useQuery } from '@tanstack/react-query';
type CardsType = {
  id: number;
  link: string;
};

const RecentImgs = () => {
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState<CardsType[]>([]);
  const [page, setPage] = useState(0);

  const { isLoading, isError, data } = useQuery(
    ['recentPage', page],
    async () => await getRecentImgs(page),
    {
      staleTime: 1000 * 60 ** 60,
      refetchOnWindowFocus: false,
    },
  );

  const mod = (n: number, m: number) => {
    let result = n % m;

    // Return a positive value
    return result >= 0 ? result : result + m;
  };

  useEffect(() => {
    if (data) setCards([...cards, ...data]);
  }, [data]);

  const onClickRight = () => {
    let midIndex = index + 1 < cards.length - 1 ? index + 1 : cards.length - 1;
    console.log(midIndex);
    setIndex(midIndex);
  };

  const onClickLeft = () => {
    let midIndex = index - 1 > 0 ? index - 1 : 0;
    console.log(midIndex);
    setIndex(midIndex);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="img"
        src={doh}
        sx={{ width: '25rem', height: '15rem' }}
      ></Box>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: '100%', height: '100%', postion: 'relative' }}>
          {cards.map((card, i) => {
            const indexLeft = mod(index - 1, cards.length);
            const indexLeft2 = mod(index - 2, cards.length);
            const indexRight = mod(index + 1, cards.length);
            const indexRight2 = mod(index + 2, cards.length);
            let onClick: () => void = onClickRight;
            let style: any = [
              {
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                margin: 'auto',
                width: '32rem',
                height: '49rem',
                objectFit: 'cover',
                cursor: 'pointer',
                zIndex: 0,
                opacity: 0,
                transition: '500ms',
              },
            ];

            if (i === index) {
              style.push({
                opacity: 1,
                transform: 'scale(1)',
                transition: '500ms',
                zIndex: 99,
              });
            } else if (i === indexRight) {
              style.push({
                opacity: 0.8,
                transform: 'translateX(30%) scale(0.8)',
                transition: '500ms',
                zIndex: 66,
              });
            } else if (i === indexLeft) {
              style.push({
                opacity: 0.8,
                transform: 'translateX(-30%) scale(0.8)',
                transition: '500ms',
                zIndex: 66,
              });
              onClick = onClickLeft;
            } else if (i === indexLeft2) {
              style.push({
                opacity: 0.3,
                transform: 'translateX(-60%) scale(0.6)',
                transition: '500ms',
                zIndex: 33,
              });
              onClick = onClickLeft;
            } else if (i === indexRight2) {
              style.push({
                opacity: 0.3,
                transform: 'translateX(60%) scale(0.6)',
                transition: '500ms',
                zIndex: 33,
              });
            }

            return (
              <Box
                key={i}
                component="img"
                sx={style}
                alt="심슨 이미지"
                src={card?.link}
                onClick={() => {
                  if (index === cards.length - 3) setPage(page + 1);
                  onClick();
                }}
              ></Box>
            );
          })}
        </Box>
      </Box>
      <Box
        component="img"
        src={tryNow}
        sx={{ width: '30rem', height: '15rem' }}
      ></Box>
    </Box>
  );
};

export default RecentImgs;
