class renderclass {
    constructor(maincontainer) {
        this.title_box = maincontainer.querySelector('#title_box')
        this.content_box = maincontainer.querySelector('#content_box')
    }
    physical() {
        this.changeTheme(config.darkMode?'dark':'light')
        this.title_box.innerHTML = `<h1>Physical Meters</h1>`
        this.content_box.innerHTML = ''
        if (config.limits.plcModules > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="plcModules_box"></div>`
        if (config.limits.rtuMeters > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="rtuMeters_box"></div>`
        if (config.limits.tcpMeters > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="tcpMeters_box"></div>`
        if (config.limits.rtdChannels > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="rtdChannels_box"></div>`
        if (config.limits.digitalInputs > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="digitalInputs_box"></div>`
        if (config.limits.plcModules > 0) this._plcModules(content_box.querySelector("#plcModules_box"))
        if (config.limits.rtuMeters > 0) this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        if (config.limits.tcpMeters > 0) this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
        if (config.limits.rtdChannels > 0) this._rtdChannels(content_box.querySelector("#rtdChannels_box"))
        if (config.limits.digitalInputs > 0) this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
    }
    wms() {
        this.changeTheme(config.darkMode?'dark':'light')
        this.title_box.innerHTML = `<h1>WMS Meters</h1>`
        this.content_box.innerHTML = ''
        if (config.limits.virtualMeters > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="wmsConfig_box"></div>`
        if (config.limits.virtualMeters > 0) this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="wmsMeters_box"></div>`
        if (config.limits.virtualMeters > 0) this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        if (config.limits.virtualMeters > 0) this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
    }
    backupRestore() {
        this.changeTheme(config.darkMode?'dark':'light')
        this.title_box.innerHTML = `<h1>Backup/Restore Configuration</h1>`
        this.content_box.innerHTML = ''
        this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="backup_box"></div>`
        this.content_box.innerHTML += `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-4" id="restore_box"></div>`
        this._backup(content_box.querySelector("#backup_box"))
        this._restore(content_box.querySelector("#restore_box"))
    }
    loading() {
        this.changeTheme(config.darkMode?'dark':'light')
        this.title_box.innerHTML = `<h1>WMSLite Configurator</h1><h2>Loading, please wait...</h2>`
        this.content_box.innerHTML = ``
    }
    _plcModules(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">PLC Module Meters (${config.limits.plcModules} AC Meters, ${config.limits.plcModules*2} DC Meters)</h3>`
        tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-4" id="add_button">Add Module</button>`
        tmpHTML += `</div>`
        // Fancy box
        tmpHTML += `<div class="list-group w-auto">`
        config.physicalMeters.plcModules.meters.forEach(meter => {
            tmpHTML += `
            <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
                <div class="d-flex gap-2 w-100 justify-content-between" uuid=${meter.uuid}>
                    <div class="flex-fill" uuid=${meter.uuid}>`
            if (meter.type === "ac") {
                tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u></h6>`
            } else {
                tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u> & <u>${meter.name2}</u></h6>`
            }
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                            <input checked type="checkbox" class="btn-check">
                            <label class="btn btn-${((meter.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((meter.enabled)?'Enabled':'Disabled')}</label>
                        </div>`
            if (meter.type === "ac") {
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Name</span>
                                <input type="text" value="${meter.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name">
                            </div>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">AC Position</span>
                                <input type="number" min="1" max="20" value="${meter.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address">
                            </div>`
            } else {
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Channel 1 Name</span>
                                <input type="text" value="${meter.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name">
                            </div>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Channel 2 Name</span>
                                <input type="text" value="${meter.name2}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name2">
                            </div>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">DC Position</span>
                                <input type="number" min="1" max="40" value="${meter.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address">
                            </div>`
            }
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Type of module</span>
                            <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="type">
                              <option${((meter.type === "ac")?' selected':'')} value="ac">AC</option>
                              <option${((meter.type === "dc")?' selected':'')} value="dc">DC</option>
                            </select>
                        </div>`
            tmpHTML += `</div>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_button">Delete</button>`
            tmpHTML +=`
                </div>
            </div>
            `
        });
        tmpHTML += `</div></div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelector("#add_button").addEventListener("click",()=>{
            let uuid = newUUID()
            let uuid2 = newUUID()
            config.physicalMeters.plcModules.meters.push({
                "enabled":true,
                "uuid":uuid,
                "uuid2":uuid2,
                "name":generateName(),
                "name2":generateName(),
                "address":config.physicalMeters.plcModules.meters.length+1,
                "type":"ac"
            })
            this._plcModules(content_box.querySelector("#plcModules_box"))
        })
        box.querySelectorAll("#delete_button").forEach(button => {
            button.addEventListener("click",(event)=>{
                config.physicalMeters.plcModules.meters.splice(config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                this.removeLinkings(event.target.parentElement.getAttribute("uuid"))
                this._plcModules(content_box.querySelector("#plcModules_box"))
        })})
        box.querySelectorAll("#enabled").forEach(input => {
            input.addEventListener("click",(event)=>{
                config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                this._plcModules(content_box.querySelector("#plcModules_box"))
        })})
        box.querySelectorAll("#name").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = generateName()
                }
                config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = event.target.value
                this._plcModules(content_box.querySelector("#plcModules_box"))
        })})
        box.querySelectorAll("#address").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = 0
                }
                config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = Math.min(Math.max(parseInt(event.target.value), 1), (config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].type==='ac')?20:40)
                this._plcModules(content_box.querySelector("#plcModules_box"))
        })})
        box.querySelectorAll("#type").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].type = event.target.value
                config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = Math.min(Math.max(parseInt(config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address), 1), (event.target.value==='ac')?20:40)
                this._plcModules(content_box.querySelector("#plcModules_box"))
        })})
        box.querySelectorAll("#name2").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.physicalMeters.plcModules.meters[config.physicalMeters.plcModules.meters.indexOf(config.physicalMeters.plcModules.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name2 = event.target.value
                this._plcModules(content_box.querySelector("#plcModules_box"))
        })})
    }
    _rtuMeters(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_ p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">Modbus RTU Meters (${config.limits.rtuMeters} Meters)</h3>`
        tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-4" id="add_button">Add Meter</button>`
        tmpHTML += `</div>`
        // Fancy box
        tmpHTML += `<h6>COM1 Settings</h6>`
        tmpHTML += `<div class="list-group w-auto mb-2">`
        tmpHTML += `<div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2"><div class="d-flex gap-2 w-100 justify-content-between"><div class="flex-fill">`
        tmpHTML += `<div class="input-group mb-1">
                    <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Baudrate</span>
                    <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" style="width:150px" id="baudrate">
                        <option${((config.physicalMeters.rtuMeters.config.baudrate === 0)?' selected':'')} value="0">19200</option>
                        <option${((config.physicalMeters.rtuMeters.config.baudrate === 1)?' selected':'')}  value="1">9600</option>
                    </select></div>`
        tmpHTML += `<div class="input-group mb-1">
                    <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Parity</span>
                    <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" style="width:150px" id="parity">
                        <option${((config.physicalMeters.rtuMeters.config.parity === 0)?' selected':'')} value="0">Even</option>
                        <option${((config.physicalMeters.rtuMeters.config.parity === 1)?' selected':'')}  value="1">None</option>
                        <option${((config.physicalMeters.rtuMeters.config.parity === 2)?' selected':'')}  value="2">Odd</option>
                        </select></div>`
        tmpHTML += `<div class="input-group mb-1">
                    <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Stopbits</span>
                    <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" style="width:150px" id="stopbits">
                        <option${((config.physicalMeters.rtuMeters.config.stopbits === 0)?' selected':'')} value="0">One</option>
                        <option${((config.physicalMeters.rtuMeters.config.stopbits === 1)?' selected':'')}  value="1">Two</option>
                        </select></div>`
        tmpHTML += `</div></div></div></div>`
        tmpHTML += `<div class="list-group w-auto">`
        config.physicalMeters.rtuMeters.meters.forEach(meter => {
            tmpHTML += `
            <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
                <div class="d-flex gap-2 w-100 justify-content-between" uuid=${meter.uuid}>
                    <div class="flex-fill" uuid=${meter.uuid}>`
            tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u></h6>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                            <input checked type="checkbox" class="btn-check">
                            <label class="btn btn-${((meter.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((meter.enabled)?'Enabled':'Disabled')}</label>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Name</span>
                            <input type="text" value="${meter.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Slave ID</span>
                            <input type="number" min="1" max="32" value="${meter.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Type of module</span>
                            <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="type">
                              <option${((meter.type === "compact")?' selected':'')} value="compact">3-Phase Power Measurement Module - 2857-570/024-XXX</option>
                              <option${((meter.type === "mid")?' selected':'')} value="mid">Energy meter (MID) - 879-30X0</option>
                              <option${((meter.type === "pm51xx")?' selected':'')} value="pm51xx">Schneider PowerLogic - PM51xx</option>
                              <option${((meter.type === "grupArgeRkr")?' selected':'')} value="grupArgeRkr">GrupArge Reactive Control Relay (RKR)</option>
                            </select>
                        </div>`
            tmpHTML += `</div>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_button">Delete</button>`
            tmpHTML +=`
                </div>
            </div>
            `
        });
        tmpHTML += `</div></div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelector("#add_button").addEventListener("click",()=>{
            let uuid = newUUID()
            config.physicalMeters.rtuMeters.meters.push({
                "enabled":true,
                "uuid":uuid,
                "name":generateName(),
                "address":config.physicalMeters.rtuMeters.meters.length+1,
                "type":"compact"
            })
            this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })
        box.querySelector("#baudrate").addEventListener("change",(event)=>{
                config.physicalMeters.rtuMeters.config.baudrate = Number(event.target.value)
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })
        box.querySelector("#parity").addEventListener("change",(event)=>{
                config.physicalMeters.rtuMeters.config.parity = Number(event.target.value)
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })
        box.querySelector("#stopbits").addEventListener("change",(event)=>{
                config.physicalMeters.rtuMeters.config.stopbits = Number(event.target.value)
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })
        box.querySelectorAll("#delete_button").forEach(button => {
            button.addEventListener("click",(event)=>{
                config.physicalMeters.rtuMeters.meters.splice(config.physicalMeters.rtuMeters.meters.indexOf(config.physicalMeters.rtuMeters.meters.find(meter => meter.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                this.removeLinkings(event.target.parentElement.getAttribute("uuid"))
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })})
        box.querySelectorAll("#enabled").forEach(input => {
            input.addEventListener("click",(event)=>{
                config.physicalMeters.rtuMeters.meters[config.physicalMeters.rtuMeters.meters.indexOf(config.physicalMeters.rtuMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.physicalMeters.rtuMeters.meters[config.physicalMeters.rtuMeters.meters.indexOf(config.physicalMeters.rtuMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })})
        box.querySelectorAll("#name").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = generateName()
                }
                config.physicalMeters.rtuMeters.meters[config.physicalMeters.rtuMeters.meters.indexOf(config.physicalMeters.rtuMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = event.target.value
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })})
        box.querySelectorAll("#address").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = 0
                }
                config.physicalMeters.rtuMeters.meters[config.physicalMeters.rtuMeters.meters.indexOf(config.physicalMeters.rtuMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = Math.min(Math.max(parseInt(event.target.value), 1), 32)
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })})
        box.querySelectorAll("#type").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.physicalMeters.rtuMeters.meters[config.physicalMeters.rtuMeters.meters.indexOf(config.physicalMeters.rtuMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].type = event.target.value
                this._rtuMeters(content_box.querySelector("#rtuMeters_box"))
        })})
    }
    _tcpMeters(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">Modbus TCP Meters (${config.limits.tcpMeters} Gateways / 32 Meters)</h3>`
        tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-4" id="add_gw">Add Gateway</button>`
        tmpHTML += `</div>`
        config.physicalMeters.tcpMeters.gateways.forEach(gateway => {
            tmpHTML += `<div class="list-group w-auto py-2">`
            tmpHTML += `
            <div class="list-group-item gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
                <div class="d-flex gap-2 w-100 justify-content-between" uuid=${gateway.uuid}>
                    <div class="flex-fill" uuid=${gateway.uuid}>`
            tmpHTML += `<h6 class="mb-2"><u>${gateway.name}</u></h6>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                            <input checked type="checkbox" class="btn-check">
                            <label class="btn btn-${((gateway.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled_gw">${((gateway.enabled)?'Enabled':'Disabled')}</label>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Name</span>
                            <input type="text" value="${gateway.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name_gw">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Address</span>
                            <input type="text" value="${gateway.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address_gw">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">TCP Port</span>
                            <input type="number" min="0" max="65535" value="${gateway.port}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="port_gw">
                        </div>`
            tmpHTML += `</div>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-2" id="add_button">Add Meter</button>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_gw">Delete</button>`
            tmpHTML += `</div>`
            tmpHTML += `<div class="list-group w-auto" uuid=${gateway.uuid} id="gw_box">`
            // Fancy box
            gateway.meters.forEach(meter => {
                tmpHTML += `
                <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_3">
                    <div class="d-flex gap-2 w-100 justify-content-between" uuid=${meter.uuid}>
                        <div class="flex-fill" uuid=${meter.uuid}>`
                tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u></h6>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                                <input checked type="checkbox" class="btn-check">
                                <label class="btn btn-${((meter.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((meter.enabled)?'Enabled':'Disabled')}</label>
                            </div>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Name</span>
                                <input type="text" value="${meter.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name">
                            </div>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Slave ID</span>
                                <input type="number" min="1" max="32" value="${meter.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address">
                            </div>`
                tmpHTML += `<div class="input-group mb-1">
                                <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Type of module</span>
                                <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="type">
                                <option${((meter.type === "compact")?' selected':'')} value="compact">3-Phase Power Measurement Module - 2857-570/024-XXX</option>
                                <option${((meter.type === "mid")?' selected':'')} value="mid">Energy meter (MID) - 879-30X0</option>
                                <option${((meter.type === "pm51xx")?' selected':'')} value="pm51xx">Schneider PowerLogic - PM51xx</option>
                                </select>
                            </div>`
                tmpHTML += `</div>`
                tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_button">Delete</button>`
                tmpHTML +=`</div></div>`
            })
            tmpHTML += `</div></div></div>`
        })
        tmpHTML += `</div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelectorAll("#add_gw").forEach(add_gw => {
            add_gw.addEventListener("click",()=>{
                let uuid = newUUID()
                config.physicalMeters.tcpMeters.gateways.push({
                    "enabled":true,
                    "uuid":uuid,
                    "name":generateName(),
                    "address":"192.168.0.7",
                    "port":"502",
                    "meters":[]
                })
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })
        })
        box.querySelectorAll("#delete_gw").forEach(button => {
            button.addEventListener("click",(event)=>{
                config.physicalMeters.tcpMeters.gateways.splice(config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                this.removeLinkings(event.target.parentElement.getAttribute("uuid"))
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
        })})
        box.querySelectorAll("#enabled_gw").forEach(input => {
            input.addEventListener("click",(event)=>{
                config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
        })})
        box.querySelectorAll("#name_gw").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = generateName()
                }
                config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = event.target.value
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
        })})
        box.querySelectorAll("#address_gw").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = '192.168.0.7'
                }
                config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = event.target.value
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
        })})
        box.querySelectorAll("#port_gw").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = 502
                }
                config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].port = Math.min(Math.max(parseInt(event.target.value), 0), 65535)
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
        })})
        
        box.querySelectorAll("#add_button").forEach(button => {
            button.addEventListener("click",()=>{
                const gw_uuid = button.parentElement.getAttribute("uuid")
                const gw_index = config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === gw_uuid))
                let uuid = newUUID()
                config.physicalMeters.tcpMeters.gateways[gw_index].meters.push({
                    "enabled":true,
                    "uuid":uuid,
                    "name":generateName(),
                    "address":config.physicalMeters.tcpMeters.gateways[gw_index].meters.length+1,
                    "type":"compact"
                })
                this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })
        })
        box.querySelectorAll("#gw_box").forEach(gw_box => {
            const gw_uuid = gw_box.getAttribute("uuid")
            const gw_index = config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === gw_uuid))
            gw_box.querySelectorAll("#delete_button").forEach(button => {
                button.addEventListener("click",(event)=>{
                    config.physicalMeters.tcpMeters.gateways[gw_index].meters.splice(config.physicalMeters.tcpMeters.gateways[gw_index].meters.indexOf(config.physicalMeters.tcpMeters.gateways[gw_index].meters.find(meter => meter.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                    this.removeLinkings(event.target.parentElement.getAttribute("uuid"))
                    this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })})
            gw_box.querySelectorAll("#enabled").forEach(input => {
                input.addEventListener("click",(event)=>{
                    config.physicalMeters.tcpMeters.gateways[gw_index].meters[config.physicalMeters.tcpMeters.gateways[gw_index].meters.indexOf(config.physicalMeters.tcpMeters.gateways[gw_index].meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.physicalMeters.tcpMeters.gateways[gw_index].meters[config.physicalMeters.tcpMeters.gateways[gw_index].meters.indexOf(config.physicalMeters.tcpMeters.gateways[gw_index].meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                    this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })})
            gw_box.querySelectorAll("#name").forEach(input => {
                input.addEventListener("change",(event)=>{
                    if(event.target.value === ''){
                        event.target.value = generateName()
                    }
                    config.physicalMeters.tcpMeters.gateways[gw_index].meters[config.physicalMeters.tcpMeters.gateways[gw_index].meters.indexOf(config.physicalMeters.tcpMeters.gateways[gw_index].meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = event.target.value
                    this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })})
            gw_box.querySelectorAll("#address").forEach(input => {
                input.addEventListener("change",(event)=>{
                    config.physicalMeters.tcpMeters.gateways[gw_index].meters[config.physicalMeters.tcpMeters.gateways[gw_index].meters.indexOf(config.physicalMeters.tcpMeters.gateways[gw_index].meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = Math.min(Math.max(parseInt(event.target.value), 1), 32)
                    this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })})
            gw_box.querySelectorAll("#type").forEach(input => {
                input.addEventListener("change",(event)=>{
                    config.physicalMeters.tcpMeters.gateways[gw_index].meters[config.physicalMeters.tcpMeters.gateways[gw_index].meters.indexOf(config.physicalMeters.tcpMeters.gateways[gw_index].meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].type = event.target.value
                    this._tcpMeters(content_box.querySelector("#tcpMeters_box"))
            })})
        })
    }
    _rtdChannels(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">RTD Channels (${config.limits.rtdChannels} Channels)</h3>`
        tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-4" id="add_button">Add Channel</button>`
        tmpHTML += `</div>`
        // Fancy box
        tmpHTML += `<div class="list-group w-auto">`
        config.physicalMeters.rtdChannels.meters.forEach(meter => {
            tmpHTML += `
            <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
                <div class="d-flex gap-2 w-100 justify-content-between" uuid=${meter.uuid}>
                    <div class="flex-fill" uuid=${meter.uuid}>`
            tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u></h6>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                            <input checked type="checkbox" class="btn-check">
                            <label class="btn btn-${((meter.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((meter.enabled)?'Enabled':'Disabled')}</label>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Name</span>
                            <input type="text" value="${meter.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Channel</span>
                            <input type="number" min="1" max="30" value="${meter.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address">
                        </div>`
            tmpHTML += `</div>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_button">Delete</button>`
            tmpHTML +=`
                </div>
            </div>
            `
        });
        tmpHTML += `</div></div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelector("#add_button").addEventListener("click",()=>{
            let uuid = newUUID()
            config.physicalMeters.rtdChannels.meters.push({
                "enabled":true,
                "uuid":uuid,
                "name":generateName(),
                "address":config.physicalMeters.rtdChannels.meters.length+1,
            })
            this._rtdChannels(content_box.querySelector("#rtdChannels_box"))
        })
        box.querySelectorAll("#delete_button").forEach(button => {
            button.addEventListener("click",(event)=>{
                config.physicalMeters.rtdChannels.meters.splice(config.physicalMeters.rtdChannels.meters.indexOf(config.physicalMeters.rtdChannels.meters.find(meter => meter.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                this.removeLinkings(event.target.parentElement.getAttribute("uuid"))
                this._rtdChannels(content_box.querySelector("#rtdChannels_box"))
        })})
        box.querySelectorAll("#enabled").forEach(input => {
            input.addEventListener("click",(event)=>{
                config.physicalMeters.rtdChannels.meters[config.physicalMeters.rtdChannels.meters.indexOf(config.physicalMeters.rtdChannels.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.physicalMeters.rtdChannels.meters[config.physicalMeters.rtdChannels.meters.indexOf(config.physicalMeters.rtdChannels.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                this._rtdChannels(content_box.querySelector("#rtdChannels_box"))
        })})
        box.querySelectorAll("#name").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = generateName()
                }
                config.physicalMeters.rtdChannels.meters[config.physicalMeters.rtdChannels.meters.indexOf(config.physicalMeters.rtdChannels.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = event.target.value
                this._rtdChannels(content_box.querySelector("#rtdChannels_box"))
        })})
        box.querySelectorAll("#address").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = 0
                }
                config.physicalMeters.rtdChannels.meters[config.physicalMeters.rtdChannels.meters.indexOf(config.physicalMeters.rtdChannels.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = Math.min(Math.max(parseInt(event.target.value), 1), 30)
                this._rtdChannels(content_box.querySelector("#rtdChannels_box"))
        })})
    }
    _digitalInputs(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">Digital Inputs (${config.limits.digitalInputs} Channels)</h3>`
        tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-4" id="add_button">Add Channel</button>`
        tmpHTML += `</div>`
        // Fancy box
        tmpHTML += `<div class="list-group w-auto">`
        config.physicalMeters.digitalInputs.meters.forEach(meter => {
            tmpHTML += `
            <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
                <div class="d-flex gap-2 w-100 justify-content-between" uuid=${meter.uuid}>
                    <div class="flex-fill" uuid=${meter.uuid}>`
            tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u></h6>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                            <input checked type="checkbox" class="btn-check">
                            <label class="btn btn-${((meter.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((meter.enabled)?'Enabled':'Disabled')}</label>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Name</span>
                            <input type="text" value="${meter.name}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="name">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Channel</span>
                            <input type="number" min="1" max="30" value="${meter.address}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="address">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Type of module</span>
                            <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="type">
                                <option${((meter.type === "operatingstate")?' selected':'')} value="operatingstate">Operating State</option>
                                <option${((meter.type === "sensor")?' selected':'')} value="sensor">Sensor</option>
                            </select>
                        </div>`
            tmpHTML += `</div>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_button">Delete</button>`
            tmpHTML +=`
                </div>
            </div>
            `
        });
        tmpHTML += `</div></div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelector("#add_button").addEventListener("click",()=>{
            let uuid = newUUID()
            config.physicalMeters.digitalInputs.meters.push({
                "enabled":true,
                "uuid":uuid,
                "name":generateName(),
                "type":"operatingstate",
                "address":config.physicalMeters.digitalInputs.meters.length+1,
            })
            this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
        })
        box.querySelectorAll("#delete_button").forEach(button => {
            button.addEventListener("click",(event)=>{
                config.physicalMeters.digitalInputs.meters.splice(config.physicalMeters.digitalInputs.meters.indexOf(config.physicalMeters.digitalInputs.meters.find(meter => meter.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                this.removeLinkings(event.target.parentElement.getAttribute("uuid"))
                this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
        })})
        box.querySelectorAll("#enabled").forEach(input => {
            input.addEventListener("click",(event)=>{
                config.physicalMeters.digitalInputs.meters[config.physicalMeters.digitalInputs.meters.indexOf(config.physicalMeters.digitalInputs.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.physicalMeters.digitalInputs.meters[config.physicalMeters.digitalInputs.meters.indexOf(config.physicalMeters.digitalInputs.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
        })})
        box.querySelectorAll("#name").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = generateName()
                }
                config.physicalMeters.digitalInputs.meters[config.physicalMeters.digitalInputs.meters.indexOf(config.physicalMeters.digitalInputs.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = event.target.value
                this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
        })})
        box.querySelectorAll("#address").forEach(input => {
            input.addEventListener("change",(event)=>{
                if(event.target.value === ''){
                    event.target.value = 0
                }
                config.physicalMeters.digitalInputs.meters[config.physicalMeters.digitalInputs.meters.indexOf(config.physicalMeters.digitalInputs.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].address = Math.min(Math.max(parseInt(event.target.value), 1), 30)
                this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
        })})
        box.querySelectorAll("#type").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.physicalMeters.digitalInputs.meters[config.physicalMeters.digitalInputs.meters.indexOf(config.physicalMeters.digitalInputs.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].type = event.target.value
                this._digitalInputs(content_box.querySelector("#digitalInputs_box"))
        })})
    }
    _wmsConfig(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">WMS Connection</h3>`
        tmpHTML += `</div>`
        // Fancy box
        tmpHTML += `<div class="list-group w-auto">`
        tmpHTML += `
        <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div class="flex-fill">`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                        <input checked type="checkbox" class="btn-check">
                        <label class="btn btn-${((config.virtualMeters.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((config.virtualMeters.enabled)?'Enabled':'Disabled')}</label>
                    </div>`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Host</span>
                        <input type="text" value="${config.virtualMeters.host}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="host">
                    </div>`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">MAC Address</span>
                        <button type="button" class="form-control btn btn-primary text-start wms_color_${config.darkMode?'dark':'light'}_1" data-bs-toggle="tooltip" data-bs-placement="top" title="Copy to clipboard" id="maccopy">${env.mac}</button>
                    </div>`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Password</span>
                        <input type="password" value="${config.virtualMeters.password}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="password">
                    </div>`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Data transfer interval</span>
                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="onlyPriority">
                            <option${((config.virtualMeters.onlyPriority)?'':' selected')} value="false">1 second</option>
                            <option${((config.virtualMeters.onlyPriority)?' selected':'')} value="true">15 minutes</option>
                        </select>
                    </div>`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Reboot on error</span>
                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="rebootOnError">
                            <option${((config.virtualMeters.rebootOnError)?'':' selected')} value="false">Disabled</option>
                            <option${((config.virtualMeters.rebootOnError)?' selected':'')} value="true">Enabled</option>
                        </select>
                    </div>`
        tmpHTML += `<div class="input-group mb-1">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >SSL Mode</span>
                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="secure">
                            <option${((config.virtualMeters.secure)?'':' selected')} value="false">HTTP</option>
                            <option${((config.virtualMeters.secure)?' selected':'')} value="true">HTTPS</option>
                        </select>
                    </div>`
        if (config.virtualMeters.secure) {
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">CA Cert</span>
                            <input type="text" value="${config.virtualMeters.sslconf.caCert}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="caCert">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">CA Path</span>
                            <input type="text" value="${config.virtualMeters.sslconf.caPath}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="caPath">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Verify Peer</span>
                            <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="verifyPeer">
                                <option${((config.virtualMeters.sslconf.verifyPeer)?' selected':' selected')} value="yes">Yes</option>
                                <option${((config.virtualMeters.sslconf.verifyPeer)?'':' selected')} value="no">No</option>
                            </select>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Verify Host</span>
                            <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="verifyHost">
                                <option${((config.virtualMeters.sslconf.verifyHost)?' selected':' selected')} value="yes">Yes</option>
                                <option${((config.virtualMeters.sslconf.verifyHost)?'':' selected')} value="no">No</option>
                            </select>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Client Cert</span>
                            <input type="text" value="${config.virtualMeters.sslconf.clientCert}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="clientCert">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Client Cert Key</span>
                            <input type="text" value="${config.virtualMeters.sslconf.clientCertKey}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="clientCertKey">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Client Cert Key Password</span>
                            <input type="text" value="${config.virtualMeters.sslconf.clientCertKeyPasswd}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="clientCertKeyPasswd">
                        </div>`
        }
        tmpHTML += `</div>`
        tmpHTML +=`
            </div>
        </div>
        `
        tmpHTML += `</div></div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelectorAll("#enabled").forEach(input => {
            input.addEventListener("click",()=>{
                config.virtualMeters.enabled = ! config.virtualMeters.enabled
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#host").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.host = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#maccopy").forEach(input => {
            input.addEventListener("click",()=>{
                navigator.clipboard.writeText(env.mac)
        })})
        box.querySelectorAll("#password").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.password = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#secure").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.secure = event.target.value === "true"
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#onlyPriority").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.onlyPriority = event.target.value === "true"
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#rebootOnError").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.rebootOnError = event.target.value === "true"
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#caCert").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.caCert = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#caPath").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.caPath = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#verifyPeer").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.verifyPeer = event.target.value === "yes"
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#verifyHost").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.verifyHost = event.target.value === "yes"
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#clientCert").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.clientCert = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#clientCertKey").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.clientCertKey = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
        box.querySelectorAll("#clientCertKeyPasswd").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.sslconf.clientCertKeyPasswd = event.target.value
                this._wmsConfig(content_box.querySelector("#wmsConfig_box"))
        })})
    }
    _wmsMeters(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3 class="mb-4">WMS Meters (${config.limits.virtualMeters} Meters)</h3>`
        tmpHTML += `<button style="min-width:100px" class="btn btn-success ml-auto align-self-center mx-4" id="add_button">Add Module</button>`
        tmpHTML += `</div>`
        // Fancy box
        tmpHTML += `<div class="list-group w-auto">`
        config.virtualMeters.meters.forEach(meter => {
            tmpHTML += `
            <div class="list-group-item d-flex gap-3 py-3 wms_color_${config.darkMode?'dark':'light'}_2">
                <div class="d-flex gap-2 w-100 justify-content-between" uuid=${meter.uuid}>
                    <div class="flex-fill" uuid=${meter.uuid}>`
            tmpHTML += `<h6 class="mb-2"><u>${meter.name}</u></h6>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">Status</span>
                            <input checked type="checkbox" class="btn-check">
                            <label class="btn btn-${((meter.enabled)?'primary':'secondary')} wms_color_${config.darkMode?'dark':'light'}_1" for="btn-check" style="min-width:150px" id="enabled">${((meter.enabled)?'Enabled':'Disabled')}</label>
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px">UUID</span>
                            <input type="text" value="${meter.wms_uuid}" class="form-control wms_color_${config.darkMode?'dark':'light'}_4" id="wms_uuid">
                        </div>`
            tmpHTML += `<div class="input-group mb-1">
                            <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Type of module</span>
                            <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="type">
                                <option${((meter.type === "")?' selected':'')} value="">---</option>
                                ${config.limits.plcModules > 0?`<option${((meter.type === "plcModules")?' selected':'')} value="plcModules">PLC Module Meter</option>`:``}
                                ${config.limits.rtuMeters > 0?`<option${((meter.type === "rtuMeters")?' selected':'')} value="rtuMeters">Modbus RTU Meter</option>`:``}
                                ${config.limits.tcpMeters > 0?`<option${((meter.type === "tcpMeters")?' selected':'')} value="tcpMeters">Modbus TCP Meter</option>`:``}
                                ${config.limits.rtdChannels > 0?`<option${((meter.type === "rtdChannels")?' selected':'')} value="rtdChannels">RTD Channel</option>`:``}
                                ${config.limits.digitalInputs > 0?`<option${((meter.type === "digitalInputs")?' selected':'')} value="digitalInputs">Digital Input</option>`:``}
                            </select>
                        </div>`
            switch (meter.type) {
                case "plcModules":
                    if (config.physicalMeters.plcModules.meters.length > 0) {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Selected Meter</span>
                                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="meter">`
                        tmpHTML += `<option${((meter.physicalMeterUuid === "")?' selected':'')} value="">---</option>`
                        config.physicalMeters.plcModules.meters.forEach(physicalMeter => {
                            tmpHTML += `<option${((meter.physicalMeterUuid === physicalMeter.uuid)?' selected':'')} value="${physicalMeter.uuid}" name="${physicalMeter.name}">${physicalMeter.name}</option>`
                            if (physicalMeter.type === "dc") {
                                tmpHTML += `<option${((meter.physicalMeterUuid === physicalMeter.uuid2)?' selected':'')} value="${physicalMeter.uuid2}" name="${physicalMeter.name2}">${physicalMeter.name2}</option>`
                            }
                        })
                        tmpHTML +=`</select></div>`
                    } else {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No meter declared</span>
                                    </div>`
                    }
                    break;

                case "rtuMeters":
                    if (config.physicalMeters.rtuMeters.meters.length > 0) {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Selected Meter</span>
                                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="meter">`
                        tmpHTML += `<option${((meter.physicalMeterUuid === "")?' selected':'')} value="">---</option>`
                        config.physicalMeters.rtuMeters.meters.forEach(physicalMeter => {
                            tmpHTML += `<option${((meter.physicalMeterUuid === physicalMeter.uuid)?' selected':'')} value="${physicalMeter.uuid}" name="${physicalMeter.name}">${physicalMeter.name}</option>`
                        })
                        tmpHTML +=`</select></div>`
                    } else {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No meter declared</span>
                                    </div>`
                    }
                    break;

                case "tcpMeters":
                    if (config.physicalMeters.tcpMeters.gateways.length > 0) {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Selected Gateway</span>
                                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="gateway">`
                        tmpHTML += `<option${((meter.physicalGatewayUuid === "")?' selected':'')} value="">---</option>`
                        config.physicalMeters.tcpMeters.gateways.forEach(physicalGateway => {
                            tmpHTML += `<option${((meter.physicalGatewayUuid === physicalGateway.uuid)?' selected':'')} value="${physicalGateway.uuid}">${physicalGateway.name}</option>`
                        })
                        tmpHTML +=`</select></div>`
                        config.physicalMeters.tcpMeters.gateways.forEach(physicalGateway => {
                            if (physicalGateway.uuid === meter.physicalGatewayUuid) {
                                if (config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === meter.physicalGatewayUuid))].meters.length > 0) {
                                    tmpHTML += `<div class="input-group mb-1">
                                                    <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Selected Meter</span>
                                                    <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="meter">`
                                    tmpHTML += `<option${((meter.physicalMeterUuid === "")?' selected':'')} value="">---</option>`
                                    config.physicalMeters.tcpMeters.gateways[config.physicalMeters.tcpMeters.gateways.indexOf(config.physicalMeters.tcpMeters.gateways.find(gateway => gateway.uuid === meter.physicalGatewayUuid))].meters.forEach(physicalMeter => {
                                        tmpHTML += `<option${((meter.physicalMeterUuid === physicalMeter.uuid)?' selected':'')} value="${physicalMeter.uuid}" name="${physicalMeter.name}">${physicalMeter.name}</option>`
                                    })
                                    tmpHTML +=`</select></div>`
                                } else {
                                    tmpHTML += `<div class="input-group mb-1">
                                                    <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No meter declared</span>
                                                </div>`
                                }
                            }
                        })
                    } else {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No gateway declared</span>
                                    </div>`
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No meter declared</span>
                                    </div>`
                    }
                    break;

                case "rtdChannels":
                    if (config.physicalMeters.rtdChannels.meters.length > 0) {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Selected Meter</span>
                                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="meter">`
                        tmpHTML += `<option${((meter.physicalMeterUuid === "")?' selected':'')} value="">---</option>`
                        config.physicalMeters.rtdChannels.meters.forEach(physicalMeter => {
                            tmpHTML += `<option${((meter.physicalMeterUuid === physicalMeter.uuid)?' selected':'')} value="${physicalMeter.uuid}" name="${physicalMeter.name}">${physicalMeter.name}</option>`
                        })
                        tmpHTML +=`</select></div>`
                    } else {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No meter declared</span>
                                    </div>`
                    }
                    break;

                case "digitalInputs":
                    if (config.physicalMeters.digitalInputs.meters.length > 0) {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >Selected Meter</span>
                                        <select class="form-select wms_color_${config.darkMode?'dark':'light'}_4" id="meter">`
                        tmpHTML += `<option${((meter.physicalMeterUuid === "")?' selected':'')} value="">---</option>`
                        config.physicalMeters.digitalInputs.meters.forEach(physicalMeter => {
                            tmpHTML += `<option${((meter.physicalMeterUuid === physicalMeter.uuid)?' selected':'')} value="${physicalMeter.uuid}" name="${physicalMeter.name}">${physicalMeter.name}</option>`
                        })
                        tmpHTML +=`</select></div>`
                    } else {
                        tmpHTML += `<div class="input-group mb-1">
                                        <span class="form-control wms_color_${config.darkMode?'dark':'light'}_1" style="min-width:150px" >No meter declared</span>
                                    </div>`
                    }
                    break;
            }
            tmpHTML += `</div>`
            tmpHTML += `<button style="min-width:100px" class="btn btn-danger ml-auto align-self-center mx-2" id="delete_button">Delete</button>`
            tmpHTML +=`
                </div>
            </div>
            `
        });
        tmpHTML += `</div></div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelectorAll("#enabled").forEach(input => {
            input.addEventListener("click",(event)=>{
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled = ! config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].enabled
                this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })})
        box.querySelector("#add_button").addEventListener("click",()=>{
            let uuid = newUUID()
            config.virtualMeters.meters.push({
                "enabled":true,
                "name":"---",
                "wms_uuid": "",
                "uuid":uuid,
                "type":"",
                "physicalMeterUuid": "",
                "physicalGatewayUuid": ""
            })
            this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })
        box.querySelectorAll("#delete_button").forEach(button => {
            button.addEventListener("click",(event)=>{
                config.virtualMeters.meters.splice(config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.getAttribute("uuid"))),1)
                this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })})
        box.querySelectorAll("#wms_uuid").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].wms_uuid = event.target.value
                this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })})
        box.querySelectorAll("#type").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].type = event.target.value
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = "---"
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].physicalMeterUuid = ""
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].physicalGatewayUuid = ""
                this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })})
        box.querySelectorAll("#meter").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].physicalMeterUuid = event.target.value
                event.target.childNodes.forEach(child => {
                    if (child.value === event.target.value) {
                        config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].name = child.innerText
                    }
                });
                this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })})
        box.querySelectorAll("#gateway").forEach(input => {
            input.addEventListener("change",(event)=>{
                config.virtualMeters.meters[config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === event.target.parentElement.parentElement.getAttribute("uuid")))].physicalGatewayUuid = event.target.value;
                this._wmsMeters(content_box.querySelector("#wmsMeters_box"))
        })})
    }
    _backup(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3>Backup Configuration</h3>`
        tmpHTML += `</div>`
        tmpHTML += `<div class="list-group w-auto mt-2">`
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between"><div class="flex-fill">`
        tmpHTML += `<div class="input-group mb-3">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_2" style="min-width:200px">Download from browser</span>
                        <button style="max-width:100px" class="form-control btn btn-primary" id="backupbrowser_button">Download</button>
                    </div>`
        tmpHTML += `<div class="input-group mb-0">
                        <span class="input-group-text wms_color_${config.darkMode?'dark':'light'}_2" style="min-width:200px">Download from filesystem</span>
                        <button style="max-width:100px" class="form-control btn btn-primary" id="backupfilesystem_button">Download</button>
                    </div>`
        tmpHTML += `</div></div></div></div>`
        tmpHTML += ``
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelectorAll("#backupbrowser_button").forEach(button => {
            button.addEventListener("click",()=>{
                const fileName = `Browser-${window.location.host}-${new Date().toLocaleString().replace(". ","-").replace(". ","-").replace(". ","_").replaceAll(":","-")}-wms.config.json`
                downloadConfig(fileName,false)
                this._backup(content_box.querySelector("#backup_box"))
        })})
        box.querySelectorAll("#backupfilesystem_button").forEach(button => {
            button.addEventListener("click",()=>{
                const fileName = `Filesystem-${window.location.host}-${new Date().toLocaleString().replace(". ","-").replace(". ","-").replace(". ","_").replaceAll(":","-")}-wms.config.json`
                downloadConfig(fileName,true)
                this._backup(content_box.querySelector("#backup_box"))
        })})
    }
    _restore(box) {
        let tmpHTML = `<div class="wms_color_${config.darkMode?'dark':'light'}_1 p-4 rounded mb-2">`
        // Title
        tmpHTML += `<div class="d-flex gap-2 w-100 justify-content-between">`
        tmpHTML += `<h3>Restore Configuration</h3>`
        tmpHTML += `</div>
                        <div class="input-group mb-3">
                            <input class="form-control wms_color_${config.darkMode?'dark':'light'}_4" type="file" id="restoreFile" name="restoreFile" required="required">
                            <button id="restore_button" style="min-width:100px" class="btn btn-primary">Upload</button>
                        </div>
                    </div>`
        box.innerHTML = tmpHTML
        // HTML completed, add event listeners
        box.querySelectorAll("#restore_button").forEach(button => {
            button.addEventListener("click",()=>{
                if (content_box.querySelector("#restoreFile").files.length > 0) {
                    readUploadedFile(content_box.querySelector("#restoreFile").files[0])
                    .then(data=>{
                        let backup = config
                        try {
                            config = JSON.parse(data)
                            this.changeTheme(config.darkMode?'dark':'light')
                            this.physical()
                        }
                        catch (e) {
                            config = backup
                            this.changeTheme(config.darkMode?'dark':'light')
                            alert("Invalid file format!")
                        }
                        this._restore(content_box.querySelector("#restore_box"))
                    })
                }
            })
        })
    }
    removeLinkings(uuid) {
        if (config.virtualMeters.meters.length > 0) {
            for (let index = 0; index < config.virtualMeters.meters.length; index++) {
                const linkedMeter = config.virtualMeters.meters[index]
                if (linkedMeter.physicalMeterUuid === uuid || linkedMeter.physicalGatewayUuid === uuid) {
                    config.virtualMeters.meters.splice(config.virtualMeters.meters.indexOf(config.virtualMeters.meters.find(meter => meter.uuid === linkedMeter.uuid)),1)
                    if (config.virtualMeters.meters.length > 0) {
                        index = -1
                    } else {
                        break;
                    }
                }
            }
        }
    }
    changeTheme(theme) {
        switch (theme) {
            case "dark":
                for (let index = 0; index < 5; index++) {
                    document.querySelectorAll(`.wms_color_light_${index}`).forEach(element => {
                        element.classList.remove(`wms_color_light_${index}`)
                        element.classList.add(`wms_color_dark_${index}`)
                    });
                }
                document.querySelector('#read_button').classList.remove('btn-outline-dark')
                document.querySelector('#read_button').classList.add('btn-outline-light')
                document.querySelector('#write_button').classList.remove('btn-outline-dark')
                document.querySelector('#write_button').classList.add('btn-outline-light')
                document.querySelector('nav').classList.remove('navbar-light')
                document.querySelector('nav').classList.add('navbar-dark')
                break;
            case "light":
                for (let index = 0; index < 5; index++) {
                    document.querySelectorAll(`.wms_color_dark_${index}`).forEach(element => {
                        element.classList.remove(`wms_color_dark_${index}`)
                        element.classList.add(`wms_color_light_${index}`)
                    });
                }
                document.querySelector('#read_button').classList.remove('btn-outline-light')
                document.querySelector('#read_button').classList.add('btn-outline-dark')
                document.querySelector('#write_button').classList.remove('btn-outline-light')
                document.querySelector('#write_button').classList.add('btn-outline-dark')
                document.querySelector('nav').classList.remove('navbar-dark')
                document.querySelector('nav').classList.add('navbar-light')
                break;
            default:
                break;
        }
    }
    initCssRule(selector,style) {
        for (let i = 0; i < document.styleSheets.length; i++) {
            let styleSheet = document.styleSheets[i];
            if (styleSheet.ownerNode.id == "wms_color") {
                for (let j = 0; j < styleSheet.cssRules.length; j++) {
                    if (styleSheet.cssRules[j].selectorText == selector) {
                        styleSheet.deleteRule(j)
                        break;
                    }
                }
                styleSheet.insertRule(selector + ' { ' + style + ' }', styleSheet.cssRules.length);
                break;
            }
        }
    }
}
