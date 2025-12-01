import { ImageStyle, AspectRatio } from './types';

export const STYLE_OPTIONS = [
  { label: 'No Style (Default)', value: ImageStyle.NONE, labelAr: 'بدون نمط (افتراضي)' },
  { label: 'Realistic / Photorealistic', value: ImageStyle.REALISTIC, labelAr: 'واقعية' },
  { label: 'Cartoon', value: ImageStyle.CARTOON, labelAr: 'كرتونية' },
  { label: 'Fantasy', value: ImageStyle.FANTASY, labelAr: 'خيالية' },
  { label: 'Artistic', value: ImageStyle.ARTISTIC, labelAr: 'فنية' },
  { label: '3D Render', value: ImageStyle.THREE_D, labelAr: 'ثلاثي الأبعاد' },
  { label: 'Cinematic', value: ImageStyle.CINEMATIC, labelAr: 'سينمائية' },
  { label: 'Anime', value: ImageStyle.ANIME, labelAr: 'أنيمي' },
  { label: 'Oil Painting', value: ImageStyle.OIL_PAINTING, labelAr: 'رسم زيتي' },
];

export const ASPECT_RATIOS = [
  { label: 'Square (1:1)', value: AspectRatio.SQUARE },
  { label: 'Landscape (16:9)', value: AspectRatio.LANDSCAPE_16_9 },
  { label: 'Portrait (9:16)', value: AspectRatio.PORTRAIT_9_16 },
  { label: 'Classic Landscape (4:3)', value: AspectRatio.LANDSCAPE_4_3 },
  { label: 'Classic Portrait (3:4)', value: AspectRatio.PORTRAIT_3_4 },
];