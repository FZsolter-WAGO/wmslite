function createCsv(config) {
    let csv = ""
    if (config.physicalMeters.rtuMeters.enabled) {
        csv += `gConfig.typModbusRtuConfig.bModbusRtuMasterBaudrate;BYTE;${config.physicalMeters.rtuMeters.config.baudrate}\r\n`
        csv += `gConfig.typModbusRtuConfig.bModbusRtuMasterParity;BYTE;${config.physicalMeters.rtuMeters.config.parity}\r\n`
        csv += `gConfig.typModbusRtuConfig.bModbusRtuMasterStopBits;BYTE;${config.physicalMeters.rtuMeters.config.stopbits}\r\n`
        config.physicalMeters.rtuMeters.meters.forEach(meter => {
            if (meter.enabled) {
                csv += `gConfig.typModbusRtuConfig.aModbusRtuMasterReadMode[${meter.address}];BOOL;TRUE\r\n`
                if (meter.type === "compact") {
                    csv += `gConfig.typModbusRtuConfig.aModbusRtuType[${meter.address}];INT;1\r\n`
                }
                if (meter.type === "mid") {
                    csv += `gConfig.typModbusRtuConfig.aModbusRtuType[${meter.address}];INT;2\r\n`
                }
                if (meter.type === "pm51xx") {
                    csv += `gConfig.typModbusRtuConfig.aModbusRtuType[${meter.address}];INT;3\r\n`
                }
                if (meter.type === "grupArgeRkr") {
                    csv += `gConfig.typModbusRtuConfig.aModbusRtuType[${meter.address}];INT;4\r\n`
                }
            }
        });
    }
    let tcpMeterPosAddr = []
    tcpMeterPosAddr.sort((a, b) => a.trueAddress - b.trueAddress)
    if (config.physicalMeters.tcpMeters.enabled) {
        for (let gw_index = 1; gw_index - 1 < config.physicalMeters.tcpMeters.gateways.length; gw_index++) {
            const gateway = config.physicalMeters.tcpMeters.gateways[gw_index-1]
            if (gateway.enabled) {
                csv += `gConfig.typModbusTcpConfig.aModbusTcpMasterHost[${gw_index}];STRING;'${gateway.address}'\r\n`
                csv += `gConfig.typModbusTcpConfig.aModbusTcpMasterPort[${gw_index}];WORD;${gateway.port}\r\n`
                for (let m_index = 1; m_index - 1 < gateway.meters.length; m_index++) {
                    const meter = gateway.meters[m_index-1];
                    if (meter.enabled) {
                        csv += `gConfig.typModbusTcpConfig.aModbusTcpMasterReadMode[${gw_index}][${meter.address}];BOOL;TRUE\r\n`
                        tcpMeterPosAddr.push({"trueAddress":(gw_index-1)*32+meter.address,"uuid":meter.uuid})
                        if (meter.type === "compact") {
                            csv += `gConfig.typModbusTcpConfig.aModbusTcpType[${gw_index}][${meter.address}];INT;1\r\n`
                        }
                        if (meter.type === "mid") {
                            csv += `gConfig.typModbusTcpConfig.aModbusTcpType[${gw_index}][${meter.address}];INT;2\r\n`
                        }
                        if (meter.type === "pm51xx") {
                            csv += `gConfig.typModbusTcpConfig.aModbusTcpType[${gw_index}][${meter.address}];INT;3\r\n`
                        }
                    }
                }
            }
        }
    }
    if (config.virtualMeters.enabled) {
        csv += `gConfig.typConnectionConfig.sWMSHostServer;STRING;'${config.virtualMeters.host}'\r\n`
        csv += `gConfig.typConnectionConfig.sWMSPassword;STRING;'${config.virtualMeters.password}'\r\n`
        csv += `gConfig.typConnectionConfig.xWMSSecure;BOOL;${(config.virtualMeters.secure)?'TRUE':'FALSE'}\r\n`
        csv += `gConfig.typConnectionConfig.xWMSOnlyPriority;BOOL;${(config.virtualMeters.onlyPriority)?'TRUE':'FALSE'}\r\n`
        csv += `gConfig.typConnectionConfig.xWMSConnectionErrorReboot;BOOL;${(config.virtualMeters.rebootOnError)?'TRUE':'FALSE'}\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.sCA_Cert;STRING;'${config.virtualMeters.sslconf.caCert}'\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.sCA_Path;STRING;'${config.virtualMeters.sslconf.caPath}'\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.xVerifyPeer;BOOL;${(config.virtualMeters.sslconf.verifyPeer)?'TRUE':'FALSE'}\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.xVerifyHost;BOOL;${(config.virtualMeters.sslconf.verifyHost)?'TRUE':'FALSE'}\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.sClientCert;STRING;'${config.virtualMeters.sslconf.clientCert}'\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.sClientCert_Key;STRING;'${config.virtualMeters.sslconf.clientCertKey}'\r\n`
        csv += `gConfig.typConnectionConfig.typWMSSSL_Options.sClientCert_KeyPasswd;STRING;'${config.virtualMeters.sslconf.clientCertKeyPasswd}'\r\n`
        for (let vm_index = 1; vm_index - 1 < config.virtualMeters.meters.length; vm_index++) {
            const virtualMeter = config.virtualMeters.meters[vm_index - 1];
            csv += `gConfig.typVirtualMeterConfig.aVirtualMeterEnable[${vm_index}];BOOL;${(virtualMeter.enabled)?'TRUE':'FALSE'}\r\n`
            csv += `gConfig.typVirtualMeterConfig.aVirtualMeterUUIDs[${vm_index}];STRING(36);'${virtualMeter.wms_uuid}'\r\n`
            config.physicalMeters.plcModules.meters.forEach(meter => {
                if (meter.enabled) {
                    if (meter.uuid === virtualMeter.physicalMeterUuid) {
                        switch (meter.type) {
                            case "ac":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;1\r\n`
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${meter.address}\r\n`
                                break;
                            case "dc":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;3\r\n`
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${(meter.address-1)*2+1}\r\n`
                                break;
                        }
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterACPhases[${vm_index}];BYTE;7\r\n`
                    } else if (meter.uuid2 === virtualMeter.physicalMeterUuid) {
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;3\r\n`
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${(meter.address)*2}\r\n`
                    }
                }
            });
            config.physicalMeters.rtuMeters.meters.forEach(meter => {
                if (meter.enabled) {
                    if (meter.uuid === virtualMeter.physicalMeterUuid) {
                        switch (meter.type) {
                            case "compact":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;2\r\n`
                                break;
                            case "mid":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;6\r\n`
                                break;
                            case "pm51xx":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;10\r\n`
                                break;
                            case "grupArgeRkr":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;12\r\n`
                                break;
                        }
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${meter.address}\r\n`
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterACPhases[${vm_index}];BYTE;7\r\n`
                    }
                }
            });
            config.physicalMeters.tcpMeters.gateways.forEach(gateway => {
                if (gateway.enabled) {
                    gateway.meters.forEach(meter => {
                        if (meter.enabled) {
                            if (meter.uuid === virtualMeter.physicalMeterUuid) {
                                switch (meter.type) {
                                    case "compact":
                                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;7\r\n`
                                        break;
                                    case "mid":
                                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;8\r\n`
                                        break;
                                    case "pm51xx":
                                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;11\r\n`
                                        break;
                                }
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${tcpMeterPosAddr.indexOf(tcpMeterPosAddr.find(element => element.uuid === meter.uuid)) + 1}\r\n`
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterACPhases[${vm_index}];BYTE;7\r\n`
                            }
                        }
                    });
                }
            });
            config.physicalMeters.rtdChannels.meters.forEach(meter => {
                if (meter.enabled) {
                    if (meter.uuid === virtualMeter.physicalMeterUuid) {
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;4\r\n`
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${meter.address}\r\n`
                    }
                }
            });
            config.physicalMeters.digitalInputs.meters.forEach(meter => {
                if (meter.enabled) {
                    if (meter.uuid === virtualMeter.physicalMeterUuid) {
                        switch (meter.type) {
                            case "operatingstate":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;5\r\n`
                                break;
                            case "sensor":
                                csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourceType[${vm_index}];BYTE;9\r\n`
                                break;
                        }
                        csv += `gConfig.typVirtualMeterConfig.aVirtualMeterSourcePosAddr[${vm_index}];BYTE;${meter.address}\r\n`
                    }
                }
            });
        }
    }
    return(csv)
}