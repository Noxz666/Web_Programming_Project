const ValorantAPI = require("unofficial-valorant-api")

async function getapi(url) {
    const response = await fetch(url);

    var data = await response.json();
    console.log(data);
    if(response) {
        hideloader();
    }
    show(data);
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    let tab =
    `<tr>
        <th>Name</th>
        <th>Tag</th>
    </tr>`
    for (let r of data.list) {
        tab += 
        `<tr> 
            <td>${r.name} </td>
            <td>${r.tag}</td>    
        </tr>`;
    }
    document.getElementById('account').innerHTML = tab;
}

async function getAccount(name, tag) {
    const account = await ValorantAPI.getAccount(name, tag)
    //Do something with the data, for an example send it as a Discord Embed into your Discord
}

getMMR("v1", "eu", "Henrik3", "EUW3") 