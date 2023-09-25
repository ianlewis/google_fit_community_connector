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

import DataType from "./datatype";

// TODO: imports

export class Connector {
  fit: GoogleFit = new GoogleFit();
  cc: CommunityConnector = DataStudioApp.createCommunityConnector();
  types: Map<string, DataType> = new Map<string, DataType>();

  constructor() {
    // TODO: Register supported DataTypes.
  }

  registerType(name: string, typ: DataType) {
    this.types.set(name, typ);
  }

  getSchema(request: GetSchemaRequest): GetSchemaResponse {
    let typeName = request.configParams.googleFitDataType;
    if (!this.types.has(typeName)) {
      // TODO: error handling
      return null;
    }
    let dt = this.types.get(typeName);

    return dt.getSchema(request);
  }

  getData(request: GetDataRequest): GetDataResponse {
    let typeName = request.configParams.googleFitDataType;
    if (!this.types.has(typeName)) {
      // TODO: error handling
      return null;
    }

    let startDate = new Date(0);
    if (request.dateRange.startDate) {
      startDate = new Date(request.dateRange.startDate);
    }
    let endDate = new Date();
    if (request.dateRange.endDate) {
      endDate = new Date(request.dateRange.endDate);
    }

    let dt = this.types.get(typeName);
    return dt.getData(this.cc, this, fit, request, startDate, endDate);
  }
}
