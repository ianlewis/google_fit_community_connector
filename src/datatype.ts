// Copyright 2017 Google LLC
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

// TODO: imports

/**
 * DataType is an interface implemented by the various data types supported by
 * the Google Fit Connector.
 */
export interface DataType {
  getSchema(cc: CommunityConnector): GetSchemaResponse;
  getData(
    cc: CommunityConnector,
    fit: GoogleFit,
    request: GetDataRequest,
    startDate: Date,
    endDate: Date,
  ): GetDataResponse;
}
