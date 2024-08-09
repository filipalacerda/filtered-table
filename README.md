# Salsify Code Challenge by Filipa Lacerda

**Table of Contents**

- [Salsify Code Challenge by Filipa Lacerda](#salsify-code-challenge-by-filipa-lacerda)
- [Decisions](#decisions)
  - [Technical Stack Decision](#technical-stack-decision)
    - [Styling Decision](#styling-decision)
    - [Filters decisions](#filters-decisions)
      - [`none` filter](#none-filter)
      - [`value` field of the search](#value-field-of-the-search)
  - [Code Strucutre](#code-strucutre)
    - [Components](#components)
  - [Future improvements](#future-improvements)
  - [Run the Project](#run-the-project)
    - [Run locally](#run-locally)
    - [Run tests](#run-tests)

# Decisions

## Technical Stack Decision

I know Salsify uses Ember, however it's been over 10 years since I've used Ember.
And during a week I wouldn't have time to re-learn ember and submit a good code solution for this exercise.

Joana mentioned in the interview process that I should choose the tool I'm most confortable with.

This project uses a React and Nextjs application using TypeScript.
For unit tests, it uses Jest and React Testing Library.

For Styles, it uses TailwindCSS.

### Styling Decision

I decided to use Tailwind CSS to speed up the development process. Ideally I would write the CSS my self, specially if I'm given specific designs.

The decision was made in order to focus on the JavaScript side and unit tests instead of writting the CSS myself. I'd rather have a usable and tested application.

### Filters decisions

#### `none` filter

1. I'm not sure if I fully understood the `none` filter.
2. From my understanding, we want to return the products where the property selected does not have a value
3. However, in this dataset, if the property selected does not have a value, the object in `property_values` array of the product does not exist at all.
4. This means I can't filter the product by the selected property and check if the `value` property is not defined.
5. In order to implement this filter, I assumed that the property selected has to be taken in consideration and that the property id matches the index in the `property_values` array.
6. I'm a little concerned that this solution does not meet the expectations since it's stated that the `Properties and Products vary from customer to customer, you cannot depend on having the same properties or products available each time this application loads`

#### `value` field of the search

1. I assumed the `[property value]` field to be render must match the property type.
2. This means if the property type is a number, the input will have a type number.
3. For the `in` search, this means the user won't be able to type more than one number

## Code Strucutre

The code is divided in several parts:

- `dataset`: The data object
- `components`: The components used to render the application. Ideally they would be reusable components without any logic associated, but due to the specificity of the application I decided to keep some logic within the components.
- `types`: A file with all the common types
- `unit tests`: Unit tests can be found in the components folder, or in the root folder for the main page of the application.

### Components

1. `search` component:
   1. This component is not meant to be reusable, since it's tied with the data formats of the properties and operators.
   2. Initially, I implemented a solution where the filters would only be applied if the a search button was clicked. But I then understood that this was not the requirements.
   3. The component filters the operators available based on the property selected
   4. The component renders a different type of input based on the property selected, allowing for a number, a string or a list to be displayed

## Future improvements

1. The `none` filter should be improved. I don't think this solution would work for different Properties and Products from customer to customer if the data does not follow the assumption that the property id matches the index of the object in the property_values array of each product.
2. The CSS should be implemented from scratch instead of using an external library, since this is a Frontend exercise and CSS is a big part of a frontend daily-job
3. In a real-world application, we would most likely be fetching an API, which means I'd be implementing a loading and an error state

## Run the Project

### Run locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run tests

```bash
yarn test
```
