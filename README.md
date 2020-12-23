# Snake Game in React

I've written an according medium article about how I did this project.

> [Medium Article](https://oliverdietsche.medium.com/snake-game-in-react-using-typescript-ee14efbe4e8b)
<!-- markdownlint-disable-next-line no-blanks-blockquote -->
> [First Version](https://react-snake-steel.vercel.app)
<!-- markdownlint-disable-next-line no-blanks-blockquote -->
> [Second Version](https://react-snake-steel.vercel.app/v2)
<!-- markdownlint-disable-next-line no-blanks-blockquote -->
> [Storybook](https://react-snake-storybook.vercel.app/?path=/story/components-field--interactive)

## Why multiple versions?

My first approach was not keeping track of the game board but instead going trough each field every render and validate which type of field it is. In order to practice different approaches and having a second version in order to compare them I built version 2. There, I focused on maintaining one single game board and only manipulating the few fields that change each render. I'm not quite sure yet which version is better but you can test them both out by yourself.
