// Copyright 2024 Ian Lewis
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** @type {import('ts-jest').JestConfigWithTsJest} */

// Mock out stdout so that GitHub commands are ignored.
const processStdoutWrite = process.stdout.write.bind(process.stdout);
process.stdout.write = (str, encoding, cb) => {
  // Note: this will soon change to ::
  if (!str.match(/^::/)) {
    return processStdoutWrite(str, encoding, cb);
  }
};

module.exports = {
  preset: "ts-jest",
  resetMocks: true,
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
};
