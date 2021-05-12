<source>
  @type forward
  port 24224
</source>

<match fluentd.nodejs>
  @type forward
    <server>
      name fluentd-aggregator
      host efk-scream.azure.i-screammedia.com
      port 24224
    </server>
</match>
