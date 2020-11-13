const ApiKey = "";
const baseUrl = "https://www.balldontlie.io/api/v1/";
const baseEndPoin = `${baseUrl}/teams/`;
const statistikEndPoint = `${baseUrl}/stats`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim di Film Ball Don't Lie"
    fetch(baseEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(team => {
                data += `
                <li class="collection-item avatar">
                    <span class="title"><b>${team.full_name}</b></span>
                    <p>Singgkatan : ${team.abbreviation}
                       Kota: ${team.city} <br>
                       Conference : ${team.conference} <br>
                       Divisi: ${team.division} <br>
                       Nama : ${team.name}
                       
                    </p>
                    <a href="#" data-id=${team.id} class="secondary-content"><i class="material-icons" data-id=${team.id}>info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
        }).catch(err => {
            console.error(err);
        })
}

function getListStats() {
    title.innerHTML = "Statistik Pemain Di Tim"
    fetch(statistikEndPoint, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(teams => {
                data += `
                <li class="collection-item avatar">
                    <span class="title"><b>${teams.team.full_name}</b></span>
                    <p>Nama Depan: ${teams.player.first_name} <br>
                       Nama Belakang: ${teams.player.last_name} <br>
                       Posisi: ${teams.player.position} <br>
                       Tinggi Kaki : ${teams.player.height_feet} <br>
                       Berat : ${teams.player.weight_pounds} <br>
                       Field Goals : ${teams.fga} <br>
                       Menit : ${teams.min} <br>
                       Point : ${teams.pts} <br>
                       Assist: ${teams.ast} <br>
                       Block : ${teams.blk} <br>
                       Dribble : ${teams.dreb} <br>
                       Rebound : ${teams.oreb} <br>
                       Pelanggaran Pribadi : ${teams.pf} 
                    </p>
                    <a href="#" data-id=${teams.player.id} class="secondary-content"><i class="material-icons" data-id=${teams.player.id}>info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "stats":
            getListStats();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
    });