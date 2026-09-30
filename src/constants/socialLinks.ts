export const SOCIAL_LINKS = {
  twitter: 'https://x.com/fomoCorpus',
  discord: 'coming soon',
  discordServer: 'LAUNCH ARENA COMING SOON',
  dexscreener: 'https://pump.fun/coin/',
  CA:"",
} as const;

export type SocialLinkKey = keyof typeof SOCIAL_LINKS;
