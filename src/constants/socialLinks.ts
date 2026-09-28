export const SOCIAL_LINKS = {
  twitter: 'https://x.com/fomoCorpus',
  discord: 'https://discord.com',
  discordServer: 'https://discord.gg/FOMOCORPUS',
  dexscreener: 'https://pumpfun.com',
} as const;

export type SocialLinkKey = keyof typeof SOCIAL_LINKS;
