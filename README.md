# fluentd

## EXAMPLE: Collect NGINX log

1. Download
```
git clone https://github.com/sohwaje/fluentd.git
```

2. Configure
```
cd fluentd/

docker-compose up -d --build
```
3. eidt log directories localtion
```
vi fluent.conf
# nginx accesslog
<source>
   @type tail
   path /var/log/*_error.log
   pos_file /var/log/oauth2client/nginx-error.pos    <===here
   tag nginx.error
   format /^(?<logtime>\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}) \[(?<log_level>\w+)\] (?<pid>\d+).(?<tid>\d+): (?<message>.*)$/
   time_key logtime
   time_format %Y/%m/%d %H:%M:%S
</source>
...

# nginx errorlog
<source>
   @type tail
   path /var/log/*_access.log                        <===here
   pos_file /var/log/oauth2client/nginx-access.pos
   tag nginx.access
   format nginx
</source>
```
