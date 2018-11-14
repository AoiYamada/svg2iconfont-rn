import glyphMap from '../dest/glyphmaps/<%=fontName%>.json';
import { createIconSet } from '@expo/vector-icons';

export default createIconSet(glyphMap, '<%=fontName%>', require('../dest/fonts/<%=fontName%>.ttf'));