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
import { Duration } from '@_types/Time'

/**
 * Start the ILM plugin.
 * Start the index lifecycle management plugin if it is currently stopped.
 * ILM is started automatically when the cluster is formed.
 * Restarting ILM is necessary only when it has been stopped using the stop ILM API.
 * @rest_spec_name ilm.start
 * @availability stack since=6.6.0 stability=stable
 * @cluster_privileges manage_ilm
 * @doc_id ilm-start
 */
export interface Request extends RequestBase {
  urls: [
    {
      path: '/_ilm/start'
      methods: ['POST']
    }
  ]
  query_parameters: {
    /**
     * Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
     * @server_default 30s
     */
    master_timeout?: Duration
    /**
     * Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
     * @server_default 30s
     */
    timeout?: Duration
  }
}
