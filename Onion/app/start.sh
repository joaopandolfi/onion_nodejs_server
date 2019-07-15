echo 'Starting....\n'
tor & sleep 10 && echo 'All started\n'
echo 'hostname' && cat /usr/local/etc/tor/hidden_service/hostname && echo '\n\n'
#while :; do echo 'Running...'; sleep 1000000; done