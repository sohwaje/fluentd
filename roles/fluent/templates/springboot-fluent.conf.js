<source>
  @type               tail
  tag                 book_batch
  path                path /var/log/*.log
  pos_file            path ~
  rotate_wait         5
  read_from_head      false
    <parse>
      @type           json
    </parse>
</source>
<filter springboot.**>
  @type               record_transformer
    <record>
      hostname        "#{Socket.gethostname}"
      tag ${tag}
      timestamp ${time}
    </record>
</filter>


<match springboot.**>
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
