import { expandCollapse } from '@fortmesh/animations/expand-collapse';
import { fadeIn, fadeInBottom, fadeInLeft, fadeInRight, fadeInTop, fadeOut, fadeOutBottom, fadeOutLeft, fadeOutRight, fadeOutTop } from '@fortmesh/animations/fade';
import { shake } from '@fortmesh/animations/shake';
import { slideInBottom, slideInLeft, slideInRight, slideInTop, slideOutBottom, slideOutLeft, slideOutRight, slideOutTop } from '@fortmesh/animations/slide';
import { zoomIn, zoomOut } from '@fortmesh/animations/zoom';

export const fortAnimations = [
  expandCollapse,
  fadeIn, fadeInTop, fadeInBottom, fadeInLeft, fadeInRight,
  fadeOut, fadeOutTop, fadeOutBottom, fadeOutLeft, fadeOutRight,
  shake,
  slideInTop, slideInBottom, slideInLeft, slideInRight,
  slideOutTop, slideOutBottom, slideOutLeft, slideOutRight,
  zoomIn, zoomOut,
];
