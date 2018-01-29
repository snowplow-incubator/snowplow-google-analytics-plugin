/*
 * Snowplow Google Analytics plugin.
 *
 * Copyright (c) 2017-2017 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and
 * limitations there under.
 */

function SpGaPlugin(tracker, config) {
  this.endpoint = (config.endpoint.substr(-1) != '/') ? config.endpoint + '/' : config.endpoint;

  var vendor = 'com.google.analytics';
  var version = 'v1';
  var path = this.endpoint + vendor + '/' + version;

  var sendHitTask = 'sendHitTask';

  var originalSendHitTask = tracker.get(sendHitTask);
  tracker.set(sendHitTask, function(model) {
    var payload = model.get('hitPayload');
    originalSendHitTask(model);
    var request = new XMLHttpRequest();
    request.open('POST', path, true);
    request.setRequestHeader("Content-type", "text/plain; charset=UTF-8")
    request.send(payload);
  });
}

function providePlugin(pluginName, pluginConstructor) {
  var ga = getGA();
  if (typeof ga == 'function') {
    ga('provide', pluginName, pluginConstructor);
  }
}

function getGA() {
  return window[window['GoogleAnalyticsObject'] || 'ga'];
}

providePlugin('spGaPlugin', SpGaPlugin);
