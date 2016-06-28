# Scripts

There are several scripts for end-user and developer.

**For end users you can only know `npm run build` and `npm run serve` to start and `npm run dev:examples` to write or modify a demo.**

* `npm run build:browser`: build HTML5 renderer to `dist/browser.js`.
* `npm run build:native`: build JS framework for native renderer to `dist/native.js`.
* `npm run build:examples`: build all js bundles from `examples/` to `examples/build/`.
* `npm run build:test`: build all js bundles from `test/` to `test/build/`.
* `npm run build`: build all above.
* `npm run dev:browser`, `npm run dev:native`, `npm run dev:examples`, `npm run dev:test` are the watcher mode for all build scripts, any file changes will automatically be built.
* `npm run serve`: run a http server so you can access all examples in browser through `http://localhost:12580/`. **note: you must run `npm run build` first to prepare all the built files.**
* `npm run clean:examples`: clean `examples/build/`.
* `npm run clean:test`: clean `test/build/`.
* `npm run clean`: clean both `examples/build/` and `test/build/`.
* `npm run copy`: copy JS framework and examples into Android project.
* `npm run lint`, `npm run test`, `npm run cover` and `npm run ci` are something quality assurance.
