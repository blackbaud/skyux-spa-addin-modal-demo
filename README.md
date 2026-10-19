# skyux-spa-addin-modal-demo

This SPA demonstrates a SKY Add-in implementation using SKY UX, and includes a tile that can be shown on any page as well as a few examples
of launching modals (both within the same SPA as well as a separate web application).

For more information on Blackbaud's SKY Add-in framework, see https://developer.blackbaud.com/skyapi/docs/addins.

## Run the demo

### Prerequisites

- Node.js 24.19.0, the version in `.nvmrc`. SKY UX 15 requires Node.js `^22.22.3` or `^24.18.1`.
- A SKY application that you can register add-ins with, connected to a Blackbaud environment. For development, use a non-production application. To set one up, see [Create an application](https://developer.blackbaud.com/skyapi/docs/applications/createapp).

### Serve the SPA

```bash
npm ci
npm start
```

The SPA runs at `http://localhost:4200`.

### Register the tile add-in

On your application's details page, in the **Add-ins** tile, select **Add**. Then enter:

- **Extension point:** a tile extension point, such as **Constituent Tile Dashboard** under Development Office, Constituents.
- **URL:** `http://localhost:4200/my-tile`

Most browsers let an HTTPS page load content from `http://localhost`. If yours doesn't, [serve the SPA over HTTPS](#serve-over-https). For more about registering add-ins, see [Create an add-in](https://developer.blackbaud.com/skyapi/docs/addins/get-started/createaddin).

The tile appears only while you serve the SPA locally.

### Try the demo

Open a page that shows the tile, such as a constituent record. The tile has two buttons:

- **Show Add customer modal** opens the SPA's `add-customer` route as a SKY UX modal, from the same address that serves the tile. In the modal:
  - The host page shows through behind the modal's backdrop.
  - The help button in the modal header asks the host to open help.
  - **Simulate error on save?** makes **Save** show an error instead of closing the modal.
  - **Save** closes the modal, and the tile shows the context that the modal returns.
- **Show a simple modal** opens a modal from the [addin-hello-world](https://github.com/blackbaud/addin-hello-world) sample, which must be served at `https://localhost:44358/helloworldmodal.html`.

### Serve over HTTPS

Run `npm start -- --ssl`, and register the tile at `https://localhost:4200/my-tile`. Angular creates a self-signed certificate, which your browser must trust: open `https://localhost:4200` and accept the certificate, or use your own trusted certificate with `--ssl-cert` and `--ssl-key`. The tile opens the modal from the same address, so no code changes are needed.

## Modal background

The add-customer modal doesn't set `modalConfig.style` in its `ready()` call. Starting in version 15, `@blackbaud/skyux-lib-addin-client` gives a modal add-in a transparent background, so the host page shows through behind the SKY UX modal's backdrop. Earlier versions of this demo used `::ng-deep` rules to make the body transparent and hide the backdrop; they're no longer needed.
