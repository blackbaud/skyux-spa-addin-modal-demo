# skyux-spa-addin-modal-demo

This SPA demonstrates a SKY Add-in implementation using SKY UX, and includes a tile that can be shown on any page as well as a few examples
of launching modals (both within the same SPA as well as a separate web application).

For more information on Blackbaud's SKY Add-in framework, see https://developer.blackbaud.com/skyapi/docs/addins.

## To serve locally

- Go through the <a href="https://developer.blackbaud.com/skyux/learn/overview" target="_blank">SKY UX Getting Started</a> guide
- Clone this repo locally
- Navigate to the repo folder in a command prompt, and run `npm install` to install the required modules
- Run `ng serve -o` to serve the SPA locally

## Modal background

The add-customer route uses
`modalConfig.style.transparentBackground: true` and
`modalConfig.style.hostOverlay: false`. The base client makes the iframe body transparent,
the compatible host makes its overlay transparent, and the normal SKY UX modal backdrop
remains the single visible scrim. No `::ng-deep` override is required.

To test this route from a local HTTPS add-in host, serve it on port 4201 with the trusted SKY UX development certificate:

```powershell
npm start -- --ssl --ssl-cert "$HOME\.skyux\certs\skyux-server.crt" --ssl-key "$HOME\.skyux\certs\skyux-server.key" --port 4201
```
