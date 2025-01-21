import {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import {
  FloatingFocusManager,
  useFloating,
  useInteractions,
  useListNavigation,
  useDismiss,
  useRole,
  autoUpdate,
  offset,
  flip,
  size,
} from '@floating-ui/react';
import { AutocompleteOption, UseAutocompleteProps } from './Autocomplete.types';
import styles from './Autocomplete.module.scss';
import { Check } from '../Icons';
import classNames from 'classnames';

const useAutocomplete = ({
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
}: UseAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [currentOptions, setCurrentOptions] = useState<AutocompleteOption[]>(options);
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption | undefined>(defaultOption);
  const [isTyped, setIsTyped] = useState(false);
  const [isPasted, setIsPasted] = useState(false);
  const listRef = useRef<(HTMLElement | null)[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(listOffset),
      flip(),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    focusItemOnOpen: true,
    focusItemOnHover: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, dismiss, listNavigation],
  );

  const inputElement = refs.domReference.current as HTMLInputElement;
  const isRightIcon = !!trailingIcon || !!loading;

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
    if (!inputElement) return;

    const paddingHorizontal = (icon?: boolean) => (icon ? 38 : 12);
    const paddingVertical = 8;

    const { left, right, top, bottom } = inputElement.getBoundingClientRect();
    const { clientX: clickX, clientY: clickY } = e;
    const isClickOutsideHorizontal =
      clickX < left + paddingHorizontal(!!leadingIcon) ||
      clickX > right - paddingHorizontal(loading || !!trailingIcon);
    const isClickOutsideVertical =
      clickY < top + paddingVertical || clickY > bottom - paddingVertical;

    const isClickOutside = isClickOutsideHorizontal || isClickOutsideVertical;

    if (isClickOutside) {
      const cursorPosition = inputElement.value.length;
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }

    return inputElement.focus();
  };

  const handleInputChange = (value: string) =>
    onInputValueChange ? onInputValueChange(value) : setInputValue(value);

  const handleEnterKey = (event: KeyboardEvent<Element>) => {
    if (
      event.key === 'Enter' &&
      activeIndex !== null &&
      currentOptions[activeIndex]
    ) {
      handleInputChange(currentOptions[activeIndex].label.toString());
      onSelectionChange?.(currentOptions[activeIndex]);
      setSelectedOption(currentOptions[activeIndex]);
      setIsOpen(false);
    }
  };

  const handleOnPast = () => setIsPasted(true);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isPasted) {
      setIsTyped(true);
    }

    handleInputChange(e.target.value);
    setIsOpen(true);
  };

  const onListItemClick = (listOption: AutocompleteOption) => {
    handleInputChange(listOption.label.toString());
    setIsOpen(false);
    inputElement.focus();
    onSelectionChange?.(listOption);
    setSelectedOption(listOption);
  };

  const getRenderOptions = () =>
    currentOptions.map((option, index) => {
      const itemProps = getItemProps({
        ref(node) {
          listRef.current[index] = node;
        },
        onClick: () => onListItemClick(option),
      });
      const isSelectedOption = selectedOption?.value === option.value;

      return renderCustomElement ? (
        renderCustomElement({
          option,
          isActive: index === activeIndex,
          onClick: () => onListItemClick(option),
          getItemProps: (props) => ({ ...itemProps, ...props }),
        })
      ) : (
        <div
          className={classNames(styles.listItem, {
            selectedOption: isSelectedOption,
            [styles.isActive]: index === activeIndex || isSelectedOption,
          })}
          key={`${option.label}-${option.value}`}
          {...itemProps}
        >
          {option.label}
          {isSelectedOption && <Check />}
        </div>
      );
    });

  useEffect(() => {
    const searchCurrentValue = () => {
      if (onSearch) {
        onSearch(inputValue);
      } else {
        const filteredOptions = options.filter((option) =>
          option.label
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase()),
        );
        setCurrentOptions(filteredOptions);
      }

      setIsPasted(false);
    };

    if (!!inputDelay && !isPasted && isTyped) {
      const timeOutSearchValue = setTimeout(() => {
        setIsTyped(false);
        searchCurrentValue();
      }, inputDelay);

      return () => clearTimeout(timeOutSearchValue);
    } else {
      searchCurrentValue();
    }
  }, [inputValue]);

  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return {
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
  };
};

export default useAutocomplete;
