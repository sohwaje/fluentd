// <source>
//    @type tail
//    path /var/log/*_error.log
//    pos_file /var/log/oauth2client/nginx-error.pos
//    tag nginx.error
//    format /^(?<logtime>\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}) \[(?<log_level>\w+)\] (?<pid>\d+).(?<tid>\d+): (?<message>.*)$/
//    time_key logtime
//    time_format %Y/%m/%d %H:%M:%S
// </source>

<source>
   @type tail
   path /var/log/*.log
   tag nginx.access
   format none
</source>

<match nginx.access>
  @type forward
    <server>
      name fluentd-aggregator
      host efk-scream.azure.i-screammedia.com
      port 24224
    </server>
</match>

// <match nginx.access>
//   @type forward
//     <server>
//       name fluentd-aggregator
//       host efk-scream.azure.i-screammedia.com
//       port 24224
//     </server>
// </match>
