/* @flow */

// TODO: refine this type if possible; should be hex codes and rgb(a) values
type ColorType = string;

// This is just to show that these will be converted to `${number}px`,
// as opposed to other numbers which will be left as they are
type NumberOfPixelsType = number;

// TODO: refine this type if possible; should be strings that end in '%'
type PercentageType = string;

// TODO: refine this type if possible; see https://developer.mozilla.org/en-US/docs/Web/CSS/angle
type AngleType = string;

type DistanceType = NumberOfPixelsType | PercentageType;

type StyleOffsetType = { width: NumberOfPixelsType, height: NumberOfPixelsType, };

type TransformType =
  | { perspective: NumberOfPixelsType, }
  | { rotate: AngleType, }
  | { rotateX: AngleType, }
  | { rotateY: AngleType, }
  | { rotateZ: AngleType, }
  | { scale: number, }
  | { scaleX: number, }
  | { scaleY: number, }
  | { translateX: DistanceType, }
  | { translateY: DistanceType, }
  | { skewX: AngleType, }
  | { skewY: AngleType, };
type TransformsType = $ReadOnlyArray<TransformType>;

type FilterType =
// This list is ever-expanding
  | { blur: DistanceType, }
  | { brightness: number, }
  | { grayscale: PercentageType, };
type FiltersType = $ReadOnlyArray<FilterType>;

type LinearGradientType = {
  direction: AngleType,
  stops: $ReadOnlyArray<{
    color: ColorType,
    distance?: DistanceType,
  }>,
};

export type StylesType = {
  position?: 'relative' | 'absolute',
  top?: DistanceType,
  left?: DistanceType,
  bottom?: DistanceType,
  right?: DistanceType,

  margin?: DistanceType,
  marginTop?: DistanceType,
  marginBottom?: DistanceType,
  marginRight?: DistanceType,
  marginLeft?: DistanceType,

  padding?: DistanceType,
  paddingTop?: DistanceType,
  paddingBottom?: DistanceType,
  paddingRight?: DistanceType,
  paddingLeft?: DistanceType,

  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex',
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between',
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch',
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',

  backgroundColor?: ColorType,
  backgroundLinearGradient?: LinearGradientType,
  shadowColor?: ColorType,
  shadowOffset?: StyleOffsetType,
  shadowRadius?: NumberOfPixelsType,

  color?: ColorType,
  fontFamily?: string,
  fontSize?: DistanceType,
  lineHeight?: number,
  fontStyle?: 'normal' | 'italic',
  textShadowColor?: ColorType,
  textShadowOffset?: StyleOffsetType,
  textShadowRadius?: NumberOfPixelsType,

  opacity?: number,
  transform?: TransformsType,
  filter?: FiltersType,
  backdropFilter?: FiltersType,
};

type ContainerTypeType = 'container';
type ImageTypeType = 'image';
type VideoTypeType = 'video';
type HeadingTypeType =
  | 'heading'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6';
type ParagraphTypeType = 'paragraph';
export type ElementTypeType =
  ContainerTypeType |
  HeadingTypeType | ParagraphTypeType |
  ImageTypeType | VideoTypeType;

export type ElementStylesType = { [ElementTypeType]: StylesType, };

type ElementCreatorType<T: ElementTypeType, S: ?StylesType, Props: Object> = Props & {
  type: T,
  styles?: S,
};

export type ContainerElementType<E: ?$ReadOnlyArray<ElementType>, S: ?StylesType>
  = ElementCreatorType<ContainerTypeType, S, {
  elements?: E,
}>;

type MediaLayoutType = 'fill' | 'fixed' | 'fixed-height' | 'flex-item' | 'nodisplay' | 'responsive';

type ImageElementPropsType = {
  alt?: string,
  source: string,
  width: string | number,
  height: string | number,
  layout: MediaLayoutType,
};
export type ImageElementType<S: ?StylesType> =
  ElementCreatorType<ImageTypeType, S, ImageElementPropsType>;

type VideoSourceType = {
  source: string,
  type: string,
};
type VideoElementPropsType = {
  sources: $ReadOnlyArray<VideoSourceType>,
  loop?: true,
  autoplay?: true,
  width: string | number,
  height: string | number,
  layout: MediaLayoutType,
  poster?: string,
};
type VideoElementType<S: ?StylesType> = ElementCreatorType<VideoTypeType, S, VideoElementPropsType>;

export type MediaElementType = ImageElementType<*> | VideoElementType<*>;

type TextElementType<T: HeadingTypeType | ParagraphTypeType, S: ?StylesType>
  = ElementCreatorType<T, S, { text: string, }>;
export type HeadingElementType<S: ?StylesType> = TextElementType<HeadingTypeType, S>;
export type ParagraphElementType<S: ?StylesType> = TextElementType<ParagraphTypeType, S>;

export type ElementType =
  | ContainerElementType<*, *>
  | TextElementType<*, *>
  | ImageElementType<*>
  | VideoElementType<*>;

export type FillLayerType<E: ?ElementType, S: ?StylesType> = {|
  template: 'fill',
  element?: E,
  styles?: S,
|};

type ThirdsPageLayerType<E: ?[ ElementType, ElementType, ElementType, ], S: ?StylesType> = {
  template: 'thirds',
  elements?: E,
  styles?: S,
};

export type VerticalLayerType<E: ?$ReadOnlyArray<ElementType>, S: ?StylesType> = {|
  template: 'vertical',
  elements?: E,
  styles?: S,
|};

export type HorizontalLayerType<E: ?$ReadOnlyArray<ElementType>, S: ?StylesType> = {|
  template: 'horizontal',
  elements?: E,
  styles?: S,
|};

export type LayerType =
  | FillLayerType<*, *>
  | ThirdsPageLayerType<*, *>
  | VerticalLayerType<*, *>
  | HorizontalLayerType<*, *>;

export type PageType<L: ?$ReadOnlyArray<LayerType>> = {|
  id: string,
  layers: L,
|};

export type StoryAnalyticsType = {
  type?: string,
  requests?: { [key: string]: any, },
  vars?: { [key: string]: any, },
  extraUrlParams?: { [key: string]: any, },
  triggers?: { [key: string]: any, },
  transport?: {
    beacon?: boolean,
    xhrpost?: boolean,
    image?: boolean,
  },
};

export type StoryMetaType = {
  title?: string,
  canonicalUrl?: string,
  images?: $ReadOnlyArray<string>,
  datePublished?: string,
  dateModified?: string,
  author?: string,
  publisher?: {
    name: string,
    logo?: {
      url: string,
      height?: number,
      width?: number,
    },
  },
  description?: string,
};

export type StoryType = {
  title?: string,
  meta?: string | StoryMetaType,
  customCss?: string,
  defaultStyles?: { [ElementTypeType]: StylesType, },
  pages?: $ReadOnlyArray<PageType<*>>,
  canonicalUrl?: string,
  analytics?: $ReadOnlyArray<StoryAnalyticsType>,
};
