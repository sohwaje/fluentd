<source>
  @type tail
  path /var/log/*.log
  tag nodejs.access
</source>
<match nodejs.access>
@type forward
  <server>
    name fluentd-aggregator
    host efk-scream.azure.i-screammedia.com
    port 24224
  </server>
</match>
