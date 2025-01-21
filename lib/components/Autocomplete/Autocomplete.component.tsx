import { AutocompleteProps } from './Autocomplete.types';
import styles from './Autocomplete.module.scss';
import useAutocomplete from './useAutocomplete';
import classNames from 'classnames';
import Loader from '@components/Loader';

const Autocomplete = ({
  options = [],
  value = '',
  label,
  inputDelay,
  listOffset = 10,
  disabled,
  placeholder,
  leadingIcon,
  trailingIcon,
  defaultOption,
  loading,
  className,
  renderCustomElement,
  onInputValueChange,
  onSelectionChange,
  onSearch,
}: AutocompleteProps) => {
  const {
    inputElement,
    floatingStyles,
    isRightIcon,
    inputValue,
    refs,
    isOpen,
    activeIndex,
    currentOptions,
    context,
    FloatingFocusManager,
    getReferenceProps,
    getFloatingProps,
    handleInputClick,
    handleEnterKey,
    handleOnPast,
    onInputChange,
    getRenderOptions,
  } = useAutocomplete({
    options,
    value,
    inputDelay,
    listOffset,
    leadingIcon,
    trailingIcon,
    defaultOption,
    loading,
    renderCustomElement,
    onInputValueChange,
    onSelectionChange,
    onSearch,
  });

  return (
    <div className={classNames(className, 'container', styles.container)}>
      {label && (
        <div
          className={classNames('labelElement', styles.styledLabel)}
          onClick={() => inputElement.focus()}
        >
          {label}
        </div>
      )}

      <div
        data-disabled={!!disabled}
        className={classNames('contentElement', styles.content)}
      >
        {leadingIcon && (
          <div className={styles.leftIcon} onClick={handleInputClick}>
            {leadingIcon}
          </div>
        )}

        <input
          {...getReferenceProps({
            ref: refs.setReference,
            onChange: onInputChange,
            disabled,
            onClick: handleInputClick,
            value: inputValue,
            placeholder,
            'aria-autocomplete': 'list',
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-activedescendant':
              activeIndex !== null ? `option-${activeIndex}` : undefined,
            onKeyDown: handleEnterKey,
            onPaste: handleOnPast
          })}
          className={classNames('inputElement', styles.styledInput, {
            [styles.leadingIcon]: leadingIcon,
            [styles.trailingIcon]: isRightIcon,
          })}
        />

        {isRightIcon && (
          <div className={styles.rightIcon} onClick={handleInputClick}>
            {loading ? <Loader size='inherit' /> : trailingIcon}
          </div>
        )}

        {isOpen && currentOptions.length > 0 && (
          <FloatingFocusManager context={context} returnFocus initialFocus={-1}>
            <div
              style={floatingStyles}
              {...getFloatingProps({ ref: refs.setFloating })}
              className={classNames('popupContainer', styles.listContainer)}
            >
              {getRenderOptions()}
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
