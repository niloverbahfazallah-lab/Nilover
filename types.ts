export enum ImageStyle {
  NONE = 'None',
  REALISTIC = 'Realistic',
  CARTOON = 'Cartoon',
  FANTASY = 'Fantasy',
  ARTISTIC = 'Artistic',
  THREE_D = '3D Render',
  CINEMATIC = 'Cinematic',
  ANIME = 'Anime',
  OIL_PAINTING = 'Oil Painting'
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT_3_4 = '3:4',
  PORTRAIT_9_16 = '9:16',
  LANDSCAPE_4_3 = '4:3',
  LANDSCAPE_16_9 = '16:9'
}

export interface GenerationConfig {
  prompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
}

export interface GenerationResult {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}