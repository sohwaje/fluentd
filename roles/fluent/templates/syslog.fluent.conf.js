<source>
  @type syslog
  port 5140
  tag rsyslog
</source>

<match rsyslog.**>
  @type forward
   <server>
      name fluentd-aggregator
      host efk-scream.azure.i-screammedia.com
      port 24224
   </server>
</match>
