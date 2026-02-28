/**
 * Supplemental bot/crawler patterns for Edge Runtime middleware.
 *
 * Next.js's built-in `isBot` from `userAgent()` has known gaps — notably it
 * misses several Google inspection tools and social media link-preview crawlers.
 * See: https://github.com/vercel/next.js/issues/75032
 *
 * Usage:
 *   import { BOT_PATTERNS } from '@/constants/bots';
 *   if (isBot || BOT_PATTERNS.test(ua)) { return NextResponse.next(); }
 *
 * NOTE: This file is Edge Runtime compatible — pure RegExp export only.
 */
export const BOT_PATTERNS = /Google-InspectionTool|Google-CloudVertexBot|Google-Other|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Applebot|SkypeUriPreview|redditbot|vkShare|bitlybot|ia_archiver|Mediapartners-Google/i;
