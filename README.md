# Saathi

House help at your door in 15 minutes. This repo holds the design (`docs/design/`) and the working prototype in Storybook:

- **Saathi**: the customer app, built in React Native (rendered on the web through react-native-web)
- **Saathi Partner**: the helper app, built in React Native
- **Saathi Admin**: the operations panel, built in React

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static site in storybook-static/
npm run typecheck
```

In both apps, sign in with any number. The SMS code is `4821`. The toolbar switches every phone between dark mode, large text, Hindi and small phone.

How the prototype is built (components, routes, file layout) is described in [docs/PROTOTYPE_GUIDE.md](docs/PROTOTYPE_GUIDE.md).
