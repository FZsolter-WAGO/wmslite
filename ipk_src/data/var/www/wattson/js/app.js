/*

Compatible with WMSLite 5.4.1

*/

var render = new renderclass(document.querySelector('main'));
var config = {}
var env = {"password":""}


function main() {
    // Add safety prompt
    window.addEventListener("beforeunload", (e)=>{e.returnValue=0})
    // Add colors
    render.initCssRule('.wms_color_light_0','color:black;background-color:#FFFFFF;border:none;')
    render.initCssRule('.wms_color_light_1','color:black;background-color:rgb(239,240,242);border-color:#7f7f7f;')
    render.initCssRule('.wms_color_light_2','color:white;background-color:rgb(110,200,0);border:none;')
    render.initCssRule('.wms_color_light_3','color:black;background-color:rgb(239,240,242);border:none;')
    render.initCssRule('.wms_color_light_4','color:black;background-color:rgb(239,240,242);border-color:#7f7f7f;')
    render.initCssRule('.wms_color_dark_0','color:white;background-color:#2C3333;border-color:#868da1b6;')
    render.initCssRule('.wms_color_dark_1','color:white;background-color:#404258;border-color:#868da1b6;')
    render.initCssRule('.wms_color_dark_2','color:white;background-color:#474E68;border-color:#868da1b6;')
    render.initCssRule('.wms_color_dark_3','color:white;background-color:#50577A;border-color:#868da1b6;')
    render.initCssRule('.wms_color_dark_4','color:white;background-color:#6b728f;border-color:#868da1b6;')
    // Add password field to navbar
    document.querySelector('#login-password').addEventListener('change',(e)=>{
        env.password = e.target.value;
        let writeButton = document.querySelector('#write_button')
        if (env.password.length > 0) {
            if (writeButton.classList.contains('disabled')) {
                document.querySelector('#write_button').classList.remove('disabled')
            }
        } else {
            if (! writeButton.classList.contains('disabled')) {
                document.querySelector('#write_button').classList.add('disabled')
            }
        }
    })
    // Make navbar clickable
    document.querySelector('#nav_physical').addEventListener("click",()=>{
        render.physical()
    })
    document.querySelector('#nav_wms').addEventListener("click",()=>{
        render.wms()
    })
    document.querySelector('#nav_backup').addEventListener("click",()=>{
        render.backupRestore()
    })
    document.querySelector('#btnradiolight').addEventListener('click',()=>{
        config.darkMode = false
        render.changeTheme(config.darkMode?'dark':'light')
    })
    document.querySelector('#btnradiodark').addEventListener('click',()=>{
        config.darkMode = true
        render.changeTheme(config.darkMode?'dark':'light')
    })
    document.querySelector('#read_button').addEventListener("click",()=>{
        if(confirm("Reading the configuration will rewrite the current one.\nAre you sure?")){
            loadConfigJSON().then((data) => {
                config = data
                document.querySelector('#nav_physical').click()
            });
        }
    })
    document.querySelector('#write_button').addEventListener("click",()=>{
        if (env.password.length > 0) {
            if(confirm("Writing the configuration will rewrite the original one.\nAre you sure?")){
                render.loading()
                document.querySelector('#nav_physical').classList.add('disabled')
                document.querySelector('#nav_physical').setAttribute('disabled','')
                document.querySelector('#nav_wms').classList.add('disabled')
                document.querySelector('#nav_wms').setAttribute('disabled','')
                document.querySelector('#nav_backup').classList.add('disabled')
                document.querySelector('#nav_backup').setAttribute('disabled','')
                document.querySelector('#btnradiolight-label').classList.add('disabled')
                document.querySelector('#btnradiolight-label').setAttribute('disabled','')
                document.querySelector('#btnradiodark-label').classList.add('disabled')
                document.querySelector('#btnradiodark-label').setAttribute('disabled','')
                document.querySelector('#login-password').classList.add('disabled')
                document.querySelector('#login-password').setAttribute('disabled','')
                document.querySelector('#read_button').classList.add('disabled')
                document.querySelector('#read_button').setAttribute('disabled','')
                document.querySelector('#write_button').classList.add('disabled')
                document.querySelector('#write_button').setAttribute('disabled','')
                saveConfig(env.password,config)
                .then(r=>{
                    alert(r)
                    document.querySelector('#nav_physical').classList.remove('disabled')
                    document.querySelector('#nav_physical').removeAttribute('disabled')
                    document.querySelector('#nav_wms').classList.remove('disabled')
                    document.querySelector('#nav_wms').removeAttribute('disabled')
                    document.querySelector('#nav_backup').classList.remove('disabled')
                    document.querySelector('#nav_backup').removeAttribute('disabled')
                    document.querySelector('#btnradiolight-label').classList.remove('disabled')
                    document.querySelector('#btnradiolight-label').removeAttribute('disabled')
                    document.querySelector('#btnradiodark-label').classList.remove('disabled')
                    document.querySelector('#btnradiodark-label').removeAttribute('disabled')
                    document.querySelector('#login-password').classList.remove('disabled')
                    document.querySelector('#login-password').removeAttribute('disabled')
                    document.querySelector('#read_button').classList.remove('disabled')
                    document.querySelector('#read_button').removeAttribute('disabled')
                    document.querySelector('#write_button').classList.remove('disabled')
                    document.querySelector('#write_button').removeAttribute('disabled')
                    render.physical()
                })
            }
        }
    })
    // Load config while at startup
    loadConfigJSON().then((data) => {
        config = data
        if (config.darkMode) {
            document.querySelector('#btnradiodark').click()
        } else {
            document.querySelector('#btnradiolight').click()
        }
        render.physical()
    });
}

main()
