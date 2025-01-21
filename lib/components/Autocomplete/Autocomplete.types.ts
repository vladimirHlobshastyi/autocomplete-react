import { ReactNode } from 'react';
import { useInteractions } from '@floating-ui/react';

type GetItemProps = ReturnType<typeof useInteractions>['getItemProps'];

export type AutocompleteOption = {
  value: string | number;
  label: string | number;
  // eslint-disable-next-line
  [key: string]: any;
};

export interface RenderCustomElementProps {
  option: AutocompleteOption;
  isActive: boolean;
  isSelected?: boolean;
  onClick: () => void;
  getItemProps: GetItemProps;
}

interface BaseAutocompleteProps {
  defaultOption?: AutocompleteOption;
  options?: AutocompleteOption[];
  value?: string;
  inputDelay?: number;
  listOffset?: number;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  renderCustomElement?: (props: RenderCustomElementProps) => ReactNode;
  onInputValueChange?: (value: string) => void;
  onSelectionChange?: (option: AutocompleteOption) => void;
  onSearch?: (value: string) => void;
}

export interface UseAutocompleteProps extends BaseAutocompleteProps {
  options: AutocompleteOption[];
  value: string;
}

export interface AutocompleteProps extends BaseAutocompleteProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
