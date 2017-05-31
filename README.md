# Google Analytics plugin for Snowplow

## Overview

[sp-ga-plugin.js](sp-ga-plugin.js) lets you fork the payloads sent to Google Analytics to your
Snowplow endpoint.

You can use the plugin by requiring it and specifying your Snowplow endpoint:

```html
<script>
  // usual isogram
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('require', 'spGaPlugin', { endpoint: 'https://snowplow-endpoint/' });
  ga('send', 'pageView');
</script>
<scipt async src="https://hosting.TBD/sp-ga-plugin.js"></script>
```
