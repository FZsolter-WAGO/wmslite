# WmsLite Online installer

Check the available versions for the current PLC and firmware:
```
wget -qO- https://raw.githubusercontent.com/FZsolter-WAGO/wmslite/main/bin/wwwget | bash -s list
```
Install the latest available version:
```
wget -qO- https://raw.githubusercontent.com/FZsolter-WAGO/wmslite/main/bin/wwwget | bash -s install latest
```