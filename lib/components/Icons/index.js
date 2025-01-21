import { jsx as _jsx } from 'react/jsx-runtime';

export const Check = (props) => {
  const { width = 24, height = 24, color = 'black' } = props;
  return _jsx('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: width,
    height: height,
    viewBox: '0 0 24 24',
    fill: 'none',
    children: _jsx('path', {
      d: 'M20 6L9 17L4 12',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  });
};
