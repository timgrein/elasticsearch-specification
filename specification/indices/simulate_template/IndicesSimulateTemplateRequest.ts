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

import { RequestBase } from '@_types/Base'
import { Indices, Metadata, Name, VersionNumber } from '@_types/common'
import { long } from '@_types/Numeric'
import { Duration } from '@_types/Time'
import { DataStreamVisibility } from '@indices/_types/DataStream'
import { IndexTemplateMapping } from '@indices/put_index_template/IndicesPutIndexTemplateRequest'

/**
 * Simulate an index template.
 * Get the index configuration that would be applied by a particular index template.
 * @rest_spec_name indices.simulate_template
 * @availability stack stability=stable
 * @availability serverless stability=stable visibility=public
 * @cluster_privileges manage_index_templates
 * @doc_id indices-simulate-template
 */
export interface Request extends RequestBase {
  urls: [
    {
      path: '/_index_template/_simulate'
      methods: ['POST']
    },
    {
      path: '/_index_template/_simulate/{name}'
      methods: ['POST']
    }
  ]
  path_parts: {
    /**
     * Name of the index template to simulate. To test a template configuration before you add it to the cluster, omit
     * this parameter and specify the template configuration in the request body.
     */
    name?: Name
  }
  query_parameters: {
    /**
     * If true, the template passed in the body is only used if no existing templates match the same index patterns. If false, the simulation uses the template with the highest priority. Note that the template is not permanently added or updated in either case; it is only used for the simulation.
     * @server_default false
     */
    create?: boolean
    /**
     * User defined reason for dry-run creating the new template for simulation purposes
     */
    cause?: string
    /**
     * Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
     * @server_default 30s
     */
    master_timeout?: Duration
    /**
     * If true, returns all relevant default configurations for the index template.
     * @server_default false
     * @availability stack since=8.11.0 stability=stable
     * @availability serverless stability=stable
     */
    include_defaults?: boolean
  }
  body: {
    /**
     * This setting overrides the value of the `action.auto_create_index` cluster setting.
     * If set to `true` in a template, then indices can be automatically created using that template even if auto-creation of indices is disabled via `actions.auto_create_index`.
     * If set to `false`, then indices or data streams matching the template must always be explicitly created, and may never be automatically created.
     */
    allow_auto_create?: boolean
    /**
     * Array of wildcard (`*`) expressions used to match the names of data streams and indices during creation.
     * @doc_id avoid-index-pattern-collisions
     */
    index_patterns?: Indices
    /**
     * An ordered list of component template names.
     * Component templates are merged in the order specified, meaning that the last component template specified has the highest precedence.
     */
    composed_of?: Name[]
    /**
     * Template to be applied.
     * It may optionally include an `aliases`, `mappings`, or `settings` configuration.
     */
    template?: IndexTemplateMapping
    /**
     * If this object is included, the template is used to create data streams and their backing indices.
     * Supports an empty object.
     * Data streams require a matching index template with a `data_stream` object.
     */
    data_stream?: DataStreamVisibility
    /**
     * Priority to determine index template precedence when a new data stream or index is created.
     * The index template with the highest priority is chosen.
     * If no priority is specified the template is treated as though it is of priority 0 (lowest priority).
     * This number is not automatically generated by Elasticsearch.
     */
    priority?: long
    /**
     * Version number used to manage index templates externally.
     * This number is not automatically generated by Elasticsearch.
     */
    version?: VersionNumber
    /**
     * Optional user metadata about the index template.
     * May have any contents.
     * This map is not automatically generated by Elasticsearch.
     * @doc_id mapping-meta-field */
    _meta?: Metadata

    /**
     * The configuration option ignore_missing_component_templates can be used when an index template
     * references a component template that might not exist
     */
    ignore_missing_component_templates?: string[]
    /**
     * Marks this index template as deprecated. When creating or updating a non-deprecated index template
     * that uses deprecated components, Elasticsearch will emit a deprecation warning.
     */
    deprecated?: boolean
  }
}
