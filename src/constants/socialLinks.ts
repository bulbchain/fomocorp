export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com',
  discord: 'https://discord.com',
  discordServer: 'https://discord.gg/FOMOCORPUS',
  dexscreener: 'https://dexscreener.com',
} as const;

export type SocialLinkKey = keyof typeof SOCIAL_LINKS;
