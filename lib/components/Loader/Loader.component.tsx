import { LoaderPropsTypes } from './Loader.types';
import styles from './Loader.module.scss';
import classNames from 'classnames';

const Loader = ({ size = 'md', fullSize, className }: LoaderPropsTypes) => {
  return (
    <div
      className={classNames(styles.container, className, {
        [styles.fullSize]: fullSize,
      })}
    >
      <svg className={classNames(`size-${size}`)} viewBox='0 0 120 120'>
        <circle cx='60' cy='60' r='50' fill='none' strokeWidth='10' />
        <path
          fill='none'
          strokeWidth='10'
          d='M60,10
           a50,50 0 0,1 0,100'
          strokeLinecap='round'
          strokeDasharray='120 325'
          strokeDashoffset='25'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            from='0 60 60'
            to='360 60 60'
            dur='2s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    </div>
  );
};

export default Loader;
