// Copyright 2023 Google LLC
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

// The main module implements the basic API needed for a Looker Studio
// Community Connector.

import { Connector } from "./connector";

/**
 * getSchema returns a configuration object for the connector. DataStudio uses
 # this to set up the connector.
 *
 * @param {Object} request - the schema request
 * @return {Object} A JavaScript object representing the schema for the given request.
 */
function getSchema(request: GetSchemaRequest): GetSchemaResponse {
  let connector = new Connector();
  return connector.getSchema(request);
}
