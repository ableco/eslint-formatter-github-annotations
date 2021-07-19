# eslint-formatter-github-annotations

An [ESLint](https://eslint.org/) formatter to report as GitHub Checks annotations

## Usage

1. Add `eslint-formatter-github-annotations` to your dependencies:

   ``` shell
   npm install --save-dev eslint-formatter-github-annotations
   ```

2. Create a GitHub action workflow with this formatter:

   ``` yaml
   name: lint
   on:
     pull_request:
   jobs:
     eslint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - run: npm install
         - run: npx eslint -f github-annotations .
   ```

## Testing

``` shell
npm run test
```

## Contributing

Contributions are welcome. Please check out the [Contributing guide](CONTRIBUTING.md) for the guidelines you need to follow.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) so that you can understand the kind of respectful behavior we expect of all participants.

## License

Open Source Project is released under the MIT license. See [LICENSE](LICENSE) for the full license text.
