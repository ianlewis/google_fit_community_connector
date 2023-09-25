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

// TODO: Add declarations for Looker Studio API types.
// https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
// https://github.com/googledatastudio/example-connectors/blob/master/npm-downloads-ts/src/global.d.ts

interface ConfigParams {
  [configId: string]: string;
}

interface GetSchemaRequest {
  configParams: ConfigParams;
}

interface GetSchemaResponse {
  schema: Object[];
}

interface GetDataRequest {
  configParams?: ConfigParams;
  scriptParams: {
    sampleExtraction: boolean;
    lastRefresh: string;
  };
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  fields: Array<{
    name: string;
  }>;
}

type GetDataRowValue = string | number | boolean;
interface GetDataRow {
  values: Array<GetDataRowValue>;
}
type GetDataRows = Array<GetDataRow>;

interface GetDataResponse {
  schema: Object[];
  rows: GetDataRows;
}

// TODO: use @types/google-apps-script
// https://developers.google.com/apps-script/guides/typescript
