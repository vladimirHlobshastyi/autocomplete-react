# Autocomplete React Component

A flexible and customizable Autocomplete component for React, designed for seamless integration into your project.

## Features

- **Searchable dropdown** with keyboard and mouse navigation.
- **Customizable options** with a render function.
- **Loading state** support for async operations.
- **Icons support** for leading and trailing icons.
- **Controlled and uncontrolled modes** for input value.
- **Customizable styles**, allowing you to use your own or the built-in styles.
- **Debounce delay** for input changes with the `inputDelay` prop.

## Installation

Install the library using npm or yarn:

```bash
npm install autocomplete-react
```

or

```bash
yarn add autocomplete-react
```

## Usage

### Basic Example

```tsx
import React, { useState } from 'react';
import Autocomplete from 'autocomplete-react';

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  return (
    <div>
      <Autocomplete
        options={options}
        onSelectionChange={(option) => setSelectedOption(option)}
        placeholder="Type to search..."
      />
      <p>Selected: {selectedOption?.label || 'None'}</p>
    </div>
  );
};

export default App;
```

## Props

| Prop                  | Type                                   | Default         | Description                                                                 |
|-----------------------|----------------------------------------|-----------------|-----------------------------------------------------------------------------|
| `options`             | `AutocompleteOption[]`                | `[]`            | Array of options to display in the dropdown.                               |
| `value`               | `string`                              | `''`            | The current input value (controlled).                                      |
| `label`               | `string`                              | `undefined`     | Label for the input field.                                                 |
| `inputDelay`          | `number`                              | `undefined`     | Debounce delay for input value changes (milliseconds).                     |
| `listOffset`          | `number`                              | `10`            | Offset for the dropdown list positioning.                                  |
| `disabled`            | `boolean`                             | `false`         | Whether the input is disabled.                                             |
| `placeholder`         | `string`                              | `undefined`     | Placeholder text for the input field.                                      |
| `leadingIcon`         | `ReactNode`                           | `undefined`     | Icon to display at the start of the input field.                           |
| `trailingIcon`        | `ReactNode`                           | `undefined`     | Icon to display at the end of the input field.                             |
| `defaultOption`       | `AutocompleteOption`                  | `undefined`     | Preselected default option.                                                |
| `loading`             | `boolean`                             | `false`         | Whether the component is in a loading state.                               |
| `className`           | `string`                              | `undefined`     | Additional class names for the container.                                  |
| `renderCustomElement` | `(props: RenderCustomElementProps) => ReactNode` | `undefined`     | Custom render function for dropdown options.                               |
| `onInputValueChange`  | `(value: string) => void`             | `undefined`     | Callback for when the input value changes.                                 |
| `onSelectionChange`   | `(option: AutocompleteOption) => void` | `undefined`     | Callback for when an option is selected.                                   |
| `onSearch`            | `(value: string) => void`             | `undefined`     | Callback for search queries.                                               |

## Customization

### Render Custom Elements

You can pass a custom render function to the `renderCustomElement` prop to customize how the options are rendered.

```tsx
<Autocomplete
  options={options}
  renderCustomElement={({ option, isActive }) => (
    <div style={{ backgroundColor: isActive ? 'lightblue' : 'white' }}>
      {option.label}
    </div>
  )}
/>
```

### Styling

If you want to use your own styles, you can pass a custom `className` or override the default styles by targeting the provided class names.

| Class Name          | Description                    |
|---------------------|--------------------------------|
| `container`         | Wrapper container.            |
| `content`           | Input field wrapper.          |
| `styledInput`       | The input field.              |
| `leftIcon`          | Leading icon wrapper.         |
| `rightIcon`         | Trailing icon wrapper.        |
| `listContainer`     | Dropdown list container.      |
| `listItem`          | Dropdown list item.           |
| `styledLabel`       | Input label.                  |
| `isActive`          | Active state for list items.  |
