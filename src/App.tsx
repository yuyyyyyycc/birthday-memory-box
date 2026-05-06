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

const COVER_PHOTOS = [
  '/cover1.png',
  '/cover2.png',
  '/cover3.png',
  '/cover4.png'
];

export default function App() {
  const [stage, setStage] = useState<Stage>('envelope');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  
  // Interactive States
  const [currentFilter, setCurrentFilter] = useState<'none' | 'sepia' | 'grayscale' | 'warm'>('none');
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  // Letter Display Logic
  const [visibleParagraphs, setVisibleParagraphs] = useState(1);

  // Content State
  const [letterContent] = useState({
    recipient: '最最最可爱冷脸拽萌的金鱼：',
    date: '2026.5.4',
    body: `生日快乐，展信佳!

这次拖拖拉拉了一会才决定下笔，因为感觉我们俩的相处已经变成了平淡生活里的细水长流，很少遇到需要特意构思设计的事情。所以这一封生日信，可能也会有流水账的成分。

此刻插播一首《致遥远的你》。这是2020年度我最喜欢的一首，是我在听她唱第一句时眼泪就忍不住掉下来的歌。
“多感激在有你的日子里
我学会的是珍惜
每当我想起了你就很安心
无论是 多遥远 距离
我可以 四季交替 任何天气 都挂念着你”

记忆会随着岁月的流逝失去印记，十二岁到现在的青春会留存在将来好多年的时光里，永不离去。愿我们的关系也如同常青树般经久不衰。

最近又迷恋上了林忆莲，耳机里面放到词不达意，一下子被歌词“要如何翻译我爱你”击中。上大学后阅读量又减少了，脑内的输入和输出都呈指数倍下降，也好久没写过正经的信，感觉自己已经忘记“如何表达”，写之前还去翻看一些文章，想要漂亮的开头和精巧的结尾。可我又想了想，这不是命题作文，你也不是老师，不会以此来给我们的友情评分。嘿嘿。

感觉时间过得飞快，我们一下子就变成二字开头的年纪了。在别人看来，二十岁还可以有无限可能，可以在未曾尝试过的领域进行一番探索。但对我来说也会有些徒增年岁的迷茫，像是知道它珍贵想要拼命珍惜却又抓不住的无力感。好像我们作为普通人，大部分时间里只能被动地接受生活。罗翔老师经常引用爱比克泰德的一句话，“我们登上并非我们所选择的舞台，演出并非我们所选择的剧本”。如果能把时间的轨道往前调，我想永远都活在刚认识你的时候。（大学时遇到的崭新的人事物，倒也不是完全没有充斥着快乐的。只是觉得总体来说悲大于喜)

不知道今年的生日对你来说是不是格外特别，你选择了一条不太好走的路，但我们要坚信：道路是曲折的，前途是光明的！那天打视频看到你短短的头发，瘦削的脸颊，我更多居然是心疼（虽然你之前就是一个瘦瘦的小女孩），一定要照顾好自己！！此时此刻想到已经陪你度过了许许多多个生日的我还有点骄傲!我们真的完完全全一起在长大。当我意识到这一点时，心里暖暖的。

未来两年，我们应该都会非常忙碌，也没有办法怎么聊天!我真的好想好想你，无时无刻没有办法不想你。我每次遇到选择难题的时候都会想到你、在我很多不知所措和感到力不从心的时候，你总能给我提供很多有效的建议与帮助。我在你这里获取的情绪价值远远比我给你的多。甚至大部分时候，我都觉得你是一个我生活里如此稳定的重要不可或缺的存在，是我坚实的后盾，于是我特别自私地希望无论你和在我心里，你还是那么的了不起。

我突然想到了一个很好玩的类比：一个人织毛衣前看着一地板被猫咪玩得一团糟的毛线发呆，但最后还是“烦躁”地整理好一切并打出了一件非常漂亮的作品。你在我心里就是这样的人，偶尔凌乱但实则有条不紊。而我时常是一个内心敏感话说不出口的人，渴望别人主动。特别是在小时候，拧巴，别扭，固执，耍赖皮，大小姐脾气。所以也总是特别感谢你能在我脆弱与矫情的时候，带给我的各种温暖，帮我消灭好多坏能量，也成为我很多情绪消化的出口。谢谢你的认真聆听和我犯错误时的理解与包容。一定是魔法将我们两连接在一起。

虽然一直没能送出最满意的礼物，但我想等你两年归来之后我必定让你感动得不行！

突然想到小时候看动物世界，配音员说非洲草原的雨季一来，所有生命都得救了，雨季最让人期待。而我也最喜欢雨季，所以我想说你是我的雨季。小时候的我也会觉得二十多岁的哥哥姐姐都很厉害，饱读诗书，学富五车，独立，理性，有一个体面的工作等等。写作业的时候也幻想过自己长大的样子，“给十八岁的自己写一封信”（早就不知道那些试卷都去哪了)，结果真的到了这个年纪反而没什么实感。我觉得长大也是一个祛魅的过程，我们能活成这样，已经很不容易！你选择这条路，而我也将走上一条不太容易的路！已经非常厉害了！

祝你一切的愿望都实现，祝你在热衷的事物里不竭地没取幸福，祝你可以自由地幻想，也可以快乐地逃避，与你喜欢的一切在一起。真诚地希望所有的美好都能在你身上发生，永远有人把你当小孩。

世界是残酷的，即便如此我也依然爱你。珍贵的你。其他人的关系怎样变化，我们两都一直一直做一辈子的好朋友。栀子花短期是不会再种了，但我一直很怀念它的味道，而你也是我一路上永远放不下的羁绊。

生日快乐！一切一切顺利，一定一定照顾好自己。

21岁一切都好！`,
    signature: '永远念着你的yyc'
  });

  const [envelopeContent] = useState({
    salutation: 'Dear Lover jrx',
    body: '能否在这繁华尘世，与你岁岁年年同席间。\n我常觉此生大幸，皆因回首总有你在前。',
    signature: 'J&J ♡',
    label: 'ENVELOPE FROM 2026'
  });

  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8E2D2D', '#2D2B29', '#FDFBF7']
    });
  };

  const triggerSparkles = () => {
    const scalar = 2;
    const star = confetti.shapeFromText({ text: '⭐', scalar });
    confetti({
      shapes: [star],
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#8E2D2D', '#D4AF37']
    });
  };

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-baseline border-b border-art-border bg-art-bg/80 backdrop-blur-sm px-6 sm:px-12 py-6">
      <span className="label-meta tracking-[0.25em]">Vol. 28 — The Archive of Joy</span>
      <h1 className="text-xl sm:text-2xl italic tracking-tight text-art-dark hidden sm:block">A Letter for the Soul</h1>
      <div className="flex items-center gap-4">
        <span className="label-meta tracking-[0.25em]">{letterContent.date}</span>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 border-t border-art-border bg-art-bg/80 backdrop-blur-sm flex justify-between items-center text-[10px] uppercase tracking-[0.4em] opacity-30 pointer-events-none">
      <span>Edition: 1 of 1</span>
      <span className="hidden sm:inline">Endless Gratitude</span>
      <span>Designed for You</span>
    </footer>
  );

  const nextMemory = () => {
    if (currentMemory < memories.length - 1) {
      setCurrentMemory(prev => prev + 1);
      triggerSparkles();
    } else {
      setStage('interlude');
    }
  };

  const prevMemory = () => {
    if (currentMemory > 0) {
      setCurrentMemory(prev => prev - 1);
      triggerSparkles();
    }
  };

  React.useEffect(() => {
    // Attempt autoplay and handle browser restrictions
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked, waiting for user interaction.");
        });
      }
    };

    if (isPlaying && stage !== 'transitioning' && stage !== 'fakeout') {
      attemptPlay();
    } else {
      audioRef.current?.pause();
    }

    // Global listener to trigger audio on first interaction if blocked
    const handleFirstInteraction = () => {
      if (isPlaying && stage !== 'transitioning') {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(e => console.log("Still blocked or failed"));
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    
    // Auto-transition from fakeout to transitioning video
    let fakeoutTimer: NodeJS.Timeout;
    if (stage === 'fakeout') {
      fakeoutTimer = setTimeout(() => {
        setStage('transitioning');
      }, 4000);
    }

    // Auto-transition from interlude to wishes
    let interludeTimer: NodeJS.Timeout;
    if (stage === 'interlude') {
      interludeTimer = setTimeout(() => {
        setStage('wishes');
        triggerConfetti();
      }, 6000);
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (fakeoutTimer) clearTimeout(fakeoutTimer);
      if (interludeTimer) clearTimeout(interludeTimer);
    };
  }, [isPlaying, stage]);

  return (
    <div className="min-h-screen bg-art-bg text-art-text overflow-y-auto relative selection:bg-art-accent/10">
      <audio 
        ref={audioRef}
        src="/music.mp3" 
        loop
        autoPlay
        controls={false}
        onPlay={() => {
          console.log("Audio started");
          setIsPlaying(true);
        }}
        onError={() => {
          console.warn("Audio playback failed. This might be due to an expired URL or CORS policy.");
        }}
      />
      
      {/* Music Control Indicator */}
      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-32 right-12 z-[100] flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-art-accent/20 shadow-2xl group transition-all hover:bg-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`relative w-8 h-8 rounded-full border-2 border-art-accent flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
           <Heart className="text-art-accent" size={14} fill={isPlaying ? "currentColor" : "none"} />
        </div>
        <div className="flex flex-col items-start pr-2">
           <span className="text-[10px] font-bold text-art-dark tracking-widest uppercase">
              {isPlaying ? 'Now Playing' : 'Music Paused'}
           </span>
           <span className="text-[8px] text-art-accent/60 tracking-wider">易烊千玺 — 粉雾海</span>
        </div>
      </motion.button>

      <Header />
      
      <AnimatePresence mode="wait">
        {stage === 'fakeout' && (
          <motion.div
            key="fakeout-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-art-bg flex items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-4xl font-handwriting text-art-dark leading-[1.8] tracking-widest">
                你以为我会煽情吗.......<br />
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-art-accent mt-6 block text-3xl sm:text-5xl"
                >
                  其实不然，小女子才不会煽情
                </motion.span>
              </h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="mt-16 flex justify-center"
              >
                <div className="flex gap-4">
                   {[1, 2, 3].map(i => (
                     <motion.div
                       key={i}
                       animate={{ 
                         scale: [1, 1.2, 1],
                         opacity: [0.3, 0.6, 0.3]
                       }}
                       transition={{ 
                         duration: 1.5, 
                         repeat: Infinity, 
                         delay: i * 0.3 
                       }}
                     >
                       <Heart size={20} className="text-art-accent/40" fill="currentColor" />
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {stage === 'interlude' && (
          <motion.div
            key="interlude-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Background Image Overlay */}
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ duration: 3 }}
              className="absolute inset-0 z-0"
            >
              <img 
                src="/wish_bg.jpg" 
                className="w-full h-full object-cover" 
                alt=""
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </motion.div>

            {/* Text Content - Positioned slightly lower to avoid covering faces */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="relative z-10 text-center px-10 mt-[30vh]"
            >
              <h2 className="text-2xl sm:text-4xl font-handwriting text-white leading-relaxed tracking-[0.25em] italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                如果永恒是道伪命题，<br />
                就让悬而未决的期许落地生根吧。
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="h-[1px] w-12 bg-white/30 mx-auto mt-8"
              />
            </motion.div>
          </motion.div>
        )}

        {stage === 'transitioning' && (
          <motion.div 
            key="transition-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center font-sans"
          >
            <video 
              autoPlay 
              playsInline
              className="w-full h-full object-contain bg-black"
              onEnded={() => {
                setStage('letter');
                if (audioRef.current && isPlaying) {
                  audioRef.current.play().catch(e => console.log("Audio resume blocked"));
                }
              }}
              onPlay={() => {
                // Keep background music paused during video
                if (audioRef.current) audioRef.current.pause();
              }}
            >
              <source src="/transition.mp4" type="video/mp4" />
            </video>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute inset-0 bg-art-bg/5 backdrop-blur-[1px] pointer-events-none"
            />
            
            {/* Quick Skip Button */}
            <button 
              onClick={() => {
                setStage('letter');
                if (audioRef.current && isPlaying) {
                  audioRef.current.play().catch(e => console.log("Audio resume blocked"));
                }
              }}
              className="absolute bottom-12 right-12 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.4em] z-[210] border border-white/20 px-4 py-2 rounded-full transition-all"
            >
               Skip Transition
            </button>
          </motion.div>
        )}

        {stage === 'envelope' && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 relative"
          >
            {/* Scattered Cover Photos (Polaroids) - Draggable */}
            <div className="absolute inset-0 overflow-hidden">
              {COVER_PHOTOS.map((src, i) => {
                const cornerStyles = [
                  { top: '12%', left: '8%', rotate: -12 },
                  { top: '15%', right: '8%', rotate: 8 },
                  { bottom: '15%', left: '10%', rotate: -5 },
                  { bottom: '20%', right: '12%', rotate: 15 }
                ];
                const pos = cornerStyles[i];
                
                return (
                  <motion.div
                    key={src}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.6}
                    whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: pos.rotate,
                    }}
                    transition={{ 
                      opacity: { delay: 0.5 + i * 0.2, duration: 1 },
                      scale: { delay: 0.5 + i * 0.2, duration: 1 },
                    }}
                    style={{ 
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      right: pos.right,
                      bottom: pos.bottom
                    }}
                    className="w-32 sm:w-48 bg-white p-2 sm:p-3 pt-2 sm:pt-3 pb-8 sm:pb-12 shadow-xl border border-art-border transform cursor-grab active:cursor-grabbing z-10"
                  >
                    <div className="w-full aspect-square overflow-hidden bg-art-muted rounded-sm pointer-events-none">
                      <img src={src} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="mt-2 flex justify-center opacity-10 pointer-events-none">
                       <Heart size={12} fill="currentColor" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              key="envelope-container"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative cursor-pointer group z-20"
              onClick={() => {
                setIsEnvelopeOpen(true);
                if (audioRef.current && audioRef.current.paused) {
                  audioRef.current.play().catch(e => console.log("Playback blocked, waiting for interaction"));
                }
              }}
            >
              {/* Image-Style Open Envelope */}
              <div className="relative w-[320px] h-[400px] sm:w-[450px] sm:h-[550px] envelope-shadow flex flex-col items-center justify-center">
                
                {/* Top Flap (Open) */}
                <div className="absolute top-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[140px] border-b-parchment sm:border-l-[225px] sm:border-r-[225px] sm:border-b-[200px] z-0 filter drop-shadow(0 -5px 5px rgba(0,0,0,0.02))" />

                {/* Main Body */}
                <div className="relative w-full h-[240px] sm:h-[320px] parchment-texture border-x border-b border-art-border/20 z-20 mt-auto overflow-hidden rounded-b-sm p-8 flex flex-col justify-center items-center shadow-inner">
                   {/* Scattered Stars on the body */}
                    {[
                      { t: '10%', l: '15%', s: 16 }, { t: '25%', l: '35%', s: 14 }, { t: '15%', r: '15%', s: 18 },
                      { b: '15%', l: '20%', s: 20 }, { b: '30%', r: '10%', s: 14 }, { b: '10%', r: '25%', s: 16 },
                      { t: '50%', l: '10%', s: 12 }, { t: '60%', r: '20%', s: 14 }, { b: '45%', l: '40%', s: 14 },
                      { b: '20%', r: '45%', s: 18 }
                    ].map((pos, idx) => (
                      <Star 
                        key={idx}
                        size={pos.s}
                        fill="currentColor"
                        className="envelope-star absolute"
                        style={{
                          top: pos.t, left: pos.l, right: pos.r, bottom: pos.b,
                          opacity: 0.6
                        }}
                      />
                    ))}

                    {/* Message on the Cover */}
                    <div className="relative z-30 text-center flex flex-col items-center gap-1 sm:gap-2">
                       <h4 className="font-handwriting text-xl sm:text-2xl text-art-dark">{envelopeContent.salutation}</h4>
                       
                       <div className="font-calligraphy text-xs sm:text-sm text-art-text/70 leading-relaxed text-center px-4 max-w-[90%]">
                          {envelopeContent.body.split('\n').map((line, i) => (
                             <React.Fragment key={i}>
                                {line}<br />
                             </React.Fragment>
                          ))}
                       </div>
                       
                       <div className="font-handwriting text-xl sm:text-2xl text-art-accent">{envelopeContent.signature}</div>
                    </div>

                    {/* Seal on the bottom part */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 wax-seal w-12 h-12 rounded-full shadow-lg z-30" />
                 </div>

                 {/* Letter Paper inside (peeking out) */}
                 <motion.div 
                    initial={{ y: 20 }}
                    animate={{ y: isEnvelopeOpen ? -150 : 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="absolute top-[80px] w-[280px] h-[300px] sm:w-[400px] sm:h-[400px] bg-white shadow-xl z-10 p-10 parchment-texture border border-black/5 flex flex-col gap-4"
                 >
                    <div className="space-y-4">
                       <h4 className="font-handwriting text-2xl text-art-dark">{envelopeContent.salutation}</h4>
                    </div>
                    
                    <div className="opacity-[0.03] scale-150 rotate-12 pointer-events-none mb-12">
                       <Heart size={80} fill="currentColor" className="text-art-accent" />
                    </div>
                 </motion.div>

                 {/* Opening Overlay Button */}
                 {isEnvelopeOpen && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-x-0 bottom-0 top-[80px] z-40 flex items-center justify-center bg-white/20 backdrop-blur-[2px]"
                   >
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         setStage('fakeout');
                         // Pause background music
                         if (audioRef.current) audioRef.current.pause();
                       }}
                       className="px-8 py-3 bg-art-dark text-white rounded-full hover:bg-art-accent transition-all font-sans text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center gap-3 active:scale-95"
                     >
                       阅读全文 <ChevronRight size={14} />
                     </button>
                   </motion.div>
                 )}
               </div>

               {/* Interaction Hint */}
               <div className="mt-8 flex justify-center">
                 <p className="label-meta text-center opacity-30 tracking-[1em] text-[9px]">{envelopeContent.label}</p>
               </div>
             </motion.div>
           </motion.div>
         )}

         {stage === 'letter' && (
           <motion.div
             key="letter-stage"
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -50 }}
             className="flex items-center justify-center min-h-screen p-6 sm:p-24"
           >
             <div className="max-w-3xl w-full bg-white shadow-paper p-10 sm:p-20 relative border border-art-border">
                <div className="relative z-10">
                   <header className="mb-16 border-b border-art-border pb-10 flex justify-between items-end">
                    <div>
                      <h2 className="text-3xl text-art-dark font-handwriting mb-2 tracking-wide">{letterContent.recipient}</h2>
                      <p className="label-meta text-[11px]">Personal Archive — File 01</p>
                    </div>
                    <p className="label-meta">{letterContent.date}</p>
                  </header>

                  <main className="text-xl sm:text-2xl leading-relaxed text-art-text/90 space-y-8 font-calligraphy">
                    <div className="space-y-6">
                      {letterContent.body.split('\n\n').slice(0, visibleParagraphs).map((para, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          className={`${idx === 0 ? 'first-letter:text-5xl first-letter:font-handwriting first-letter:mr-2 first-letter:float-left first-letter:text-art-accent' : ''}`}
                        >
                          {para}
                        </motion.p>
                      ))}
                      {visibleParagraphs < letterContent.body.split('\n\n').length && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setVisibleParagraphs(prev => prev + 1)}
                          className="text-art-accent text-sm uppercase tracking-[0.2em] font-bold mt-4 flex items-center gap-2 hover:translate-x-2 transition-transform"
                        >
                          继续阅读 <ChevronRight size={14} />
                        </motion.button>
                      )}
                    </div>
                  </main>

                  <footer className="mt-20 flex flex-col items-end">
                    {visibleParagraphs === letterContent.body.split('\n\n').length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full flex flex-col items-end"
                      >
                        <span className="label-meta tracking-[0.2em] opacity-40 mb-2">Yours truly,</span>
                        <p className="text-4xl text-art-accent font-handwriting">{letterContent.signature}</p>
                        
                        <button 
                          onClick={() => setStage('loading')}
                          className="mt-16 bg-art-dark text-white px-8 py-3 rounded-sm hover:bg-art-accent transition-colors font-sans text-xs uppercase tracking-[0.2em] shadow-lg flex items-center gap-3"
                        >
                          读取10年 memory 中 <ChevronRight size={14} />
                        </button>
                      </motion.div>
                    )}
                  </footer>
               </div>
            </div>
          </motion.div>
        )}

        {stage === 'loading' && (
          <motion.div
            key="loading-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-8 bg-art-bg"
          >
            <div className="max-w-md w-full text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-12"
              >
                <Heart size={40} className="mx-auto text-art-accent" fill="currentColor" />
              </motion.div>
              
              <h2 className="text-3xl font-handwriting mb-8 text-art-dark">读取10年记忆中...</h2>
              
              <div className="w-full h-[2px] bg-art-muted rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                  onAnimationComplete={() => setStage('memories')}
                  className="h-full bg-art-accent shadow-[0_0_10px_rgba(154,93,77,0.5)]"
                />
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 label-meta opacity-40 tracking-[0.3em]"
              >
                正在解构那些闪闪亮亮的日子
              </motion.p>
            </div>
          </motion.div>
        )}

        {stage === 'memories' && (
          <motion.div
            key="memories-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen bg-art-bg flex items-center justify-center relative overflow-hidden"
          >
            {/* Background Decorative Threads */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
               <svg className="w-full h-full">
                  <motion.path 
                    d="M-100,500 C200,300 800,700 1300,400" 
                    stroke="var(--color-art-accent)" 
                    strokeWidth="1" 
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 5 }}
                  />
                  <motion.path 
                    d="M-100,200 C400,600 900,100 1300,500" 
                    stroke="var(--color-art-accent)" 
                    strokeWidth="1" 
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 5, delay: 1 }}
                  />
               </svg>
            </div>

            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20">
               <h2 className="text-4xl font-handwriting text-art-dark mb-2">轻触那些闪光的瞬间</h2>
               <p className="label-meta opacity-30 tracking-[0.4em]">MEMORIES FLOATING IN ETHER</p>
            </div>

            {/* Floating Photo Bubbles */}
            <div className="relative w-full h-screen z-10">
               {memories.map((memory, i) => {
                 const playPopSound = () => {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(400 + Math.random() * 400, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.3);
                    triggerSparkles();
                 };

                 // Calculate entry position based on side
                 const side = i % 4;
                 const startX = side === 2 ? -800 : side === 3 ? 800 : (Math.random() - 0.5) * 400;
                 const startY = side === 0 ? -600 : side === 1 ? 600 : (Math.random() - 0.5) * 400;

                 return (
                   <motion.div
                     key={memory.id}
                     drag
                     dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                     dragElastic={0.8}
                     initial={{ 
                       opacity: 0, 
                       scale: 0,
                       x: startX,
                       y: startY
                     }}
                     animate={{ 
                       opacity: 1, 
                       scale: 1,
                       x: (i % 2 === 0 ? -1 : 1) * (100 + Math.random() * 300),
                       y: (Math.sin(i) * 200),
                     }}
                     transition={{ 
                       opacity: { delay: i * 0.15, duration: 1.2 },
                       scale: { delay: i * 0.15, duration: 1.2, type: 'spring' },
                       x: {
                          duration: 10 + i,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                       },
                       y: {
                        duration: 12 + i,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                     }}
                     style={{ 
                       position: 'absolute',
                       left: '50%',
                       top: '50%',
                     }}
                     whileHover={{ scale: 1.15, zIndex: 100 }}
                     onClick={() => {
                       playPopSound();
                       if (i === memories.length - 1) {
                         setTimeout(() => {
                           setStage('interlude');
                         }, 800);
                       }
                     }}
                     className="group cursor-pointer"
                   >
                     <div className="relative">
                        {/* Bubble Outer Rings */}
                        <div className="absolute -inset-4 border border-art-accent/5 rounded-full animate-pulse" />
                        
                        {/* Rainbow Border Container */}
                        <div className="rainbow-border shadow-2xl">
                           {/* Image Bubble */}
                           <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white shadow-inner relative">
                              <img 
                                src={memory.image} 
                                alt="" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              {/* Bubble Gloss Effect */}
                              <div className="absolute inset-0 bubble-gloss pointer-events-none" />
                           </div>
                        </div>

                        {/* Tiny Label Tip */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-art-dark px-3 py-1 rounded-full text-[9px] font-sans font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-art-border">
                           {memory.date}
                        </div>
                     </div>
                   </motion.div>
                 );
               })}
            </div>

            {/* Navigation Hint */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center z-20">
               <p className="label-meta opacity-40 mb-4 tracking-widest">点击最后的碎片进入下一章</p>
               <div className="flex gap-2 justify-center">
                  {memories.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-art-accent/30" />
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {stage === 'wishes' && (
          <motion.div
            key="wishes-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen flex flex-col items-center justify-center p-8 text-center transition-colors duration-1000 ${isCandleBlown ? 'bg-art-bg' : 'bg-[#1a1816]'}`}
          >
            <AnimatePresence mode="wait">
              {!isCandleBlown ? (
                <motion.div
                  key="candle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => {
                    setIsCandleBlown(true);
                    triggerConfetti();
                  }}
                >
                  <div className="relative mb-12">
                     {/* Candle Flame */}
                     <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [-2, 2, -2],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="w-8 h-12 bg-orange-400 rounded-full blur-sm absolute -top-14 left-1/2 -translate-x-1/2 shadow-[0_0_40px_#fb923c]"
                     />
                     {/* Candle Body */}
                     <div className="w-8 h-32 bg-white rounded-t-lg shadow-inner relative">
                        <div className="absolute top-2 inset-x-0 h-4 bg-orange-100/50 rounded-full blur-sm" />
                     </div>
                  </div>
                  <h3 className="text-white/60 font-serif italic text-2xl tracking-widest animate-pulse">
                    心诚则灵，点击吹熄蜡烛许愿
                  </h3>
                </motion.div>
              ) : (
                <motion.div
                  key="wishes-content"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="max-w-4xl"
                >
                  <div className="label-meta tracking-[0.5em] mb-12 opacity-40 italic">A Celebration of Existence</div>
                  
                  <h1 className="text-7xl sm:text-9xl font-display italic mb-12 text-art-dark leading-tight tracking-tighter">
                    Happy <br /> 
                    <span className="text-art-accent">Birthday</span>
                  </h1>
                  
                  <div className="h-[1px] w-24 bg-art-accent mx-auto mb-12 shadow-sm" />

                  <div className="space-y-8 text-xl sm:text-2xl font-serif italic text-art-text/80 mb-20 max-w-3xl mx-auto leading-relaxed">
                    <p>在这风声鹤唳的世界里，我愿以整个春天为你加冕</p>
                    <p>亲爱的女孩，希望你在命运的洋流里自在徜徉，不要畏惧生命里的闷痛或苦楚</p>
                    <p>我想祝你的生命像振翅的飞鸟，掠过绵延起伏的海面叹世界之大，却仍然喧哗着不向命运投降</p>
                    <p>我会一直在你身边</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setStage('envelope');
                      setIsEnvelopeOpen(false);
                      setIsCandleBlown(false);
                      setCurrentMemory(0);
                    }}
                    className="group relative inline-flex items-center gap-6 px-12 py-5 bg-art-dark text-white rounded-md overflow-hidden shadow-2xl transition-all hover:bg-art-accent"
                  >
                    <span className="relative flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] font-bold">
                      重新开启档案 <Heart size={14} className="fill-current" />
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      
      {stage !== 'envelope' && stage !== 'wishes' && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6 bg-white/40 backdrop-blur-xl px-10 py-3 rounded-full border border-art-border shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-white/20">
          {[
            {id: 'envelope', label: '信封'}, 
            {id: 'letter', label: '信件'}, 
            {id: 'memories', label: '回忆'}
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                  setStage(item.id as Stage);
                  if (item.id === 'envelope') setIsEnvelopeOpen(false);
              }}
              className={`label-meta text-[10px] hover:opacity-100 transition-all relative py-1 ${item.id === stage ? 'text-art-accent opacity-100 font-bold' : 'opacity-40'}`}
            >
              {item.label}
              {item.id === stage && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-1 inset-x-0 h-[2px] bg-art-accent shadow-[0_0_10px_rgba(142,45,45,0.5)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
