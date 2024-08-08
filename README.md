# Salsify Code Challenge by Filipa Lacerda

**Table of Contents**

- [Salsify Code Challenge by Filipa Lacerda](#salsify-code-challenge-by-filipa-lacerda)
- [Decisions](#decisions)
  - [Technical Stack Decision](#technical-stack-decision)
    - [Styling Decision](#styling-decision)
  - [Code Strucutre](#code-strucutre)
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

## Code Strucutre

The code is divided in several parts:

- dataset: The data object
- components: The components used to render the application. Ideally they would be reusable components without any logic associated, but due to the specificity of the application I decided to keep some logic within the components.
- types: A file with all the common types
- unit tests: Unit tests can be found in the components folder, or in the root folder for the main page of the application.

## Future improvements

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
