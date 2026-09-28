import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GameDifficulty, GameObstacle, GameCollectible, GameParticle, GameFloatingText, RunnerCharacter } from '../types';
import { sound } from '../utils/audio';

interface ArcadeGameCanvasProps {
  difficulty: GameDifficulty;
  soundEnabled: boolean;
  musicEnabled: boolean;
  isFullscreen: boolean;
  onToggleFullscreen?: () => void;
  selectedCharacter: RunnerCharacter;
  onCharacterChange: (char: RunnerCharacter) => void;
  onGameOver: (score: number, highscore: number) => void;
  onScoreUpdate: (score: number, multiplier: number) => void;
}

export const ArcadeGameCanvas: React.FC<ArcadeGameCanvasProps> = ({
  difficulty,
  soundEnabled,
  musicEnabled: _musicEnabled,
  isFullscreen,
  onToggleFullscreen,
  selectedCharacter,
  onCharacterChange,
  onGameOver,
  onScoreUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High score in localStorage
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('fomo_runner_highscore');
      return saved ? parseInt(saved, 10) : 1048576;
    } catch {
      return 1048576;
    }
  });

  // Top 5 Leaderboard
  const [leaderboard, setLeaderboard] = useState<{ score: number; date: string; character: string }[]>(() => {
    try {
      const saved = localStorage.getItem('fomo_runner_leaderboard');
      if (saved) return JSON.parse(saved);
      return [
        { score: 1048576, date: '03:42 UTC', character: 'ALPHA' },
        { score: 720450, date: '02:15 UTC', character: 'SOMA' },
        { score: 489100, date: '01:08 UTC', character: 'CHRONO' },
      ];
    } catch {
      return [{ score: 1048576, date: '03:42 UTC', character: 'ALPHA' }];
    }
  });

  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'>('MENU');
  const [currentScore, setCurrentScore] = useState(0);
  const [multiplier, setMultiplier] = useState(4);
  const [mutagensCollected, setMutagensCollected] = useState(0);
  const [shields, setShields] = useState(3);
  const [magnetActive, setMagnetActive] = useState(false);

  // Player state refs for 60fps loop
  const playerRef = useRef({
    x: 130,
    y: 0,
    width: 44,
    height: 60,
    vy: 0,
    isGrounded: true,
    isSliding: false,
    slideTimer: 0,
    isDashing: false,
    dashTimer: 0,
    animFrame: 0,
    animTimer: 0,
    invincibleTimer: 0,
    shields: 3,
    magnetTimer: 0,
  });

  const lastJumpTimeRef = useRef(0);
  const obstaclesRef = useRef<GameObstacle[]>([]);
  const collectiblesRef = useRef<GameCollectible[]>([]);
  const particlesRef = useRef<GameParticle[]>([]);
  const floatingTextsRef = useRef<GameFloatingText[]>([]);
  const gridOffsetRef = useRef(0);
  const distanceRef = useRef(0);
  const scoreRef = useRef(0);
  const multiplierRef = useRef(4);
  const speedRef = useRef(6);
  const spawnTimerRef = useRef(0);
  const collectibleTimerRef = useRef(0);
  const screenShakeRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Difficulty settings
  const getDifficultySettings = useCallback((diff: GameDifficulty) => {
    switch (diff) {
      case 'EASY':
        return { baseSpeed: 5, mult: 2, spawnRate: 110 };
      case 'UNSTABLE':
        return { baseSpeed: 7, mult: 4, spawnRate: 85 };
      case 'CHAOS99':
        return { baseSpeed: 9.5, mult: 8, spawnRate: 65 };
    }
  }, []);

  // Start game
  const startGame = useCallback(() => {
    const settings = getDifficultySettings(difficulty);
    const initialShields = selectedCharacter === 'CHRONO' ? 4 : 3;

    playerRef.current = {
      x: 130,
      y: 0,
      width: selectedCharacter === 'SOMA' ? 48 : 44,
      height: selectedCharacter === 'SOMA' ? 52 : 60,
      vy: 0,
      isGrounded: true,
      isSliding: false,
      slideTimer: 0,
      isDashing: false,
      dashTimer: 0,
      animFrame: 0,
      animTimer: 0,
      invincibleTimer: 35, // Grace period
      shields: initialShields,
      magnetTimer: 0,
    };

    obstaclesRef.current = [];
    collectiblesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    gridOffsetRef.current = 0;
    distanceRef.current = 0;
    scoreRef.current = 0;
    multiplierRef.current = selectedCharacter === 'SOMA' ? settings.mult + 1 : settings.mult;
    speedRef.current = selectedCharacter === 'CHRONO' ? settings.baseSpeed * 0.9 : settings.baseSpeed;
    spawnTimerRef.current = 45;
    collectibleTimerRef.current = 20;
    screenShakeRef.current = 0;

    setCurrentScore(0);
    setMultiplier(multiplierRef.current);
    setMutagensCollected(0);
    setShields(initialShields);
    setMagnetActive(false);
    setGameState('PLAYING');
    sound.playClick();
  }, [difficulty, selectedCharacter, getDifficultySettings]);

  // Jump action
  const handleJump = useCallback(() => {
    const p = playerRef.current;
    if (gameState !== 'PLAYING') {
      if (gameState === 'MENU' || gameState === 'GAMEOVER') {
        startGame();
      }
      return;
    }

    const now = performance.now();
    if (now - lastJumpTimeRef.current < 200) return;
    if (!p.isGrounded) return;

    if (p.isSliding) {
      p.isSliding = false;
      p.slideTimer = 0;
    }

    p.vy = -7.6;
    p.isGrounded = false;
    lastJumpTimeRef.current = now;
    sound.playJump();

    for (let i = 0; i < 5; i++) {
      particlesRef.current.push({
        x: p.x + p.width / 2 + (Math.random() - 0.5) * 12,
        y: p.y + p.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 2,
        size: 3 + Math.random() * 2,
        color: '#cbf230',
        life: 0,
        maxLife: 16,
      });
    }
  }, [gameState, startGame]);

  // Slide action
  const handleSlide = useCallback(() => {
    const p = playerRef.current;
    if (gameState !== 'PLAYING') return;

    if (p.isGrounded && !p.isSliding) {
      p.isSliding = true;
      p.slideTimer = 34;
      sound.playSlide();

      for (let i = 0; i < 8; i++) {
        particlesRef.current.push({
          x: p.x,
          y: p.y + p.height - 4,
          vx: (Math.random() - 1.2) * 5,
          vy: -Math.random() * 2,
          size: 2 + Math.random() * 2,
          color: '#FF5100',
          life: 0,
          maxLife: 18,
        });
      }
    }
  }, [gameState]);

  // Dash action
  const handleDash = useCallback(() => {
    const p = playerRef.current;
    if (gameState !== 'PLAYING') return;
    if (!p.isDashing) {
      p.isDashing = true;
      p.dashTimer = 22;
      p.invincibleTimer = 22;
      sound.playJump();

      for (let i = 0; i < 14; i++) {
        particlesRef.current.push({
          x: p.x + Math.random() * p.width,
          y: p.y + Math.random() * p.height,
          vx: -4 - Math.random() * 5,
          vy: (Math.random() - 0.5) * 2,
          size: 4,
          color: '#cbf230',
          life: 0,
          maxLife: 25,
        });
      }

      floatingTextsRef.current.push({
        id: Date.now() + Math.random(),
        text: 'CHAOS DASH!',
        x: p.x + 20,
        y: p.y + 30,
        color: '#cbf230',
        life: 0,
        maxLife: 28,
      });
    }
  }, [gameState]);

  // Toggle Pause
  const togglePause = useCallback(() => {
    if (gameState === 'PLAYING') {
      setGameState('PAUSED');
      sound.playClick();
    } else if (gameState === 'PAUSED') {
      setGameState('PLAYING');
      sound.playClick();
    }
  }, [gameState]);

  // Touch gesture handling
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: performance.now(),
      };
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (gameState !== 'PLAYING') return;

    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 35) {
      if (dy < -35) {
        handleJump();
      } else if (dy > 35) {
        handleSlide();
      }
    } else if (dx > 45 && Math.abs(dx) > Math.abs(dy)) {
      handleDash();
    }
  }, [gameState, handleJump, handleSlide, handleDash]);

  // Keyboard handlers
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        handleJump();
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        handleSlide();
      } else if (['ShiftLeft', 'ShiftRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        handleDash();
      } else if (['KeyP', 'Escape'].includes(e.code)) {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleJump, handleSlide, handleDash, togglePause]);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const width = canvas.width;
      const height = canvas.height;
      const floorY = height * 0.72;

      let shakeX = 0;
      let shakeY = 0;
      if (screenShakeRef.current > 0) {
        shakeX = (Math.random() - 0.5) * screenShakeRef.current;
        shakeY = (Math.random() - 0.5) * screenShakeRef.current;
        screenShakeRef.current = Math.max(0, screenShakeRef.current - dt * 25);
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);

      ctx.fillStyle = '#060a08';
      ctx.fillRect(0, 0, width, height);

      const pillarCount = 8;
      const pillarWidth = width / pillarCount;
      for (let i = 0; i < pillarCount; i++) {
        const px = (i * pillarWidth - ((gridOffsetRef.current * 0.3) % pillarWidth));
        ctx.fillStyle = i % 2 === 0 ? '#101614' : '#0c1210';
        ctx.fillRect(px, 0, pillarWidth * 0.6, floorY);
        ctx.strokeStyle = '#050807';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, 0, pillarWidth * 0.6, floorY);
      }

      ctx.fillStyle = 'rgba(203, 242, 48, 0.16)';
      ctx.beginPath();
      ctx.arc(width * 0.22, floorY - 50, 24, 0, Math.PI * 2);
      ctx.arc(width * 0.55, floorY - 80, 36, 0, Math.PI * 2);
      ctx.arc(width * 0.85, floorY - 40, 28, 0, Math.PI * 2);
      ctx.fill();

      const horizonY = floorY - 40;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, width, height - horizonY);
      ctx.clip();

      const grad = ctx.createLinearGradient(0, horizonY, 0, height);
      grad.addColorStop(0, '#001408');
      grad.addColorStop(1, '#00260f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      ctx.strokeStyle = '#00FF66';
      ctx.shadowColor = '#00FF66';
      ctx.shadowBlur = 4;
      ctx.lineWidth = 1.5;

      const numH = 14;
      for (let i = 0; i <= numH; i++) {
        const progress = Math.pow(i / numH, 1.8);
        const y = horizonY + (height - horizonY) * progress;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const vanishingX = width * 0.5;
      const numV = 22;
      if (gameState === 'PLAYING') {
        gridOffsetRef.current += (playerRef.current.isDashing ? speedRef.current * 1.5 : speedRef.current) * 1.5;
      }

      for (let i = -numV; i <= numV * 2; i++) {
        const baseBottomX = (i * 54 - (gridOffsetRef.current % 54));
        ctx.beginPath();
        ctx.moveTo(vanishingX + (baseBottomX - vanishingX) * 0.08, horizonY);
        ctx.lineTo(baseBottomX, height);
        ctx.stroke();
      }
      ctx.restore();
      ctx.shadowBlur = 0;

      if (gameState === 'PLAYING') {
        const p = playerRef.current;
        const currentSpeed = p.isDashing ? speedRef.current * 1.6 : speedRef.current;

        distanceRef.current += currentSpeed * dt * 8;
        scoreRef.current += Math.floor(currentSpeed * multiplierRef.current * dt * 16);
        setCurrentScore(scoreRef.current);
        onScoreUpdate(scoreRef.current, multiplierRef.current);

        speedRef.current = Math.min(speedRef.current + dt * 0.035, 13.5);

        const gravity = p.vy < 0 ? 30 : 38;
        p.vy += gravity * dt;
        p.y += p.vy;

        if (p.y >= 0) {
          const wasInAir = !p.isGrounded;
          p.y = 0;
          p.vy = 0;
          p.isGrounded = true;

          if (wasInAir) {
            for (let k = 0; k < 4; k++) {
              particlesRef.current.push({
                x: p.x + p.width * 0.5 + (Math.random() - 0.5) * 16,
                y: floorY,
                vx: (Math.random() - 0.5) * 2.5,
                vy: -Math.random() * 1.5,
                size: 2 + Math.random() * 2,
                color: '#8e9699',
                life: 0,
                maxLife: 10,
              });
            }
          }
        }

        if (p.isSliding) {
          p.slideTimer--;
          if (p.slideTimer <= 0) p.isSliding = false;
        }

        if (p.isDashing) {
          p.dashTimer--;
          if (p.dashTimer <= 0) p.isDashing = false;
        }

        if (p.magnetTimer > 0) {
          p.magnetTimer -= dt;
          if (p.magnetTimer <= 0) setMagnetActive(false);
        }

        if (p.invincibleTimer > 0) p.invincibleTimer--;

        p.animTimer += dt * (p.isGrounded ? currentSpeed * 2.2 : 0);
        p.animFrame = Math.floor(p.animTimer) % 4;

        spawnTimerRef.current--;
        const settings = getDifficultySettings(difficulty);
        if (spawnTimerRef.current <= 0) {
          const types: ('laser' | 'gear' | 'mouth' | 'slime')[] = ['laser', 'gear', 'mouth', 'slime'];
          const chosenType = types[Math.floor(Math.random() * types.length)];

          let obsW = 40;
          let obsH = 40;
          let obsY = floorY - 40;

          if (chosenType === 'laser') {
            obsW = 85;
            obsH = 22;
            obsY = floorY - 72;
          } else if (chosenType === 'gear') {
            obsW = 42;
            obsH = 42;
            obsY = floorY - 56;
          } else if (chosenType === 'mouth') {
            obsW = 36;
            obsH = 26;
            obsY = floorY - 26;
          } else if (chosenType === 'slime') {
            obsW = 46;
            obsH = 15;
            obsY = floorY - 15;
          }

          obstaclesRef.current.push({
            id: Date.now() + Math.random(),
            type: chosenType,
            x: width + 50,
            y: obsY,
            width: obsW,
            height: obsH,
            speed: currentSpeed,
            rotation: 0,
          });

          spawnTimerRef.current = Math.floor(settings.spawnRate + Math.random() * 35);
        }

        collectibleTimerRef.current--;
        if (collectibleTimerRef.current <= 0) {
          const roll = Math.random();
          let cType: 'mutagen' | 'chaos_orb' | 'shield' | 'magnet' = 'mutagen';
          if (roll > 0.88) cType = 'shield';
          else if (roll > 0.75) cType = 'magnet';
          else if (roll > 0.5) cType = 'chaos_orb';

          collectiblesRef.current.push({
            id: Date.now() + Math.random(),
            type: cType,
            x: width + 30,
            y: floorY - 48 - Math.random() * 45,
            radius: cType === 'shield' ? 14 : 12,
            pulse: 0,
          });
          collectibleTimerRef.current = 50 + Math.floor(Math.random() * 50);
        }

        for (let i = collectiblesRef.current.length - 1; i >= 0; i--) {
          const c = collectiblesRef.current[i];
          c.x -= currentSpeed * 1.05;
          c.pulse += dt * 6;

          if (p.magnetTimer > 0) {
            const dx = (p.x + p.width / 2) - c.x;
            const dy = (floorY - 30 + p.y) - c.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 260) {
              c.x += (dx / dist) * 8.5;
              c.y += (dy / dist) * 8.5;
            }
          }

          const playerEffectiveH = p.isSliding ? p.height * 0.45 : p.height;
          const playerBox = {
            x: p.x,
            y: floorY - playerEffectiveH + p.y,
            w: p.width,
            h: playerEffectiveH,
          };

          if (
            c.x + c.radius > playerBox.x &&
            c.x - c.radius < playerBox.x + playerBox.w &&
            c.y + c.radius > playerBox.y &&
            c.y - c.radius < playerBox.y + playerBox.h
          ) {
            sound.playCollect();
            let pts = 250;
            let popupText = '+250';
            let popupColor = '#cbf230';

            if (c.type === 'mutagen') {
              pts = 250;
              setMutagensCollected((prev) => prev + 1);
              if (multiplierRef.current < 8) {
                multiplierRef.current = Math.min(8, multiplierRef.current + 1);
                setMultiplier(multiplierRef.current);
                popupText = `+250 (x${multiplierRef.current})`;
              }
            } else if (c.type === 'chaos_orb') {
              pts = 600;
              popupText = '+600 CHAOS!';
              popupColor = '#FF5100';
            } else if (c.type === 'shield') {
              pts = 100;
              p.shields = Math.min(4, p.shields + 1);
              setShields(p.shields);
              popupText = '+1 SHIELD CELL!';
              popupColor = '#00FF66';
              sound.playPowerup();
            } else if (c.type === 'magnet') {
              p.magnetTimer = 6.0;
              setMagnetActive(true);
              popupText = 'MAGNET ON (6s)!';
              popupColor = '#3b82f6';
              sound.playPowerup();
            }

            scoreRef.current += pts;

            floatingTextsRef.current.push({
              id: Date.now() + Math.random(),
              text: popupText,
              x: c.x,
              y: c.y - 10,
              color: popupColor,
              life: 0,
              maxLife: 32,
            });

            for (let k = 0; k < 10; k++) {
              particlesRef.current.push({
                x: c.x,
                y: c.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: 3 + Math.random() * 3,
                color: popupColor,
                life: 0,
                maxLife: 20,
              });
            }

            collectiblesRef.current.splice(i, 1);
            continue;
          }

          if (c.x < -40) {
            collectiblesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          const pScale = 1 + Math.sin(c.pulse) * 0.15;
          ctx.translate(c.x, c.y);
          ctx.scale(pScale, pScale);

          if (c.type === 'mutagen') {
            ctx.shadowColor = '#cbf230';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#cbf230';
            ctx.beginPath();
            ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#060a08';
            ctx.fillRect(-3, -3, 6, 6);
          } else if (c.type === 'chaos_orb') {
            ctx.shadowColor = '#FF5100';
            ctx.shadowBlur = 12;
            ctx.fillStyle = '#FF5100';
            ctx.beginPath();
            ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚡', 0, 0);
          } else if (c.type === 'shield') {
            ctx.shadowColor = '#00FF66';
            ctx.shadowBlur = 14;
            ctx.fillStyle = '#00FF66';
            ctx.beginPath();
            ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🛡️', 0, 1);
          } else if (c.type === 'magnet') {
            ctx.shadowColor = '#3b82f6';
            ctx.shadowBlur = 14;
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🧲', 0, 0);
          }
          ctx.restore();
        }

        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
          const obs = obstaclesRef.current[i];
          obs.x -= currentSpeed;
          obs.rotation += 0.08;

          ctx.save();
          if (obs.type === 'laser') {
            ctx.shadowColor = '#FF2A2A';
            ctx.shadowBlur = 14;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(obs.x, obs.y + 7, obs.width, 6);
            ctx.fillStyle = 'rgba(255, 42, 42, 0.75)';
            ctx.fillRect(obs.x - 4, obs.y + 4, obs.width + 8, 12);
            ctx.fillStyle = '#FF5100';
            ctx.fillRect(obs.x - 8, obs.y, 8, 20);
            ctx.fillRect(obs.x + obs.width, obs.y, 8, 20);
          } else if (obs.type === 'gear') {
            ctx.translate(obs.x + obs.width / 2, obs.y + obs.height / 2);
            ctx.rotate(obs.rotation);
            ctx.fillStyle = '#8e9699';
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const teeth = 8;
            for (let t = 0; t < teeth * 2; t++) {
              const r = t % 2 === 0 ? obs.width / 2 : obs.width / 3;
              const angle = (t * Math.PI) / teeth;
              if (t === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
              else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#111111';
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI * 2);
            ctx.fill();
          } else if (obs.type === 'mouth') {
            ctx.shadowColor = '#a855f7';
            ctx.shadowBlur = 8;
            ctx.fillStyle = '#7e22ce';
            ctx.beginPath();
            ctx.arc(obs.x + 20, obs.y + 20, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#c084fc';
            for (let s = 0; s < 6; s++) {
              const a = (s * Math.PI) / 3;
              ctx.beginPath();
              ctx.moveTo(obs.x + 20 + Math.cos(a) * 14, obs.y + 20 + Math.sin(a) * 14);
              ctx.lineTo(obs.x + 20 + Math.cos(a) * 24, obs.y + 20 + Math.sin(a) * 24);
              ctx.lineTo(obs.x + 20 + Math.cos(a + 0.3) * 14, obs.y + 20 + Math.sin(a + 0.3) * 14);
              ctx.fill();
            }
            ctx.fillStyle = '#111111';
            ctx.fillRect(obs.x + 10, obs.y + 16, 20, 8);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(obs.x + 13, obs.y + 16, 4, 3);
            ctx.fillRect(obs.x + 23, obs.y + 21, 4, 3);
          } else if (obs.type === 'slime') {
            ctx.shadowColor = '#00FF66';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#00FF66';
            ctx.beginPath();
            ctx.ellipse(obs.x + 26, obs.y + 10, 24, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#cbf230';
            ctx.beginPath();
            ctx.arc(obs.x + 18, obs.y + 5, 3, 0, Math.PI * 2);
            ctx.arc(obs.x + 32, obs.y + 3, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          if (p.invincibleTimer <= 0) {
            const playerEffectiveH = p.isSliding ? p.height * 0.45 : p.height;
            const playerEffectiveY = floorY - playerEffectiveH + p.y;
            const pxMargin = 6;
            const pyMargin = 4;

            const playerBox = {
              x: p.x + pxMargin,
              y: playerEffectiveY + pyMargin,
              w: p.width - pxMargin * 2,
              h: playerEffectiveH - pyMargin * 2,
            };

            const obsBox = {
              x: obs.x + 4,
              y: obs.y + 4,
              w: obs.width - 8,
              h: obs.height - 8,
            };

            const isColliding =
              playerBox.x < obsBox.x + obsBox.w &&
              playerBox.x + playerBox.w > obsBox.x &&
              playerBox.y < obsBox.y + obsBox.h &&
              playerBox.y + playerBox.h > obsBox.y;

            if (isColliding) {
              screenShakeRef.current = 14;

              if (p.shields > 1) {
                p.shields--;
                setShields(p.shields);
                p.invincibleTimer = 70;
                sound.playShieldHit();

                floatingTextsRef.current.push({
                  id: Date.now() + Math.random(),
                  text: 'SHIELD DAMAGED! (-1)',
                  x: p.x,
                  y: playerEffectiveY - 10,
                  color: '#FF5100',
                  life: 0,
                  maxLife: 35,
                });

                for (let k = 0; k < 16; k++) {
                  particlesRef.current.push({
                    x: p.x + p.width / 2,
                    y: playerEffectiveY + playerEffectiveH / 2,
                    vx: (Math.random() - 0.5) * 7,
                    vy: (Math.random() - 0.5) * 7,
                    size: 3 + Math.random() * 3,
                    color: '#00FF66',
                    life: 0,
                    maxLife: 25,
                  });
                }
              } else {
                p.shields = 0;
                setShields(0);
                sound.playHit();
                setGameState('GAMEOVER');

                const finalScore = scoreRef.current;
                if (finalScore > highScore) {
                  setHighScore(finalScore);
                  try {
                    localStorage.setItem('fomo_runner_highscore', finalScore.toString());
                  } catch {}
                }

                const newLb = [
                  ...leaderboard,
                  { score: finalScore, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), character: selectedCharacter },
                ]
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5);
                setLeaderboard(newLb);
                try {
                  localStorage.setItem('fomo_runner_leaderboard', JSON.stringify(newLb));
                } catch {}

                onGameOver(finalScore, Math.max(finalScore, highScore));

                for (let k = 0; k < 30; k++) {
                  particlesRef.current.push({
                    x: p.x + p.width / 2,
                    y: playerEffectiveY + playerEffectiveH / 2,
                    vx: (Math.random() - 0.5) * 9,
                    vy: (Math.random() - 0.7) * 8,
                    size: 3 + Math.random() * 5,
                    color: k % 2 === 0 ? '#FF2A2A' : '#FF5100',
                    life: 0,
                    maxLife: 35,
                  });
                }
                break;
              }
            }
          }

          if (obs.x < -100) {
            obstaclesRef.current.splice(i, 1);
          }
        }
      }

      const p = playerRef.current;
      const isVisible = p.invincibleTimer % 4 < 2;

      if (isVisible) {
        ctx.save();
        const playerEffectiveH = p.isSliding ? p.height * 0.45 : p.height;
        const py = floorY - playerEffectiveH + p.y;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        const shadowScale = Math.max(0.4, 1 - Math.abs(p.y) / 120);
        ctx.ellipse(p.x + p.width / 2, floorY + 2, (p.width / 2) * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();

        if (p.magnetTimer > 0) {
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x + p.width / 2, py + playerEffectiveH / 2, 38 + Math.sin(time * 0.01) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (p.shields > 1) {
          ctx.strokeStyle = 'rgba(0, 255, 102, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x + p.width / 2, py + playerEffectiveH / 2, 32, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (p.isDashing) {
          ctx.shadowColor = '#cbf230';
          ctx.shadowBlur = 16;
        }

        if (selectedCharacter === 'SOMA') {
          const squash = p.isSliding ? 0.6 : p.isGrounded ? 1 + Math.sin(p.animFrame * Math.PI) * 0.08 : 0.9;
          ctx.translate(p.x + p.width / 2, py + playerEffectiveH / 2);
          ctx.scale(1, squash);

          ctx.fillStyle = '#8b5a45';
          ctx.beginPath();
          ctx.ellipse(0, 0, 22, 22, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#8b5a45';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(8, -18);
          ctx.quadraticCurveTo(14, -28, 12, -32);
          ctx.stroke();

          ctx.fillStyle = '#cbf230';
          ctx.shadowColor = '#cbf230';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(12, -32, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(-2, -4, 11, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#1c1c17';
          ctx.beginPath();
          ctx.arc(1, -4, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(-1, -6, 2, 0, Math.PI * 2);
          ctx.fill();

          const legShift = p.isGrounded ? Math.sin(p.animFrame * Math.PI) * 5 : 2;
          ctx.fillStyle = '#6b3e2b';
          ctx.fillRect(-12 + legShift, 18, 7, 8);
          ctx.fillRect(5 - legShift, 18, 7, 8);

        } else if (selectedCharacter === 'CHRONO') {
          ctx.translate(p.x + p.width / 2, py + playerEffectiveH / 2);
          ctx.rotate(time * 0.002);

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 22, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();

        } else {
          if (p.isSliding) {
            ctx.fillStyle = '#1c1b1b';
            ctx.fillRect(p.x, py + 14, 28, 14);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(p.x + 8, py + 8, 30, 16);

            ctx.fillStyle = '#55a855';
            ctx.fillRect(p.x + 28, py + 2, 16, 16);

            ctx.fillStyle = '#111111';
            ctx.fillRect(p.x + 38, py + 6, 4, 4);

            ctx.fillStyle = '#FF5100';
            ctx.fillRect(p.x - 6, py + 24, 8, 3);
          } else {
            const legOffset = p.isGrounded ? Math.sin(p.animFrame * Math.PI * 0.5) * 6 : 4;

            ctx.fillStyle = '#52965e';
            ctx.fillRect(p.x + 10, py, 24, 22);

            ctx.fillStyle = '#2d5a37';
            ctx.fillRect(p.x + 8, py, 28, 6);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(p.x + 24, py + 8, 6, 6);
            ctx.fillStyle = '#111111';
            ctx.fillRect(p.x + 27, py + 9, 3, 4);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(p.x + 18, py + 16, 12, 4);
            ctx.fillStyle = '#111111';
            ctx.fillRect(p.x + 20, py + 17, 2, 3);
            ctx.fillRect(p.x + 26, py + 17, 2, 3);

            ctx.fillStyle = '#e5e5e5';
            ctx.fillRect(p.x + 8, py + 22, 26, 24);

            ctx.fillStyle = '#1e293b';
            ctx.fillRect(p.x + 18, py + 24, 8, 18);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(p.x + (legOffset > 0 ? 30 : 2), py + 24, 8, 14);
            ctx.fillStyle = '#52965e';
            ctx.fillRect(p.x + (legOffset > 0 ? 32 : 0), py + 34, 6, 6);

            ctx.fillStyle = '#1e293b';
            ctx.fillRect(p.x + 10 - legOffset, py + 46, 8, 12);
            ctx.fillRect(p.x + 24 + legOffset, py + 46, 8, 12);

            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(p.x + 8 - legOffset, py + 56, 11, 5);
            ctx.fillRect(p.x + 24 + legOffset, py + 56, 11, 5);
          }
        }

        ctx.restore();
      }

      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y -= 1.2;
        ft.life++;
        const alpha = 1 - ft.life / ft.maxLife;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 13px "Space Mono", monospace';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.life >= ft.maxLife) {
          floatingTextsRef.current.splice(i, 1);
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;
        const alpha = 1 - pt.life / pt.maxLife;
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        ctx.globalAlpha = 1;

        if (pt.life >= pt.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (gameState === 'MENU') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 26px "Syne", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FOMO LABS: SPECIMEN RUNNER / CHAOS RUN', width / 2, height / 2 - 50);

        ctx.fillStyle = '#00FF66';
        ctx.font = 'bold 13px "Space Mono", monospace';
        ctx.fillText('STAGE 01: ESCAPE CONTAINMENT PROTOCOL', width / 2, height / 2 - 20);

        ctx.fillStyle = '#FF5100';
        ctx.font = '11px "Space Mono", monospace';
        ctx.fillText('CONTROLS: [SPACE/W] JUMP • [S/DOWN] SLIDE • [SHIFT] DASH • [P] PAUSE', width / 2, height / 2 + 10);

        ctx.fillStyle = '#cbf230';
        ctx.font = 'bold 15px "Space Mono", monospace';
        const blink = Math.floor(time / 400) % 2 === 0;
        if (blink) {
          ctx.fillText('▶ PRESS [SPACE] OR LAUNCH BUTTON TO START ◀', width / 2, height / 2 + 55);
        }
      }

      if (gameState === 'PAUSED') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#cbf230';
        ctx.font = 'bold 26px "Syne", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CONTAINMENT SIMULATION PAUSED', width / 2, height / 2 - 20);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '13px "Space Mono", monospace';
        ctx.fillText('PRESS [P] OR CLICK RESUME TO CONTINUE', width / 2, height / 2 + 15);
      }

      if (gameState === 'GAMEOVER') {
        ctx.fillStyle = 'rgba(10, 0, 0, 0.85)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#FF2A2A';
        ctx.font = 'bold 26px "Syne", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CONTAINMENT BREACH FAILED', width / 2, height / 2 - 90);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '13px "Space Mono", monospace';
        ctx.fillText(`FINAL RUN SCORE: ${scoreRef.current.toLocaleString()} PTS`, width / 2, height / 2 - 60);
        ctx.fillText(`MUTAGENS EXTRACTED: ${mutagensCollected}  •  SPECIMEN: ${selectedCharacter}`, width / 2, height / 2 - 38);

        ctx.fillStyle = '#ECE8E0';
        ctx.font = 'bold 11px "Space Mono", monospace';
        ctx.fillText('─── TOP CONTAINMENT RECORDS ───', width / 2, height / 2 - 12);

        leaderboard.slice(0, 3).forEach((entry, idx) => {
          ctx.fillStyle = idx === 0 ? '#cbf230' : '#858383';
          ctx.font = '11px "Space Mono", monospace';
          ctx.fillText(
            `#0${idx + 1}  ${entry.score.toLocaleString()} PTS  [${entry.character}]  ${entry.date}`,
            width / 2,
            height / 2 + 12 + idx * 18
          );
        });

        ctx.fillStyle = '#cbf230';
        ctx.font = 'bold 14px "Space Mono", monospace';
        const blink = Math.floor(time / 400) % 2 === 0;
        if (blink) {
          ctx.fillText('▶ PRESS [SPACE] OR RETRY BUTTON TO RUN AGAIN ◀', width / 2, height / 2 + 88);
        }
      }

      ctx.restore();
      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, difficulty, highScore, mutagensCollected, selectedCharacter, leaderboard, onGameOver, onScoreUpdate, getDifficultySettings]);

  return (
    <div
      className="relative w-full h-[75vh] sm:h-auto sm:aspect-[16/9] max-h-[85vh] sm:max-h-[620px] bg-black overflow-hidden flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        width={960}
        height={540}
        onClick={() => {
          if (gameState === 'MENU' || gameState === 'GAMEOVER') {
            startGame();
          } else if (gameState === 'PAUSED') {
            setGameState('PLAYING');
          }
        }}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* CRT Scanline & Curved Vignette Overlay */}
      <div className="absolute inset-0 crt-overlay pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none crt-bloom"></div>

      {/* Top Left Game Telemetry HUD inside CRT screen */}
      <div className="absolute top-2 sm:top-5 left-2 sm:left-5 bg-black/85 border border-[#cbf230]/70 p-1.5 sm:p-2.5 font-mono text-[9px] sm:text-xs text-[#cbf230] backdrop-blur-sm pointer-events-none leading-relaxed z-20">
        <div className="text-white font-bold text-[10px] sm:text-xs">HIGH: {highScore.toLocaleString()}</div>
        <div className="hidden sm:inline">&gt; SEED: ESCAPE</div>
        <div>
          &gt; SCORE:{' '}
          <span className="text-white font-bold tabular-nums text-[10px] sm:text-xs">
            {currentScore.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Top Right Controls: Fullscreen Close Toggle & Stats HUD */}
      <div className="absolute top-2 sm:top-5 right-2 sm:right-5 flex flex-col items-end gap-1.5 z-30 pointer-events-auto">
        {/* Full-Screen Close / Toggle Button */}
        {onToggleFullscreen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFullscreen();
            }}
            className="bg-black/90 hover:bg-[#FF5100] hover:text-black text-white border border-[#cbf230]/60 px-2 sm:px-3 py-1 font-mono text-[9px] sm:text-[11px] uppercase font-bold tracking-wider cursor-pointer backdrop-blur-sm transition-colors shadow-md"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? '[ 🗗 EXIT FULLSCREEN ]' : '[ ⛶ FULLSCREEN ]'}
          </button>
        )}

        {/* Leaderboard Overlay / Shield Status HUD */}
        <div className="bg-black/85 border border-[#FF5100]/70 p-1.5 sm:p-2.5 font-mono text-[9px] sm:text-xs text-right backdrop-blur-sm pointer-events-none leading-relaxed">
          <div className="flex items-center justify-end gap-0.5 sm:gap-1 mb-1">
            <span className="text-[#858383] text-[8px] sm:text-[9px] mr-0.5 sm:mr-1">SHIELDS:</span>
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={`inline-block w-2 h-3 sm:w-2.5 sm:h-3.5 border ${
                  i < shields
                    ? 'bg-[#00FF66] border-[#00FF66] shadow-[0_0_6px_#00FF66]'
                    : 'bg-neutral-800 border-neutral-600 opacity-40'
                }`}
              />
            ))}
          </div>
          <div className="text-[#FF5100] font-bold text-[10px] sm:text-xs">CHAOS: {multiplier}X</div>
          <div className="text-[#cbf230] text-[10px] sm:text-xs">MUTAGENS: {mutagensCollected}</div>
          <div className="text-[#38bdf8] font-bold text-[10px] sm:text-xs">
            {selectedCharacter}
            {magnetActive && <span className="ml-1 text-[#cbf230] animate-pulse">🧲</span>}
          </div>
        </div>
      </div>

      {/* In-Game Pause Button (Top Center) */}
      {gameState === 'PLAYING' && (
        <button
          onClick={togglePause}
          className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 bg-black/80 hover:bg-[#FF5100] hover:text-black text-white border border-white/30 px-2 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider cursor-pointer z-20 backdrop-blur-sm transition-colors"
        >
          [ ⏸ PAUSE ]
        </button>
      )}

      {/* Menu Mode: Start & Character Selector */}
      {gameState === 'MENU' && (
        <div className="absolute bottom-4 sm:bottom-5 inset-x-3 sm:inset-x-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 z-20">
          <div className="bg-black/90 border border-white/30 p-1 sm:p-1.5 flex items-center gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-xs text-white">
            <span className="text-[#858383] text-[9px] sm:text-[10px] pl-1">RUNNER:</span>
            {(['ALPHA', 'SOMA', 'CHRONO'] as RunnerCharacter[]).map((char) => (
              <button
                key={char}
                onClick={() => {
                  sound.playClick();
                  onCharacterChange(char);
                }}
                className={`px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] font-bold cursor-pointer transition-colors ${
                  selectedCharacter === char
                    ? 'bg-[#cbf230] text-[#171e00]'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {char}
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            className="bg-[#cbf230] text-[#171e00] hover:bg-[#FF5100] hover:text-black font-mono text-[10px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 uppercase font-bold tracking-wider border-2 border-black brutalist-shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            ▶ START
          </button>
        </div>
      )}

      {/* Pause Mode Resume Button */}
      {gameState === 'PAUSED' && (
        <div className="absolute bottom-4 sm:bottom-6 inset-x-3 sm:inset-x-4 flex justify-center gap-2 sm:gap-3 z-20">
          <button
            onClick={() => setGameState('PLAYING')}
            className="bg-[#cbf230] text-[#171e00] hover:bg-[#FF5100] hover:text-black font-mono text-[10px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 uppercase font-bold tracking-wider border-2 border-black brutalist-shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            RESUME ▶
          </button>
          <button
            onClick={startGame}
            className="bg-black text-white hover:bg-[#FF2A2A] font-mono text-[10px] sm:text-xs px-3 sm:px-4 py-2 sm:py-2.5 uppercase font-bold tracking-wider border border-white/40 cursor-pointer"
          >
            RESTART ↺
          </button>
        </div>
      )}

      {/* Game Over Mode: Quick Retry Button */}
      {gameState === 'GAMEOVER' && (
        <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-8 flex justify-center gap-2 sm:gap-3 z-20">
          <button
            onClick={startGame}
            className="bg-[#FF2A2A] text-white hover:bg-[#FF5100] hover:text-black font-mono text-[10px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 uppercase font-bold tracking-wider border-2 border-black brutalist-shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            RETRY ↺
          </button>
        </div>
      )}

      {/* On-Screen Mobile Touch Controls */}
      {gameState === 'PLAYING' && (
        <div className="absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-6 flex items-center justify-between pointer-events-auto z-20 select-none gap-2">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSlide();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSlide();
            }}
            className="bg-black/90 active:bg-[#FF5100] text-white border-2 border-[#FF5100] px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs font-bold uppercase rounded-none brutalist-shadow-sm active:translate-y-0.5 cursor-pointer flex-1 touch-manipulation"
          >
            ⬇ SLIDE
          </button>

          <button
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDash();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDash();
            }}
            className="bg-black/90 active:bg-[#cbf230] active:text-black text-white border-2 border-white/60 px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs font-bold uppercase rounded-none brutalist-shadow-sm active:translate-y-0.5 cursor-pointer flex-1 touch-manipulation"
          >
            ⚡ DASH
          </button>

          <button
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleJump();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleJump();
            }}
            className="bg-[#cbf230] active:bg-[#FF5100] text-[#171e00] border-2 border-black px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs font-bold uppercase rounded-none brutalist-shadow-sm active:translate-y-0.5 cursor-pointer flex-1 touch-manipulation"
          >
            ⬆ JUMP
          </button>
        </div>
      )}
    </div>
  );
};