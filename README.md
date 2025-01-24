# Autocomplete Component

A highly customizable and flexible autocomplete component for React, supporting **SCSS Modules**, **Styled Components**, and **TailwindCSS** for styling. The component is designed to handle various use cases, including custom rendering, asynchronous loading, and more.

---

## Features

- **Custom Styling:** Supports SCSS Modules, Styled Components, and TailwindCSS.
- **Customizable Icons:** Add leading and trailing icons.
- **Custom Item Rendering:** Render your own item layouts with full control.
- **Keyboard Navigation:** Supports arrow key navigation and Enter to select.
- **Async Search:** Delays search queries for optimal performance with the `inputDelay` prop.
- **Dynamic Options:** Dynamically filter and render options based on input.
- **Accessibility:** Built with accessibility in mind using ARIA attributes.

---

## Props

### Core Props

| Prop                  | Type                                         | Default    | Description                                                                                      |
|-----------------------|----------------------------------------------|------------|--------------------------------------------------------------------------------------------------|
| `options`             | `AutocompleteOption[]`                      | `[]`       | The list of options to display in the dropdown. Each option should follow the `AutocompleteOption` type. |
| `value`               | `string`                                    | `''`       | The current value of the input field.                                                           |
| `label`               | `string`                                    | `null`     | The label for the input field.                                                                  |
| `placeholder`         | `string`                                    | `null`     | The placeholder for the input field.                                                            |
| `inputDelay`          | `number`                                    | `0`        | The delay in milliseconds before triggering the search function.                                 |
| `listOffset`          | `number`                                    | `10`       | The vertical offset for the dropdown list.                                                      |
| `leadingIcon`         | `ReactNode`                                 | `null`     | Icon to display on the left side of the input.                                                  |
| `trailingIcon`        | `ReactNode`                                 | `null`     | Icon to display on the right side of the input.                                                 |
| `loading`             | `boolean`                                   | `false`    | Whether to show a loading spinner in the trailing icon slot.                                    |
| `loaderColor`         | `string`                                    | `null`     | Color of the loading spinner.                                                                   |
| `defaultOption`       | `AutocompleteOption`                        | `null`     | The default selected option.                                                                    |
| `renderCustomElement` | `(props: RenderCustomElementProps) => ReactNode` | `null`     | Function to render a custom item in the dropdown. See `RenderCustomElementProps` for details.   |

### Event Props

| Prop                  | Type                                             | Description                                                                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `onInputValueChange`  | `(value: string) => void`                        | Callback triggered when the input value changes.                                                |
| `onSelectionChange`   | `(option: AutocompleteOption) => void`           | Callback triggered when a selection is made.                                                    |
| `onSearch`            | `(value: string) => void`                        | Callback triggered when the search function is invoked.                                         |

### Styling Props

| Prop      | Type                | Description                                                                                      |
|-----------|---------------------|--------------------------------------------------------------------------------------------------|
| `classes` | `AutocompleteClasses` | An object containing class names for overriding default styles.                                  |

### Default Classes (`AutocompleteClasses`)

| Key               | Description                             |
|-------------------|-----------------------------------------|
| `container`       | Wrapper container class.               |
| `label`           | Label class.                          |
| `content`         | Content container class.              |
| `inputElement`    | Input field class.                    |
| `popupContainer`  | Dropdown container class.             |
| `leftIcon`        | Left icon container class.            |
| `rightIcon`       | Right icon container class.           |
| `listItem`        | List item class.                      |

---

## Type Definitions

### AutocompleteOption

The `AutocompleteOption` type defines the structure of an individual option in the dropdown.

