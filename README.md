# canvas-lms-api-wrapper

A higher-level wrapper around Canvas LMS's API

[![GitHub Release](https://img.shields.io/github/release/thiagodnf/canvas-lms-api-wrapper.svg)](https://github.com/thiagodnf/canvas-lms-api-wrapper/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/thiagodnf/canvas-lms-api-wrapper.svg)](https://github.com/thiagodnf/canvas-lms-api-wrapper/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/thiagodnf/canvas-lms-api-wrapper.svg)](https://github.com/thiagodnf/canvas-lms-api-wrapper)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Usage

Before running this app, you have to set the following environment variables:

```js
CANVAS_API_URL=
CANVAS_API_TOKEN=
CANVAS_COURSE_ID=
```

Then you are able import the library and create an `CanvasApi` instance:


```js
import CanvasApi from "@thiagodnf/canvas-lms-api-wrapper"

const api = new CanvasApi();
```

After that, you can call the correct resouces described as follows:

### `pages`

```js
let data = {
    title: "This is the title",
    body: "This is the body"
};

api.pages().createOrUpdate(data).then((response) => {
    console.log(response);
});
```

### `syllabus`

```js
let data = {
    syllabus_body: "This is the body"
};

api.syllabus().update(data).then((response) => {
    console.log(response);
});
```

## For Developers

Install the dependencies

```bash
npm install
```

Run the linter and unit tests

```bash
npm run all
```

## Questions or Suggestions

Feel free to access the <a href="../../discussions">discussions tab</a> as you need

## Contribute

Contributions to this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## License

Licensed under the [MIT license](LICENSE).

## Donate

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, reach out to me if you want to do it.

Thanks!

❤️
