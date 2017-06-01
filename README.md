# Google Analytics plugin for Snowplow

[![Build Status][travis-image]][travis] [![License][license-image]][license]

## Overview

[sp-ga-plugin.js](sp-ga-plugin.js) lets you fork the payloads sent to Google Analytics to your
Snowplow endpoint.

|   **[Devops Guide][devops-guide]**   |   **[Analysts Guide][analysts-guide]**  |   **[Developers Guide][developers-guide]**  |
|:------------------------------------:|:---------------------------------------:|:-------------------------------------------:|
|  [![i1][devops-image]][devops-guide] | [![i2][analysts-image]][analysts-guide] | [![i3][developers-image]][developers-guide] |

## Quickstart

You can use the plugin by requiring it and specifying your Snowplow endpoint:

```html
<script>
  // usual isogram
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('require', 'spGaPlugin', { endpoint: 'd3rkrsqld9gmqf.cloudfront.net' });
  ga('send', 'pageView');
</script>
<scipt async src="https://d1fc8wv8zag5ca.cloudfront.net/0.1.0/sp-ga-plugin.js"></script>
```

## Copyright and license

Google Analytics plugin for Snowplow is copyright 2017-2017 Snowplow Analytics Ltd.

Licensed under the **[Apache License, Version 2.0][license]** (the "License");
you may not use this software except in compliance with the License.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[travis]: https://travis-ci.org/snowplow/snowplow-google-analytics-plugin
[travis-image]: https://travis-ci.org/snowplow/snowplow-google-analytics-plugin.png?branch=master

[license]: http://www.apache.org/licenses/LICENSE-2.0
[license-image]: http://img.shields.io/badge/license-Apache--2-blue.svg?style=flat
