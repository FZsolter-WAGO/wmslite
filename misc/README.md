# WMSLite Offline installer

#### 0) Install sshpass
#### 1) Copy the repository onto the WMS server, like /var/www/wms/backend/wmslite/main/versions
#### 2) Modify the script /var/www/wms/backend/wmslite/main/bin/wwwget
```
WATTSONLITE_REPOSITORY="http://<Server IP address>/wmslite"
```
#### 3) Modify the vhost file by adding a new alias
```
Alias /wmslite /var/www/wms/backend/wmslite
```
#### 4) Restart apache2 service
#### 5) Copy these files somewhere onto the server, /var/www location is prefered
#### 6) Modify the file plc_list
```
<PLC 1 IP address> <root password>
<PLC 2 IP address> <root password>
```
#### 7) Modify the script ssh_wwwget
```
WATTSON_HOST="http://<Server IP address>"
WWWGET_PATH="/wmslite/main/bin/wwwget"
```
#### 8) Run the script as wwwget, maybe with hidden stdout
```
/var/www/ssh_wwwget install latest force &>/dev/null &
```
