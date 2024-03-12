# Grafana Icon Menu Plugin

![Plugin Logo](https://placekitten.com/200/200)

This Grafana plugin allows you to create a customizable menu with icons, links, and dark mode support. It's perfect for enhancing the navigation experience within your Grafana dashboards. 🖼️🔗🌓

## Features

- **Customizable Icons**: Choose from a wide range of icons to represent your menu items. 🎨
- **Easy Configuration**: Simple configuration options to define menu items and their associated links. ⚙️
- **Dark Mode Support**: Seamlessly integrates with Grafana's dark mode for optimal user experience. 🌑
- **Responsive Design**: Ensures your menu looks great across various screen sizes and devices. 📱

## Installation

1. Clone or download this repository.
2. Move the contents of the repository to your Grafana plugins directory (`<grafana_directory>/data/plugins`).
3. Restart your Grafana server.
4. The plugin should now be available for use in your Grafana dashboards. 🚀

## Usage

1. Add a new panel to your Grafana dashboard.
2. Select the "Icon Menu" visualization type.
3. Configure your menu items by specifying the icon, label, and link for each item.
4. Customize additional settings such as dark mode support, layout, and styling as needed.
5. Save your changes and enjoy your enhanced navigation experience! 🛠️

## Example Configuration

```json
{
  "darkMode": true,
  "items": [
    {
      "icon": "fa-home",
      "label": "Home",
      "link": "/dashboard/home"
    },
    {
      "icon": "fa-chart-bar",
      "label": "Metrics",
      "link": "/dashboard/metrics"
    },
    {
      "icon": "fa-cogs",
      "label": "Settings",
      "link": "/dashboard/settings"
    }
  ]
}



# Grafana panel plugin template

This template is a starting point for building a panel plugin for Grafana.

## What are Grafana panel plugins?

Panel plugins allow you to add new types of visualizations to your dashboard, such as maps, clocks, pie charts, lists, and more.

Use panel plugins when you want to do things like visualize data returned by data source queries, navigate between dashboards, or control external systems (such as smart home devices).

## Getting started

### Frontend

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   yarn dev
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

4. Run the tests (using Jest)

   ```bash
   # Runs the tests and watches for changes, requires git init first
   yarn test
   
   # Exits after running all the tests
   yarn test:ci
   ```

5. Spin up a Grafana instance and run the plugin inside it (using Docker)

   ```bash
   yarn server
   ```

6. Run the E2E tests (using Cypress)

   ```bash
   # Spins up a Grafana instance first that we tests against 
   yarn server
   
   # Starts the tests
   yarn e2e
   ```

7. Run the linter

   ```bash
   yarn lint
   
   # or

   yarn lint:fix
   ```


# Distributing your plugin

When distributing a Grafana plugin either within the community or privately the plugin must be signed so the Grafana application can verify its authenticity. This can be done with the `@grafana/sign-plugin` package.

_Note: It's not necessary to sign a plugin during development. The docker development environment that is scaffolded with `@grafana/create-plugin` caters for running the plugin without a signature._

## Initial steps

Before signing a plugin please read the Grafana [plugin publishing and signing criteria](https://grafana.com/docs/grafana/latest/developers/plugins/publishing-and-signing-criteria/) documentation carefully.

`@grafana/create-plugin` has added the necessary commands and workflows to make signing and distributing a plugin via the grafana plugins catalog as straightforward as possible.

Before signing a plugin for the first time please consult the Grafana [plugin signature levels](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/#plugin-signature-levels) documentation to understand the differences between the types of signature level.

1. Create a [Grafana Cloud account](https://grafana.com/signup).
2. Make sure that the first part of the plugin ID matches the slug of your Grafana Cloud account.
   - _You can find the plugin ID in the plugin.json file inside your plugin directory. For example, if your account slug is `acmecorp`, you need to prefix the plugin ID with `acmecorp-`._
3. Create a Grafana Cloud API key with the `PluginPublisher` role.
4. Keep a record of this API key as it will be required for signing a plugin

## Signing a plugin

### Using Github actions release workflow

If the plugin is using the github actions supplied with `@grafana/create-plugin` signing a plugin is included out of the box. The [release workflow](./.github/workflows/release.yml) can prepare everything to make submitting your plugin to Grafana as easy as possible. Before being able to sign the plugin however a secret needs adding to the Github repository.

1. Please navigate to "settings > secrets > actions" within your repo to create secrets.
2. Click "New repository secret"
3. Name the secret "GRAFANA_API_KEY"
4. Paste your Grafana Cloud API key in the Secret field
5. Click "Add secret"

#### Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`


## Learn more

Below you can find source code for existing app plugins and other related documentation.

- [Basic panel plugin example](https://github.com/grafana/grafana-plugin-examples/tree/master/examples/panel-basic#readme)
- [Plugin.json documentation](https://grafana.com/docs/grafana/latest/developers/plugins/metadata/)
- [How to sign a plugin?](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/)
