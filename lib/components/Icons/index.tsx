import { IconPropTypes } from './Icons.types';

export const Check = (props: IconPropTypes) => {
  const { width = 24, height = 24, color = 'black' } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M20 6L9 17L4 12'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
