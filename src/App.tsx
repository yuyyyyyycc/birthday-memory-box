import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

// Types
type Stage = 'envelope' | 'letter' | 'loading' | 'memories' | 'interlude' | 'wishes' | 'transitioning' | 'fakeout';

interface Memory {
  id: number;
  date: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

const INITIAL_MEMORIES: Memory[] = [
  {
    id: 1,
    date: '2023.05.15',
    title: '我们的第一张合照',
    subtitle: '那时的阳光和你一样暖',
    image: '/bubble1.jpg',
    description: '还记得那天吗？我们拍下了这张看起来有点呆但是超级开心的瞬间。'
  },
  {
    id: 2,
    date: '2023.10.20',
    title: '最好的拍档',
    subtitle: '默契不需要多言',
    image: '/bubble2.jpg',
    description: '不论是穿西装还是便服，只要和你在一起，每一分钟都是仪式感。'
  },
  {
    id: 3,
    date: '2024.01.01',
    title: '记录我们的日常',
    subtitle: '相机里装满了关于你的胶片',
    image: '/bubble3.jpg',
    description: '我喜欢看镜头里的你，也喜欢看眼里有我的你。'
  },
  {
    id: 4,
    date: '2024.03.12',
    title: '春日漫步',
    subtitle: '风也温柔',
    image: '/bubble4.jpg',
    description: '春天到了，我们约好去公园走走，那些碎裂的阳光都落在你头发上。'
  },
  {
    id: 5,
    date: '2024.04.15',
    title: '深夜食堂',
    subtitle: '美食与爱',
    image: '/bubble5.jpg',
    description: '那顿深夜的火锅，聊到店员都开始打烊，我们的故事才讲到一半。'
  },
  {
    id: 6,
    date: '2024.05.05',
    title: '未来也要在一起',
    subtitle: '岁岁年年，万事胜意',
    image: '/bubble6.jpg',
    description: '这个生日，只是我们漫长友谊中一个小小的注脚，后面还有更多精彩。'
  },
  {
    id: 7,
    date: '2024.06.20',
    title: '雨后晴空',
    subtitle: '彩虹之下',
    image: '/bubble7.jpg',
    description: '那时候你说，雨后的空气最清新，我也这么觉得。'
  },
  {
    id: 8,
    date: '2024.08.15',
    title: '夏日冰饮',
    subtitle: '清凉时刻',
    image: '/bubble8.jpg',
    description: '那杯冰美式，因为有你的笑，变得比平常更甜了一点。'
  },
  {
    id: 9,
    date: '2024.10.01',
    title: '秋叶静美',
    subtitle: '岁月静好',
    image: '/bubble9.jpg',
    description: '我们在金色的树下走过，那一刻时间仿佛静止。'
  },
  {
    id: 10,
    date: '2024.12.25',
    title: '冬日围炉',
    subtitle: '温暖如初',
    image: '/bubble1.jpg',
    description: '雪花在窗外飞舞，我们在屋内谈笑，这就是我想要的冬天。'
  }
];