```typescript
type AutocompleteOption = {
  value: string | number; // The unique value of the option.
  label: string | number; // The display label of the option.
  [key: string]: any; // Any additional fields for custom needs.
};
RenderCustomElementProps
The RenderCustomElementProps type defines the props passed to the renderCustomElement function for rendering custom items.

type RenderCustomElementProps = {
  option: AutocompleteOption; // The current option being rendered.
  isActive: boolean; // Whether the item is currently focused/active.
  isSelected?: boolean; // Whether the item is selected.
  onClick: () => void; // Function to call when the item is clicked.
  getItemProps: (props?: Record<string, any>) => Record<string, any>; // Utility to bind the necessary props for tracking active items.
};

---

##Usage Examples
###1. Using SCSS Modules

import styles from './Autocomplete.module.scss';

<Autocomplete
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]}
  classes={{
    container: styles.autocompleteContainer,
    content: styles.content,
    inputElement: styles.input,
    label: styles.label,
    leftIcon: styles.leftIcon,
    rightIcon: styles.rightIcon,
    popupContainer: styles.popupContainer,
    listItem: styles.listItem,
  }}
  label="Search for a fruit"
  placeholder="Type to search..."
/>
SCSS File: Autocomplete.module.scss

.autocompleteContainer {
  gap: 6px;
  background-color: #fff;

  .label {
    color: #344054;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
  }

  .content {
    border: 1px solid #d0d5dd;
    background-color: #fff;

    &:has([data-disabled='true']) {
      border-color: #d0d5dd;
    }

    &:focus-within {
      box-shadow: 0 0 0 4px rgba(158, 119, 237, 0.24),
        0 1px 2px 0 rgba(16, 24, 40, 0.05);
    }
  }

  .input {
    min-height: 40px;
    font-size: 16px;
    line-height: 24px;
    padding: 8px 12px;
    border-radius: 6px;

    &::placeholder {
      color: #667085;
    }

    &[data-disabled='true'] {
      background-color: #f9fafb;
    }

    &.withLeadingIcon {
      padding-left: 38px;
    }

    &.withTrailingIcon {
      padding-right: 38px;
    }
  }

  .leftIcon {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 12px;

    svg {
      width: 18px;
    }
  }

  .rightIcon {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 12px;

    svg {
      width: 18px;
    }
  }

  .popupContainer {
    max-height: 300px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 4px 6px -2px rgba(16, 24, 40, 0.03),
      0 12px 16px -4px rgba(16, 24, 40, 0.08);
  }

  .listItem {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 6px;

    &:hover {
      background-color: #f9fafb;
      cursor: pointer;
    }

    &.isActive {
      background-color: #f9fafb;
    }
  }
}

---

##2. Using Styled Components

import styled from 'styled-components';

const StyledAutocompleteWrapper = styled.div`
  .container {
    gap: 6px;
    background-color: #fff;
  }

  .label {
    color: #344054;
    font-size: 14px;
    font-weight: 500;
  }

  .content {
    border: 1px solid #d0d5dd;

    &:focus-within {
      box-shadow: 0 0 0 4px rgba(158, 119, 237, 0.24);
    }
  }
`;

<StyledAutocompleteWrapper>
  <Autocomplete
    options={[
      { label: 'Carrot', value: 'carrot' },
      { label: 'Tomato', value: 'tomato' },
    ]}
    label="Search for a vegetable"
    placeholder="Start typing..."
  />
</StyledAutocompleteWrapper>

---
##3. Using TailwindCSS

<Autocomplete
  classes={{
    container: 'flex flex-col gap-1 bg-white',
    label: 'text-gray-600 text-sm',
    content: 'border border-gray-300 rounded-md',
    inputElement: 'px-3 py-2 w-full text-base focus:outline-none',
    popupContainer: 'shadow-lg rounded-md bg-white max-h-60 overflow-auto',
    listItem: 'px-4 py-2 hover:bg-gray-100',
  }}
  options={[
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
  ]}
  label="Search for an animal"
  placeholder="Type something..."
/>
---
###Notes
##Using renderCustomElement
When using a custom renderer, ensure you pass getItemProps to the rendered item for proper functionality:

<Autocomplete
  renderCustomElement={(props) => (
    <div {...props.getItemProps({ onClick: props.onClick })}>
      {props.option.label}
    </div>
  )}
/>
This ensures the component can track active and selected items correctly.