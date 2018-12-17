
angular-server-side-configuration
=================================

[Documentation](https://github.com/kyubisation/angular-server-side-configuration/blob/master/documentation/README.md)

Configure an angular application at runtime on the server via environment variables.

Motivation
----------

The Angular CLI provides build time configuration (via environment.ts). In a Continuous Delivery environment this is sometimes not enough.

How it works & Limitations
--------------------------

Environment variables are used for configuration. This package provides a script to search for usages in bundled angular files and a script for inserting populated environment variables into index.html file(s) by replacing `<!--CONFIG-->` (Missing environment variables will be represented by null). This should be done on the host serving the bundled angular files.

### AOT

This will not work in Module.forRoot or Module.forChild scripts or parameters. These are build time only due to AOT restrictions.

Getting Started
---------------

```
npm install --save angular-server-side-configuration
```

### environment.prod.ts

Use process.env.NAME in your environment.prod.ts, where NAME is the environment variable that should be used.

```typescript
import 'angular-server-side-configuration/process';

export const environment = {
  production: process.env.PROD !== 'false',
  apiAddress: process.env.API_ADDRESS || 'https://example-api.com'
};
```

### index.html (Optional)

Add `<!--CONFIG-->` to index.html. This will be replaced by the configuration script tag. This is optional, as the environment variables can simply be inserted somewhere in the head tag. It is however the safest option.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Example</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!--CONFIG-->
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### On host server or in Dockerfile (or similar)

```bash
npm install -g angular-server-side-configuration
ngssc insert /path/to/angular/files --search
```

CLI
---

angular-server-side-configuration provides a CLI.

```bash
npm install angular-server-side-configuration -g
ngssc --help
```

### Insert

Usage: insert \[options\] \[directory\]

Search and replace the placeholder with environment variables (Directory defaults to current working directory)

Options

Description

`-s, --search`

Search environment variables in available .js files (Defaults to false)

`-e, --env <value>`

Add an environment variable to be resolved (default: \[\])

`-p, --placeholder <value>`

Set the placeholder to replace with the environment variables (Defaults to `<!--CONFIG-->`)

`-h, --head`

Insert environment variables into the head tag (after title tag, if available, otherwise before closing head tag)

`--dry`

Perform the insert without actually inserting the variables

`-h, --help`

output usage information

### Init

Usage: init \[options\] \[directory\]

Initialize an angular project with angular-server-side-configuration (Directory defaults to current working directory)

Options

Description

`-ef, --environment-file`

The environment file to initialize (environmentFile defaults to src/environments/environment.prod.ts)

`--npm`

Install angular-service-side-configuration via npm (Default)

`--yarn`

Install angular-service-side-configuration via yarn

`-h, --help`

output usage information

License
-------

Apache License, Version 2.0

## Index

### External modules

* ["cli/cli"](modules/_cli_cli_.md)
* ["cli/command-base"](modules/_cli_command_base_.md)
* ["cli/index"](modules/_cli_index_.md)
* ["cli/init-command"](modules/_cli_init_command_.md)
* ["cli/insert-command"](modules/_cli_insert_command_.md)
* ["common/deprecated"](modules/_common_deprecated_.md)
* ["common/index"](modules/_common_index_.md)
* ["common/walk"](modules/_common_walk_.md)
* ["environment-variables-configuration"](modules/_environment_variables_configuration_.md)
* ["index"](modules/_index_.md)

---
