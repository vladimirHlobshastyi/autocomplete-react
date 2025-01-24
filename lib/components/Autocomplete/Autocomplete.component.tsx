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
  loaderColor,
  classes,
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
    listItem: classes?.listItem,
    renderCustomElement,
    onInputValueChange,
    onSelectionChange,
    onSearch,
  });

  return (
    <div
      className={classNames(
        classes?.container || 'container',
        styles.container,
      )}
    >
      {label && (
        <label
          className={classNames(classes?.label || 'label', styles.styledLabel)}
          onClick={() => inputElement.focus()}
        >
          {label}
        </label>
      )}

      <div
        data-disabled={!!disabled}
        className={classNames(classes?.content || 'content', styles.content)}
      >
        {leadingIcon && (
          <div
            className={classNames(
              styles.leftIcon,
              classes?.leftIcon || 'leftIcon',
            )}
            onClick={handleInputClick}
          >
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
            onPaste: handleOnPast,
          })}
          className={classNames(
            classes?.inputElement || 'inputElement',
            styles.styledInput,
            {
              withLeadingIcon: leadingIcon,
              withTrailingIcon: isRightIcon,
            },
          )}
        />

        {isRightIcon && (
          <div
            className={classNames(
              styles.rightIcon,
              classes?.rightIcon || 'rightIcon',
            )}
            onClick={handleInputClick}
          >
            {loading ? <Loader color={loaderColor} size='inherit' /> : trailingIcon}
          </div>
        )}

        {isOpen && currentOptions.length > 0 && (
          <FloatingFocusManager context={context} returnFocus initialFocus={-1}>
            <div
              style={floatingStyles}
              {...getFloatingProps({ ref: refs.setFloating })}
              className={classNames(
                classes?.popupContainer || 'popupContainer',
                styles.listContainer,
              )}
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
