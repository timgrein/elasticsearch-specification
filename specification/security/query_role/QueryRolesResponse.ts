/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { integer } from '@_types/Numeric'
import { QueryRole } from './types'

export class Response {
  body: {
    /**
     * The total number of roles found.
     */
    total: integer
    /**
     * The number of roles returned in the response.
     */
    count: integer
    /**
     * A list of roles that match the query.
     * The returned role format is an extension of the role definition format.
     * It adds the `transient_metadata.enabled` and the `_sort` fields.
     * `transient_metadata.enabled` is set to `false` in case the role is automatically disabled, for example when the role grants privileges that are not allowed by the installed license.
     * `_sort` is present when the search query sorts on some field.
     * It contains the array of values that have been used for sorting.
     */
    roles: QueryRole[]
  }
}
