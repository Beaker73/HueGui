# HueGui - The Gui for Hue

Development on this Gui for Hue has just started and far from usable.

If you are curious, you can [try the latest version here](http://huegui.z6.web.core.windows.net/)

## Questions

### Why is the example running on HTTP?
This is needed because the Hue Bridge's API uses HTTP only. Using a HTTP API from an HTTP website is prohibited by the browser.

However after the website has been loaded everything runs localy on your browser and only your local network is used for directly communication to the Hue system.

### Why doesn't it find my Bridge?
The computer you are using must be on the same (WiFi)network as the Bridge is. Support via internet access is on the roadmap.

### Why is my Bridge connection gone when using different device/browser
This web application is stand-alone and is not using any backend. Any configuration you do, including the Bridge connection, is stored in your local browsers storage. So a different browser (on same or different device) will be unaware of any configured bridge in another browser.

## Roadmap / Ideas
The following ideas are on the roadmap in 'random' order and no priority assigned.
- Managing lights
- Managing groups/rooms
- Managing scenes
- Managing devices
- Remote Access via Internet
- Designing custom routines using workflow like interface
