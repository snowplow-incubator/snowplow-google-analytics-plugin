# Google Analytics plugin for Snowplow

[![Build Status][travis-image]][travis] [![License][license-image]][license]

## Overview

[sp-ga-plugin.js](sp-ga-plugin.js) lets you fork the payloads sent to Google Analytics to your
Snowplow endpoint.

|   **[Technical Docs][tech-docs]**   |   **[Setup Guide][setup-guide]**  | **Roadmap & contributing** |
|:-----------------------------------:|:---------------------------------:|:--------------------------:|
| [![i1][tech-docs-image]][tech-docs] | [![i2][setup-image]][setup-guide] |    ![i3][roadmap-image]    |

## Quickstart

You can use the plugin by requiring it and specifying your Snowplow endpoint:

```html
<script>
  // usual isogram
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('require', 'spGaPlugin', { endpoint: 'https://d3rkrsqld9gmqf.cloudfront.net' });
  ga('send', 'pageView');
</script>
<scipt async src="https://d1fc8wv8zag5ca.cloudfront.net/sp-ga-plugin/0.1.0/sp-ga-plugin.js"></script>
```

Where `https://d3rkrsqld9gmqf.cloudfront.net` is your Snowplow collector endpoint.

## Deployment with Google Tag Manager

Google Tag Manager does not currently support loading plugins when using Google Analytics tag templates. A common workaround is to use a Custom HTML tag to load the tracker with the plugin, but this has the unfortunate consequence of requiring that _all_ tags to which the plugin should be applied use the same tracker name. This is difficult to do with Google Tag Manager in a way that doesn't compromise data collection quality.

The best way to deploy this using Google Tag Manager is to replicate the plugin functionality by overwriting the relevant task in the GA hit builder task queue. But instead of modifying `sendHitTask` directly, a safer way is to approach it via `customTask`. 

### 1. Create a new Custom JavaScript variable

Create a new Custom JavaScript variable, and name it {{customTask - Snowplow duplicator}}. Add the following code within:

```
function() {
  // Add your snowplow collector endpoint here
  var endpoint = 'https://my.snowplow.collector.com/';
  
  return function(model) {
    var vendor = 'com.google.analytics';
    var version = 'v1';
    var path = ((endpoint.substr(-1) !== '/') ? endpoint + '/' : endpoint) + vendor + '/' + version;
    
    var globalSendTaskName = '_' + model.get('trackingId') + '_sendHitTask';
    
    var originalSendHitTask = window[globalSendTaskName] = window[globalSendTaskName] || model.get('sendHitTask');
    
    model.set('sendHitTask', function(sendModel) {
      var payload = sendModel.get('hitPayload');
      originalSendHitTask(sendModel);
      var request = new XMLHttpRequest();
      request.open('POST', path, true);
      request.setRequestHeader('Content-type', 'text/plain; charset=UTF-8');
      request.send(payload);
    });
  };
}
```

This stores a reference to the original `sendHitTask` in a globally scoped variable (e.g. `window['_UA-12345-1_sendHitTask']`) to avoid multiple runs of this `customTask` from cascading on each other.

### 2. Add {{customTask - Snowplow duplicator}} to Google Analytics tags

This variable must be added to every single Google Analytics tag in the GTM container, whose hits you want to duplicate to Snowplow. 

The best way to do this is to leverage the Google Analytics Settings variable.

Regardless of whether you choose to add this variable directly to the tags' settings or into a Google Analytics Settings variable, you need to do the following.

1. Browse to the tags' **More Settings** option, expand it, and then expand **Fields to set**. If you are editing the tag directly (i.e. not using a Google Analytics Settings variable), you will need to check "Enable overriding settings in this tag" first.

2. Add a new field with:

    - **Field name**: customTask
    - **Value**: {{customTask - Snowplow duplicator}}
    
All tags which have this field set will now send the Google Analytics payload to the Snowplow endpoint.

Further reading on the topic:

* [_Google Analytics Settings Variable_](https://www.simoahava.com/analytics/google-analytics-settings-variable-in-gtm/)

* [_#GTMTips: Automatically Duplicate Google Analytics Hits To Snowplow_](https://www.simoahava.com/analytics/automatically-fork-google-analytics-hits-snowplow/)

## Copyright and license

Google Analytics plugin for Snowplow is copyright 2018-2018 Snowplow Analytics Ltd.

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

[tech-docs]: https://github.com/snowplow/snowplow/wiki/Setting-up-google-analytics-integration
[setup-guide]: https://github.com/snowplow/snowplow/wiki/Setting-up-google-analytics-integration

[tech-docs-image]: https://d3i6fms1cm1j0i.cloudfront.net/github/images/techdocs.png
[setup-image]: https://d3i6fms1cm1j0i.cloudfront.net/github/images/setup.png
[roadmap-image]: https://d3i6fms1cm1j0i.cloudfront.net/github/images/roadmap.png
