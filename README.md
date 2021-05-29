# fluentd
## 앱로그 디렉토리를 fluentd 로그 디렉토리에 마운트
| 앱 로그 디렉토리 | fluentd 로그 디렉토리 |
| app log dir|fluentd log dir /var/log |
|------------|-------------------------|

## EXAMPLE1: Collect NGINX log
```
vi fluent.conf
# nginx errorlog
<source>
   @type tail
   path /var/log/*_error.log
   pos_file /var/log/nginx/nginx-error.pos    <===here
   tag nginx.error
   format /^(?<logtime>\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}) \[(?<log_level>\w+)\] (?<pid>\d+).(?<tid>\d+): (?<message>.*)$/
   time_key logtime
   time_format %Y/%m/%d %H:%M:%S
</source>
...

# nginx accesslog
<source>
   @type tail
   path /var/log/*_access.log                        <===here
   pos_file /var/log/nginx/nginx-access.pos
   tag nginx.access
   format nginx
</source>
```
