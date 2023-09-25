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

import DataType from "./datatype";

// TODO: imports

export class Steps implements DataType {
  getSchema(cc: CommunityConnector): GetSchemaResponse {
    var fields = cc.getFields();
    var types = cc.FieldType;

    fields
      .newDimension()
      .setId("StartTime")
      .setName("StartTime")
      .setDescription("Start Time")
      .setType(types.YEAR_MONTH_DAY);
    fields
      .newDimension()
      .setId("EndTime")
      .setName("EndTime")
      .setDescription("EndTime")
      .setType(types.YEAR_MONTH_DAY);
    fields
      .newMetric()
      .setId("Steps")
      .setName("Steps")
      .setDescription("Steps")
      .setType(types.NUMBER);
    return fields.build();
  }

  getData(
    cc: CommunityConnector,
    fit: GoogleFit,
    request: GetDataRequest,
    startDate: Date,
    endDate: Date,
  ): GetDataResponse {
    var data = [];
    var schemaData = this.getSchema(cc);
    // Prepare the schema for the fields requested.
    var dataSchema = request.fields.map(function (field) {
      for (var i = 0; i < schemaData.length; i++) {
        if (schemaData[i].name == field.name) {
          return schemaData[i];
        }
      }
    });
    // TODO: Get the data from the Apps Script Cache service if it exists otherwise get the data from the Google Fit API.
    // See: https://developers.google.com/datastudio/connector/build#fetch_and_return_data_with_getdata
    var steps = fit.getSteps(startDate, endDate);
    for (var i = 0; i < steps.point.length; i++) {
      var values = [];
      var segment = steps.point[i];
      // Provide values in the order defined by the schema.
      dataSchema.forEach(function (field) {
        switch (field.name) {
          case "StartTime":
            values.push(parseInt(segment.startTimeNanos, 10));
            break;
          case "EndTime":
            values.push(parseInt(segment.endTimeNanos, 10));
            break;
          case "Steps":
            values.push(segment.value[0].intVal);
            break;
          default:
            values.push("");
        }
      });
      data.push({
        values: values,
      });
    }
    return {
      schema: dataSchema,
      rows: data,
    };
  }
}
