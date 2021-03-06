# fluentd
*** 2021.05.29 TEST

## 모든 앱의 로그를 /var/log에 저장하고 fluentd 도커 컨테이너의 /var/log로 마운트 한다.

## 앱로그 디렉토리를 fluentd 로그 디렉토리에 마운트
| 앱 로그 디렉토리 |    fluentd 로그 디렉토리      |
|------------  | -------------------------- |
| /var/log     |           /var/log         |
|              |                            |

## EXAMPLE1: Collect NGINX log
```
vi fluent.conf
# nginx errorlog
<source>
   @type tail
   path /var/log/*_error.log                       <===here
   pos_file /var/log/nginx/nginx-error.pos    
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
