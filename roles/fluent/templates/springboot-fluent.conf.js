<source>
  @type               tail
  tag                 springboot.access
  path                /var/log/*.log
  pos_file            /fluentd/pos/log.pos
  rotate_wait         5
  read_from_head      false
    <parse>
    @type multiline_grok
          grok_pattern %{TIMESTAMP_ISO8601:timestamp}\s+%{LOGLEVEL:severity}\s+\[%{DATA:service},%{DATA:trace},%{DATA:span},%{DATA:exportable}\]\s+%{DATA:pid}\s+---\s+\[\s*%{DATA:thread}\]\s+%{DATA:class}\s+\[\s*%{NUMBER:line}\]\s:\s+%{GREEDYDATA:rest}
multiline_start_regexp /^[\d]/
    </parse>
</source>
<filter springboot.access>
  @type               record_transformer
    <record>
      hostname        "#{Socket.gethostname}"
      tag ${tag}
      timestamp ${time}
    </record>
</filter>


<match springboot.access>
  @type                  copy
    <store>
      @type              stdout
    </store>
    <store>
      @type              forward
      expire_dns_cache   30s
    <buffer>
      @type              memory
      flush_interval     10s
      flush_at_shutdown  true
    </buffer>
    <server>
      host               efk-scream.azure.i-screammedia.com
      port               24224
    </server>
    </store>
</match>
