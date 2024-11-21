// Copyright 2024 Ian Lewis
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// import {
//   type Config,
//   type GetAuthTypeResponse,
//   type GetDataResponse,
//   type GetSchemaResponse,
// } from "google-apps-script";

/**
 * getSchema returns a configuration object for the connector. DataStudio uses this to set up the connector.
 *
 * @param {Object} request - the schema request
 * @return {Object} A JavaScript object representing the schema for the given request.
 */
function getSchema(
  request: GetSchemaRequest,
): GoogleAppsScript.Data_Studio.GetSchemaResponse {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newGetSchemaResponse();
}

/**
 * getConfig returns a configuration object for the connector. DataStudio uses
 * this to set up the connector.
 *
 * @param {Object} request - the configuration request
 * @return {Object} A JavaScript object representing the connector configuration that should be displayed to the user.
 * @see {@link https://developers.google.com/datastudio/connector/reference#getconfig|getConfig reference}
 */
function getConfig(
  request: GetConfigRequest,
): GoogleAppsScript.Data_Studio.Config {
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();
  config.setDateRangeRequired(true);
  return config.build();
}

/**
 * getData is used by DataStudio to perform a data request.
 *
 * @param {Request} request - a JavaScript object containing the data request parameters.
 * @param {Response} response - A JavaScript object that contains the schema and data for the given request.
 */
function getData(
  request: GetDataRequest,
): GoogleAppsScript.Data_Studio.GetDataResponse {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newGetDataResponse();
}

/**
 * An authentication type object.
 * @typedef {Object} AuthType
 * @property {string} type - One of "NONE" or "OAUTH2"
 * @see {@link https://developers.google.com/datastudio/connector/reference#authtype|AuthType reference}
 */

/**
 * getAuthType is used by DataStudio to get the authorization type used by this
 * connector.
 *
 * @return {AuthType} an object representing the auth type.
 */
function getAuthType(): GoogleAppsScript.Data_Studio.GetAuthTypeResponse {
  let cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse().setAuthType(cc.AuthType.NONE).build();
}
