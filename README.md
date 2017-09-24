# Lets-Blade Documentation Website

![https://img.shields.io/travis/lets-blade/lets-blade.github.io.svg](https://travis-ci.org/lets-blade/lets-blade.github.io)

> :rocket: `master` is automatically deployed to [lets-blade.com](https://lets-blade.com)

---


# Application Structure

This website is built as a static-app, following the Application Shell pattern.


#### Content

Content is fetched and rendered on the fly from Markdown documents located in `content/`.
Documents can contain optional YAML FrontMatter for specifying page metadata or layout information.
Once fetched, content is parsed using [marked] and rendered to VDOM via [preact-markup].

#### Custom Elements

Since [preact] is used to render the Markdown content, HTML contained in a document reference any of the Components listed in `src/components/widget.js` as Custom Elements, useful for dynamic content.

#### Navigation

Currently, the navigation menu and route handling is controlled by `src/config.json`.
This is likely to change, but in the meantime it means any new pages must be linked from the `"nav"` section of the config.


---


# Local Development

### Clone & Install Dependencies

```sh
git clone https://github.com/lets-blade/lets-blade.github.io
cd lets-blade.github.io

npm install
```


## Development Workflow

**To start a live-reload development server:**

```sh
PORT=8080 npm run dev
```

> Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


**Generate a production build in `./build`:**

```sh
npm run build
```


---


## License

MIT

[marked]: https://github.com/chjj/marked
[preact]: https://github.com/developit/preact
[preact-markup]: https://github.com/developit/preact-markup
